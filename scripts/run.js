const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("lima");
    await domainContract.deployed();
    console.log("Contract deployed to: ", domainContract.address);
    console.log("contract deployed by: ", owner.address);

    let txn = await domainContract.register("mortal", {value: hre.ethers.utils.parseEther("0.1")});
    await txn.wait();

    const address = await domainContract.getAddress("mortal");
    console.log("owner of domain mortal: ", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);

    console.log("balance of contract: ", hre.ethers.utils.formatEther(balance));

  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();