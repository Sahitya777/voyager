import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import TransactionsTable from "@/components/TransactionsTable";
import { useDrawContext } from "@/context/DrawerContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [latestBlock, setlatestBlock] = useState<Number>()
  const [blockTransactions, setblockTransactions] = useState([])
  const [blockTimeStamp, setblockTimeStamp] = useState()

  const {timestampBlockwise, settimestampBlockwise}=useDrawContext();
  useEffect(()=>{
    const fetchdaata=async()=>{
      const res=await axios.get('/api/latestBlock')
      if(res?.data){
        setlatestBlock(res?.data?.Blockdata?.result);
      }
    }

    try{
      fetchdaata();
    }catch(err){
      console.log(err,"err in fetching latest block")
    }
  },[])

  useEffect(()=>{
    const fetchBlockTransactions=async()=>{
      const res=await axios.get(`/api/latestBlockTransactions?blockNumber=${latestBlock}`
      )
      if(res?.data){
        settimestampBlockwise({
          timeStamp:res?.data?.transactions?.result?.timestamp,
          blockNumber:res?.data?.transactions?.result?.block_number
        })
        setblockTimeStamp(res?.data?.transactions?.result?.timestamp)
        setblockTransactions(res?.data?.transactions?.result?.transactions)
        return {
          timeStamp: res?.data?.transactions?.result?.timestamp,
          blockNumber: res?.data?.transactions?.result?.block_number,
          transactions: res?.data?.transactions?.result?.transactions
        };
      }
    }
    // const fetchMultipleBlocksTransactions = async () => {
    //   const transactionsArray:any = [];
    //   const timestampMap:any = {};
    //   if(latestBlock){
    //     for (let i = 0; i <= 10; i++) {
    //       let blockNumber:any = (latestBlock) - i;
    //       console.log(blockNumber,"num")
    //       const result = await fetchBlockTransactions(blockNumber);
  
    //       if (result) {
    //         timestampMap[blockNumber] = result.timeStamp;
    //         transactionsArray.push(result.transactions);
    //       }
    //     }
    //     setblockTransactions(transactionsArray);
    //   }

    // };
    try{
      if (latestBlock) {
        fetchBlockTransactions();
        const intervalId = setInterval(fetchBlockTransactions, 30000); // Run every 30 seconds
  
        return () => clearInterval(intervalId); // Clear interval on component unmount or latestBlock change
      }
    }catch(err){
      console.log(err)
    }
  },[latestBlock])

  return (
    <>
      <Head>
        <title>Voyager</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" mt="2.5rem"  justifyContent="center" >
        <TransactionsTable transactions={blockTransactions} blockNumber={latestBlock}/>
      </Box>
    </>
  );
}