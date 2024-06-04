// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const {transactions}=req.body;
    try {
        if(transactions){
            const formattedTransactions = transactions.map((transaction:any) => ({
                calldata: transaction.calldata,
                max_fee: transaction.max_fee,
                nonce: transaction.nonce,
                sender_address: transaction.sender_address,
                signature: transaction.signature,
                transaction_hash: transaction.transaction_hash,
                type: transaction.type,
                version: transaction.version
              }));
            //   console.log(formattedTransactions,"ff")
            const entery=await prisma.transaction.createMany({
                data:formattedTransactions
            })
            if(entery){
                return res.status(200).json('success')
            }
            // const delee=await prisma.transaction.deleteMany()
            // console.log(delee)
//               const allContent=await prisma.transaction.findMany();
//   console.log(allContent,"content")
        }
    } catch (error) {
        console.log(error,'err')
    }

}
