const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Account:", deployer.address);
  
  const provider = new ethers.JsonRpcProvider("https://mainnet.base.org");
  const balance = await provider.getBalance(deployer.address);
  
  console.log("Balance on Base Mainnet:", ethers.formatEther(balance), "ETH");
  console.log("Need at least 0.001 ETH for deployment");
}

main().catch(console.error);