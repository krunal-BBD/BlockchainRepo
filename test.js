const Blockchain = require("./Blockchain");

let coin = new Blockchain();

coin.createTransaction(100, "jknkjnkjnkn", "jbjhhbkjbhj");
coin.createTransaction(200, "jkbjhvbfjbdhbfdv", "jfhjbfjsbdfjsfsf");
coin.createTransaction(300,"ojiouhuuhiuhnddsd","nhsbdhjbsjfbjhbbfsd");

coin.createBlock();

// coin.createTransaction(2909,"ugyvjhkhuigyvg","higuiougyijhb");
// coin.createTransaction(6567,"uhyvjgyivhbkbv","iuygvuvhjv");

// coin.createBlock();

console.log(coin.chain[1].MerkleTree);
