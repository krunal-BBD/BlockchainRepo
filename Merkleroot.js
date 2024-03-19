const sha256 = require("sha256");

class MerkleTree {
    constructor(transactions) {
        this.transactions = transactions;
        this.layers = [transactions.map(transaction => sha256(transaction))];
        this.buildTree();
    }

    buildTree() {
        let currentLayer = this.transactions.map(transaction => sha256(transaction));

        while (currentLayer.length > 1) {
            const nextLayer = [];
            for (let i = 0; i < currentLayer.length; i += 2) {
                const combinedHash = sha256(currentLayer[i] + (currentLayer[i + 1] || currentLayer[i])); // Handle odd number of elements
                nextLayer.push(combinedHash);
            }
            this.layers.push(nextLayer);
            currentLayer = nextLayer;
        }
    }

    getRoot() {
        return this.layers[this.layers.length - 1][0];
    }
}

module.exports = MerkleTree;
// Sample transactions
// const transactions = [
//     { amount: 10, sender: "Alice", recipient: "Bob" },
//     { amount: 20, sender: "Bob", recipient: "Charlie" },
//     { amount: 30, sender: "Charlie", recipient: "Alice" },
// ];

// // Create Merkle tree
// const merkleTree = new MerkleTree(transactions.map(transaction => JSON.stringify(transaction)));

// // Display Merkle root
// console.log(merkleTree);
