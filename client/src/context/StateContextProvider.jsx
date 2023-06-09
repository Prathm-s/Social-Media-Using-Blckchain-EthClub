import React, { createContext, useEffect, useState } from 'react'
import Web3 from 'web3';
import configuration from '../contracts/PostContract.json'
import userConfiguration from '../contracts/UserContract.json'


export const StateContext = createContext()

function StateContextProvider({ children }) {



  const [contract, setContract] = useState();
  const [account, setAccount] = useState();
  const [userContract, setUserContract] = useState();


  useEffect(() => {
    loadWeb3();
    loadBlockChain();
  }, [])

  // Connect metamask with application 
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  // Load blockchain and get Account details 
  const loadBlockChain = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    // Post Contract 
    const contractAddress = configuration.networks["5777"].address;
    const contractABI = configuration.abi;
    const _contract = new web3.eth.Contract(contractABI, contractAddress);
    // userContract 
    const userContractAddress = userConfiguration.networks["5777"].address;
    const userContractABI = userConfiguration.abi;
    const userContract = new web3.eth.Contract(userContractABI, userContractAddress)

    const temp = await userContract.methods.getAllUsers().call();
    console.log(temp)
    setUserContract(userContract);
    setContract(_contract)

  }


  return (
    <StateContext.Provider value={{
      contract,
      account,
      userContract
    }}>
      {children}
    </StateContext.Provider>
  )
}

export default StateContextProvider
