"use client"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Header } from "@/app/_component/Header"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { Heart } from 'lucide-react';
import { Car } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { useRouter } from "next/navigation"
type ProductsType = {
    images: string[],
    category:string,
    price : number,
    title:string,
    description:string,
    availabilityStatus:string,
    brand:string ,
    stock:number ,
    discountPercentage : number     
}

type RealtedType = {
    images: string[],
    category:string,
    price : number,
    title:string,
    id:number
}
const Page = () => {
    const [product, setProduct] = useState<ProductsType | null>(null)
    const {push} = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const [productTotal, setTotal] = useState<number>()
    const [category, setCategory] = useState()
    const [smiliarProducts, setrelatedProducts] = useState<RealtedType[]>([])
    const params = useParams()
    const productId = params.productId
    const Products = async () => {
        const product = await fetch(`https://dummyjson.com/products/${productId}`)
        const res = await product.json()
        setProduct(res)
        setCategory(res.category)
    }
    
     const relatedProducts = async () => {
        const product = await fetch(`https://dummyjson.com/products/category/${category}?limit=4`)
        const res = await product.json()
        setrelatedProducts(res.products)
    }
  const pushToProduct = (productId : number) => {
        push(`/ProductPage/${productId}`)
    }
    useEffect(() => {
        Products()
    }, [])

    useEffect(() => {
        relatedProducts()
    }, [product])

      console.log(product, "qwe")
    return(
        <div>
            <Header/>
              <div className="mt-4 mb-5 ml-10">
            <span className="text-[20px] text-gray-600">Home / </span>
            <span className="text-[20px] text-gray-600">Products / </span>
            <span className="text-[20px] text-black font-bold">
              {product?.title}
            </span>
          </div>
            <div  className="flex gap-[20px]">
                 <div >
                <img src={product?.images?.[0]} className="w-[800px] h-[550px]"></img>
            </div>
            <div>
                <div className="font-bold text-2xl">{product?.title}</div>
                <div className="text-[20px] text-gray-700 ">Brand:{product?.brand}</div>
                <div className="flex gap-6 mt-2.5">
                <div className="font-bold mt-1 text-[20px]">${product?.price}</div>
                <Button className="font-bold bg-green-600 text-white rounded-3xl text-[20px]">
                {product?.discountPercentage}% OFF
                </Button>
             </div>
                <div>{product?.price}</div>
                <div className="text-gray-600 text-[19px] m-1">{product?.description}</div>
                <div className="font-bold text-green-700 text-[20px]">Availability: {product?.availabilityStatus} {product?.stock}</div>
                 <div className="font-bold mt-2 text-[20px]">Quantity</div>
                <select className="border border-1 w-[40px] h-[27px] ">
                <option value="1">1</option>
                <option value="1">2</option>
                <option value="1">3</option>
                <option value="1">4</option>
                <option value="1">5</option>
                <option value="1">6</option>
                <option value="1">7</option>
                <option value="1">8</option>
                <option value="1">9</option>
                <option value="1">10</option>
              </select>
                <div className="mt-5">
                <Button className="w-[200px] h-[40px] mr-6">Add to Cart</Button>
                <Button
                  variant="secondary"
                  className="border border-2 hover:bg-gray-300 w-[200px] h-[40px]"
                ><Heart/>
                  Add to Wishlist
                </Button>
                <hr className="mt-[20px]"></hr>
                <div>
                  <div className="font-bold text-[20px] flex gap-1.5">
                    <div className="mt-0.5"><Car/></div>Free Shipping</div>
                  <div className="text-gray-500 text-[15px]">
                    Free standard shipping on orders over $50
                  </div>
                  <div className="font-bold text-[20px] flex">
                    <div className="mt-0.5"><ShieldCheck/></div>30-Day Returns</div>
                  <div className="text-gray-500 text-[15px]">
                    Shop with confidence with our 30-day return policy
                  </div>
                </div>
              </div>
            </div>
            </div>
           <div>
             <div className="font-bold text-[30px] mt-6 ml-[65px]">
          Related Products
        </div>
          <div className="flex gap-6 pt-[60px] justify-center">
            {smiliarProducts.map((product, index) => {
                return (
                     <div
      key={index}
      className="flex border border-gray-200 rounded-2xl shadow-lg p-6 w-[300px] hover:shadow-xl transition-shadow duration-300 mb-10"
    >
      <div>
        <img
          src={product?.images?.[0]}
          className="w-[230px] h-[200px] object-cover rounded-xl mr-6"
        />
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-1">{product?.title}</h2>
            <p className="text-gray-500 text-xl mb-3">{product?.category}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-black font-bold text-xl">${product?.price}</p>
            <Button className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600 transition" onClick={() => pushToProduct(product.id)}>
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
                )
            })}
          </div>
           </div>
        </div>
        )
}

export default Page;