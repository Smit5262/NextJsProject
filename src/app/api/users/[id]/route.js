import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../connection";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, email, phone, address } = await request.json();

  const { users } = await connectToDatabase();
  try {
    const result = await users.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          email,
          phone,
          address,
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const { userData } = await connectToDatabase();
  try {
    const result = await userData.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}