# SIP 001 - SuperAlgos Auth & Network Roadmap

_This roadmap is a recommendation by Ira Miller aka isysd. It is for discussion, not yet an official team plan._

TLDR; SuperAlgos can launch a MVP quickly using exclusively mTLS, HTTPS, WSS, and upgrade to [pgp-mtls](https://github.com/isysd-mirror/pgp-mtls) when ready for p2p.

## Current

SuperAlgos needs to clarify both authentication and streaming data protocol on the network. As of 2019-04-01, [Auth0](https://auth0.com/) and [RabbitMQ](https://www.rabbitmq.com/) are used. These are both centralized to some degree, and it seems no one on the team strongly wants to keep them.

### Authentication Options

| Name | No middle man | X.509 | e2e Encryption | Public Key Auth | Hardware Support | Peer Discovery |
|------|---------------|------|----------------|-----------------|------------------|----------------|
| [pgp-mtls](https://github.com/isysd-mirror/pgp-mtls) | yes       | yes  | yes            | yes             | yes              | yes            |
| PGP TLS [RFC 6091](https://tools.ietf.org/html/rfc6091) | yes | no | yes | yes | yes | yes         |
| TLS 1.3 [RFC 8446](https://tools.ietf.org/html/rfc8446) | no | yes | vulnerable | yes | yes | no   |
| mutual TLS 1.3 [RFC 8446](https://tools.ietf.org/html/rfc8446) | no | yes | yes | yes | yes | no   |
| [peerca](https://github.com/substack/peerca) | yes | yes | yes | yes | yes        | no             |
| [webauthn](https://www.w3.org/TR/webauthn-1/) w / [FIDO2](https://fidoalliance.org/fido2/) | depends | no | no | yes | yes | no |
| [OpenID Connect](https://openid.net/connect/) (inc. [Auth0](https://auth0.com)) | no | no | no | depends | depends | no |

##### No Middle Man

Indicates whether any trusted middle men are involved in the cryptographic operations.

This includes centralized authorities like traditional X.509 Certificate Authorities, as well as central authentication servers like those in Oauth2/OpenID Connect.

##### X.509

Indicates whether backwards compatible TLS certificates and sessions are supported. This is the current web standard for session encryption, and a strong but underutilized Authentication standard.

GnuTLS dropped support for [RFC 6091](https://tools.ietf.org/html/rfc6091) [citing X.509 dominance](https://www.gnutls.org/manual/html_node/OpenPGP-certificates.html).

##### e2e (End to End) Encryption

All session data must be encrypted from end to end. When Man In The Middle (MITM) attacks are possible (i.e. non-mutual TLS), this can be considered broken.

Many auth protocols argue this is not their domain, and that TLS should take care of it. As we see, this is not always the case, and when it is, Authentication is also included.

##### Public Key Auth

Public Key authentication ensures no party can impersonate or decrypt messages meant for a third party. Using symmetric cryptography, servers can impersonate users and read their messages.

##### Hardware Support

Indicates native integration with smart card or dedicated hardware devices. Examples are FIDO2 and OpenPGP.

##### Peer Discovery

Indicates ability to discover a previously unknown peer, and negotiate a secure session. The best example is the OpenPGP [Web of Trust](https://en.wikipedia.org/wiki/Web_of_trust).

### Streaming Protocols

| Name | Browser | P2P | Speed |
|------|---------|-----|-------|
| TCP Socket | yes | yes | fast  |
| [Websockets](https://tools.ietf.org/html/rfc6455) | yes | yes | slow |
| [ZeroMQ](http://zeromq.org) | w / websockets | yes | fast |
| [RabbitMQ](https://www.rabbitmq.com/) | no | no | medium |

##### Browser

Indicates whether the streaming protocol is available in the browser. Every protocol has native app support to some degree.

##### Peer to Peer (P2P)

Indicates whether the protocol is able to function without middle-men, i.e. a message broker.

##### Speed

General indication of speed. TCP and 0MQ are an order of magnitude faster than the others, and Websockets are the slowest... but 0MQ on the browser requires websockets.

## MVP

### Authentication

Use mTLS with CA run by SuperAlgos team and/or the host exchange. All languages and protocols allow mTLS, since it wraps TCP sockets. Implentation in node and client software should therefore be trivial, and we're assured to be future proof.

### Streaming Protocol

The tough part about the streaming protocol will be reaching the end user, minimally in a browser session. Not all protocols are supported or performant in the browser.

It seems to me that the quick and dirty way to ensure 100% accessibility and no code duplication is to use Websockets for the MVP. This ensures easy client integration, while maintaining a generic and well supported protocol.

## P2P

### Authentication

When SuperAlgos is ready to expand it's network, an upgrade will need to be made to it's mTLS implementation to enable peer discovery. This can be added on to existing apps by implementing the [pgp-mtls](https://github.com/isysd-mirror/pgp-mtls) protocol. This will integrate the OpenPGP Web of Trust in to the authentication chain, allowing SuperAlgos peers to discover and verify each other's identities on the network.

### Streaming Protocol

Depending on performance and functionality requirements, Websockets could be replaced by the lower level TCP sockets, or upgraded with 0MQ functionality.

