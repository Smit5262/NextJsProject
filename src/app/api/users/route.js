import { NextResponse } from "next/server";
import { connectToDatabase } from "../connection";
import { ObjectId } from "mongodb"; 

export async function POST(request) {
  try {
    const { users } = await connectToDatabase();
    let body = await request.json();

    const userData = await users.insertOne(body);
    return NextResponse.json({ userData, ok: true });
  } catch (error) {
    console.error("Error in POST route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { users } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is missing from the request" },
        { status: 400 }
      );
    }

    console.log(`Fetching data for userId: ${userId}`);

    let query;
    try {
      query = { _id: new ObjectId(userId) };
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    const userData = await users.findOne(query);

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error in GET route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
