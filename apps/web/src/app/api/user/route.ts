import { getSession } from "next-auth/react"
import authOptions from "../../../lib/auth";
import { getServerSession } from "next-auth";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, response:Response) {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        return Response.json({
            user: session.user
        })
    }
    return Response.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}