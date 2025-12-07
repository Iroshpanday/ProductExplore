import type { Product } from "@/lib/types/product";
import Image from "next/image";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // 👈 FIX: unwrap params promise
  const productId = Number(id);

  if (isNaN(productId)) {
    console.log("Invalid ID:", id);
  }

  const url = `https://dummyjson.com/products/${productId}`;
  console.log("Fetching product:", url);

  const res = await fetch(url, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    return <div className="p-6">Product not found.</div>;
  }

  const product: Product = await res.json();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className="rounded-lg object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.brand}</p>
          <p className="mt-4">{product.description}</p>

          <div className="mt-4 space-y-2">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Price:</strong> ${product.price}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Reviews</h2>
      <div className="space-y-4">
        {product.reviews.map((review) => (
          <div key={`${review.reviewerEmail}-${review.date}`} className="border p-4 rounded">
            <strong>{review.reviewerName}</strong>
            <p>{review.comment}</p>
            <p className="text-yellow-500">⭐ {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
