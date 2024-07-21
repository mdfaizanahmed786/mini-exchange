import React from "react";
import DashboardContainer from "../../components/Dashboard/Transactions";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client"
import authOptions from "../../../lib/auth";

async function Dashboard() {
    const session = await getServerSession(authOptions);
    const transactions = await prisma.transaction.findMany({
        where:{
            userId: session?.user.id
        },
        select:{
            amount:true,
            status:true,
            transaction_type:true,
            createdAt:true
        }
       
    })
  return (
    <div className="flex items-center min-h-full">
      <DashboardContainer transactions={transactions} />
    </div>
  );
}

export default Dashboard;
