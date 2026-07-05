export const POSTS = [
  {
    slug: 'building-wormhole-p2p-messaging',
    title: 'Wormhole — Engineering a Serverless, End-to-End Encrypted Messenger',
    date: '2026-07-05',
    tag: 'tech',
    excerpt: 'A private tunnel between exactly two phones — WebRTC, NaCl encryption, no servers in the middle. Every diagram, flowchart, and hard-won lesson from building it.',
    projectLabel: 'Learn more about Wormhole →',
    projectUrl: '/wormhole',
    downloadLabel: '🤖 Download APK for Android →',
    downloadUrl: 'https://drive.google.com/file/d/1B8697BYuBhqrzr1ymNnPD0rNbEFtFb_F/view?usp=drive_link',
    content: [
      'Wormhole is a messaging app for exactly two people. No accounts, no phone numbers, no cloud. Two phones open a direct WebRTC tunnel to each other, and every message, image, and call travels through it end-to-end encrypted. The only server involved is a tiny "introducer" that helps the phones find each other — after that, it goes idle and sees nothing. This post is the full engineering deep-dive: architecture, encryption, MITM defense, offline handling, media calls, the wire protocol, deployment, and the platform quirks that cost me actual days. If you just want to know what the app does in plain words, the project page has the friendly version.',

      { type: 'h2', text: '1. Architecture Overview' },

      'Everything starts with a handshake. Both phones connect to a small signaling server and join the same room. The server relays the WebRTC negotiation messages (SDP offers/answers and ICE candidates) between them — and that is the entirety of its job. Once the DataChannel opens, the phones talk directly.',

      { type: 'diagram', title: 'System architecture — the handshake, then the tunnel', text:
`sequenceDiagram
    participant A as Phone A
    participant S as Signaling Server
    participant B as Phone B
    A->>S: 1. join(roomId)
    B->>S: 2. join(roomId)
    A->>S: 3. SDP Offer
    S->>B: 4. SDP Offer
    B->>S: 5. SDP Answer
    S->>A: 6. SDP Answer
    A->>B: 7. ICE candidates (both directions)
    B->>A: ICE candidates
    Note over A,B: WebRTC DataChannel opens — direct, DTLS encrypted transport
    A->>B: nacl.box(message, nonce, peerPubKey, mySecKey)
    B->>A: nacl.box(message, nonce, peerPubKey, mySecKey)
    Note over S: Signaling server now idle — sees nothing` },

      'Once connected, a single bundled ICE transport carries everything: text, images, delivery receipts, call signaling, and the call media itself. The server never sees message content — only encrypted blobs travel over the DataChannel.',

      { type: 'diagram', title: 'What travels over the peer link', text:
`flowchart TB
    A["Phone A"] --- ICE
    B["Phone B"] --- ICE
    subgraph ICE["Single bundled ICE transport (bundlePolicy: max-bundle)"]
        direction TB
        DC["DataChannel — DTLS encrypted"]
        DC --> T["Text messages — nacl.box E2EE"]
        DC --> IMG["Images, chunked — nacl.box E2EE"]
        DC --> ACK["Delivery ACKs — DTLS only"]
        DC --> CS["Call signals + SDP — DTLS only"]
        AT["Audio track, calls — DTLS-SRTP"]
        VT["Video track, calls — DTLS-SRTP"]
    end
    ICE -.->|"NAT blocks direct path"| TURN["TURN relay — forwards packets, holds no keys, cannot read anything"]` },

      'The server process hosts two things: the socket.io signaling endpoint (handshake only) and a TURN relay for when the two peers cannot reach each other directly — for example two Android emulators, or phones behind symmetric carrier NATs.',

      { type: 'h2', text: '2. Tech Stack' },

      'React Native on both platforms, with four layers underneath: transport (WebRTC), crypto (NaCl), storage (SQLite + AsyncStorage), and UI. Each package earns its place:',

      { type: 'table',
        head: ['Layer', 'Package', 'Purpose'],
        rows: [
          ['Transport', 'react-native-webrtc', 'WebRTC DataChannel for P2P'],
          ['Signaling', 'socket.io-client', 'Handshake only, idle after connect'],
          ['Encryption', 'tweetnacl', 'NaCl box — E2E encrypt/decrypt'],
          ['Encoding', 'tweetnacl-util', 'Base64/UTF8 helpers'],
          ['Key storage', 'async-storage', 'Persist keypair on device'],
          ['Messages', 'react-native-sqlite-storage', 'Local message history'],
          ['QR show', 'react-native-qrcode-svg', 'Display public key QR'],
          ['QR scan', 'react-native-camera', 'Scan peer’s public key'],
          ['Network', '@react-native-community/netinfo', 'Detect online/offline'],
          ['Images', 'react-native-image-picker', 'Pick from gallery / take photo'],
          ['Polyfill', 'react-native-get-random-values', 'crypto.getRandomValues for Hermes (tweetnacl PRNG)'],
          ['Polyfill', 'fast-text-encoding + buffer', 'TextEncoder / global.Buffer for Hermes'],
          ['Server', 'node-turn', 'Embedded TURN relay for NAT-blocked peers'],
        ] },

      { type: 'h3', text: 'Polyfills — required on Hermes' },

      'Hermes, React Native’s JS engine, ships without several globals that the crypto and QR libraries assume exist. They must be installed before any other import or the app crashes at startup with "no PRNG", "Property ’Buffer’ doesn’t exist", or "Property ’TextEncoder’ doesn’t exist":',

      { type: 'h2', text: '3. Connection Flow' },

      'The handshake has five distinct phases: room join, SDP exchange, ICE candidate exchange, DataChannel open, and finally encrypted messaging. Here is the full sequence:',

      { type: 'diagram', title: 'Connection flow — from room join to encrypted chat', text:
`sequenceDiagram
    participant A as Phone A (Initiator)
    participant S as Signaling Server
    participant B as Phone B (Receiver)
    Note over A,B: Step 1 — both join the same room
    A->>S: emit('join', roomId)
    B->>S: emit('join', roomId)
    S-->>A: 'peer-joined'
    Note over A,B: Step 2 — WebRTC handshake (SDP)
    A->>A: createOffer()
    A->>S: emit('offer', sdp)
    S->>B: 'offer'
    B->>B: setRemoteDescription, createAnswer()
    B->>S: emit('answer', sdp)
    S->>A: 'answer'
    A->>A: setRemoteDescription
    Note over A,B: Step 3 — ICE candidates (NAT traversal)
    A->>S: candidates
    B->>S: candidates
    S->>A: candidates
    S->>B: candidates
    Note over A,B: Step 4 — direct P2P established, WebRTC DataChannel OPEN, signaling server idle
    Note over A,B: Step 5 — encrypted messaging begins
    A->>B: nacl.box(message) — encrypted
    B->>A: nacl.box(reply) — encrypted` },

      { type: 'h2', text: '4. Encryption Design' },

      'Transport encryption (DTLS) is not enough — the signaling server could theoretically play man-in-the-middle during the handshake. So every message gets its own end-to-end layer using NaCl’s box construction on top of the already-encrypted channel:',

      { type: 'diagram', title: 'Message encryption pipeline', text:
`flowchart LR
    subgraph EncA["PHONE A — encrypt"]
        direction TB
        P1["plaintext message"] --> BOX["nacl.box()"]
        N1["random 24-byte nonce"] --> BOX
        K1["my secret key + peer public key"] --> BOX
        BOX --> C1["ciphertext + nonce"]
    end
    subgraph DecB["PHONE B — decrypt"]
        direction TB
        C2["ciphertext + nonce"] --> OPEN["nacl.box.open()"]
        K2["my secret key + peer public key"] --> OPEN
        OPEN --> OK["plaintext message ✓"]
        OPEN -.->|"decryption fails"| MITM["throw: tampered or wrong keys → MITM"]
    end
    C1 -->|"WebRTC DataChannel — DTLS pipe"| C2` },

      { type: 'diagram', title: 'How nacl.box works', text:
`flowchart TD
    A["nacl.box(message, nonce, theirPublicKey, mySecretKey)"] --> B["Curve25519 Diffie-Hellman key exchange"]
    B --> C["Derive shared secret from both keys"]
    C --> D["Encrypt with XSalsa20 stream cipher"]
    D --> E["Authenticate with Poly1305 MAC"]
    E --> F["Authenticated + encrypted ciphertext"]
    F --> G["Only the peer with the matching keypair can open it"]
    F --> H["Any tampering is detected — MAC verification fails"]
    F --> I["Decryption failure = possible MITM → throw error"]` },

      { type: 'table',
        head: ['Key', 'Who holds it', 'Stored where'],
        rows: [
          ['My public key', 'Shared with peer', 'AsyncStorage + QR'],
          ['My secret key', 'Never leaves device', 'AsyncStorage (device-local)'],
          ['Peer public key', 'Received from peer via QR', 'AsyncStorage'],
          ['Nonce', 'Random per message', 'Prepended to ciphertext'],
        ] },

      { type: 'h2', text: '5. MITM Prevention' },

      'The classic attack against any key-exchange-over-a-server design: the server (or someone who owns it) swaps the public keys in transit and silently decrypts-and-re-encrypts everything. The fix is verifying keys through a channel the attacker does not control:',

      { type: 'diagram', title: 'MITM attack and its two countermeasures', text:
`flowchart TD
    K["Phone A + Phone B generate keypairs"] --> X["Keys exchanged via signaling server"]
    X --> I["Attacker intercepts and swaps keys"]
    X --> V["Keys verified out of band"]
    I --> M1["🔴 MITM possible — attacker reads all messages"]
    V --> Q["QR scan in person — SHA-256 fingerprint of public key shown as QR"]
    V --> S["Safety number via call — both derive code from BOTH public keys, read aloud"]
    Q --> QM{"Fingerprints match?"}
    S --> SM{"Codes match?"}
    QM -->|yes| QT["🟢 Trusted connection"]
    QM -->|no| QD["🔴 MITM detected — abort"]
    SM -->|yes| ST["🟢 Trusted connection"]
    SM -->|no| SD["🔴 MITM detected — abort"]` },

      { type: 'diagram', title: 'Defense in depth — three layers', text:
`flowchart TD
    L1["Layer 1 — DTLS, WebRTC built-in<br/>Protects against: passive network eavesdroppers<br/>Does NOT protect against: malicious signaling server"]
    L2["Layer 2 — nacl.box, tweetnacl<br/>Protects against: signaling server interception<br/>Does NOT protect against: key substitution during handshake"]
    L3["Layer 3 — QR / Safety Number Verification ← THE CRITICAL ONE<br/>Protects against: key substitution, MITM at signaling level<br/>How: verify key fingerprint through a trusted out-of-band channel"]
    L1 --> L2 --> L3 --> R["Result: attacker would need to compromise that channel too"]` },

      { type: 'h2', text: '6. Key Verification Flow' },

      'Verification happens once, ideally in person. Each phone shows a QR of its public-key fingerprint; the other phone scans and stores it. From then on every message is boxed to the verified key:',

      { type: 'diagram', title: 'First-time key exchange — QR ceremony', text:
`sequenceDiagram
    participant UA as User A
    participant AA as App A
    participant AB as App B
    participant UB as User B
    AA->>AA: generate KeyPair A
    AB->>AB: generate KeyPair B
    AA->>AA: SHA-256(pubKeyA) → fingerprint
    AA-->>UA: show QR
    UA->>UB: User B scans A's QR
    AB->>AB: store peerPublicKey, verify ✓
    AB-->>UB: show QR — SHA-256(pubKeyB)
    UB->>UA: User A scans B's QR
    AA->>AA: store peerPublicKey, verify ✓
    Note over AA,AB: Both keys verified — MITM impossible — encrypted messaging begins` },

      { type: 'h2', text: '7. Offline Message Handling' },

      'True P2P has a hard constraint: there is no server to hold messages, so both peers must be online for delivery. Instead of pretending otherwise, Wormhole makes the offline path explicit — an encrypted outbox that flushes automatically on reconnect:',

      { type: 'diagram', title: 'Send path with offline queue and reconnect backoff', text:
`flowchart TD
    A["User types message"] --> B["Encrypt with nacl.box"]
    B --> C["Save to SQLite — status: pending"]
    C --> D{"DataChannel open?"}
    D -->|yes| E["Send over DataChannel"]
    E --> F["status: sent ✓"]
    D -->|"no — peer offline"| G["Add to pendingQueue, AsyncStorage"]
    G --> H["Show 🕐 in UI, wait for reconnect"]
    H --> I["NetInfo detects online"]
    I --> J["Attempt WebRTC reconnect"]
    J --> K{"Reconnected?"}
    K -->|no| L["Exponential backoff — retry in 5s / 10s / 30s…"]
    L --> J
    K -->|yes| M["Flush pendingQueue in order"]
    M --> N["All sent → status: sent → ✓"]` },

      { type: 'diagram', title: 'Message status lifecycle', text:
`flowchart LR
    A["typing"] --> B["pending 🕐<br/>encrypted, saved locally, DataChannel closed"]
    B --> C["sent ✓<br/>delivered to peer's DataChannel"]
    C --> D["delivered ✓✓<br/>peer's app confirmed receipt, ACK sent back"]` },

      { type: 'h2', text: '8. Sending Images' },

      'Images travel over the same encrypted DataChannel as text — boxed with the same NaCl layer, then split into transport chunks because SCTP caps the size of an individual DataChannel message:',

      { type: 'diagram', title: 'Image pipeline — pick, compress, encrypt, chunk, reassemble', text:
`flowchart TD
    A["📷 Pick image — gallery or camera"] --> B["Compress — max 1280px, JPEG q0.7"]
    B --> C["Base64 encode → plaintext JSON {mime, data}"]
    C --> D["nacl.box encrypt — same E2EE layer as text"]
    D --> E["Wire frame {nonce, ciphertext, id, ts, k:'i'}"]
    E --> F{"Size ≤ 15 KB?"}
    F -->|yes| G["Send as one frame"]
    F -->|"no, > 15 KB"| H["Split into chunk frames {type:'chunk', cid, seq, total, part}<br/>sent sequentially with bufferedAmount backpressure"]
    G --> I["DataChannel — DTLS transport / TURN relay, ciphertext only"]
    H --> I
    I --> J["Receiver reassembles chunks by cid"]
    J --> K["nacl.box.open decrypt → save to SQLite, kind='image'"]
    K --> L["Render image bubble + send ACK → ✓✓"]` },

      { type: 'diagram', title: 'Chunking on the wire', text:
`flowchart TD
    A["One encrypted wire frame — e.g. a 400 KB image after base64<br/>{nonce, ciphertext: 'AAAA……ZZZZ', k:'i', id:…}"]
    A -->|"split every 15,000 chars"| B["chunk seq 0/27<br/>{type:'chunk', cid:'m3k2', seq:0, total:27, part:'{nonce…'}"]
    A -->|"split every 15,000 chars"| C["chunk seq 1/27"]
    A -->|"split every 15,000 chars"| D["chunk seq 26/27<br/>{…part:'…i}'}"]
    B --> E["Receiver: buffer[cid][seq] = part"]
    C --> E
    D --> E
    E --> F["When received == total → join → decrypt → done"]` },

      'Two safeguards keep the send loop healthy: it pauses whenever channel.bufferedAmount exceeds 4 MB so the SCTP send buffer never overflows, and it yields to the JS event loop every 8 frames so the UI stays responsive. Security is identical to text — image bytes exist in plaintext only on the two devices; the chunking layer, the DataChannel, and any TURN relay in the path all see ciphertext only.',

      { type: 'h2', text: '9. Voice & Video Calls' },

      'Calls reuse the existing peer connection. The call is negotiated over the already-encrypted DataChannel, and the audio/video tracks ride the same ICE transport thanks to bundlePolicy: max-bundle — no new ICE candidates, and the signaling server plays no part mid-call:',

      { type: 'diagram', title: 'Call setup — negotiated entirely over the DataChannel', text:
`sequenceDiagram
    participant C as Caller
    participant E as Callee
    Note over C,E: All signaling below travels over the already-open DataChannel (E2E link)
    C->>C: tap 📞/🎥 — getUserMedia, pc.addTrack per track
    C->>E: {call, invite, video}
    Note over E: Accept/Decline prompt
    E->>E: getUserMedia + addTrack (before accepting — tracks ride along in the answer)
    E->>C: {call, accept}
    C->>C: createOffer + setLocalDescription
    C->>E: {sdp-offer}
    E->>E: setRemote → createAnswer
    E->>C: {sdp-answer}
    C->>C: setRemoteDescription
    Note over C,E: 🔊 Media flows — DTLS-SRTP encrypted, same bundled ICE transport
    C->>E: {call, end} — either side hangs up
    C->>C: stop + release tracks
    E->>E: stop + release tracks` },

      { type: 'diagram', title: 'How call media is secured', text:
`flowchart TD
    L1["Layer 1 — DTLS-SRTP, mandatory in WebRTC, cannot be disabled<br/>Every audio/video packet is encrypted and authenticated end-to-end.<br/>Keys come from the DTLS handshake between the two devices —<br/>a TURN relay forwards packets it cannot decrypt."]
    L2["Layer 2 — Authenticated call setup<br/>Invite / accept / SDP renegotiation frames travel inside the DataChannel,<br/>established with the peer whose public key you verified (QR / safety number).<br/>An attacker cannot inject or hijack a call without first defeating key verification."]
    L1 --> L2` },

      { type: 'table',
        head: ['Control', 'Mechanism'],
        rows: [
          ['Mute 🎤/🔇', 'track.enabled = false on local audio tracks'],
          ['Camera on/off', 'track.enabled = false on the local video track'],
          ['Hang up 📵', '{action:’end’} over the DataChannel; both sides stop tracks'],
          ['Local preview', 'RTCView with mirror on the local stream'],
        ] },

      { type: 'h2', text: '10. Wire Protocol' },

      'Everything on the DataChannel is a JSON frame. Two encryption regimes apply: NaCl-boxed frames whose content is readable only after nacl.box.open, and DTLS-only control frames that carry no message content but are still encrypted in transit:',

      { type: 'table',
        head: ['Frame', 'Shape', 'Encryption', 'Purpose'],
        rows: [
          ['Text message', '{nonce, ciphertext, id, ts}', 'NaCl box', 'Ciphertext decrypts to the text'],
          ['Image message', '{nonce, ciphertext, id, ts, k:’i’}', 'NaCl box', 'Ciphertext decrypts to {mime, data}'],
          ['Delivery ACK', '{type:’ack’, id}', 'DTLS-only', 'Flips ✓ to ✓✓ for message id'],
          ['Chunk', '{type:’chunk’, cid, seq, total, part}', 'carries NaCl ciphertext', 'Transport split of any frame > 15 KB'],
          ['Call signal', '{type:’call’, action, video}', 'DTLS-only', 'invite / accept / reject / end'],
          ['Renegotiation', '{type:’sdp-offer|sdp-answer’, sdp}', 'DTLS-only', 'Adds/removes media m-lines mid-session'],
        ] },

      { type: 'h2', text: '11. Project Structure & Data Models' },

      { type: 'diagram', title: 'Repository layout', text:
`flowchart TD
    ROOT["p2p-chat/"] --> AND["android/<br/>native config"]
    ROOT --> IOS["ios/<br/>native config"]
    ROOT --> SRV["server/ — deployed separately<br/>index.js — socket.io signaling + node-turn TURN relay"]
    ROOT --> SRC["src/"]
    ROOT --> APPJS["App.js — root + navigation"]
    SRC --> CRYPTO["crypto/<br/>keyManager.js — generate & store keypair<br/>encryptor.js — encrypt / decrypt messages<br/>safetyNumber.js — MITM verification codes"]
    SRC --> WEBRTC["webrtc/<br/>peerConnection.js — RTCPeerConnection + DataChannel<br/>signalingService.js — socket.io signaling client"]
    SRC --> STORAGE["storage/<br/>messageStore.js — SQLite CRUD for messages<br/>pendingQueue.js — offline outbox<br/>db.js — SQLite init & migrations"]
    SRC --> HOOKS["hooks/<br/>usePeer.js — WebRTC lifecycle + send + call signals<br/>useMessages.js — message list state + SQLite<br/>useEncryption.js — keypair + peer key state<br/>useNetworkStatus.js — online/offline detection<br/>usePushKit.js — iOS VoIP wake events"]
    SRC --> SCREENS["screens/<br/>SetupScreen.js — first launch + room ID entry<br/>ChatScreen.js — chat UI + calls + image attach<br/>CallScreen.js — RTCView, mute, hang-up<br/>VerifyScreen.js — QR show + scan + manual paste"]
    SRC --> COMPS["components/<br/>MessageBubble.js, MessageList.js<br/>MessageInput.js, ConnectionStatusBar.js"]` },

      { type: 'h2', text: '12. The Signaling + TURN Server' },

      'One Node process, two jobs: socket.io signaling on port 7788 and a node-turn TURN relay on port 3478. TURN is what lets two peers connect when neither can accept inbound traffic — two Android emulators, or phones behind carrier-grade NAT.',

      { type: 'h2', text: '13. Deployment' },

      { type: 'diagram', title: 'Production topology — one $5 VPS', text:
`flowchart TD
    subgraph VPS["VPS — $5/month (DigitalOcean / Railway)"]
        SIG["Signaling — Node.js + socket.io"]
        TURN["coturn TURN server — :3478 / :5349"]
        CF["Optional: Cloudflare in front of signaling for DDoS protection"]
    end
    A["Phone A"] -->|"handshake only + NAT fallback"| VPS
    VPS -->|"handshake only + NAT fallback"| B["Phone B"]
    A <-.->|"direct P2P after connect"| B` },

      'Locally you don’t need coturn at all — the project embeds a JS TURN server (node-turn) inside server/index.js on port 3478 with dev credentials. You swap the client’s ICE config to a real coturn instance for production.',

      { type: 'table',
        head: ['Day', 'Task', 'Output'],
        rows: [
          ['1', 'Key generation + signaling server', 'Keys persisted, server running'],
          ['2', 'WebRTC + tweetnacl', 'Two phones exchange encrypted messages'],
          ['3', 'SQLite + pending queue', 'Messages survive restart, offline resilient'],
          ['4', 'QR verification + chat UI', 'Shippable prototype'],
        ] },

      { type: 'h2', text: '14. Privacy Tradeoffs — Honest Edition' },

      'No system is "fully private", and pretending otherwise is how you lose users’ trust. Here is exactly what Wormhole protects and what it does not:',

      { type: 'diagram', title: 'What’s private, what’s not, and how to close the gaps', text:
`flowchart TD
    subgraph Private["WHAT'S PRIVATE"]
        P1["✅ message content — nacl.box E2EE"]
        P2["✅ message history — local only"]
        P3["✅ keys — never leave device"]
        P4["✅ identity — no phone number, no email, no account"]
    end
    subgraph NotPrivate["WHAT'S NOT"]
        N1["⚠️ your IP — visible to signaling server during handshake"]
        N2["⚠️ peer's IP — visible to STUN"]
        N3["⚠️ traffic timing — an observer sees that you two are talking"]
        N4["⚠️ TURN relay sees encrypted traffic volume if used"]
    end
    N1 -->|"close the gap"| G1["Use a VPN/Tor, or self-host signaling+TURN"]
    N3 -->|"close the gap"| G2["VPN, or Briar-style onion routing for maximum metadata privacy"]` },

      { type: 'diagram', title: 'Quick reference — what each server knows', text:
`flowchart TD
    subgraph SIG["Signaling Server"]
        S1["Both peers' IP addresses"]
        S2["That two IPs connected at time T"]
        S3["Room ID — not tied to identity"]
        S4["Nothing else"]
    end
    subgraph STUN["STUN Server, Google"]
        ST1["Your public IP"]
        ST2["Nothing else"]
    end
    subgraph TURN["TURN Server, if used"]
        T1["Both IPs"]
        T2["Encrypted traffic — cannot read"]
        T3["Traffic volume and timing"]
    end
    subgraph Nobody["Nobody knows"]
        NB1["Message content — E2EE"]
        NB2["Your keypair or identity"]
        NB3["Message history"]
    end` },

      { type: 'table',
        head: ['App', 'Server', 'E2EE', 'Offline delivery', 'Metadata'],
        rows: [
          ['Wormhole', 'Signaling only', '✅ nacl.box', '❌ both must be online', 'IP leaked to signaling'],
          ['Signal', 'Meta relay', '✅ Signal Protocol', '✅ server holds', 'Phone number required'],
          ['Tox', 'None (DHT)', '✅', '❌ both online', 'IP in DHT'],
          ['Briar', 'None (Tor)', '✅', '❌ both online', '✅ hidden via Tor'],
          ['Jami', 'None (DHT)', '✅', 'Partial', 'IP in DHT'],
        ] },

      { type: 'h2', text: '15. iOS — Where It Gets Hard' },

      'React Native and every package here support iOS, but iOS is much stricter than Android in ways that directly hit a P2P app. The big one: iOS suspends backgrounded apps in about 30 seconds, killing the WebRTC connection.',

      { type: 'table',
        head: ['Feature', 'Android', 'iOS', 'Fix needed'],
        rows: [
          ['WebRTC DataChannel', '✅', '✅', 'None'],
          ['Foreground messaging', '✅', '✅', 'None'],
          ['Background messaging', '✅', '⚠️ killed in ~30s', 'PushKit VoIP push'],
          ['Plain WS (ws://)', '✅', '❌ ATS blocks', 'Use WSS + Let’s Encrypt'],
          ['Native linking', 'Not needed', 'Required', 'pod install'],
          ['Testing', 'Emulator OK', '❌ no WebRTC in Simulator', 'Real iPhone'],
          ['Distribution', 'Sideload APK', 'TestFlight / App Store', 'TestFlight for 2 users'],
        ] },

      { type: 'diagram', title: 'The iOS background problem and the PushKit fix', text:
`flowchart TD
    A["User backgrounds the app"] --> AND["Android"]
    A --> IOS["iOS"]
    AND --> AND1["App stays alive, WebRTC maintained,<br/>messages received in background ✅"]
    IOS --> IOS1["iOS suspends app in ~30s"]
    IOS1 --> IOS2["WebRTC DataChannel closes, socket.io disconnects"]
    IOS2 --> IOS3["❌ Peer cannot reach you"]
    IOS3 --> FIX["THE FIX: PushKit VoIP push"]
    FIX --> F1["1. Sender → signaling server: 'wake B'"]
    F1 --> F2["2. Server → Apple APNs VoIP push → iPhone wakes silently<br/>payload is {wake:true} — no message content"]
    F2 --> F3["3. App reconnects WebRTC in background"]
    F3 --> F4["4. ✅ Message delivered P2P — still travels only over WebRTC"]` },

      { type: 'h2', text: '16. Cross-Platform Android ↔ iOS' },

      'WebRTC is a standard — it exists precisely so different platforms can talk to each other. Android ↔ iOS works out of the box: the DataChannel, tweetnacl (pure JS — keys are just bytes), socket.io, STUN/TURN/ICE, and the QR fingerprints are all platform-agnostic. The only real asymmetry is background handling:',

      { type: 'table',
        head: ['Sender', 'Receiver state', 'Result', 'Notes'],
        rows: [
          ['Android (fg/bg)', 'iOS foreground', '✅ Instant', ''],
          ['Android (fg/bg)', 'iOS background', '✅ With PushKit', 'Server sends VoIP wake push'],
          ['iOS foreground', 'Android foreground', '✅ Instant', ''],
          ['iOS foreground', 'Android background', '✅', 'Android background service handles it'],
          ['iOS foreground', 'Android offline', '✅ Queued', 'pendingQueue flushes on reconnect'],
          ['iOS background', 'Any', '⚠️ Queued', 'iOS can’t send while suspended — delivered when app next opens'],
        ] },

      { type: 'note', text: 'That last row is an OS limitation, not an app bug. Every major messenger — WhatsApp, Signal, Telegram — has the same constraint and handles it identically: queue the send, deliver when the app is next opened.' },

      { type: 'diagram', title: 'Keys are just bytes — identical on both platforms', text:
`flowchart LR
    A["Android: nacl.box.keyPair() → Uint8Array → base64 string"]
    B["iOS: nacl.box.keyPair() → Uint8Array → base64 string"]
    A -->|"Android scans iOS QR → decodeBase64"| C["Works as peerPublicKey ✅"]
    B -->|"iOS scans Android QR → decodeBase64"| C
    C --> D["nacl.box(msg, nonce, androidPubKey, iosSecretKey): iOS → Android ✅"]
    C --> E["nacl.box(msg, nonce, iosPubKey, androidSecretKey): Android → iOS ✅"]` },

      { type: 'h2', text: '17. Two-Emulator Testing — The Topology That Works' },

      'Developing a two-device app on one PC is its own puzzle. Each Android emulator sits behind its own virtual NAT — both believe they are 10.0.2.15 internally — so they can never reach each other directly. Every ICE candidate pair fails except relay ↔ relay through the local TURN server, which is why TURN is mandatory for local development:',

      { type: 'diagram', title: 'Single-PC development topology', text:
`flowchart TD
    subgraph PC["Your PC"]
        METRO["Metro :8081"]
        SIG["Signaling :7788 — socket.io"]
        TURN["TURN relay :3478 — node-turn, same server process"]
        subgraph EA["Emulator A — own NAT"]
            RA["relay sock A"]
        end
        subgraph EB["Emulator B — own NAT"]
            RB["relay sock B"]
        end
        METRO -.->|"adb reverse"| EA
        EA -->|"10.0.2.2"| SIG
        EB -->|"10.0.2.2"| SIG
        RA <-->|"media + data hairpin via host LAN IP"| TURN
        RB <-->|"media + data hairpin via host LAN IP"| TURN
    end
    NOTE["10.0.2.2 always means the host machine from inside an emulator.<br/>For a physical phone: use the PC's LAN IP, open 7788/tcp + 3478/udp."]` },

      { type: 'h2', text: 'Closing Thoughts' },

      'Wormhole is deliberately small: no accounts, no phone numbers, no cloud — just two devices talking through a private tunnel. The interesting engineering isn’t any single component; it’s how few components you actually need once you stop assuming a server must sit in the middle. WebRTC handles the tunnel, NaCl handles the secrecy, a QR scan handles the trust, and a $5 VPS handles the introductions. Everything else is honest bookkeeping about the tradeoffs — and the platforms fighting you along the way.',

      'If you want the plain-language version of what this app does — and why someone who has never heard of a DataChannel might care — head over to the Wormhole project page below.',
    ],
  },
  {
    slug: 'why-im-building-innercast',
    title: "Why I'm Building Innercast",
    date: '2026-07-03',
    tag: 'life',
    excerpt: 'Mental health is the one thing we track the least about ourselves, yet it shapes everything else.',
    projectLabel: 'Learn more about Innercast →',
    projectUrl: '/mood',
    content: [
      'We track our steps, our sleep, our calories, our screen time. We have dashboards for everything. But most of us have no idea what our emotional baseline actually is. We notice when we feel unusually awful. We forget the days that felt quietly good. The patterns that matter most go completely unrecorded.',

      'Mental health is not the absence of crisis. That framing is part of the problem. We treat it like a fire alarm, something to pay attention to only when things are already burning. But emotional wellbeing works more like physical fitness. You do not wait until you can barely walk to start paying attention to your body. The same logic applies to your mind. Small, consistent awareness builds resilience long before things go wrong.',

      'The research backs this up. People who regularly reflect on their emotional state show better stress regulation, stronger relationships, and clearer decision-making. Not because they have solved anything, but because they understand themselves better. Awareness, it turns out, is half the intervention.',

      'I wanted to build something for this. Not an app that medicalizes ordinary human feeling, not a mood board with curated aesthetics. Something honest. Something that fits in the five seconds between a meeting and lunch. Something that actually remembers what you told it.',

      'That is what Innercast is. You open it, pick a few emotions from a list of 35 options, add a private note if you have something to say, and close it. That is a check-in. You can do three a day or one a week. The app does not lecture you about consistency. It just keeps track.',

      'The part I am most proud of is what happens at night. Claude AI reads your day\'s check-ins and writes a journal entry in your voice. Not a clinical summary. Something that actually sounds like you processed your day. It is a strange and useful thing to read back.',

      'I also care a lot about privacy. Your data lives on your device. The AI sees only a structured summary of your moods, never your raw notes. You do not need to trust a server you have never seen. That matters to me when I think about who would actually use this.',

      'I am building Innercast because I want it to exist. The act of building it is already changing how I think about my own days. Even without the app open, I find myself more aware of what I am actually feeling, not just what I am doing. That awareness is quiet and useful. I think more people could use it.',
    ],
  },
];
