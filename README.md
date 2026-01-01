# Simple JavaScript Blockchain (Educational Project)

This project is a **very simple, educational implementation of a blockchain** written in JavaScript. It is designed **only to understand core blockchain ideas**, not for real-world use.

---

## Purpose of This Project

This code helps you understand:

* What a **blockchain** is
* How **transactions** work
* What **hashing** is
* How **mining (Proof of Work)** works
* Why **mining rewards are delayed**
* How balances are calculated

This is **NOT** a secure or production-ready blockchain.

---

## Core Idea (In One Sentence)

> **Blockchain is a list of blocks linked by hashes, where changing old data is extremely hard because it requires a lot of computing power.**

---

## Code Structure Overview

The project contains four main parts:

1. `Transaction` – represents money transfer
2. `Block` – groups transactions and secures them
3. `Blockchain` – manages the chain and mining
4. Example usage – shows how everything works

---

## 1.Transaction

```js
class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
```

### What it means (simple):

A transaction is just:

> **Who sends money → who receives → how much**

Example:

```
address1 → address2 : 100
```

This moves **existing money** between users.

---

## 2.Block

```js
class Block {
    constructor(timestamp, transaction, previousHash = '') {
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
}
```

### What a block contains:

* Timestamp (when it was created)
* List of transactions
* Hash of previous block
* Its own hash
* A nonce (number used for mining)

Think of a block as a **sealed box of transactions**.

---

### Hashing

```js
calculateHash() {
    return SHA256(
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transaction) +
        this.nonce
    ).toString();
}
```

### Why hashing matters:

* Hash = digital fingerprint
* Any small change → completely different hash
* Makes blocks **tamper-evident**

This is the main security idea of blockchain.

---

## 3️.Mining (Proof of Work)

```js
mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
        this.nonce++;
        this.hash = this.calculateHash();
    }
}
```

### What mining really means:

Mining is **guessing numbers (nonce)** until the hash starts with:

```
"00"  (difficulty = 2)
```

### Why this is important:

* Hashes are random
* No shortcut exists
* Must try many times (brute force)

This costs:

* Time
* CPU/GPU power
* Electricity

✔️ This makes cheating expensive.

---

## 4️. Blockchain

```js
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
}
```

### Genesis Block

```js
createGenesisBlock() {
    return new Block("01/01/2020", "Genesis Block", "0");
}
```

* First block in the chain
* Has no parent
* Required to start the blockchain

---

## Pending Transactions (Queue)

```js
createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
}
```

### Meaning:

* Transactions first go into a **waiting queue**
* They are NOT confirmed yet

Just like people waiting in line.

---

## Mining Pending Transactions

```js
minePendingTransactions(miningRewardAddress)
```

### Step-by-step flow:

1. Miner takes all pending transactions
2. Creates a new block
3. Links it to previous block
4. Mines it (Proof of Work)
5. Adds it to the chain
6. Creates a **reward transaction**

---

## Mining Reward (Very Important)

```js
new Transaction(null, minerAddress, 100)
```

### Key points:

* `null` sender = **new money created by system**
* Miner does NOT take money from users
* Reward is added as a normal transaction

**Reward is delayed**

### Why reward is delayed:

* Reward is added to the queue
* Miner must mine **one more block** to receive it

- This matches real blockchain design.

---

## Reward Flow (Simple)

```
Mine block → reward queued
Mine again → reward paid
```

Analogy:

> You work this month, salary is paid next month.

---

## Balance Calculation

```js
getBalanceOfAddress(address)
```

### How balance is calculated:

* Go through all blocks
* Add received amounts
* Subtract sent amounts

✔️ Balance is derived from history, not stored directly.

---

## Chain Validation

```js
isChainValid()
```

Checks:

* Has any block been changed?
* Do hashes still match?
* Are blocks still linked?

If any check fails → blockchain is invalid ❌

---

## Example Execution Flow

```js
myBlockchain.createTransaction(...)
myBlockchain.minePendingTransactions('miner-address')
```

### What happens:

1. Transactions are created
2. Miner mines first block → confirms transactions
3. Reward is queued (not paid yet)
4. Miner mines again → reward is paid

---

## Limitations (Very Important)

This project is **only for learning**.

Missing features:

* Digital signatures
* Transaction validation
* Balance checks before sending
* Network / multiple nodes
* Transaction fees
* Real consensus

DO NOT use this for real money.

---

## What This Project Teaches Correctly

- Block linking with hashes
- Proof of Work idea
- Delayed mining rewards
- Why cheating is expensive
- How trust is created using math

---

## Final Takeaway

> **Blockchain creates trust without a central authority by using hashes, linking, and expensive computation.**

This code is a **clean and simple mental model** of how blockchain works internally.

---

## References (Trusted Sources)

* Bitcoin Whitepaper – Satoshi Nakamoto
* Ethereum Documentation
* MIT Blockchain Basics

