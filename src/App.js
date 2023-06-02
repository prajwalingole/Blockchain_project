import React from 'react'
import { useState, useEffect } from 'react';
import { ethers } from "ethers"
import { contractAbi, contractAddress } from "./Utils/contract"
import Login from "./Components/Login"
import Vote from "./Components/Vote"
import "./App.css"

const App = () => {
  // const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setremainingTime] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState('');
  const [CanVote, setCanVote] = useState(true);

  useEffect(() => {
    getCandidates();
    getRemainingTime();
    getCurrentStatus();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  }

  const canVote = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const voteStatus = await contractInstance.voters(await signer.getAddress());
    // console.log(voteStatus);
    setCanVote(voteStatus);

  }

  async function vote() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );

    const tx = await contractInstance.vote(number);
    await tx.wait();
    canVote();
  }

  const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0 && account !== accounts[0]) {
        setAccount(accounts[0]);
        canVote();
      } else {
        setIsConnected(false);
        setAccount(null);
      }
  }

  const getCandidates = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const candidatesList = await contractInstance.getAllVotesOfCandiates();
    const formattedCandidates = candidatesList.map((candidate, index) => {
      return {
        index: index,
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber()
      }
    });
    setCandidates(formattedCandidates);
    // console.log(candidatesList)
  }


  const getCurrentStatus = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const status = await contractInstance.getVotingStatus();
    if(votingStatus) setVotingStatus(status)
    else setVotingStatus(status)
   
  }

  const getRemainingTime = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress, contractAbi, signer
    );
    const time = await contractInstance.getRemainingTime();
    setremainingTime(parseInt(time, 16));
  }

  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        // console.log("Metamask Connected : " + address);
        setIsConnected(true);
        canVote();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Metamask is not detected")
    }
  }

  return (
    <div >
      {isConnected ? (<Vote
        account={account}
        candidates={candidates}
        remainingTime={remainingTime}
        number={number}
        handleNumberChange={handleNumberChange}
        voteFunction={vote}
        showButton={CanVote} />) :
        (<Login connectWallet={connectToMetamask} />)}
    </div>
  )
}

export default App