import React,{useEffect,useState} from "react";
import {ethers} from "ethers"
import { contractABI,contractAddress } from "../utils/constant";

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const transaction = new ethers.Contract(contractAddress,contractABI,signer);

    console.log({
        provider,
        signer,
        transaction
    })
}

const avertissement = () => {
    alert("please install Metamask !")
}

export const TransactionProvider = ({children}) => {
    const [CurrentAccount, setCurrentAccount] = useState("");
    const checkIfWalletIsConnected = async() => {
        try{
            if(!ethereum) avertissement();
        
            const accounts = await ethereum?.request({method : "eth_accounts"});
            if(accounts.length){
                setCurrentAccount(accounts[0]);

                //get all transactions
            }else{
                console.log("No accounts found");
            }
            console.log(accounts)
        }catch(error){
            console.log(err);
            throw new Error("No ethereum Object.");
        }
    }
    const connectWallet =  async() => {
        try{
            if(!ethereum) avertissement();
            const [accounts] = await ethereum?.request({method : "eth_requestAccounts"});
            console.log(accounts);
            setCurrentAccount(accounts);
        }catch(err){
            console.log(err);
            throw new Error("No ethereum Object.");
        }
    }

    const sendTransaction = async () => {
        try{
            if(!ethereum) avertissement();

            //get data from the form
        }catch(error){
            console.log(err);
            throw new Error("No ethereum Object.");
        }
    }
    //
    useEffect(()=>{
        checkIfWalletIsConnected();
    },[]);

    return (
    <TransactionContext.Provider 
        value={
            {
                getEthereumContract,
                connectWallet,
                CurrentAccount
            }
        }
    >
        {...children}
    </TransactionContext.Provider >
    )
}
