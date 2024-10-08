import dotenv from 'dotenv';
import { Keypair } from "@solana/web3.js";
dotenv.config();

interface ENV{
    SECRET_KEY : string | undefined;
}
interface Config{
    solanakeypair : Keypair;
}
const getConfig = (): ENV =>{
    return {
        SECRET_KEY: process.env.SECRET_KEY,
    };
};
const getSanitizedConfig = (config : ENV): Config =>{
    if(config.SECRET_KEY === undefined){
        throw new Error('SECRET_KEY is not defined in .env file');
    }
    try {
        const secretKeyArray = config.SECRET_KEY.split(',').map(num =>parseInt(num, 10));

        if (secretKeyArray.length !== 64) {
            throw new Error('SECRET_KEY must be a comma-separated list of 64 numbers');
          }
          const secretKey = new Uint8Array(secretKeyArray);
          const solanakeypair = Keypair.fromSecretKey(secretKey);
          return {solanakeypair};
    } catch (err){
        if(err instanceof Error){
            throw new Error (`INVALID SECRET_KEY format: ${err.message}`);
        } else{
            throw new Error('An unknown error occured while proccessing SECRET_KEY');
        }
    }
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;