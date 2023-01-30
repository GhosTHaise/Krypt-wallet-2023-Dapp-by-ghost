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
    const [isLoading, setIsLoading] = useState(false);
    const [TransactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

    const handleChange = (e,name) => {
        setFormData((prevState)=>(
            {...prevState,[name] : e.target.value}
        ));
    }
    
    const getAllTransactions = async() => {
        try {
            if(!ethereum) avertissement();
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransaction();

            console.log(availableTransactions);
        } catch (err) {
            console.log(err);
            throw new Error("No ethereum Object.");
        }
    }
        
    const checkIfWalletIsConnected = async() => {
        try{
            if(!ethereum) avertissement();
        
            const accounts = await ethereum?.request({method : "eth_accounts"});
            if(accounts.length){
                setCurrentAccount(accounts[0]);

                //get all transactions
                getAllTransactions();
            }else{
                console.log("No accounts found");
            }
            console.log(accounts)
        }catch(error){
            console.log(err);
            throw new Error("No ethereum Object.");
        }
    }

    const checkIfTransactionExists = async () => {
        try{
            //get transaction contract
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            localStorage.setItem("transactionCount",transactionCount);
        }catch(e){
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
        //console.log(ethereum)
        try{
            if(!ethereum) avertissement();
            //console.log(FormData)
            //get all fileds
            const {addressTo,amount,keyword ,message} = FormData;
            //convert amount to hexa
            const parsedAmount = await ethers.utils.parseEther(amount);
            //get transaction contract
            const transactionContract = getEthereumContract();
            console.log("parsed amount : ",parsedAmount);
            //do transaction from metamask
            await ethereum.request({
                method : "eth_sendTransaction",
                params : [
                    {
                        from : CurrentAccount,
                        to : addressTo,
                        gas : "0x5208", //21000 Gwei -> *18 wei
                        value : parsedAmount._hex
                    }
                ]
            });


            //store this transaction
            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                message,
                keyword
            );

            setIsLoading(true);
            console.log(`Loading - ${transactionHash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`success - ${transactionHash}`);
            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

        }catch(err){
            console.log(err);
            throw new Error("No ethereum Object.");
        }
    }
    //
    useEffect(()=>{
        checkIfWalletIsConnected();
        checkIfTransactionExists();
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
