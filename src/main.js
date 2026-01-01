import { Blockchain, Transaction } from './blockchain.js';
import elliptic from 'elliptic';
const EC = elliptic.ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('3f18987b9c32e61141ad2811816ebec0a34cf5a7adcb36f548f3913e7e1e277a');
const myWalletAddress = myKey.getPublic('hex');

let myBlockchain = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'address2', 10);
tx1.signTransaction(myKey);
myBlockchain.createTransaction(tx1);

console.log('\n Starting the miner...');
myBlockchain.minePendingTransactions(myWalletAddress);

console.log('\nBalance of my wallet is', myBlockchain.getBalanceOfAddress(myWalletAddress));


myBlockchain.chain[1].transaction[0].amount = 1;

console.log('Is blockchain valid?', myBlockchain.isChainValid() ? 'Yes' : 'No');