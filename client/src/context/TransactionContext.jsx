import React,{useEffect,useState} from "react";
import {ethers} from "ethers"
import { contractABI,contractAddress } from "../utils/constant";

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress,contractABI,signer);

    return transactionContract;
}

const avertissement = () => {
    alert("please install Metamask !")
}

export const TransactionProvider = ({children}) => {
    const [CurrentAccount, setCurrentAccount] = useState("");
    //get imput from data
    const [FormData,setFormData] = useState(
        {
            addressTo : "",
            amount : "",
            keyword : "",
            message : ""
        });
    
    const handleChange = (e,name) => {
        setFormData((prevState)=>(
            {...prevState,[name] : e.target.value}
        ));
    }
    
        
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
            //get all fileds
            const {addressTo,amount,keyword ,message} = FormData;
            //convert amount to hexa
            const parsedAmount = await ethers.utils.parseEther(amount);
            //get transaction contract
            const transactionContract = getEthereumContract();
            console.log("parsed amount : ",parsedAmount);
            //do transaction from metamask
            await ethereum.request({
                method : "eth_send_transaction",
                from : CurrentAccount,
                to : addressTo,
                gas : "0x5208", //21000 Gwei -> *18 wei
                value : parsedAmount._hex
            })
        }catch(err){
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
                CurrentAccount,
                setFormData,
                FormData,
                handleChange,
                sendTransaction 
            }
        }
    >
        {...children}
    </TransactionContext.Provider >
    )
}
