import landingShot from '../../images/spg/landing.webp';
import courseDetailShot from '../../images/spg/course-detail.webp';
import searchShot from '../../images/spg/search.webp';
import loginShot from '../../images/spg/login.webp';
import facultyJoinShot from '../../images/spg/faculty-join.webp';
import studentDashboardShot from '../../images/spg/student-dashboard.webp';
import studentRecordingsShot from '../../images/spg/student-recordings.webp';
import facultyDashboardShot from '../../images/spg/faculty-dashboard.webp';
import facultyStudentsShot from '../../images/spg/faculty-students.webp';
import goLiveShot from '../../images/spg/go-live.webp';
import adminAnnouncementsShot from '../../images/spg/admin-announcements.webp';
import adminDashboardShot from '../../images/spg/admin-dashboard.webp';
import adminCoursesShot from '../../images/spg/admin-courses.webp';
import adminStudentsShot from '../../images/spg/admin-students.webp';
import adminFacultyShot from '../../images/spg/admin-faculty.webp';
import adminEnrollmentsShot from '../../images/spg/admin-enrollments.webp';
import adminAuditLogShot from '../../images/spg/admin-audit-log.webp';
import adminLoginActivityShot from '../../images/spg/admin-login-activity.webp';
import adminDevChargeShot from '../../images/spg/admin-dev-charge.webp';
import masterOverviewShot from '../../images/spg/master-overview.webp';
import masterServicesShot from '../../images/spg/master-services.webp';
import masterPaymentsShot from '../../images/spg/master-payments.webp';
import askQuestionShot from '../../images/spg/ask-question.webp';

export const POSTS = [
  {
    slug: 'building-wormhole-p2p-messaging',
    title: 'Wormhole: Engineering a Serverless, End-to-End Encrypted Messenger',
    date: '2026-07-05',
    tag: 'tech',
    excerpt: 'A private tunnel between exactly two phones: WebRTC, NaCl encryption, no servers in the middle. Every diagram, flowchart, and hard-won lesson from building it.',
    projectLabel: 'Learn more about Wormhole →',
    projectUrl: '/wormhole',
    downloadLabel: '🤖 Download APK for Android →',
    downloadUrl: 'https://drive.google.com/file/d/1B8697BYuBhqrzr1ymNnPD0rNbEFtFb_F/view?usp=drive_link',
    content: [
      'Wormhole is a messaging app for exactly two people. No accounts, no phone numbers, no cloud. Two phones open a direct WebRTC tunnel to each other, and every message, image, and call travels through it end-to-end encrypted. The only server involved is a tiny "introducer" that helps the phones find each other. After that, it goes idle and sees nothing. This post is the full engineering deep-dive: architecture, encryption, MITM defense, offline handling, media calls, the wire protocol, deployment, and the platform quirks that cost me actual days. If you just want to know what the app does in plain words, the project page has the friendly version.',

      { type: 'h2', text: '1. Architecture Overview' },

      'Everything starts with a handshake. Both phones connect to a small signaling server and join the same room. The server relays the WebRTC negotiation messages (SDP offers/answers and ICE candidates) between them, and that is the entirety of its job. Once the DataChannel opens, the phones talk directly.',

      { type: 'diagram', title: 'System architecture: the handshake, then the tunnel', text:
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
    Note over A,B: WebRTC DataChannel opens: direct, DTLS encrypted transport
    A->>B: nacl.box(message, nonce, peerPubKey, mySecKey)
    B->>A: nacl.box(message, nonce, peerPubKey, mySecKey)
    Note over S: Signaling server now idle: sees nothing` },

      'Once connected, a single bundled ICE transport carries everything: text, images, delivery receipts, call signaling, and the call media itself. The server never sees message content: only encrypted blobs travel over the DataChannel.',

      { type: 'diagram', title: 'What travels over the peer link', text:
`flowchart TB
    A["Phone A"] --- ICE
    B["Phone B"] --- ICE
    subgraph ICE["Single bundled ICE transport (bundlePolicy: max-bundle)"]
        direction TB
        DC["DataChannel: DTLS encrypted"]
        DC --> T["Text messages: nacl.box E2EE"]
        DC --> IMG["Images, chunked: nacl.box E2EE"]
        DC --> ACK["Delivery ACKs: DTLS only"]
        DC --> CS["Call signals + SDP: DTLS only"]
        AT["Audio track, calls: DTLS-SRTP"]
        VT["Video track, calls: DTLS-SRTP"]
    end
    ICE -.->|"NAT blocks direct path"| TURN["TURN relay: forwards packets, holds no keys, cannot read anything"]` },

      'The server process hosts two things: the socket.io signaling endpoint (handshake only) and a TURN relay for when the two peers cannot reach each other directly, for example two Android emulators, or phones behind symmetric carrier NATs.',

      { type: 'h2', text: '2. Tech Stack' },

      'React Native on both platforms, with four layers underneath: transport (WebRTC), crypto (NaCl), storage (SQLite + AsyncStorage), and UI. Each package earns its place:',

      { type: 'table',
        head: ['Layer', 'Package', 'Purpose'],
        rows: [
          ['Transport', 'react-native-webrtc', 'WebRTC DataChannel for P2P'],
          ['Signaling', 'socket.io-client', 'Handshake only, idle after connect'],
          ['Encryption', 'tweetnacl', 'NaCl box: E2E encrypt/decrypt'],
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

      { type: 'h3', text: 'Polyfills: required on Hermes' },

      'Hermes, React Native’s JS engine, ships without several globals that the crypto and QR libraries assume exist. They must be installed before any other import or the app crashes at startup with "no PRNG", "Property ’Buffer’ doesn’t exist", or "Property ’TextEncoder’ doesn’t exist":',

      { type: 'h2', text: '3. Connection Flow' },

      'The handshake has five distinct phases: room join, SDP exchange, ICE candidate exchange, DataChannel open, and finally encrypted messaging. Here is the full sequence:',

      { type: 'diagram', title: 'Connection flow: from room join to encrypted chat', text:
`sequenceDiagram
    participant A as Phone A (Initiator)
    participant S as Signaling Server
    participant B as Phone B (Receiver)
    Note over A,B: Step 1: both join the same room
    A->>S: emit('join', roomId)
    B->>S: emit('join', roomId)
    S-->>A: 'peer-joined'
    Note over A,B: Step 2: WebRTC handshake (SDP)
    A->>A: createOffer()
    A->>S: emit('offer', sdp)
    S->>B: 'offer'
    B->>B: setRemoteDescription, createAnswer()
    B->>S: emit('answer', sdp)
    S->>A: 'answer'
    A->>A: setRemoteDescription
    Note over A,B: Step 3: ICE candidates (NAT traversal)
    A->>S: candidates
    B->>S: candidates
    S->>A: candidates
    S->>B: candidates
    Note over A,B: Step 4: direct P2P established, WebRTC DataChannel OPEN, signaling server idle
    Note over A,B: Step 5: encrypted messaging begins
    A->>B: nacl.box(message): encrypted
    B->>A: nacl.box(reply): encrypted` },

      { type: 'h2', text: '4. Encryption Design' },

      'Transport encryption (DTLS) is not enough: the signaling server could theoretically play man-in-the-middle during the handshake. So every message gets its own end-to-end layer using NaCl’s box construction on top of the already-encrypted channel:',

      { type: 'diagram', title: 'Message encryption pipeline', text:
`flowchart LR
    subgraph EncA["PHONE A: encrypt"]
        direction TB
        P1["plaintext message"] --> BOX["nacl.box()"]
        N1["random 24-byte nonce"] --> BOX
        K1["my secret key + peer public key"] --> BOX
        BOX --> C1["ciphertext + nonce"]
    end
    subgraph DecB["PHONE B: decrypt"]
        direction TB
        C2["ciphertext + nonce"] --> OPEN["nacl.box.open()"]
        K2["my secret key + peer public key"] --> OPEN
        OPEN --> OK["plaintext message ✓"]
        OPEN -.->|"decryption fails"| MITM["throw: tampered or wrong keys → MITM"]
    end
    C1 -->|"WebRTC DataChannel: DTLS pipe"| C2` },

      { type: 'diagram', title: 'How nacl.box works', text:
`flowchart TD
    A["nacl.box(message, nonce, theirPublicKey, mySecretKey)"] --> B["Curve25519 Diffie-Hellman key exchange"]
    B --> C["Derive shared secret from both keys"]
    C --> D["Encrypt with XSalsa20 stream cipher"]
    D --> E["Authenticate with Poly1305 MAC"]
    E --> F["Authenticated + encrypted ciphertext"]
    F --> G["Only the peer with the matching keypair can open it"]
    F --> H["Any tampering is detected: MAC verification fails"]
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
    I --> M1["🔴 MITM possible: attacker reads all messages"]
    V --> Q["QR scan in person: SHA-256 fingerprint of public key shown as QR"]
    V --> S["Safety number via call: both derive code from BOTH public keys, read aloud"]
    Q --> QM{"Fingerprints match?"}
    S --> SM{"Codes match?"}
    QM -->|yes| QT["🟢 Trusted connection"]
    QM -->|no| QD["🔴 MITM detected: abort"]
    SM -->|yes| ST["🟢 Trusted connection"]
    SM -->|no| SD["🔴 MITM detected: abort"]` },

      { type: 'diagram', title: 'Defense in depth: three layers', text:
`flowchart TD
    L1["Layer 1: DTLS, WebRTC built-in<br/>Protects against: passive network eavesdroppers<br/>Does NOT protect against: malicious signaling server"]
    L2["Layer 2: nacl.box, tweetnacl<br/>Protects against: signaling server interception<br/>Does NOT protect against: key substitution during handshake"]
    L3["Layer 3: QR / Safety Number Verification ← THE CRITICAL ONE<br/>Protects against: key substitution, MITM at signaling level<br/>How: verify key fingerprint through a trusted out-of-band channel"]
    L1 --> L2 --> L3 --> R["Result: attacker would need to compromise that channel too"]` },

      { type: 'h2', text: '6. Key Verification Flow' },

      'Verification happens once, ideally in person. Each phone shows a QR of its public-key fingerprint; the other phone scans and stores it. From then on every message is boxed to the verified key:',

      { type: 'diagram', title: 'First-time key exchange: QR ceremony', text:
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
    AB-->>UB: show QR: SHA-256(pubKeyB)
    UB->>UA: User A scans B's QR
    AA->>AA: store peerPublicKey, verify ✓
    Note over AA,AB: Both keys verified, MITM impossible, encrypted messaging begins` },

      { type: 'h2', text: '7. Offline Message Handling' },

      'True P2P has a hard constraint: there is no server to hold messages, so both peers must be online for delivery. Instead of pretending otherwise, Wormhole makes the offline path explicit, an encrypted outbox that flushes automatically on reconnect:',

      { type: 'diagram', title: 'Send path with offline queue and reconnect backoff', text:
`flowchart TD
    A["User types message"] --> B["Encrypt with nacl.box"]
    B --> C["Save to SQLite: status: pending"]
    C --> D{"DataChannel open?"}
    D -->|yes| E["Send over DataChannel"]
    E --> F["status: sent ✓"]
    D -->|"no: peer offline"| G["Add to pendingQueue, AsyncStorage"]
    G --> H["Show 🕐 in UI, wait for reconnect"]
    H --> I["NetInfo detects online"]
    I --> J["Attempt WebRTC reconnect"]
    J --> K{"Reconnected?"}
    K -->|no| L["Exponential backoff: retry in 5s / 10s / 30s…"]
    L --> J
    K -->|yes| M["Flush pendingQueue in order"]
    M --> N["All sent → status: sent → ✓"]` },

      { type: 'diagram', title: 'Message status lifecycle', text:
`flowchart LR
    A["typing"] --> B["pending 🕐<br/>encrypted, saved locally, DataChannel closed"]
    B --> C["sent ✓<br/>delivered to peer's DataChannel"]
    C --> D["delivered ✓✓<br/>peer's app confirmed receipt, ACK sent back"]` },

      { type: 'h2', text: '8. Sending Images' },

      'Images travel over the same encrypted DataChannel as text, boxed with the same NaCl layer, then split into transport chunks because SCTP caps the size of an individual DataChannel message:',

      { type: 'diagram', title: 'Image pipeline: pick, compress, encrypt, chunk, reassemble', text:
`flowchart TD
    A["📷 Pick image: gallery or camera"] --> B["Compress: max 1280px, JPEG q0.7"]
    B --> C["Base64 encode → plaintext JSON {mime, data}"]
    C --> D["nacl.box encrypt: same E2EE layer as text"]
    D --> E["Wire frame {nonce, ciphertext, id, ts, k:'i'}"]
    E --> F{"Size ≤ 15 KB?"}
    F -->|yes| G["Send as one frame"]
    F -->|"no, > 15 KB"| H["Split into chunk frames {type:'chunk', cid, seq, total, part}<br/>sent sequentially with bufferedAmount backpressure"]
    G --> I["DataChannel: DTLS transport / TURN relay, ciphertext only"]
    H --> I
    I --> J["Receiver reassembles chunks by cid"]
    J --> K["nacl.box.open decrypt → save to SQLite, kind='image'"]
    K --> L["Render image bubble + send ACK → ✓✓"]` },

      { type: 'diagram', title: 'Chunking on the wire', text:
`flowchart TD
    A["One encrypted wire frame: e.g. a 400 KB image after base64<br/>{nonce, ciphertext: 'AAAA……ZZZZ', k:'i', id:…}"]
    A -->|"split every 15,000 chars"| B["chunk seq 0/27<br/>{type:'chunk', cid:'m3k2', seq:0, total:27, part:'{nonce…'}"]
    A -->|"split every 15,000 chars"| C["chunk seq 1/27"]
    A -->|"split every 15,000 chars"| D["chunk seq 26/27<br/>{…part:'…i}'}"]
    B --> E["Receiver: buffer[cid][seq] = part"]
    C --> E
    D --> E
    E --> F["When received == total → join → decrypt → done"]` },

      'Two safeguards keep the send loop healthy: it pauses whenever channel.bufferedAmount exceeds 4 MB so the SCTP send buffer never overflows, and it yields to the JS event loop every 8 frames so the UI stays responsive. Security is identical to text: image bytes exist in plaintext only on the two devices; the chunking layer, the DataChannel, and any TURN relay in the path all see ciphertext only.',

      { type: 'h2', text: '9. Voice & Video Calls' },

      'Calls reuse the existing peer connection. The call is negotiated over the already-encrypted DataChannel, and the audio/video tracks ride the same ICE transport thanks to bundlePolicy: max-bundle, no new ICE candidates, and the signaling server plays no part mid-call:',

      { type: 'diagram', title: 'Call setup: negotiated entirely over the DataChannel', text:
`sequenceDiagram
    participant C as Caller
    participant E as Callee
    Note over C,E: All signaling below travels over the already-open DataChannel (E2E link)
    C->>C: tap 📞/🎥: getUserMedia, pc.addTrack per track
    C->>E: {call, invite, video}
    Note over E: Accept/Decline prompt
    E->>E: getUserMedia + addTrack (before accepting: tracks ride along in the answer)
    E->>C: {call, accept}
    C->>C: createOffer + setLocalDescription
    C->>E: {sdp-offer}
    E->>E: setRemote → createAnswer
    E->>C: {sdp-answer}
    C->>C: setRemoteDescription
    Note over C,E: 🔊 Media flows: DTLS-SRTP encrypted, same bundled ICE transport
    C->>E: {call, end}: either side hangs up
    C->>C: stop + release tracks
    E->>E: stop + release tracks` },

      { type: 'diagram', title: 'How call media is secured', text:
`flowchart TD
    L1["Layer 1: DTLS-SRTP, mandatory in WebRTC, cannot be disabled<br/>Every audio/video packet is encrypted and authenticated end-to-end.<br/>Keys come from the DTLS handshake between the two devices, <br/>a TURN relay forwards packets it cannot decrypt."]
    L2["Layer 2: Authenticated call setup<br/>Invite / accept / SDP renegotiation frames travel inside the DataChannel,<br/>established with the peer whose public key you verified (QR / safety number).<br/>An attacker cannot inject or hijack a call without first defeating key verification."]
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
    ROOT --> SRV["server/: deployed separately<br/>index.js: socket.io signaling + node-turn TURN relay"]
    ROOT --> SRC["src/"]
    ROOT --> APPJS["App.js: root + navigation"]
    SRC --> CRYPTO["crypto/<br/>keyManager.js: generate & store keypair<br/>encryptor.js: encrypt / decrypt messages<br/>safetyNumber.js: MITM verification codes"]
    SRC --> WEBRTC["webrtc/<br/>peerConnection.js: RTCPeerConnection + DataChannel<br/>signalingService.js: socket.io signaling client"]
    SRC --> STORAGE["storage/<br/>messageStore.js: SQLite CRUD for messages<br/>pendingQueue.js: offline outbox<br/>db.js: SQLite init & migrations"]
    SRC --> HOOKS["hooks/<br/>usePeer.js: WebRTC lifecycle + send + call signals<br/>useMessages.js: message list state + SQLite<br/>useEncryption.js: keypair + peer key state<br/>useNetworkStatus.js: online/offline detection<br/>usePushKit.js: iOS VoIP wake events"]
    SRC --> SCREENS["screens/<br/>SetupScreen.js: first launch + room ID entry<br/>ChatScreen.js: chat UI + calls + image attach<br/>CallScreen.js: RTCView, mute, hang-up<br/>VerifyScreen.js: QR show + scan + manual paste"]
    SRC --> COMPS["components/<br/>MessageBubble.js, MessageList.js<br/>MessageInput.js, ConnectionStatusBar.js"]` },

      { type: 'h2', text: '12. The Signaling + TURN Server' },

      'One Node process, two jobs: socket.io signaling on port 7788 and a node-turn TURN relay on port 3478. TURN is what lets two peers connect when neither can accept inbound traffic, two Android emulators, or phones behind carrier-grade NAT.',

      { type: 'h2', text: '13. Deployment' },

      { type: 'diagram', title: 'Production topology: one $5 VPS', text:
`flowchart TD
    subgraph VPS["VPS: $5/month (DigitalOcean / Railway)"]
        SIG["Signaling: Node.js + socket.io"]
        TURN["coturn TURN server: :3478 / :5349"]
        CF["Optional: Cloudflare in front of signaling for DDoS protection"]
    end
    A["Phone A"] -->|"handshake only + NAT fallback"| VPS
    VPS -->|"handshake only + NAT fallback"| B["Phone B"]
    A <-.->|"direct P2P after connect"| B` },

      'Locally you don’t need coturn at all: the project embeds a JS TURN server (node-turn) inside server/index.js on port 3478 with dev credentials. You swap the client’s ICE config to a real coturn instance for production.',

      { type: 'table',
        head: ['Day', 'Task', 'Output'],
        rows: [
          ['1', 'Key generation + signaling server', 'Keys persisted, server running'],
          ['2', 'WebRTC + tweetnacl', 'Two phones exchange encrypted messages'],
          ['3', 'SQLite + pending queue', 'Messages survive restart, offline resilient'],
          ['4', 'QR verification + chat UI', 'Shippable prototype'],
        ] },

      { type: 'h2', text: '14. Privacy Tradeoffs: Honest Edition' },

      'No system is "fully private", and pretending otherwise is how you lose users’ trust. Here is exactly what Wormhole protects and what it does not:',

      { type: 'diagram', title: 'What’s private, what’s not, and how to close the gaps', text:
`flowchart TD
    subgraph Private["WHAT'S PRIVATE"]
        P1["✅ message content: nacl.box E2EE"]
        P2["✅ message history: local only"]
        P3["✅ keys: never leave device"]
        P4["✅ identity: no phone number, no email, no account"]
    end
    subgraph NotPrivate["WHAT'S NOT"]
        N1["⚠️ your IP: visible to signaling server during handshake"]
        N2["⚠️ peer's IP: visible to STUN"]
        N3["⚠️ traffic timing: an observer sees that you two are talking"]
        N4["⚠️ TURN relay sees encrypted traffic volume if used"]
    end
    N1 -->|"close the gap"| G1["Use a VPN/Tor, or self-host signaling+TURN"]
    N3 -->|"close the gap"| G2["VPN, or Briar-style onion routing for maximum metadata privacy"]` },

      { type: 'diagram', title: 'Quick reference: what each server knows', text:
`flowchart TD
    subgraph SIG["Signaling Server"]
        S1["Both peers' IP addresses"]
        S2["That two IPs connected at time T"]
        S3["Room ID: not tied to identity"]
        S4["Nothing else"]
    end
    subgraph STUN["STUN Server, Google"]
        ST1["Your public IP"]
        ST2["Nothing else"]
    end
    subgraph TURN["TURN Server, if used"]
        T1["Both IPs"]
        T2["Encrypted traffic: cannot read"]
        T3["Traffic volume and timing"]
    end
    subgraph Nobody["Nobody knows"]
        NB1["Message content: E2EE"]
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

      { type: 'h2', text: '15. iOS: Where It Gets Hard' },

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
    F1 --> F2["2. Server → Apple APNs VoIP push → iPhone wakes silently<br/>payload is {wake:true}, no message content"]
    F2 --> F3["3. App reconnects WebRTC in background"]
    F3 --> F4["4. ✅ Message delivered P2P: still travels only over WebRTC"]` },

      { type: 'h2', text: '16. Cross-Platform Android ↔ iOS' },

      'WebRTC is a standard: it exists precisely so different platforms can talk to each other. Android ↔ iOS works out of the box: the DataChannel, tweetnacl (pure JS: keys are just bytes), socket.io, STUN/TURN/ICE, and the QR fingerprints are all platform-agnostic. The only real asymmetry is background handling:',

      { type: 'table',
        head: ['Sender', 'Receiver state', 'Result', 'Notes'],
        rows: [
          ['Android (fg/bg)', 'iOS foreground', '✅ Instant', ''],
          ['Android (fg/bg)', 'iOS background', '✅ With PushKit', 'Server sends VoIP wake push'],
          ['iOS foreground', 'Android foreground', '✅ Instant', ''],
          ['iOS foreground', 'Android background', '✅', 'Android background service handles it'],
          ['iOS foreground', 'Android offline', '✅ Queued', 'pendingQueue flushes on reconnect'],
          ['iOS background', 'Any', '⚠️ Queued', 'iOS can’t send while suspended, delivered when app next opens'],
        ] },

      { type: 'note', text: 'That last row is an OS limitation, not an app bug. Every major messenger: WhatsApp, Signal, Telegram: has the same constraint and handles it identically: queue the send, deliver when the app is next opened.' },

      { type: 'diagram', title: 'Keys are just bytes: identical on both platforms', text:
`flowchart LR
    A["Android: nacl.box.keyPair() → Uint8Array → base64 string"]
    B["iOS: nacl.box.keyPair() → Uint8Array → base64 string"]
    A -->|"Android scans iOS QR → decodeBase64"| C["Works as peerPublicKey ✅"]
    B -->|"iOS scans Android QR → decodeBase64"| C
    C --> D["nacl.box(msg, nonce, androidPubKey, iosSecretKey): iOS → Android ✅"]
    C --> E["nacl.box(msg, nonce, iosPubKey, androidSecretKey): Android → iOS ✅"]` },

      { type: 'h2', text: '17. Two-Emulator Testing: The Topology That Works' },

      'Developing a two-device app on one PC is its own puzzle. Each Android emulator sits behind its own virtual NAT, both believe they are 10.0.2.15 internally, so they can never reach each other directly. Every ICE candidate pair fails except relay ↔ relay through the local TURN server, which is why TURN is mandatory for local development:',

      { type: 'diagram', title: 'Single-PC development topology', text:
`flowchart TD
    subgraph PC["Your PC"]
        METRO["Metro :8081"]
        SIG["Signaling :7788: socket.io"]
        TURN["TURN relay :3478: node-turn, same server process"]
        subgraph EA["Emulator A: own NAT"]
            RA["relay sock A"]
        end
        subgraph EB["Emulator B: own NAT"]
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

      'Wormhole is deliberately small: no accounts, no phone numbers, no cloud: just two devices talking through a private tunnel. The interesting engineering isn’t any single component; it’s how few components you actually need once you stop assuming a server must sit in the middle. WebRTC handles the tunnel, NaCl handles the secrecy, a QR scan handles the trust, and a $5 VPS handles the introductions. Everything else is honest bookkeeping about the tradeoffs, and the platforms fighting you along the way.',

      'If you want the plain-language version of what this app does, and why someone who has never heard of a DataChannel might care, head over to the Wormhole project page below.',
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

      'None of this replaces a good teacher. A brilliant website in front of a weak faculty just gets people to show up once. But I watched something specific happen with Success Point: a strong coaching center that had zero digital footprint was invisible to precisely the students who needed it most. Not the neighbors who already knew about it. The ones a few towns over. The ones comparing three institutes side by side on a Sunday night. The ones who had just moved to Dhemaji and were searching cold, with no word of mouth to go on at all. Digitalising a business like this is not a replacement for its reputation. It is the thing that finally lets that reputation travel further than 150 meters from a traffic point.',

      'Every class, every exam program, every faculty name I put on that site is one more door for someone to find their way in through, someone who was never, ever going to walk past that signboard on their own.',
    ],
  },
  {
    slug: 'building-success-point-gogamukh',
    title: 'Success Point Gogamukh: The Full Technical Build',
    date: '2026-07-21',
    tag: 'tech',
    excerpt: 'Next.js App Router and Server Actions, a Prisma/PostgreSQL schema built around live classes, phone+OTP verified onboarding backed by bcrypt password logins with per-attempt SMS cost tracking, Web Push, an offline-ready PWA, and an immutable audit log: the full engineering breakdown of a real client platform.',
    projectLabel: 'See the full feature tour →',
    projectUrl: '/blog/coaching-center-management-system',
    downloadLabel: '🎓 Visit Success Point Gogamukh',
    downloadUrl: 'https://www.successpointgogamukh.com/',
    content: [
      'Success Point Gogamukh started as "build a website for a coaching center" and ended up as a small SaaS: a public marketing site plus four role-based dashboards (student, faculty, admin, master) running live-streamed classes, enrollment workflows, push notifications, and even the developer\'s own billing against the client. This post is the engineering deep-dive: architecture, schema, auth, the live-class join-token design, push, the PWA/service-worker caching strategy, and the audit trail. If you just want the plain-language tour of what the site does, with screenshots of every screen, that post is linked below.',

      { type: 'h2', text: '1. Architecture Overview' },

      'The whole app is one Next.js project using the App Router. There is no separate REST/GraphQL API for the dashboards, mutations go through Server Actions, which run on the server, next to Prisma, and get called directly from client components like normal async functions. The only real API routes that exist are for things that need a stable HTTP contract: webhooks, the service worker\'s push endpoint registration, and a couple of health/cron-style routes.',

      { type: 'diagram', title: 'Request flow: Server Actions instead of a separate API layer', text:
`flowchart LR
    UI["Client component<br/>(form / button)"] -->|"await serverAction(formData)"| SA["Server Action<br/>runs on the server"]
    SA --> AUTH["Re-check session + role<br/>from the signed cookie"]
    AUTH --> PZ["Prisma Client"]
    PZ --> PG[("PostgreSQL")]
    SA --> AL["Write an AuditLog row<br/>for anything that mutates state"]
    SA -->|"revalidatePath / return"| UI` },

      'The public site (landing, course catalog, course detail) is server-rendered for SEO and speed. Every authenticated route lives under /dashboard, /login, /signup, and /faculty/join, and is explicitly excluded from search indexing and from the service worker\'s cache, more on both below.',

      { type: 'h2', text: '2. Tech Stack' },

      { type: 'table',
        head: ['Layer', 'Choice', 'Why'],
        rows: [
          ['Framework', 'Next.js 16 (App Router)', 'Server Actions remove the need for a hand-rolled API layer; file-based routing matches the site/dashboard split cleanly'],
          ['UI', 'React 19 + TypeScript + Tailwind CSS v4', 'Type safety across server actions and components; utility CSS keeps the design system consistent without a component library'],
          ['ORM / DB', 'Prisma 7 (driver adapters) + PostgreSQL', 'Typed schema, migrations as first-class citizens, and the new driver-adapter mode (@prisma/adapter-pg) for a lighter runtime'],
          ['Auth', 'Twilio Verify (SMS OTP) + jose (JWT)', 'OTP verifies the phone once, at signup, faculty join, or forgot-password; jose signs the session cookie and short-lived join tokens'],
          ['Push', 'web-push (VAPID) + browser Push API', 'Standards-based, no third-party push SaaS or its recurring bill'],
          ['Validation', 'zod', 'Schema validation at every Server Action boundary, not just on the client form'],
          ['Passwords/tokens', 'bcryptjs', 'Bcrypt-hashed passwords (10 salt rounds) for every return login, plus hashing anywhere else a secret needs to be stored at rest'],
          ['Hosting', 'Railway (railway.toml)', 'Managed Postgres + app deploy from one provider, sized right for a single coaching center, not enterprise infra'],
        ] },

      { type: 'h2', text: '3. Data Model' },

      'The curriculum side of the schema is a five-level tree: Course → Subject → Chapter → Topic → LiveSession, with a JoinLog under every session. Chapters and Topics are reusable: staff pick an existing one or create it on the fly when going live, while a LiveSession is a real, timestamped occurrence, not a reused slot. Cascading deletes keep this consistent: delete a Chapter and its Topics, LiveSessions, and JoinLogs go with it.',

      { type: 'diagram', title: 'Curriculum tree and the models hanging off it', text:
`flowchart TD
    U["User: role: student/faculty/admin/master"]
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
    LS -.->|"crossLinkedSessions: cast to extra courses too"| C
    U -->|"Enrollment / SubjectEnrollment"| C
    U -->|"SubjectFaculty"| S
    U -->|"EnrollmentRequest: receipt number, pending/verified/rejected"| C` },

      { type: 'table',
        head: ['Model', 'Notable fields', 'Purpose'],
        rows: [
          ['AuthEvent', 'type, purpose, ip/city/region/country, costInr', 'Every OTP send/verify/fail and every password verify/fail: the login-activity trail'],
          ['AuditLog', 'actorId (nullable), actorName, actorRole, action, entityType, summary, metadata', 'Immutable trail of every admin/faculty mutation, write-once, no update/delete path exposed anywhere'],
          ['PushSubscription', 'endpoint (unique), p256dh, auth', 'One row per browser/device Web Push registration'],
          ['ServiceItem / ClientPayment / BillingSettings', 'category, status, amountInr / paidAt / dueDate', 'The master-only developer-billing system: what\'s owed vs. what\'s been paid'],
          ['EnrollmentRequest', 'type, receiptNumber, status', 'Student-submitted enrollment pending admin verification'],
          ['Announcement / AnnouncementReply / AnnouncementLike(+Reply)', 'audience, audienceLabel, recipientCount', 'Staff-only feed: a push notice plus a reply thread and 👍 acknowledgements'],
          ['Question / QuestionComment / QuestionCommentReaction', 'courses[], subjects[] (both many-to-many)', 'The Ask Question feed: a question tagged to courses/subjects, answered in threaded comments, each reaction correct/incorrect'],
        ] },

      { type: 'note', text: 'AuthEvent and AuditLog both keep a denormalized actor name/phone alongside a nullable foreign key (onDelete: SetNull). Deleting a user account later never breaks (or silently rewrites) the historical trail.' },

      { type: 'h2', text: '4. Authentication' },

      'Auth went through a real redesign partway through the project. Phone-only OTP login was secure but meant a 6-digit SMS code, and its cost, on every single login. The current design uses OTP for what it\'s actually good at: proving phone ownership once. A new student or faculty member verifies their phone via Twilio Verify, then sets a password (entered twice, matched server-side and hashed with bcrypt); every login after that is just phone number + password, no SMS involved. Accounts created before this shipped get migrated the same way: their first login after the change routes them to set a password instead of straight into the dashboard. Faculty still go through a separate invite/join link, a one-time URL that runs the same OTP-then-password flow, rather than an admin typing in a password for them. On success, a signed JWT session cookie is issued via jose, now valid for six months instead of the original seven days, since re-typing a password that often was more friction than the security bought back.',

      { type: 'diagram', title: 'Phone verification once: signup, faculty join, migration, or forgot-password', text:
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
        App-->>U: set password (entered twice)
        U->>App: submit password + confirm
        App->>App: bcrypt.hash(password, 10 rounds)
        App->>DB: store passwordHash on User
        App->>App: sign JWT session cookie (jose)
        App-->>U: redirect to role's dashboard
    else code wrong/expired
        Tw-->>App: denied
        App->>DB: AuthEvent(type: otp_failed)
        App-->>U: show error, allow retry
    end` },

      { type: 'diagram', title: 'Every login after that: phone + password, no SMS involved', text:
`sequenceDiagram
    participant U as User
    participant App as Server Action
    participant DB as Postgres
    U->>App: submit phone + password
    App->>DB: look up User by phone
    App->>App: bcrypt.compare(password, passwordHash)
    alt password correct
        App->>DB: AuthEvent(type: password_verified)
        App->>App: sign JWT session cookie (jose), 6-month expiry
        App-->>U: redirect to role's dashboard
    else password wrong
        App->>DB: AuthEvent(type: password_failed)
        App-->>U: show error, offer "Forgot password?"
    end` },

      'Forgot password reuses the exact same phone-verification step as signup, under a distinct password_reset purpose: prove you still control the phone via OTP, then set a new password. It\'s entirely self-service, no admin, faculty member, or master role can trigger a reset on someone else\'s behalf, which keeps the audit trail honest about who actually initiated it. Every one of those AuthEvent rows, otp_sent/otp_verified/otp_failed and now password_verified/password_failed, carries IP address, user agent, and geolocation resolved to city/region/country, plus, for otp_sent, the SMS cost in INR, converted from Twilio\'s USD pricing at the live exchange rate at send time. Admins get a Login Activity page built entirely from this table: who tried to log in, from where, what it cost, and whether it was an OTP step or a password attempt; the stats cards count both.',

      { type: 'h2', text: '5. Roles & Permissions' },

      { type: 'table',
        head: ['Role', 'Dashboard', 'Can do'],
        rows: [
          ['student', '/dashboard', 'View enrolled courses, request new enrollments, join/watch live classes and recordings, manage push subscription'],
          ['faculty', '/dashboard', 'Everything student-relevant to teaching: go live, manage curriculum (chapters/topics), see enrollment for assigned subjects'],
          ['admin', '/dashboard', 'Full course/student/faculty/enrollment management, announcements, audit log, login activity, and a read-only view of the development charge'],
          ['master', '/dashboard', 'Everything admin can do, plus Services & Pricing and Payment Tracking: the developer-billing tools'],
        ] },

      'Role is a plain enum column on User, checked at the top of every Server Action and every dashboard route. There\'s no separate permissions table to keep in sync, which fits a four-role app but would be the first thing to refactor if the role list ever grew past a handful.',

      { type: 'h2', text: '6. Live Classes: the Join-Token Design' },

      'Going live creates a LiveSession row under a Topic with a YouTube video ID. The interesting design decision is how students actually get that video ID. It isn\'t embedded in any page HTML or exposed on a public API: it\'s handed out through a short-lived, signed join token, resolved fresh on every watch:',

      { type: 'diagram', title: 'Go Live → join → resolve → watermark → auto-cutoff', text:
`sequenceDiagram
    participant F as Faculty/Admin
    participant App as Server
    participant St as Student
    F->>App: go live (Topic, YouTube ID, optional cross-linked courses)
    App->>App: create LiveSession(status: live)
    App->>St: push notification: "class is live"
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
    Note over St: next poll returns "ended": playback stops automatically` },

      { type: 'note', text: 'The code comment on this token scheme is unusually candid about its own limits, and worth quoting: "This is NOT DRM. Once resolveJoinToken hands the YouTube video ID back to an authenticated, enrolled student, that ID is in their browser." What it actually buys: no public endpoint ever leaks a video ID to someone unauthenticated or unenrolled; no sequential/guessable IDs to enumerate other batches\' sessions; every real join is logged with who/when; and a 10-minute token window means a stale or forwarded link stops working fast, with no extra invalidation bookkeeping needed. If leak prevention ever needs to get stricter, the honest fix is per-student rooms via a provider like 100ms or Agora, not tightening this scheme further.' },

      'The watermark itself overlays the viewing student\'s identity on the video during playback, a lightweight deterrent, not a technical guarantee, which is consistent with the join-token philosophy above: layers that raise the cost of leaking without pretending to make it impossible.',

      { type: 'h2', text: '7. Push Notifications' },

      'Students opt in through the browser\'s Push API, which registers a subscription (an endpoint URL plus two keys, p256dh and auth) that gets stored as a PushSubscription row. Sending a push means the server signs a payload with the app\'s VAPID keys via the web-push package and posts it straight to whichever push service the browser uses (Chrome, Firefox, etc.), no third-party push platform in between.',

      { type: 'diagram', title: 'Subscribe once, then two triggers push a notification', text:
`flowchart TD
    A["Student taps Allow Notifications"] --> B["Browser Push API generates subscription"]
    B --> C["Store PushSubscription: endpoint, p256dh, auth"]
    D["Trigger 1: staff goes live"] --> E["Push to every student enrolled in that class's course(s)"]
    F["Trigger 2: staff posts an Announcement"] --> G["Push to all students, or to selected courses' students"]
    E --> H["web-push signs payload with VAPID keys"]
    G --> H
    H --> I["Push service delivers to the browser"]
    I --> J["Service worker 'push' event → showNotification()"]
    J --> K["User taps: 'notificationclick' opens the announcement's link, or the dashboard"]
    H -->|"endpoint responds 410/404: subscription gone"| L["Delete that PushSubscription row automatically"]` },

      'That last edge, pruning dead subscriptions on a 410/404 response, matters more than it sounds: without it, a table of push subscriptions only grows, and every send job wastes time and quota retrying devices that uninstalled the app or cleared their browser months ago.',

      { type: 'h2', text: '8. PWA & Service Worker Caching' },

      'The service worker is hand-written, no Workbox, no next-pwa dependency, and deliberately narrow in scope: only the public marketing site and static assets are ever cached. Every authenticated route is excluded outright, which matters on a shared or family device: nobody\'s dashboard should ever be servable from another user\'s browser cache.',

      { type: 'diagram', title: 'Three caching strategies, one per URL class', text:
`flowchart TD
    R["Incoming GET request"] --> Q1{"Starts with<br/>/dashboard, /login, /signup,<br/>/faculty/join, or /api ?"}
    Q1 -->|"yes"| NET["Network-only: never intercepted, never cached"]
    Q1 -->|"no"| Q2{"Static asset?<br/>/_next/static, /icons/, /images/"}
    Q2 -->|"yes"| CF["Cache-first: serve cached copy instantly,<br/>fall back to network + cache the response"]
    Q2 -->|"no"| NF["Network-first: always try fresh,<br/>fall back to cache, then to '/' if offline"]` },

      'On top of the runtime strategy, four URLs are pre-cached at install time (/, the web manifest, and the two icon sizes) so the app shell is available offline immediately after the first visit, not just after a page has been separately fetched once. Combined with the manifest and maskable icons, this is what makes "Add to Home Screen" actually feel like installing an app rather than bookmarking a page.',

      { type: 'h2', text: '9. The Audit Log' },

      'Every admin/faculty mutation (a price change, a faculty assignment, an enrollment approval, an announcement send) writes an AuditLog row inside the same Server Action that performs the change. The table has no update or delete path exposed anywhere in the codebase; it is write-once and read-only by construction, not just by convention. actorId is nullable with onDelete: SetNull, but actorName and actorRole are stored as plain strings at write time, so the log stays fully readable even after the account that made a change is gone.',

      { type: 'h2', text: '10. Developer Billing, Built Into the Master Dashboard' },

      'One feature that\'s unusual for a coaching-center site: the developer\'s own invoice lives inside the app. ServiceItem rows (service vs. development, each active/deferred/on-demand) make up an itemized cost breakdown; ClientPayment rows record what\'s actually been paid; and a single BillingSettings row holds a due date. Admins see a read-only countdown/overdue banner site-wide once a due date is set. The master role is the only one that can edit the underlying numbers. It reuses the exact same currency-conversion logic as the SMS-cost tracking in AuthEvent (a live USD→INR rate), so both "what this client owes for OTPs this month" and "what this client owes for the project" run through one shared conversion path instead of two.',

      { type: 'h2', text: '11. SEO' },

      'The public site carries per-page metadata, Open Graph/Twitter cards, and JSON-LD structured data (Course and Breadcrumb schemas) on every course page, plus a generated sitemap.xml and robots.txt. The flip side of that effort is making sure none of it leaks into search results for pages that shouldn\'t be indexed: every route under /dashboard, /login, /signup, and /faculty/join carries a blanket noindex, the same route prefixes excluded from the service worker\'s cache.',

      { type: 'h2', text: '12. Deployment' },

      'The app deploys to Railway from a railway.toml, alongside a managed PostgreSQL instance. Prisma migrations run as part of the deploy step rather than by hand against production. It\'s intentionally boring infrastructure for what it is (one coaching center, not a multi-tenant platform) and boring is the right call: nothing here needs a Kubernetes cluster, and every extra moving part is one more thing to debug at 11pm before an admissions season starts.',

      { type: 'h2', text: '13. Announcements & Ask Question: Two Feeds, Two Access Models' },

      'Two features got added after the initial build, and they\'re a useful contrast in access control on the same codebase. Announcements started as a fire-and-forget push (admin writes a message, students receive a notification, nothing persisted). It\'s now a real Announcement row with a reply thread (AnnouncementReply) and a toggleable 👍 (AnnouncementLike / AnnouncementReplyLike, one per user per target via a compound unique index), but the whole thread is staff-only: isStaffRole gates reading, replying, and reacting, same boundary as the page itself. Ask Question is the opposite shape on purpose: students post, and visibility is scoped by enrollment (a student only sees a Question if it\'s tagged with a course they\'re enrolled in), while faculty/admin/master can see and answer every question regardless of which course they teach.',

      { type: 'diagram', title: 'Tagging a subject pulls in every course that teaches it', text:
`flowchart TD
    A["Student submits: title, body,<br/>courseIds[], subjectNames[]"] --> B{"Poster is staff?"}
    B -->|"no"| C["Check: every courseId is one they're<br/>enrolled in, every subjectName exists<br/>under one of those courses"]
    B -->|"yes"| D["No restriction: any active<br/>course/subject"]
    C -->|"fails"| E["Reject: tag only your own courses/subjects"]
    C -->|"passes"| F
    D --> F["Look up ALL Subject rows matching<br/>the requested subjectNames — across<br/>every course, not just the ones tagged"]
    F --> G["Union: explicit courseIds<br/>+ courseId of every matching Subject"]
    G --> H["Question.courses = expanded set<br/>Question.subjects = matching Subject rows"]
    H --> I["Push recipients = students enrolled in,<br/>and faculty teaching, ANY course in the<br/>expanded set"]` },

      { type: 'note', text: 'Concretely: a Class XI student tags "Physics" on a question. Physics is also taught under Class XII, NEET, and JEE as separate Subject rows (same name, different courseId, since Subject has no global uniqueness on name). The expansion step pulls all of them in, so the question — and its push notification — reaches every student and faculty member studying Physics anywhere on the platform, not just the asker\'s own batch. The same course/subject resolution logic runs again on edit, driven off whatever courses/subjects are still checked, so removing a subject tag correctly un-expands the course list too.' },

      'Edit and delete on a Question split the same way access does, but flipped: canModifyQuestion returns true for staff on anything, or for a non-staff user only on their own authorId. It\'s a two-line helper, but it\'s checked server-side inside the editQuestion and deleteQuestion actions themselves, not just used to decide whether to render the ✎/✕ buttons — the UI hiding them for other students\' questions is a courtesy, the action re-checks regardless of what the client sends.',

      { type: 'h2', text: 'Closing Thoughts' },

      'None of the individual pieces here are exotic: OTP-verified password auth, Server Actions, a service worker, Web Push. What made this project interesting was fitting them together for a genuinely operational system: a coaching center actually runs live classes through this, actually gets paid through the fee pages it advertises, and actually tracks its own SMS spend against a monthly figure that used to be invisible. The join-token design and the audit log are the two pieces I\'d point to as the most "engineering," but the boring parts (cascading deletes that don\'t leave orphaned rows, a service worker that refuses to cache a dashboard, a payments table nobody can quietly edit after the fact) are what actually make it trustworthy enough for a real client to run their business on.',

      'If you want the plain-language tour of what the platform does for the coaching center and its students (no schemas, no JWTs), the project page has that version.',
    ],
  },
  {
    slug: 'coaching-center-management-system',
    title: 'A Complete Coaching Center Management System: Website, Dashboards, Live Classes, Billing',
    date: '2026-07-22',
    tag: 'business',
    excerpt: 'What I built for Success Point Gogamukh wasn\'t just a website: it\'s a full operating system for a coaching business. Every feature, every screen, and what it would take to build one for your institute.',
    downloadLabel: '🎓 Visit Success Point Gogamukh',
    downloadUrl: 'https://www.successpointgogamukh.com/',
    content: [
      'When Success Point, a coaching center in Gogamukh, Assam, asked me for "a website," what they actually needed (like most coaching centers running NEET, JEE, board-exam, or government-exam batches) was something much bigger: a way to be found by new students, a way to run live classes without a third-party app, a way to track who owes what, and a way to know who\'s actually logging in. So that\'s what got built: a public site that wins admissions, plus student, faculty, admin, and owner dashboards that run the whole operation behind it. Every screenshot below is the real, running product, not a mockup.',

      { type: 'h2', text: 'A public website that actually converts' },

      'A parent comparing coaching centers on their phone at 10pm needs three things fast: what it costs, who teaches it, and how to reach a real person. The public site leads with exactly that: exam category badges, program cards, transparent fees with offer pricing shown struck-through against the original, and a floating WhatsApp button that\'s always one tap away (it auto-hides when the footer scrolls into view so it never covers it).',

      { type: 'image', src: landingShot, alt: 'Coaching center landing page with hero, programs, and demo-class CTA', caption: 'Landing page: hero, exam badges, program cards, demo-class CTA' },

      { type: 'gallery', items: [
        { src: courseDetailShot, alt: 'Course detail page with subjects, fees, and faculty', caption: 'Course detail: subjects, monthly/complete fees, assigned faculty, no "call for pricing"' },
        { src: searchShot, alt: 'Search results page for a course or subject', caption: 'Search: find any course or subject by name from the header' },
      ] },

      { type: 'list', items: [
        'Search: find any course or subject by name from the header',
        'Enrollment requests: students submit a payment receipt number; staff verify or reject it',
        'SEO: per-page metadata, Open Graph/Twitter cards, JSON-LD on course pages, sitemap, robots.txt, noindex on every authenticated route',
        'Installable PWA: Android/Chrome install prompt, iOS "Add to Home Screen", offline-ready',
        'Location & contact: address, embedded map, click-to-call, pre-filled WhatsApp link',
        'Floating WhatsApp button: always one tap away, auto-hides over the footer',
      ] },

      { type: 'h2', text: 'Phone-verified, then a password: the best of both' },

      'The SMS code proves you own the phone once, at signup, at faculty join, or if you ever forget your password, and a password handles every login after that, so nobody\'s waiting on a text message just to check their dashboard. New students and faculty verify their phone with a one-time OTP, then set a password (typed twice, so no fat-fingered logout later). Everyone who already had an account got carried over automatically: their next login just asks them to set a password first. Forgot it? The same OTP step proves it\'s still you, entirely self-service, no admin has to get involved. Sessions now stay signed in for six months, so returning students and faculty aren\'t re-authenticating every week. Every step, OTP and password alike, is logged with device, location, and (for the SMS step) cost, so the owner always knows who\'s actually using the system.',

      { type: 'gallery', items: [
        { src: loginShot, alt: 'Phone number and password login screen', caption: 'Login: phone + password for every return visit' },
        { src: facultyJoinShot, alt: 'Faculty invite and join page', caption: 'Faculty join: verify by phone via OTP, then set a password, no admin typing one in for them' },
      ] },

      { type: 'h2', text: 'A dashboard for every role' },

      'Four roles, four dashboards: student, faculty, admin, and (unusually) a master role for the owner, layered on top of admin with its own billing tools. Nobody sees more than they need to.',

      { type: 'gallery', items: [
        { src: studentDashboardShot, alt: 'Student dashboard with enrolled and available courses', caption: 'Student dashboard: enrolled courses, browse and request new enrollments, join live classes' },
        { src: studentRecordingsShot, alt: 'Recordings and materials page filterable by subject and chapter', caption: 'Recordings & materials: filterable by subject, chapter, and topic' },
      ] },

      { type: 'h2', text: 'Live classes without a third-party app' },

      'This is the feature that turns a coaching center\'s YouTube-and-WhatsApp workaround into an actual product: staff pick a course → subject → chapter → topic, paste a YouTube video ID, and go live. The same class can be cross-linked to reach students in other batches at once. Ending the class cuts off every watching student automatically. Every past session becomes a searchable recording, every join is logged for attendance, and playback is watermarked with the viewer\'s identity as a leak deterrent.',

      { type: 'image', src: goLiveShot, alt: 'Go Live panel with course, subject, chapter, and topic picker', caption: 'Go Live: curriculum picker, cross-linking to other batches, live status at a glance' },

      'Faculty get their own dashboard too: the subjects they\'re assigned to, quick stats, and a roster of every student in those subjects, separate from the admin\'s wider view.',

      { type: 'gallery', items: [
        { src: facultyDashboardShot, alt: 'Faculty dashboard with assigned subjects and quick stats', caption: 'Faculty dashboard: assigned subjects, quick stats' },
        { src: facultyStudentsShot, alt: 'Faculty view of their students', caption: "Faculty's student roster" },
      ] },

      { type: 'h2', text: 'Announcements that talk back' },

      'A class going live pushes a notification straight to every enrolled student automatically. On top of that, staff can broadcast an announcement (a title, a message, and an optional link to a form or payment page) from one composer, to all students, specific courses, students who haven\'t enrolled in anything yet, the staff team, or literally everyone. What used to be a one-way push is now a real thread: faculty, admin, and master can reply to any announcement and tap a 👍 to acknowledge it, so "did the team see this" stops being a guessing game answered over WhatsApp.',

      { type: 'image', src: adminAnnouncementsShot, alt: 'Announcements feed with audience selector, a staff reply, and like reactions', caption: 'Announcements: five audience options, plus a reply thread and 👍 reactions right under each one' },

      { type: 'h2', text: 'Ask Question: a Q&A feed built into every dashboard' },

      'Students don\'t just receive information, they can ask for it. Any student can post a question tagged to one or more of their enrolled courses and, optionally, a subject, right on their own dashboard. Faculty, admin, and master can answer any question on the platform, not just the ones under courses they teach, so a Class XI student\'s Physics doubt can get picked up by whichever faculty member is free, not only their assigned teacher. Every answer gets a ✅ correct / ❌ incorrect reaction from anyone who can see the thread, so the right explanation floats to the top without a moderator having to referee it.',

      'The clever bit is what happens when a subject gets tagged: the question automatically extends to every other course that teaches a subject by that same name. Tag "Physics" from a Class XI question and it\'s instantly visible to Class XII, NEET, and JEE students too, because they all study Physics, even though nobody explicitly picked those courses. A dedicated Ask Question page lists every question the viewer can see with subject-filter tabs to narrow it down, and the person who posted a question (or staff, for any question) can edit or delete it later.',

      { type: 'image', src: askQuestionShot, alt: 'Ask Question feed with course and subject tags, a correct-marked answer, and subject filter tabs', caption: 'Ask Question: subject filter tabs up top, course + subject tags on the question, ✅/❌ reactions on each answer' },

      { type: 'h2', text: 'One dashboard that runs the whole institute' },

      'Manage courses and pricing, students, faculty, admins, and enrollment requests. Every price change, faculty assignment, and enrollment approval writes to an immutable audit log, a permanent, write-once record of who did what, when. Login activity shows every device and location for both OTP steps and password logins, with the SMS cost attached where one was actually sent. There\'s also a copyable faculty invite link right on the Manage Faculty page, and a per-course roster of every enrolled student, one click from the course list.',

      { type: 'image', src: adminDashboardShot, alt: 'Admin dashboard home with stats and management tools', caption: 'Admin dashboard: every management tool, live stats, one click away' },

      { type: 'gallery', items: [
        { src: adminCoursesShot, alt: 'Manage courses table', caption: 'Manage Courses: pricing, enrollment counts, requests, recordings' },
        { src: adminStudentsShot, alt: 'Manage students table', caption: 'Manage Students: search, enrollment, per-student edit' },
        { src: adminFacultyShot, alt: 'Manage faculty page', caption: 'Manage Faculty: subject assignments' },
        { src: adminEnrollmentsShot, alt: 'Enrollment requests page', caption: 'Enrollment Requests: verify receipts, approve/reject' },
        { src: adminAuditLogShot, alt: 'Audit log table', caption: 'Audit Log: immutable trail of every change, by actor' },
        { src: adminLoginActivityShot, alt: 'Login activity table with SMS cost', caption: 'Login Activity: device, location, and SMS cost, across OTP and password events alike' },
        { src: adminDevChargeShot, alt: 'Development charge breakdown, read-only', caption: 'Development Charge: read-only, what\'s owed vs. paid' },
      ] },

      { type: 'table',
        head: ['Tool', 'What it does'],
        rows: [
          ['Manage Courses', 'Create/edit/delete courses and subjects, set fees and offer pricing, assign faculty'],
          ['Manage Students / Faculty', 'View, edit, search, and manage every account'],
          ['Admins', 'See who has admin access and their activity'],
          ['Enrollment Requests', 'Verify receipt numbers, approve or reject in one click'],
          ['Announcements', 'Push to students, staff, or everyone — with replies and 👍 reactions from the team'],
          ['Ask Question', 'The student/staff Q&A feed: course + subject tags, ✅/❌ answer reactions, subject filters'],
          ['Audit Log', 'An immutable trail of every change: who, what, when'],
          ['Login Activity', 'Every OTP and password attempt with device, location, and SMS cost where applicable'],
          ['Development Charge', 'Read-only: what\'s owed to the developer vs. what\'s been paid, with a site-wide countdown/overdue banner'],
        ] },

      { type: 'h2', text: 'And for the owner: what it costs to run' },

      'The master dashboard is the one piece that\'s unusual for a coaching-center product. It\'s where I track what the client owes for building and running their system, and what they\'ve paid, right inside their own app: the editable counterpart to the read-only Development Charge page admins see. Live student/course/faculty counts, an itemized services breakdown, and a payment tracker with a due-date countdown the admin sees site-wide.',

      { type: 'image', src: masterOverviewShot, alt: 'Owner dashboard overview with live counts and billing tools', caption: 'Owner overview: live counts, plus the billing tools behind the scenes' },

      { type: 'gallery', items: [
        { src: masterServicesShot, alt: 'Services and pricing breakdown', caption: 'Services & Pricing: itemized service vs. development cost breakdown, each active, deferred, or on-demand' },
        { src: masterPaymentsShot, alt: 'Payment tracking page', caption: 'Payment Tracking: record payments, set the due date that drives the countdown banner' },
      ] },

      { type: 'h2', text: 'Built to actually stay up' },

      { type: 'table',
        head: ['Layer', 'Choice'],
        rows: [
          ['Framework', 'Next.js (App Router, Server Actions) + TypeScript + Tailwind'],
          ['Database', 'PostgreSQL via Prisma'],
          ['Auth', 'Phone + SMS OTP (Twilio Verify) to verify, bcrypt-hashed password to log in, 6-month sessions'],
          ['Notifications', 'Web Push (VAPID): standards-based, no third-party push SaaS'],
          ['Offline/installable', 'PWA with a hand-written service worker'],
          ['Billing', 'Live USD→INR conversion, so SMS cost tracking and the development charge stay accurate day to day'],
          ['Hosting', 'Railway: managed Postgres + app, sized for one institute, not enterprise infra'],
        ] },

      'None of the individual pieces are exotic. What makes it worth building is fitting them together into something a coaching center actually runs their business on: real live classes, real fee pages, real SMS cost tracking, a real audit trail nobody can quietly edit.',

      'This exact system (public site, live classes, all four dashboards) is what\'s running in production for Success Point Gogamukh today. If your coaching center, tuition institute, or exam-prep center needs the same thing (a real online presence plus a system to actually run the day-to-day), that\'s what I build. The live site is one click away below, and the full engineering write-up (architecture, schema, the join-token design, the audit trail) is its own post.',
    ],
  },
  {
    slug: 'the-design-principles-behind-lahon-in',
    title: 'The Design Principles Behind lahon.in',
    date: '2026-07-26',
    tag: 'tech',
    excerpt: 'A traditional colophon lists the typeface and the paper stock. Mine lists the actual rules this site follows: one shared token scale, one page shell, and motion that has to earn its keep.',
    content: [
      'A colophon used to be a short note at the back of a book: the typeface, the paper, sometimes the printer\'s mark. Nobody reads a website on paper, so mine covers the closest equivalent: the actual decisions that repeat across every page here, and why I keep making them the same way, with the real code behind each rule.',

      { type: 'h2', text: '1. Restraint first' },

      'Every page on this site uses the same two backgrounds: a near-black surface in dark mode, a warm cream in light mode, plus one accent color doing all the work of drawing your eye. There is no second or third accent competing for attention. When a new project page needs a highlight color, it gets exactly one, and everything else stays typography and whitespace. Restraint is not the absence of a decision; it is the decision, made once, that I keep re-applying instead of relitigating on every new page.',

      { type: 'code', title: 'design-system.css: the only place a background color is allowed to be defined', text:
`:root {
  --ds-bg:        #0d1117;
  --ds-surface:   #161b22;
  --ds-surface-2: #21262d;

  --ds-text:       #e6edf3;
  --ds-text-muted: #8b949e;

  color-scheme: dark;
}

/* Light theme, applied when <html data-theme="light"> */
[data-theme="light"] {
  --ds-bg:      #faf6ee;
  --ds-surface: #ffffff;
  /* ...text, border, and shadow tokens follow the same pattern */
}` },

      'Every component reads --ds-bg and --ds-surface instead of writing a hex value, so a page never has to know which theme is active. Component CSS asks for "the background," not "#0d1117 or #faf6ee depending."',

      { type: 'h2', text: '2. One shell, many projects' },

      'Wormhole is an encrypted messenger. Moksha is a flood-relief campaign. Success Point Gogamukh is a coaching center\'s entire back office. Nothing about those three projects has anything in common, except that all three, plus Assam Flood and the Work page, share the exact same page-shell component: five files, five completely different products, one skeleton underneath. A back button in the same corner, a hero that ends in a share button, a footer that is always last.',

      { type: 'code', title: 'shared/PageShell.css, and how a project overrides it', text:
`.page-shell {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 4rem;
  background: var(--ds-bg);
  color: var(--ds-text);
  font-family: var(--ds-font);
}

/* Wormhole.jsx: <div className="wh-page page-shell"> */
.wh-page.page-shell {
  padding: 2.5rem 1.5rem 4rem;
}` },

      { type: 'note', text: 'That compound selector, .wh-page.page-shell instead of just .wh-page, is not a style preference. A bare .wh-page and the shared .page-shell rule both have the exact same specificity, so which one wins comes down to which CSS file webpack happened to bundle last, a coin flip that is different on every build. Pairing the project\'s own class with .page-shell in the same selector bumps the specificity above the shared rule on purpose, so page padding never silently reverts depending on build order. I found this the hard way when a page-shell page briefly lost its custom padding after an unrelated change, and it turned into the rule every new project page follows now.' },

      { type: 'h2', text: '3. Personality lives in the details' },

      'None of the following are required to use this site. You can ignore all of them and everything still works exactly the same. That is deliberate: personality that gets in the way of the actual content is a cost, not a feature. So it lives entirely in the details that reward noticing.',

      { type: 'list', items: [
        'Achievement badges: a small toast (like "Shape Shifter" for changing the accent color) fires from localStorage-backed tracking in src/lib/achievements.js, no account or server involved',
        'Sound design: a mute-able toggle in the corner plays short UI sounds on interactions, off by default on first visit',
        'The flip business card: doubles as the entire contact form on the About page, one click flips it instead of navigating to a separate route',
        'The flower vine: grows down the homepage as you scroll, driven by scroll position, not a fixed animation timeline',
      ] },

      { type: 'code', title: 'How a blog read quietly becomes an achievement check', text:
`// BlogPost.jsx, on every post view
React.useEffect(() => {
  if (!slug) return;
  const key = \`blog_reads_\${slug}\`;
  const n = parseInt(localStorage.getItem(key) || '0', 10);
  localStorage.setItem(key, n + 1);
  trackBlogRead(POSTS.map(p => p.slug));
}, [slug]);` },

      { type: 'h2', text: '4. Motion has to earn its keep' },

      'Every animation on this site answers a specific question: what did the user just do? The timeline draws itself as you scroll past it because you scrolled. Cards lift because you hovered. The business card flips instead of navigating away because you clicked it. Nothing plays on a timer just because it can, and nothing animates on page load purely for the sake of a first impression.',

      { type: 'table',
        head: ['data-aos value', 'Times used across the site', 'Typical use'],
        rows: [
          ['fade-up', '16', 'Content entering from below as you scroll to it'],
          ['fade-down', '15', 'Hero titles and section headers'],
          ['zoom-in-up', '14', 'Cards and tiles in a grid'],
          ['zoom-in', '2', 'Logos and single focal images'],
          ['fade-up-right / fade-up-left', '1 each', 'Paired elements entering from opposite sides'],
        ] },

      'If I cannot point to the user action an animation is responding to, it gets cut. That rule has killed more animations than it has approved.',

      { type: 'h2', text: '5. The same tokens everywhere' },

      'Every color, radius, shadow, and z-index on this site comes from one file: design-system.css. A project\'s own accent color sits on top of that shared scale rather than replacing it, which is why switching the theme or the accent color never breaks a project page. Nothing hardcodes a color, spacing value, or stacking order outside that scale.',

      { type: 'table',
        head: ['Token group', 'Example', 'Rule'],
        rows: [
          ['Color', '--ds-green, --ds-blue', 'One accent per theme, swappable without touching component CSS'],
          ['Shape', '--ds-radius-sm / --ds-radius / --ds-radius-lg / --ds-radius-xl', 'Four sizes cover every rounded corner on the site'],
          ['Elevation', '--ds-shadow-sm, --ds-shadow-lg', 'Two shadow depths, nothing in between'],
          ['Z-index', '--ds-z-nav through --ds-z-cursor', 'Only for chrome that competes for stacking across the whole page'],
          ['Type', '--ds-text-hero, --ds-text-hero-sm', 'Reused only where the same size actually repeats across components'],
        ] },

      'The accent color you picked with the palette button in the corner is not a fixed swatch, it is a hue rotated into an HSL string at runtime and written directly onto the same --ds-green variable every component already reads:',

      { type: 'code', title: 'AccentPicker.jsx: one hue in, four CSS variables out', text:
`const applyDynamicColors = (hue) => {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  const style = document.documentElement.style;
  if (isLight) {
    style.setProperty("--ds-green", \`hsl(\${hue} 75% 38%)\`);
    style.setProperty("--ds-green-btn", \`hsl(\${hue} 75% 42%)\`);
  } else {
    style.setProperty("--ds-green", \`hsl(\${hue} 85% 78%)\`);
    style.setProperty("--ds-green-btn", \`hsl(\${hue} 70% 38%)\`);
  }
};` },

      { type: 'playground' },

      'That live-updating "Accent" swatch above is the same mechanism running the actual palette below: not screenshots, var(--ds-bg), var(--ds-green), and the rest, rendered on the page you are reading right now, following your actual theme and accent choice.',

      { type: 'palette' },

      { type: 'h2', text: '6. Quiet defaults' },

      'Images lazy-load. Routes are code-split, fourteen of them, so visiting Wormhole never downloads the code for Success Point Gogamukh. Every interactive element gets a visible focus ring. None of this is something you notice when it is working, which is exactly the point.',

      { type: 'code', title: 'App.js: fourteen routes, fourteen separate chunks', text:
`const Home = lazy(() => import("./components/home/Home"));
const Blog = lazy(() => import("./components/blog/Blog"));
const Mood = lazy(() => import("./components/portfolio/Mood"));
// ...eleven more, each its own dynamic import

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/mood" element={<Mood />} />
  </Routes>
</Suspense>` },

      { type: 'code', title: 'index.css: keyboard focus, restored on purpose', text:
`/* The CSS reset zeroes every default outline, so without this,
   keyboard users get no focus indicator anywhere on the site.
   :focus-visible keeps it keyboard-only, no ring on mouse clicks. */
a:focus-visible,
button:focus-visible,
input:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid var(--ds-green-btn);
}` },

      { type: 'h2', text: 'Why write any of this down' },

      'Mostly so I keep following my own rules. It is easy to cut a corner on the tenth project page that felt fine to cut on the first, and much harder to do that once the rule is written down somewhere I might read it again, with the actual code and the live tokens right next to it instead of just a vague memory of the intent.',
    ],
  },
];
