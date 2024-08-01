"use client";
import { useParams } from "next/navigation";
import ProductPage from "../components/ProductPage";

export default function CategoryPage() {
  const params = useParams();
  return <ProductPage initialCategory={params.category} />;
}
