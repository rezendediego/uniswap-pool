const { ethers } = require("hardhat")

//npx hardhat run scripts/deployStableCoin.js --network ropsten
//Stable Coin deployed to:  0xFDbBa00bB37306A17ec973EdB9086901B51581e6
async function main(){
    const [deployer] = await ethers.getSigners();

    const StableCoin = await ethers.getContractFactory("StableCoin", deployer);
    const stableCoin = await StableCoin.deploy(20000);

    console.log("Stable Coin deployed to: ", stableCoin.address);

}

//snippet borrowed from Uniswap
main()
.then(() => process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
});
