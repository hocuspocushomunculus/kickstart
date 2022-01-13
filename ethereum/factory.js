import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';
const abi = CampaignFactory.abi;
//const bytecode = CampaignFactory.evm.bytecode.object;

const instance = new web3.eth.Contract( 
    abi,
    '0x3715cD5DD8F38193B7BFef99aD8d8A35c84cd6E3'
);

export default instance;