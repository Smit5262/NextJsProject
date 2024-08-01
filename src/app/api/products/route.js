import { NextResponse } from "next/server";
import { connectToDatabase } from "../connection";


export async function POST(request) {
  try {
    const { products } = await connectToDatabase();
    let body = await request.json();

    const product = await products.insertOne(body);
    return NextResponse.json({ product, ok: true });
  } catch (error) {
    console.error("Error in POST route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET(request) {
  try {
    const { products } = await connectToDatabase();
    const category = request.nextUrl.searchParams.get('category') || 'Beauty';

    const query = { category: { $regex: category, $options: 'i' } };
    const allProducts = await products.find(query).toArray();

    return NextResponse.json(allProducts);
  } catch (error) {
    console.error('Error in GET route:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}