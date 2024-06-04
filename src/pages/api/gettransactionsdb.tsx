// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    try {
        const allContent=await prisma.transaction.findMany({
            take:700
        });
        return res.status(200).json({transactions:allContent})
    } catch (error) {
        console.log(error,'err')
    }

}
