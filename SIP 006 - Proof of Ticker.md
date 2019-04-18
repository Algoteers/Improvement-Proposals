# SIP 006 - Proof of Ticker

This proposal is conceptual and experimental. It is for discussion of a much later, 2.0 or 3.0 implementation.

ALGO could be mined and secured through a Proof of Work system, where the work done is high speed hashing and consensus on ticker data.

### Proof of Work

The point of a Proof of Work system is to do a *lot* of real world (i.e. computational) work, to earn your stake in the network. This ties governance to the real world in a tangible way, not possible in pure game-theoretic systems (i.e. Proof of Stake).

The classic Bitcoin Proof of Work requires miners to compete over SHA-256 hashing of nonces to achieve a difficulty (0 padding) goal.

### Proof of Ticker

ALGO miners would exchange ticker data from official oracles (exchanges) with second or millisecond timestamps. These miners would need to reconcile this data into a merkle tree within a certain number of seconds, say 60, before making a block. The block would then go into the general network consensus algorithm, not covered in this document.

Proof of Ticker might be an adequate Proof of Work system because the volume of ticker data to be hashed and reconciled is very large, and could stress any typical CPU to the limit. It also has a direct, but not dependent relationship to the growth of the network, as more trades mean more data, but those trades don't have to be related to ALGO.

The point of Proof of Ticker, therefore, could be seen as competing to have a higher syncronization rate and accuracy with the network. The more ticker data your node can hash per minute, the more accurate data feeds for your consumers. These peers would hash (trade) on top of your strong block, creating a faster, more active next block. Since traders would like to have sub-millisecond market access, miners are not going to outgrow the competition for a long time.

### Hi Speed Decentralized Exchange

If Proof of Ticker were implemented, it would be the perfect runtime environment for a decentralized exchange. The miner with the highest sync rate and accuracy would also be the ideal miner to match a contract, and hash it into a block. The speed of the exchange would scale with the Proof of Ticker competition, always pushing high speed trading.
