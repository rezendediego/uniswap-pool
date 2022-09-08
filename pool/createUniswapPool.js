// node pool/createUniswapPool.js
//New Pool BonusCoin / StableCoin address:  0x43509Be63ff74405f6e028e09c4CF31A11AA242B

const {ethers} = require("ethers");
const axios = require("axios");
require("dotenv").config();
const UNISWAP_V3_FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
const ROPSTEN_PROVIDER = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL_ROPSTEN)
const WALLET_ADDRESS = process.env.WALLET_ADDRESS;
const WALLET_SECRET = process.env.WALLET_SECRET;
const STABLE_COIN_ADDRESS = "0xFDbBa00bB37306A17ec973EdB9086901B51581e6";
const BONUS_COIN_ADDRESS = "0x79bA0A619f07e92272F3F9a9f6b2527402EcE1C9";
const apiKey = process.env.API_KEY;
const wallet = new ethers.Wallet(WALLET_SECRET);
const connectedWallet = wallet.connect(ROPSTEN_PROVIDER);
const Bonus_Stable_fee =  500 // Uniswap Pair fee 

async function main(){
    //Set up V3 Factory
    const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${UNISWAP_V3_FACTORY_ADDRESS}&apikey=${apiKey}`
    const res = await axios.get(url);
    console.log("res.data.result:  ",res.data.result);
    const abi = JSON.parse(res.data.result);
    const factoryContract = new ethers.Contract(
        UNISWAP_V3_FACTORY_ADDRESS,
        abi,
        ROPSTEN_PROVIDER
    );

    // Create the pool
    const tx = await factoryContract.connect(connectedWallet).createPool(
        BONUS_COIN_ADDRESS,
        STABLE_COIN_ADDRESS,
        Bonus_Stable_fee
    );

    const receipt = await tx.wait();
    console.log(">>> receipt: ", receipt);


    // Get Pool Address
    const newPoolAddress = await factoryContract.getPool(
        BONUS_COIN_ADDRESS,
        STABLE_COIN_ADDRESS,
        Bonus_Stable_fee
    );

    console.log(">>> New Pool BonusCoin / StableCoin address: ", newPoolAddress);

}

main();