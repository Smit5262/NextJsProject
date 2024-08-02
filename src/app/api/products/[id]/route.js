import { connectToDatabase } from "../../connection";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { quantity } = await request.json();
    const { products } = await connectToDatabase();

    if (!ObjectId.isValid(id) || typeof quantity !== "number") {
      return NextResponse.json(
        { error: "Invalid product ID or quantity" },
        { status: 400 }
      );
    }

    const result = await products.updateOne(
      { _id: new ObjectId(id) },
      { $set: { quantity: quantity } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return NextResponse.json(
      { error: "Failed to update product quantity. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Validate the ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const { products } = await connectToDatabase();

    // Find the product by ID
    const product = await products.findOne({ _id: new ObjectId(id) });

    // If no product is found
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Return the product data
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product. Please try again." },
      { status: 500 }
    );
  }
}