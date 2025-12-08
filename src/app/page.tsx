import ProductsPage from "./products/components/ProductsPage";


export default async function Home() {
  const res = await fetch("https://dummyjson.com/products?limit=10&skip=0", {
    next: { revalidate: 30 }, // optional caching
  });

  const initialData = await res.json();

  return (
    <>
      
      <main className="p-6 max-w-7xl mx-auto"> {/* Main content wrapper */}
        <ProductsPage initialData={initialData} />
      </main>
    </>
  );
}