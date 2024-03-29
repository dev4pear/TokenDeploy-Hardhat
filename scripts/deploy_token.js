const { ethers } = require('hardhat')
const fs = require('fs')
const addresses = require('./addresses.json')

async function main() {
  const args = process.argv.slice(2)
  console.log(args)
  if (args.length < 3) {
    console.error('Usage: node script.js <name> <symbol> <initialSupply>')
    process.exit(1)
  }
  const [name, symbol, initialSupply] = args

  const [deployer] = await ethers.getSigners()
  console.log('deployer: ', deployer.address)
  const factory = await ethers.getContractFactory('MyToken')
  const deployment = await factory.deploy(
    name,
    symbol,
    ethers.utils.parseUnits(initialSupply, 18)
  )
  await deployment.deployed()
  addresses.TOKEN_ADDR = deployment.address
  console.log('Token deployed at: ', deployment.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
