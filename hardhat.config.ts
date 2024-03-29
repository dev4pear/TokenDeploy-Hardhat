require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')

task('deployToken', 'Deploys the MyToken contract')
  .addParam('name', 'The name of the token')
  .addParam('symbol', 'The symbol of the token')
  .addParam('supply', 'The initial supply')
  .setAction(async (taskArgs, hre) => {
    const { name, symbol, supply } = taskArgs
    const Token = await hre.ethers.getContractFactory('MyToken')
    const token = await Token.deploy(name, symbol, supply)

    console.log(`Token deployed to: ${token.address}`)
  })

module.exports = {
  solidity: {
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yul: false,
        },
      },
    },
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: 0,
      },
      allowUnlimitedContractSize: false,
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/77d364870e3f4b359f7cc90ca5521020',
      chainId: 1,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 10000000000,
    },
    sepolia: {
      url: 'https://sepolia.infura.io/v3/77d364870e3f4b359f7cc90ca5521020',
      chainId: 11155111,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 10000000000,
    },
  },
  mocha: {
    timeout: 200000,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}
