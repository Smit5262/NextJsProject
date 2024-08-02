import { NextResponse } from "next/server";
import { connectToDatabase } from "../connection";
import { ObjectId } from "mongodb";

export async function DELETE(request) {
  console.log("DELETE request received for /api/cart");
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is missing" }, { status: 400 });
  }

  try {
    const { userData } = await connectToDatabase();
    console.log("Connected to database");

    const objectId = new ObjectId(userId);

  
    const result = await userData.deleteMany({ userId: objectId });
    console.log("Delete operation result:", result);

    if (result.deletedCount === 0) {
      console.log("No items found for the given userId");
      return NextResponse.json(
        { message: "No items found for the given userId" },
        { status: 200 }
      );
    }

    console.log("Items deleted successfully");
    return NextResponse.json(
      { message: "Items deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting items:", error);
    return NextResponse.json(
      { error: "Failed to delete items", details: error.message },
      { status: 500 }
    );
  }
}
