import express from "express";
const app = express();
import prisma from "@repo/db/client";

app.post("/webhook", async (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  //  to process the payment, we need to add a transaction here. (we can't directly update the payment amount in the user's account)

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: paymentInformation.userId,
        },
        data: {
          balance: {
            increment: paymentInformation.amount,
          },
        },
      }),

      prisma.transaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
           status: "COMPLETED",
        },
      }),
    ]);

    return res.status(200).json({
      message: "Payment successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Payment failed",
    });
  }

  // Update balance in db, add txn
});

app.listen(4001, () => {
  console.log("Example app listening on port 3000!");
});
