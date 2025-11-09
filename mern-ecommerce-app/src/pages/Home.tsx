import Hero from "../components/Hero"
import ProductCard from "../components/ProductCard"
import { products } from "../data/products"

export default function Home() {
  return (
    <>
        <Hero />
        <section className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
                <ProductCard key={p.id} {...p} />
            ))}
            </div>
        </section>
    </>
  )
}
