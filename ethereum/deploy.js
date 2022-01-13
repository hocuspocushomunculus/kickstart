// deploy code will go here
const path = require("path");
//require("dotenv").config({path: "../.env"});

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const abi = compiledFactory.abi;
const bytecode = compiledFactory.evm.bytecode.object;


const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    "wss://ropsten.infura.io/ws/v3/" + process.env.INFURA_API_KEY
)

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account:', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode})
        .send({ from: accounts[0] });

    console.log('Contract deployed to:', result.options.address);
    provider.engine.stop();
};
deploy();
