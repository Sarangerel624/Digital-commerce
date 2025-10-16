"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Header } from "../_component/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
type ProductsType = {
  images: string[];
  category: string;
  price: number;
  title: string;
  id: number;
};

const PAGE = 12;
const Page = () => {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productTotal, setTotal] = useState<number>();
  const [search, setSearch] = useState("");
  const { push } = useRouter();
  let skip = 0;
  const allProducts = async () => {
    if (currentPage > 1) {
      skip = PAGE * (currentPage - 1);
    }

    let url = `https://dummyjson.com/products?limit=${PAGE}&skip=${skip}`;
    if (search.trim() !== "") {
      url = `https://dummyjson.com/products/search?q=${search}&limit=${PAGE}&skip=${skip}`;
    }
    const response = await fetch(url);
    const res = await response.json();
    setProducts(res.products);
    setTotal(res.total);
  };
  console.log(products);
  console.log(currentPage);
  const totalPages = productTotal ? Math.ceil(productTotal / PAGE) : 0;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const pushToProduct = (productId: number) => {
    push(`/ProductPage/${productId}`);
  };
  useEffect(() => {
    allProducts();
  }, [currentPage, search]);

  return (
    <div>
      <Header />
      <div>
        <div className="w-[400px] m-3 pl-13">
          {" "}
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-6 justify-center w-[1400px]">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex border border-gray-200 rounded-2xl shadow-lg p-6 w-[300px] hover:shadow-xl transition-shadow duration-300"
          >
            <div>
              <img
                src={product.images[0]}
                className="w-[230px] h-[200px] object-cover rounded-xl mr-6"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">
                    {product.title}
                  </h2>
                  <p className="text-gray-500 text-xl mb-3">
                    {product.category}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-black font-bold text-xl">
                    ${product.price}
                  </p>
                  <Button
                    className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600 transition"
                    onClick={() => pushToProduct(product.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-center mt-10 mb-10">
        {pages.map((page, index) => {
          return (
            <div key={index}>
              <Button
                onClick={() => setCurrentPage(page)}
                variant={page === currentPage ? "default" : "secondary"}
              >
                {page}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
