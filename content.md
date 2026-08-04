<!--
  Source of truth for the site's text. Edit this, then run: ./build.py
  Conventions:
    ## heading                -> a section
    ### Title [tag]           -> a project card ([tag] optional, shows above title)
    - item                    -> list: inside a project it's a sublist;
                                 elsewhere it's the team grid ("name - role")
    links: [label](url) ...   -> links row of a project card
    a paragraph that is just an email -> mailto link
-->

## what we do

We are a team of engineers and researchers working towards making privacy tooling onchain actually usable. We build confidential tokens, mixers, private games, and the SDKs that let other teams integrate them. Most of our work is zk, but we'll use whatever tech delivers real privacy.

We come from physics, math and statistics. The work runs in production: over $6M processed through Privacy Pools, our SDKs integrated into the Ethereum Foundation's Kohaku sdk, and protocols we designed from scratch adopted by third-party wallets.

## vision

The components of privacy already exist. What's missing is a way to use them that does not suck: integrations are broken, tooling is painful, and a private experience onchain is close to impossible for a normal human being. That's not a cryptography problem anymore. It's an engineering problem: taking the right tradeoffs so a normal degen or dao hippie gets private without wanting to kill himself in the process.

We believe in free software, and we know how much slavetech sits in the middle of everything.

## partners and projects:

### Kohaku [ethereum foundation]

The Ethereum Foundation's flagship privacy initiative: an open SDK and reference wallet bringing private-by-default transactions to any Ethereum wallet. We contribute to the core SDK that wallet teams integrate to make privacy a first-class feature.

- [privacy pools v1 sdk](https://github.com/ethereum/kohaku/tree/master/packages/privacy-pools)
- [tongo.cash sdk](https://github.com/fatlabsxyz/tongo/tree/master/packages/tongo-sdk)
- [tornado.cash sdk](https://github.com/ethereum/kohaku/tree/master/packages/tornado-cash)

links: [kohaku repo](https://github.com/ethereum/kohaku)

### Privacy Pools v1 [0xbow]

Compliant anonymous transfers on Ethereum and L2s: users deposit and withdraw privately while the protocol filters illicit funds to keep the anonymity set clean. We build and maintain the SDK and Relayer, and we're porting the full protocol to Starknet with a custom view-key compliance system. Over $6M processed, integrated into Kohaku.

links: [website](https://privacypools.com) [repo](https://github.com/0xbow-io/privacy-pools-core) [starknet port](https://github.com/0xbow-io/privacypools-starknet)

### Privacy Pools v2 [0xbow]

The next generation of the protocol. Funds stay shielded inside the pool: internal peer-to-peer transfers without withdrawing to a fresh address, private payment requests, and the same clean anonymity set guarantees as v1. Public testnet live on Sepolia.

links: [website](https://privacypools.com) [repo](https://github.com/0xbow-io/privacy-pools-core)

### Tornado Cash Proof of Association [0xbow]

A zk tool that lets Tornado Cash users prove their withdrawals are not linked to illicit deposits, without revealing which deposit is theirs. The proof is generated locally from the user's note and checked against a curated blacklist of 16,000+ addresses; clean withdrawals get added to a public registry.

links: [website](https://tornado.0xbow.io/)

### Tongo: Confidential ERC20s [starknet]

A drop-in way to give any token hidden balances and private transfers, with optional viewing keys for auditability. Designed and built end to end by us (contracts, cryptography and SDK), powered by ElGamal encryption, range proofs and Proof of Exponent. Already adopted by third-party SDKs (Starkzap) and wallets (KAGE).

links: [website](https://tongo.cash) [demo](https://demo.tongo.cash) [docs](https://docs.tongo.cash) [repo](https://github.com/fatlabsxyz/tongo)

### Sumo Login [starknet]

Wallet onboarding without seed phrases. Users access a smart wallet with Web2 identities like Google or Discord, no extensions, no backups, with zk proofs generated from their login tokens under the hood. The UX of Web2 with the security model of Web3.

links: [repo](https://github.com/fatlabsxyz/sumo-login-cairo) [docs](https://sumologin.com/)

### Wallet Research [miden]

R&D partnership with the Miden team on bringing existing wallets and apps into Miden's blockchain. Miden is a programmable privacy network where transactions execute locally and get proven client-side, so users can transact without broadcasting their state to the network.

links: [website](https://miden.xyz)

### Terry Escape [aztec]

A stress test of Aztec's Noir stack on one of the hardest problems in private applications: multiplayer shared state, where every player holds hidden information but every move must be provable. We combined Noir circuits with oblivious transfers and homomorphic encryption to get a game that runs with no trusted server and no way to cheat, all proving done client-side. The game itself: our friend Terry escaping (or killing) some glowies.

links: [repo](https://github.com/fatlabsxyz/terry-escape)

## team:
- bezze — masterchief
- parsley — not dev
- casio — udyr main
- sporadix — fungal chaman
- albatros — zk demigod
- daffy — stuff engineer
- juana — ux commander
- goom — angular preacher
- lucho — webmaster
- radagast — board game researcher
- poroto — nixos purifier
- argenswag - temporary janitor

## contact us:

root@fatsolutions.xyz
