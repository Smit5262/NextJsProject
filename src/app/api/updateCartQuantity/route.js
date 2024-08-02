import { ObjectId } from "mongodb";
import { connectToDatabase } from "../connection";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    const { id, quantity } = await request.json();

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const { userData } = await connectToDatabase();
    const result = await userData.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { quantity },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Cart item updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 });
  }
}
