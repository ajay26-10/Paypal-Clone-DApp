import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

let web3;

const getWeb3 = async () => {
  const provider = await detectEthereumProvider();
  if (provider) {
    web3 = new Web3(provider);
  } else {
    console.log('Please install MetaMask!');
  }
  return web3;
};

export default getWeb3;
