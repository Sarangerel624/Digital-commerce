import { ShoppingBag } from 'lucide-react';
export const Header =() => {
    return (
        <div>
          <div className='flex justify-center text-2xl border-b-2 p-3.5 gap-1.5'>
             <div className='mt-1'><ShoppingBag/></div>
            <div className='font-bold'>E-Commerce</div>
          </div>
        </div>
    )
}

