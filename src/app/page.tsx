"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Header } from "./_component/Header";
type ProductsType = {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  title: string;
};
const Page = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const { push } = useRouter();
  const fourProducts = async () => {
    const response = await fetch(
      "https://dummyjson.com/products?limit=4&skip=1"
    );
    if (response.ok) {
      const res = await response.json();
      setProducts(res.products);
    }
  };

  console.log(products);
  const pushToProducts = () => {
    push("/Products");
  };
  useEffect(() => {
    fourProducts();
  }, []);
  return (
    <div>
      <Header />
      <div>
        <div className="font-black text-center text-4xl">Featured Products</div>
        <div className="text-2xl text-center text-gray-600">
          Check out our most popular items that customers love.
        </div>
      </div>
      <div className="flex justify-center gap-8 m-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex border border-gray-200 rounded-2xl shadow-lg p-6 w-[500px] hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <img
                src={product.images[0]}
                className="w-[340px] h-[280px] object-cover rounded-xl mr-6"
              />
              <div className="flex-col ">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">
                    {product.title}
                  </h2>
                  <p className="text-gray-500 text-xl mb-3">
                    {product.category}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-black font-bold text-xl">
                      ${product.price}
                    </p>
                    <Button className=" bg-gray-300 text-white py-1 px-3 rounded-lg hover:bg-gray-600 transition">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {" "}
        <Button className="font-black text-2xl mb-6" onClick={pushToProducts}>
          View All Products
        </Button>
      </div>
    </div>
  );
};

export default Page;
