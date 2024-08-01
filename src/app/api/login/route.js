import { connectToDatabase } from "../connection";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { users, userData } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    const userId = searchParams.get("userId");

    if (email === "admin2411@gmail.com" && password === "admin2411") {
      return NextResponse.redirect(new URL("/Admin", request.url));
    }

    if (email && password) {
      if (!email || !password) {
        return NextResponse.json(
          { error: "Email and password are required" },
          { status: 400 }
        );
      }

      const user = await users.findOne({ email });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      if (user.password !== password) {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 401 }
        );
      }

      if (!user.cart) {
        await users.updateOne({ _id: user._id }, { $set: { cart: [] } });
      }

      return NextResponse.json({ userId: user._id.toString(), ok: true });
    }

    if (userId) {
      const userCart = await userData
        .find({ userId: new ObjectId(userId) })
        .toArray();
      return NextResponse.json(userCart);
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Error in GET route:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userData } = await connectToDatabase();
    const { userId, productId, name, price, quantity, image } =
      await request.json();

    if (!userId || !productId || !name || !price || !quantity) {
      return NextResponse.json(
        { error: "All product details are required" },
        { status: 400 }
      );
    }

    const newCartItem = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      name: name,
      price: price,
      quantity: quantity,
      image: image,
    };

    const result = await userData.insertOne(newCartItem);

    if (result.acknowledged) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json(
        { error: "Failed to add to cart" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in POST route:", error);
    return NextResponse.json(
      { error: "Failed to add to cart. Please try again." },
      { status: 500 }
    );
  }
}
