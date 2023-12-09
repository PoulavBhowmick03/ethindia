import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "@semaphore-protocol/hardhat"
import "@typechain/hardhat"
import { config as dotenvConfig } from "dotenv"
import "hardhat-gas-reporter"
import { HardhatUserConfig } from "hardhat/config"
import { NetworksUserConfig } from "hardhat/types"
import { resolve } from "path"
import "solidity-coverage"
import { config } from "./package.json"
import "./tasks/deploy"

dotenvConfig({ path: resolve(__dirname, "../../.env") })

function getNetworks(): NetworksUserConfig {
        const accounts = [`0xedd0a374fb70992c742af5ff48618adf91eb6f97656be5ed122a6fc0ff3aed3e`]

        return {
            goerli: {
                url: `https://goerli.infura.io/v3/2aeba71bdc3849adb359e98b1b8ef8ec`,
                chainId: 5,
                accounts
            },
            arbitrum: {
                url: "https://arb1.arbitrum.io/rpc",
                chainId: 42161,
                accounts
            }
        }

    return {}
}

const hardhatConfig: HardhatUserConfig = {
    solidity: config.solidity,
    paths: {
        sources: config.paths.contracts,
        tests: config.paths.tests,
        cache: config.paths.cache,
        artifacts: config.paths.build.contracts
    },
    networks: {
        hardhat: {
            chainId: 1337
        },
        
        goerli: {
            url: `https://goerli.infura.io/v3/2aeba71bdc3849adb359e98b1b8ef8ec`,
            chainId: 5,
            accounts :  [`0xedd0a374fb70992c742af5ff48618adf91eb6f97656be5ed122a6fc0ff3aed3e`]
        },
    },
    gasReporter: {
        currency: "USD",
        enabled: process.env.REPORT_GAS === "true",
        coinmarketcap: process.env.COINMARKETCAP_API_KEY
    },
    typechain: {
        outDir: config.paths.build.typechain,
        target: "ethers-v5"
    }
}

export default hardhatConfig
