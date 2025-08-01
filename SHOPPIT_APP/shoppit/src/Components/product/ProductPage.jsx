import { useParams } from "react-router-dom"
import ProductPagePlaceHolder from "./ProductPagePlaceHolder"
import RelatedProducts from "./RelatedProducts"
import { useEffect, useState } from "react"
import api from "../../api"
import { BASE_URL } from "../../api"


const ProductPage = ({setNumberCartItems}) => {
  const {slug}=useParams()
  const [product,setproduct]=useState({})
  const [similarProducts,setSimilarProducts]=useState([])
  const [loading,setloading]=useState(false)
  const [inCart,setInCart]=useState(false)
  const cart_code=localStorage.getItem("cart_code")

  useEffect(function(){
      if(product.id){

        api.get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
      .then(res => {
        console.log(res.data)
        setInCart(res.data.product_in_cart)

      })

      .catch(err => {
        console.log(err.message)
      })


      }
      
    }, [cart_code, product.id])

  

  const newItem = {
    cart_code: cart_code,
    product_id: product.id
  }

  function add_item() {
    api.post("add_item/", newItem)
    .then(res => {
      console.log("Item added:", res.data);
      setInCart(true)
      setNumberCartItems(curr => curr+1)

    })
    .catch(err => {
      console.log("Error adding item:", err.response?.data || err.message);
    });
}

  useEffect(function(){
    setloading(true)
    api.get(`product_detail/${slug}`)
    .then(res =>{
      console.log(res.data)
      setproduct(res.data)
      setSimilarProducts(res.data.similar_Products)
      setloading(false)
    })
    .catch(err=>{
      console.log(err.message)
      setloading(false)
    

    })
  },[slug])


  if(loading){
    return <ProductPagePlaceHolder/>
  }
  
 
  


  

    

  return (
    <div>

        
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={`${BASE_URL}${product.image}`}
                alt="your product"
              />
            </div>
            <div className="col-md-6">
              <div className="small mb-1">SKU: BST-498</div>
              <h1 className="display-5 fw-bolder">{product.name}</h1>
              <div className="fs-5 mb-5">
                <span>{product.price}</span>
              </div>
              <p className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium at dolorem quidem modi. Nam sequi consequatur
                obcaecati excepturi alias magni, accusamus eius blanditiis
                delectus ipsam minima ea iste laborum vero?
              </p>
              <div className="d-flex">
                
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                  onClick={add_item}
                  disabled={inCart}
                >
                  <i className="bi-cart-fill me-1"></i>
                 {inCart ? "product added to Cart": "Add to Cart"}
                
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedProducts products={similarProducts}/>
    </div>
  )
}

export default ProductPage
