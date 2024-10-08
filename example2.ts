import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey("CRtPaRBqT274CaE5X4tFgjccx5XXY5zKYfLPnvitKdJx");
const balance = await connection.getBalance(address);
const balanceInSol = balance/ LAMPORTS_PER_SOL;
console.log(`The balance of the account ${address} is ${balanceInSol} SOL`);
console.log("Connected");