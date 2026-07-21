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
    excerpt: 'Mental health is the one thing we track the least about ourselves, yet it shapes everything else. A private, on-device mood diary that checks in daily and writes the story back to you.',
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
  {
    slug: 'why-digitalise-your-coaching-business',
    title: 'Why It Matters to Digitalise Your Business, Entity, and Identity',
    date: '2026-07-17',
    tag: 'business',
    excerpt: 'A signboard and word of mouth used to be enough. For coaching centers and schools competing for the same batch of NEET, JEE, and ADRE aspirants, they no longer are.',
    downloadLabel: '🎓 Visit Success Point Gogamukh',
    downloadUrl: 'https://www.successpointgogamukh.com/',
    content: [
      'A few weeks ago I built a website for a coaching center called Success Point, tucked in Gogamukh, a small town in Dhemaji district, Assam. Beside a school, on a road called Mothauri, about 150 meters from the local traffic point. Before I wrote a single line of code, the owner described the place to me the way most small institutes describe themselves: a good building, good teachers, a signboard out front, and a lot of word of mouth. That was the entire marketing plan. It had worked for years. And it was quietly running out of road.',

      { type: 'h2', text: 'The search happens before the visit' },

      'Here is the thing nobody tells you about running a coaching center in a small town today: the decision is already half made before anyone walks through your door. A parent in Dhemaji choosing where to send their Class XI child does not start by strolling down Mothauri Road to see which buildings look serious. They start on their phone, usually at night, usually comparing two or three names someone mentioned in a WhatsApp group. If your institute has no website, no listing, nothing that answers "what does it actually cost" before a phone call, you are simply not in that comparison. The signboard only works on people who already walked past it, and fewer people are walking, they are scrolling.',

      'This hit me harder once I actually built the fee and program pages for Success Point. NEET, JEE, ADRE, Assam Police, TET: every one of these aspirants is, by nature, a comparison shopper. They are tracking cutoffs and past results for exams that are still months away. Somebody that thorough is not going to enroll anywhere on a hunch. A coaching center that cannot be found, and cannot be compared, the same clinical way, loses that student before the phone even rings.',

      { type: 'h2', text: 'What "digital identity" actually turned out to mean' },

      'Going in, I assumed this project would mostly be about looking legitimate, a nice logo, a clean font, maybe a stock photo of students studying. It turned out to be almost entirely about answering questions. Which classes. Which exams. What it costs, broken down honestly instead of "contact for fees." Who is actually teaching. And a way to reach a real human fast, a phone number and a WhatsApp link, not a contact form that sits unread in an inbox for three days. The other half of it was just consistency: the same name, the same number, the same address, showing up identically everywhere someone might stumble across it. Trust, at this scale, is built out of boring repetition, not clever branding.',

      'Fee transparency ended up being the single most argued-over section of the whole build, and I think that says something. Coaching decisions involve real money for a family that does not have much slack in the budget. Every time a fee page hides behind "call to inquire," you are handing a nervous parent a reason to just call your competitor instead, the one who already put the number on the page.',

      { type: 'h2', text: 'What changed once it actually went live' },

      'None of this replaces a good teacher. A brilliant website in front of a weak faculty just gets people to show up once. But I watched something specific happen with Success Point: a strong coaching center that had zero digital footprint was invisible to precisely the students who needed it most. Not the neighbors who already knew about it. The ones a few towns over. The ones comparing three institutes side by side on a Sunday night. The ones who had just moved to Dhemaji and were searching cold, with no word of mouth to go on at all. Digitalising a business like this is not a replacement for its reputation, it is the thing that finally lets that reputation travel further than 150 meters from a traffic point.',

      'Every class, every exam program, every faculty name I put on that site is one more door for someone to find their way in through, someone who was never, ever going to walk past that signboard on their own.',
    ],
  },
  {
    slug: 'building-success-point-gogamukh',
    title: 'Success Point Gogamukh — The Full Technical Build',
    date: '2026-07-21',
    tag: 'tech',
    excerpt: 'Next.js App Router and Server Actions, a Prisma/PostgreSQL schema built around live classes, phone+OTP auth with per-attempt SMS cost tracking, Web Push, an offline-ready PWA, and an immutable audit log — the full engineering breakdown of a real client platform.',
    projectLabel: 'Learn more about Success Point Gogamukh →',
    projectUrl: '/success-point-gogamukh',
    downloadLabel: '🎓 Visit Success Point Gogamukh',
    downloadUrl: 'https://www.successpointgogamukh.com/',
    content: [
      'Success Point Gogamukh started as "build a website for a coaching center" and ended up as a small SaaS: a public marketing site plus four role-based dashboards (student, faculty, admin, master) running live-streamed classes, enrollment workflows, push notifications, and even the developer\'s own billing against the client. This post is the engineering deep-dive — architecture, schema, auth, the live-class join-token design, push, the PWA/service-worker caching strategy, and the audit trail. If you just want the plain-language tour of what the site does, the project page has that version.',

      { type: 'h2', text: '1. Architecture Overview' },

      'The whole app is one Next.js project using the App Router. There is no separate REST/GraphQL API for the dashboards — mutations go through Server Actions, which run on the server, next to Prisma, and get called directly from client components like normal async functions. The only real API routes that exist are for things that need a stable HTTP contract: webhooks, the service worker\'s push endpoint registration, and a couple of health/cron-style routes.',

      { type: 'diagram', title: 'Request flow — Server Actions instead of a separate API layer', text:
`flowchart LR
    UI["Client component<br/>(form / button)"] -->|"await serverAction(formData)"| SA["Server Action<br/>runs on the server"]
    SA --> AUTH["Re-check session + role<br/>from the signed cookie"]
    AUTH --> PZ["Prisma Client"]
    PZ --> PG[("PostgreSQL")]
    SA --> AL["Write an AuditLog row<br/>for anything that mutates state"]
    SA -->|"revalidatePath / return"| UI` },

      'The public site (landing, course catalog, course detail) is server-rendered for SEO and speed. Every authenticated route lives under /dashboard, /login, /signup, and /faculty/join, and is explicitly excluded from search indexing and from the service worker\'s cache — more on both below.',

      { type: 'h2', text: '2. Tech Stack' },

      { type: 'table',
        head: ['Layer', 'Choice', 'Why'],
        rows: [
          ['Framework', 'Next.js 16 (App Router)', 'Server Actions remove the need for a hand-rolled API layer; file-based routing matches the site/dashboard split cleanly'],
          ['UI', 'React 19 + TypeScript + Tailwind CSS v4', 'Type safety across server actions and components; utility CSS keeps the design system consistent without a component library'],
          ['ORM / DB', 'Prisma 7 (driver adapters) + PostgreSQL', 'Typed schema, migrations as first-class citizens, and the new driver-adapter mode (@prisma/adapter-pg) for a lighter runtime'],
          ['Auth', 'Twilio Verify (SMS OTP) + jose (JWT)', 'No password storage/reset flow to build or secure; jose signs short-lived session and join tokens'],
          ['Push', 'web-push (VAPID) + browser Push API', 'Standards-based — no third-party push SaaS or its recurring bill'],
          ['Validation', 'zod', 'Schema validation at every Server Action boundary, not just on the client form'],
          ['Passwords/tokens', 'bcryptjs', 'Hashing anywhere a secret does need to be stored at rest'],
          ['Hosting', 'Railway (railway.toml)', 'Managed Postgres + app deploy from one provider, sized right for a single coaching center, not enterprise infra'],
        ] },

      { type: 'h2', text: '3. Data Model' },

      'The curriculum side of the schema is a five-level tree: Course → Subject → Chapter → Topic → LiveSession, with a JoinLog under every session. Chapters and Topics are reusable — staff pick an existing one or create it on the fly when going live — while a LiveSession is a real, timestamped occurrence, not a reused slot. Cascading deletes keep this consistent: delete a Chapter and its Topics, LiveSessions, and JoinLogs go with it.',

      { type: 'diagram', title: 'Curriculum tree and the models hanging off it', text:
`flowchart TD
    U["User — role: student/faculty/admin/master"]
    C["Course<br/>price, actualPrice, admissionFee"]
    S["Subject<br/>fee, monthlyFee"]
    CH["Chapter"]
    T["Topic"]
    LS["LiveSession<br/>youtubeVideoId, status: live/ended"]
    JL["JoinLog<br/>studentName, joinedAt"]
    C -->|"has many"| S
    S -->|"has many"| CH
    CH -->|"has many"| T
    T -->|"has many, over time"| LS
    LS -->|"has many"| JL
    LS -.->|"crossLinkedSessions — cast to extra courses too"| C
    U -->|"Enrollment / SubjectEnrollment"| C
    U -->|"SubjectFaculty"| S
    U -->|"EnrollmentRequest — receipt number, pending/verified/rejected"| C` },

      { type: 'table',
        head: ['Model', 'Notable fields', 'Purpose'],
        rows: [
          ['AuthEvent', 'type, purpose, ip/city/region/country, costInr', 'Every OTP send/verify/fail — the login-activity trail'],
          ['AuditLog', 'actorId (nullable), actorName, actorRole, action, entityType, summary, metadata', 'Immutable trail of every admin/faculty mutation, write-once, no update/delete path exposed anywhere'],
          ['PushSubscription', 'endpoint (unique), p256dh, auth', 'One row per browser/device Web Push registration'],
          ['ServiceItem / ClientPayment / BillingSettings', 'category, status, amountInr / paidAt / dueDate', 'The master-only developer-billing system — what\'s owed vs. what\'s been paid'],
          ['EnrollmentRequest', 'type, receiptNumber, status', 'Student-submitted enrollment pending admin verification'],
        ] },

      { type: 'note', text: 'AuthEvent and AuditLog both keep a denormalized actor name/phone alongside a nullable foreign key (onDelete: SetNull). Deleting a user account later never breaks — or silently rewrites — the historical trail.' },

      { type: 'h2', text: '4. Authentication' },

      'There\'s no password anywhere in the student/admin flow. Login is phone number + a 6-digit SMS OTP sent through Twilio Verify; Twilio owns OTP generation and expiry, the app just asks it to send and verify. On success, a signed JWT session cookie is issued via jose. Faculty go through a separate invite/join link — a one-time URL that lets them verify their phone and set up the account, rather than an admin typing in a password for them.',

      { type: 'diagram', title: 'Phone + OTP login, with every attempt logged', text:
`sequenceDiagram
    participant U as User
    participant App as Server Action
    participant Tw as Twilio Verify
    participant DB as Postgres
    U->>App: submit phone number
    App->>Tw: start verification
    Tw-->>U: SMS with 6-digit code
    App->>DB: AuthEvent(type: otp_sent, costInr, ip, geo)
    U->>App: submit code
    App->>Tw: check verification
    alt code correct
        Tw-->>App: approved
        App->>DB: AuthEvent(type: otp_verified)
        App->>App: sign JWT session cookie (jose)
        App-->>U: redirect to role's dashboard
    else code wrong/expired
        Tw-->>App: denied
        App->>DB: AuthEvent(type: otp_failed)
        App-->>U: show error, allow retry
    end` },

      'Every one of those AuthEvent rows carries IP address, user agent, and geolocation resolved to city/region/country, plus — for otp_sent — the SMS cost in INR, converted from Twilio\'s USD pricing at the live exchange rate at send time. Admins get a Login Activity page built entirely from this table: who tried to log in, from where, and what it cost.',

      { type: 'h2', text: '5. Roles & Permissions' },

      { type: 'table',
        head: ['Role', 'Dashboard', 'Can do'],
        rows: [
          ['student', '/dashboard', 'View enrolled courses, request new enrollments, join/watch live classes and recordings, manage push subscription'],
          ['faculty', '/dashboard', 'Everything student-relevant to teaching: go live, manage curriculum (chapters/topics), see enrollment for assigned subjects'],
          ['admin', '/dashboard', 'Full course/student/faculty/enrollment management, announcements, audit log, login activity, and a read-only view of the development charge'],
          ['master', '/dashboard', 'Everything admin can do, plus Services & Pricing and Payment Tracking — the developer-billing tools'],
        ] },

      'Role is a plain enum column on User, checked at the top of every Server Action and every dashboard route — there\'s no separate permissions table to keep in sync, which fits a four-role app but would be the first thing to refactor if the role list ever grew past a handful.',

      { type: 'h2', text: '6. Live Classes — the Join-Token Design' },

      'Going live creates a LiveSession row under a Topic with a YouTube video ID. The interesting design decision is how students actually get that video ID. It isn\'t embedded in any page HTML or exposed on a public API — it\'s handed out through a short-lived, signed join token, resolved fresh on every watch:',

      { type: 'diagram', title: 'Go Live → join → resolve → watermark → auto-cutoff', text:
`sequenceDiagram
    participant F as Faculty/Admin
    participant App as Server
    participant St as Student
    F->>App: go live (Topic, YouTube ID, optional cross-linked courses)
    App->>App: create LiveSession(status: live)
    App->>St: push notification — "class is live"
    St->>App: request to watch
    App->>App: verify session (JWT, jose), re-check enrollment
    App->>App: sign 10-minute join token (studentId, sessionId)
    App-->>St: join token
    St->>App: resolveJoinToken(token)
    App->>App: verify token + re-check LiveSession.status === live
    App->>App: write JoinLog(studentName, joinedAt)
    App-->>St: youtubeVideoId, only now
    St->>St: play video with identity watermark overlay
    loop every 4s while watching
        St->>App: poll session status
        App-->>St: live / ended
    end
    F->>App: end live class
    App->>App: LiveSession.status = ended
    Note over St: next poll returns "ended" — playback stops automatically` },

      { type: 'note', text: 'The code comment on this token scheme is unusually candid about its own limits, and worth quoting: "This is NOT DRM. Once resolveJoinToken hands the YouTube video ID back to an authenticated, enrolled student, that ID is in their browser." What it actually buys: no public endpoint ever leaks a video ID to someone unauthenticated or unenrolled; no sequential/guessable IDs to enumerate other batches\' sessions; every real join is logged with who/when; and a 10-minute token window means a stale or forwarded link stops working fast, with no extra invalidation bookkeeping needed. If leak prevention ever needs to get stricter, the honest fix is per-student rooms via a provider like 100ms or Agora — not tightening this scheme further.' },

      'The watermark itself overlays the viewing student\'s identity on the video during playback — a lightweight deterrent, not a technical guarantee, which is consistent with the join-token philosophy above: layers that raise the cost of leaking without pretending to make it impossible.',

      { type: 'h2', text: '7. Push Notifications' },

      'Students opt in through the browser\'s Push API, which registers a subscription (an endpoint URL plus two keys, p256dh and auth) that gets stored as a PushSubscription row. Sending a push means the server signs a payload with the app\'s VAPID keys via the web-push package and posts it straight to whichever push service the browser uses (Chrome, Firefox, etc.) — no third-party push platform in between.',

      { type: 'diagram', title: 'Subscribe once, then two triggers push a notification', text:
`flowchart TD
    A["Student taps Allow Notifications"] --> B["Browser Push API generates subscription"]
    B --> C["Store PushSubscription — endpoint, p256dh, auth"]
    D["Trigger 1 — staff goes live"] --> E["Push to every student enrolled in that class's course(s)"]
    F["Trigger 2 — staff posts an Announcement"] --> G["Push to all students, or to selected courses' students"]
    E --> H["web-push signs payload with VAPID keys"]
    G --> H
    H --> I["Push service delivers to the browser"]
    I --> J["Service worker 'push' event → showNotification()"]
    J --> K["User taps — 'notificationclick' opens the announcement's link, or the dashboard"]
    H -->|"endpoint responds 410/404 — subscription gone"| L["Delete that PushSubscription row automatically"]` },

      'That last edge, pruning dead subscriptions on a 410/404 response, matters more than it sounds: without it, a table of push subscriptions only grows, and every send job wastes time and quota retrying devices that uninstalled the app or cleared their browser months ago.',

      { type: 'h2', text: '8. PWA & Service Worker Caching' },

      'The service worker is hand-written — no Workbox, no next-pwa dependency — and deliberately narrow in scope: only the public marketing site and static assets are ever cached. Every authenticated route is excluded outright, which matters on a shared or family device: nobody\'s dashboard should ever be servable from another user\'s browser cache.',

      { type: 'diagram', title: 'Three caching strategies, one per URL class', text:
`flowchart TD
    R["Incoming GET request"] --> Q1{"Starts with<br/>/dashboard, /login, /signup,<br/>/faculty/join, or /api ?"}
    Q1 -->|"yes"| NET["Network-only — never intercepted, never cached"]
    Q1 -->|"no"| Q2{"Static asset?<br/>/_next/static, /icons/, /images/"}
    Q2 -->|"yes"| CF["Cache-first — serve cached copy instantly,<br/>fall back to network + cache the response"]
    Q2 -->|"no"| NF["Network-first — always try fresh,<br/>fall back to cache, then to '/' if offline"]` },

      'On top of the runtime strategy, four URLs are pre-cached at install time (/, the web manifest, and the two icon sizes) so the app shell is available offline immediately after the first visit, not just after a page has been separately fetched once. Combined with the manifest and maskable icons, this is what makes "Add to Home Screen" actually feel like installing an app rather than bookmarking a page.',

      { type: 'h2', text: '9. The Audit Log' },

      'Every admin/faculty mutation — a price change, a faculty assignment, an enrollment approval, an announcement send — writes an AuditLog row inside the same Server Action that performs the change. The table has no update or delete path exposed anywhere in the codebase; it is write-once and read-only by construction, not just by convention. actorId is nullable with onDelete: SetNull, but actorName and actorRole are stored as plain strings at write time, so the log stays fully readable even after the account that made a change is gone.',

      { type: 'h2', text: '10. Developer Billing, Built Into the Master Dashboard' },

      'One feature that\'s unusual for a coaching-center site: the developer\'s own invoice lives inside the app. ServiceItem rows (service vs. development, each active/deferred/on-demand) make up an itemized cost breakdown; ClientPayment rows record what\'s actually been paid; and a single BillingSettings row holds a due date. Admins see a read-only countdown/overdue banner site-wide once a due date is set — the master role is the only one that can edit the underlying numbers. It reuses the exact same currency-conversion logic as the SMS-cost tracking in AuthEvent (a live USD→INR rate), so both "what this client owes for OTPs this month" and "what this client owes for the project" run through one shared conversion path instead of two.',

      { type: 'h2', text: '11. SEO' },

      'The public site carries per-page metadata, Open Graph/Twitter cards, and JSON-LD structured data (Course and Breadcrumb schemas) on every course page, plus a generated sitemap.xml and robots.txt. The flip side of that effort is making sure none of it leaks into search results for pages that shouldn\'t be indexed: every route under /dashboard, /login, /signup, and /faculty/join carries a blanket noindex, the same route prefixes excluded from the service worker\'s cache.',

      { type: 'h2', text: '12. Deployment' },

      'The app deploys to Railway from a railway.toml, alongside a managed PostgreSQL instance. Prisma migrations run as part of the deploy step rather than by hand against production. It\'s intentionally boring infrastructure for what it is — one coaching center, not a multi-tenant platform — and boring is the right call: nothing here needs a Kubernetes cluster, and every extra moving part is one more thing to debug at 11pm before an admissions season starts.',

      { type: 'h2', text: 'Closing Thoughts' },

      'None of the individual pieces here are exotic — OTP auth, Server Actions, a service worker, Web Push. What made this project interesting was fitting them together for a genuinely operational system: a coaching center actually runs live classes through this, actually gets paid through the fee pages it advertises, and actually tracks its own SMS spend against a monthly figure that used to be invisible. The join-token design and the audit log are the two pieces I\'d point to as the most "engineering," but the boring parts — cascading deletes that don\'t leave orphaned rows, a service worker that refuses to cache a dashboard, a payments table nobody can quietly edit after the fact — are what actually make it trustworthy enough for a real client to run their business on.',

      'If you want the plain-language tour of what the platform does for the coaching center and its students — no schemas, no JWTs — the project page has that version.',
    ],
  },
];
