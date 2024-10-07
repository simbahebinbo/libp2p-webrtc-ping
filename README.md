# libp2p-webrtc-ping

## Instructions

1. Start the relay

```console
$ node relay.js
const relay = '...'
```

2. Paste the relay address into `listener.js`
3. Start the listener

```console
$ node listener.js
const listener = '...'
```

4. Paste the listener address into `sender.js`
5. Start the sender

```console
$ node sender.js
PING 12D3Foo... 1ms
PING 12D3Foo... 1ms
PING 12D3Foo... 1ms
PING 12D3Foo... 1ms
PING 12D3Foo... 2ms
PING 12D3Foo... 1ms
...
```
