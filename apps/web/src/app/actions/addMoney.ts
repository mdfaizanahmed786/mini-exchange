"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import authOptions from "../../lib/auth";

export async function addMoney(amount: number, provider:string){

    try {
        const session = await getServerSession(authOptions);
        console.log(session?.user)
        const token=Math.random().toString(36).substring(7);
        const transaction=await prisma.transaction.create({
            data: {
                status: "PENDING",
                transaction_type:"BUSINESS",
                userId: session?.user.id,
                token,
                amount: Math.floor(amount), 
                payeeId: null, 
            }
        })

        return {
             success: true,
             data: {
                amount: transaction.amount,
                
             }
        }
      
        
    } catch (error) {
        console.log(error, "THIS IS ERROR")
    }

    
    
}