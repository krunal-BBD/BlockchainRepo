const sha256 = require("sha256");
const merkleroot = require("./Merkleroot");

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    // initial block
    let merkle = new merkleroot([]);
    return {
      index: 1,
      timestamp: Date.now(),
      transactions: [],
      nonce: 0,
      hash: "hash",
      previousblockHash: "000",
      Merkleroot: merkle.getRoot(),
      MerkleTree: merkle,
    };
  }

  getLastBlock() {
    // last block of the chain
    return this.chain[this.chain.length - 1];
  }

  generateHash(previousblockHash, timestamp, pendingTransactions, merkle) {
    let hash = "";
    let nonce = 0;

    while (hash.substring(0, 3) != "000") {
      // Difficulty
      nonce++;
      hash = sha256(
        previousblockHash +
          timestamp +
          JSON.stringify(pendingTransactions) +
          nonce +
          merkle
      ).toString();
    }
    return { hash, nonce };
  }

  createTransaction(amount, sender, recipient) {
    // creating transaction
    this.pendingTransactions.push({ amount, sender, recipient });
  }

  createBlock() {
    const timestamp = Date.now;
    const transactions = this.pendingTransactions;
    const previousblockHash = this.getLastBlock().hash;
    let merkle = new merkleroot(
      transactions.map((transactions) => JSON.stringify(transactions))
    );

    const generateHash = this.generateHash(
      previousblockHash,
      timestamp,
      transactions,
      merkle.getRoot()
    );
    const newblock = {
      index: this.chain.length + 1,
      timestamp,
      transactions,
      nonce: generateHash.nonce,
      hash: generateHash.hash,
      previousblockHash,
      Merkleroot: merkle.getRoot(),
      MerkleTree: merkle,
    };
    this.pendingTransactions = [];
    this.chain.push(newblock);

    return newblock;
  }
}
module.exports = Blockchain;
