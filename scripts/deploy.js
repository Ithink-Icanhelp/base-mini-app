const hre = require("hardhat");

async function main() {
  console.log("Deploying BaseApp contract...");
  
  const BaseApp = await hre.ethers.getContractFactory("BaseApp");
  const contract = await BaseApp.deploy();
  
  // Ждем пока контракт будет развернут
  await contract.waitForDeployment();
  
  // Получаем адрес контракта
  const contractAddress = await contract.getAddress();
  
  console.log("BaseApp deployed to:", contractAddress);
  
  const fs = require("fs");
  fs.writeFileSync("contract-address.txt", contractAddress);
  console.log("Contract address saved to contract-address.txt");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});