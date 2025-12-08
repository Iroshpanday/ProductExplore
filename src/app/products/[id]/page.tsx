import type { Product } from "@/lib/types/product";
import Image from "next/image";
import { Star, Package,  ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import Link from "next/link";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          <Package className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product not found</h2>
          <p className="text-gray-600 dark:text-gray-400">The product you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const product: Product = await res.json();

  const originalPrice = product.discountPercentage 
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-indigo-600  dark:hover:text-indigo-400 transition-colors text-black-600">Home</Link>
          <span>/</span>
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium capitalize">{product.category}</span>
        </div>

        {/* Main Product Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700 group">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
                {product.stock < 10 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    Only {product.stock} left!
                  </div>
                )}
                {product.discountPercentage > 0 && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {product.discountPercentage}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 aspect-square cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all">
                      <Image
                        src={img}
                        alt={`${product.title} view ${idx + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 capitalize">
                    <Package className="h-4 w-4 mr-1" />
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Heart className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.title}
                </h1>
                
                {product.brand && (
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    by <span className="font-semibold text-indigo-600 dark:text-indigo-400">{product.brand}</span>
                  </p>
                )}

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {product.rating || "4.5"}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>

              {/* Price Section */}
              <div className="bg-linear-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
                <div className="flex items-baseline space-x-3 mb-2">
                  <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                    ${product.price}
                  </span>
                  {originalPrice && (
                    <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                      ${originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className={`font-semibold ${product.stock > 10 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="w-full bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-4 rounded-xl transition-all duration-200 border-2 border-gray-300 dark:border-gray-600">
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <Truck className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-900 dark:text-white">Free Shipping</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">On orders over $50</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-900 dark:text-white">Secure Payment</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">100% protected</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-900 dark:text-white">Easy Returns</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">30-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 lg:p-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Customer Reviews
              </h2>
              <div className="flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/50 px-4 py-2 rounded-lg">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {product.rating || "4.5"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  / 5
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div
                  key={`${review.reviewerEmail}-${review.date}`}
                  className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {review.reviewerName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}