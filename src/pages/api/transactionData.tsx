// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const {txhash}=req.query;
  const response=await axios.post(
    "https://starknet-mainnet.blastapi.io/9705fb49-51ea-448c-b75b-4ab6a3f7e8ed",
    {
      jsonrpc: "2.0",
      method: "starknet_getTransactionReceipt",
      params: [
        txhash
      ],
      id: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if(response?.data){
      return res.status(200).json({ transactionData:response?.data });
  }

}
