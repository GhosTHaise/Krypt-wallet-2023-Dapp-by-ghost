import React,{useEffect,useState} from "react";
import {ethers} from "ethers"
import { contractABI,contractAddress } from "../utils/constant";

const TransactionContext = React.createContext()