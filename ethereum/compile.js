const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

var input = {
  language: 'Solidity',
  sources: {
      'Campaign.sol' : {
          content: source
      }
  },
  settings: {
      outputSelection: {
          '*': {
              '*': [ '*' ]
          }
      }
  }
};

var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];

fs.ensureDirSync(buildPath);
console.log(output);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    );
}

//exports.abi = output.contracts['Campaign.sol']['Campaign'].abi;
//exports.bytecode = output.contracts['Campaign.sol']['Campaign'].evm.bytecode.object;