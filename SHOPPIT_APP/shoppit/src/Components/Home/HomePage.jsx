import CardContainer from './CardContainer';
import Header from './Header';
import { useEffect,useState } from "react";
import PlaceHolderContainer from '../Ui/placeHolderContainer';
import Error from '../Ui/Error';
import api from "../../api";
import { randomValue } from '../../GenerateCartCode'


const HomePage = () => {
  const [products,setproducts] =useState([])
  const [loading,setloading]=useState(false)
  const [error,setError]=useState("")

  useEffect(function(){
    if(localStorage.getItem("cart_code")===null){
      localStorage.setItem("cart_code",randomValue)
    }

  },[])




  useEffect(() => {
      setloading(true)
      api.get("products/")
      .then(res =>{
        console.log(res.data);
        setproducts(res.data);
        setloading(false)
        setError("")
      })
      .catch(error =>{
        console.log(error.message)
        setloading(false)
        setError(error.message)

      });
     
     
    
  }, []);

  return(
    <>
    <Header/>
    {error && <Error error={error}/>}
    {loading && <PlaceHolderContainer/>}
    
    {loading || error !="" || <CardContainer products={products}/>}
    
   
    
    </>

  )
}



export default HomePage;
