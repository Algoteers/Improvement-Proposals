# SIP 006 - Proof of Ticker

This proposal is conceptual and experimental. It is for discussion of a much later, 2.0 or 3.0 implementation.

ALGO could be mined and secured through a Proof of Work system, where the work done is high speed hashing and consensus on ticker data.

### Proof of Work

The point of a Proof of Work system is to do a *lot* of real world (i.e. computational) work, to earn your stake in the network. This ties governance to the real world in a tangible way, not possible in pure game-theoretic systems (i.e. Proof of Stake).

Going back to PoW theory, we could define the factors of work:

 + `t` for time, minimally defined by order of events.
 + `e` for entropy
 + `m` for our computationally expensive [client puzzle](https://en.wikipedia.org/wiki/Client_Puzzle_Protocol) function.

```
e = entropy source (i.e. random nonce hashing)
t = time
m = "client puzzle" function
```

Provable Work `w` can be defined as a the output of a client puzzle function given parameters entropy and time.

```
w = m(e, t)
```

The resulting proof can be presented to a third party consensus algorithm `c` for evaluation, and potential entry into their Proof of Work merkle tree.

```
PoW = c(m(e, t))
```

The classic Bitcoin Proof of Work requires miners to compete over SHA-256 hashing of nonces to achieve a difficulty (0 padding) goal.

```
Bitcoin = LongestDiffChain(SHA256(nonce, tx merkel tree, previous block hash))
```

Their client puzzle function does some extra work, including tx merkel tree, but we could generally describe Bitcoin with the following parameters:

```
m ~= SHA256 of tx merkel tree, e & t
e ~= nonce
t ~= previous block hash
c = LongestDiffChain
```

The consensus algorithm of Bitcoin is a bit complex when described mathematically, but it is easily summarized as the longest chain, weighted by difficulty (the 0 padding goal).

### Proof of Ticker

ALGO miners would exchange ticker data from official oracles (exchanges) with second or millisecond timestamps. This gives us our entropy and time values.

```
e ~= ticker data
t ~= timestamps on ticker data
```

These miners would need to reconcile this data into a conflict and time-sequenced merkle tree (our `m = SuperalgoBlock` function) within a certain number of seconds, say 60, before making a block. This data should be easily verifyable after the fact by comparing to the oracle data, which must ultimately pass audits for those exchanges to function as market participants.

```
SuperalgoBlock = SHA256(ticker merkel tree, previous block hash)
```

The block would then go into the general network consensus algorithm, not covered in this document. Lets call that algorithm `c = LongestTickerChain`. Briefly, we could say that this algorithm would look at the number and probability of the trades hashed into a block, including the sum of it's parent chain, from the previous block hash back.

```
SuperalgoChain = LongestTickerChain(SHA256(ticker merkel tree, previous block hash))
```

Proof of Ticker might be an adequate Proof of Work system because the volume of ticker data to be hashed and reconciled is very large, and could stress any typical CPU to the limit. It also has a direct, but not dependent relationship to the growth of the network, as more trades mean more data, but those trades don't have to be related to ALGO.

The point of Proof of Ticker, therefore, could be seen as competing to have a higher syncronization rate and accuracy with the network. The more ticker data your node can hash per minute, the more accurate data feeds for your consumers. These peers would hash (trade) on top of your strong block, creating a faster, more active next block. Since traders would like to have sub-millisecond market access, miners are not going to outgrow the competition for a long time.

### Hi Speed Decentralized Exchange

If Proof of Ticker were implemented, it would be the perfect runtime environment for a decentralized exchange. The miner with the highest sync rate and accuracy would also be the ideal miner to match a contract, and hash it into a block. The speed of the exchange would scale with the Proof of Ticker competition, always pushing high speed trading.
