import { createLibp2p } from 'libp2p'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { webSockets } from '@libp2p/websockets'
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2'
import { ping } from '@libp2p/ping'
import { webRTC } from '@libp2p/webrtc'
import { multiaddr } from '@multiformats/multiaddr'
import { all } from '@libp2p/websockets/filters'
import {identify} from "@libp2p/identify";

const listener = '/ip4/127.0.0.1/tcp/57263/ws/p2p/12D3KooWFKPdHFd2WKukgpf6HTPHqF1Yzuz6iVk9E2SpKebdjbr3/p2p-circuit/webrtc/p2p/12D3KooWD1hR7tShhHXEFA4egFmuHqRAe9ukEbT1wQWwvsbAKCCf'

const sender = await createLibp2p({
  connectionEncryption: [
    noise()
  ],
  streamMuxers: [
    yamux()
  ],
  transports: [
    webSockets({
      filter: all
    }),
    webRTC(),
    circuitRelayTransport()
  ],
  connectionGater: {
    denyDialMultiaddr: () => false
  },
  services: {
    ping: ping(),
    identify: identify()
  }
})

setInterval(async () => {
  const ma = multiaddr(listener)
  const rtt = await sender.services.ping.ping(ma)
  console.info('PING', ma.getPeerId(), `${rtt}ms`)
}, 2000)
