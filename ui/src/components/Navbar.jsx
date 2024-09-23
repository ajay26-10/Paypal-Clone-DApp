import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserProvider } from 'ethers'

function Navbar() {
    const provider = new BrowserProvider(window.ethereum);
    async function connectToMetamask() {
    try{
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
    }catch(error){
      console.log("Failed to connect to Metamask", error);
    }
  }
  return (

    <>
    <div className='flex flex-row p-4'>
        <img src='/home/ajay/KBA/Paypal Clone DApp/ui/public/logo.png'></img>
        <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg mr-2">Home</Link>
        <button className="ml-6 bg-blue-500 hover:bg-blue-600 top-14   text-white font-bold py-2 px-6 rounded-lg shadow-lg " onClick={connectToMetamask()}>
    Connect to Metamask
</button>
    </div>
    </>
  )
}

export default Navbar