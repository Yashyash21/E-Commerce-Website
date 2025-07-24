import { BrowserRouter,Routes,Route } from "react-router-dom"
import MainLayout from "./Components/Layout/MainLayout"
import HomePage from "./Components/Home/HomePage"
import NotFoundPage from "./Components/Ui/NotFoundPage"
import ProductPage from "./Components/product/ProductPage"
import { useState,useEffect} from "react"
import api from "./api"
import CartPage from "./Components/Cart/CartPage"

const App = () => {

  const [numCartItems, setNumberCartItems] = useState(0);
  const cart_code = localStorage.getItem("cart_code")

  useEffect(function(){
    if(cart_code){
      api.get(`get_cart_stat?cart_code=${cart_code}`)
      .then(res => {
        console.log(res.data)
        setNumberCartItems(res.data.num_of_items)
      })

      .catch(err => {
        console.log(err.message)
      })
    }
    
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout numCartItems={numCartItems} />}>
          <Route index element={<HomePage />} />
          <Route path="products/:slug" element={<ProductPage  setNumberCartItems={setNumberCartItems}/>}/>
          <Route path="Cart/" element={<CartPage/>} />
          <Route path="*" element={<NotFoundPage/>}/>
          {/*  use for no match '*' this  */}
          {/* Add more pages here */}

        </Route>
      </Routes>
    </BrowserRouter>

  
  )
}

export default App
