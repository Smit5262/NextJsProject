import { connectToDatabase } from "../connection";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { users } = await connectToDatabase();
    const { userId } = await req.json();

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ isValid: false });
    }

    const user = await users.findOne({ _id: new ObjectId(userId) });

    return NextResponse.json({ isValid: !!user });
  } catch (error) {
    console.error("Error in POST /api/verifyUserId:", error);
    return NextResponse.json({ isValid: false }, { status: 500 });
  }
}
export const runtime = "experimental-edge";
