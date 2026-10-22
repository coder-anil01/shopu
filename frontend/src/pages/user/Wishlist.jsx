import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCartPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SeoHelmet from '../../components/SeoHelmet';
import CartEmpty from '../../components/CartEmpty';


const Wishlist = () => {
  const apiDomain = process.env.REACT_APP_API_URL;

  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const[auth] = useAuth();

  // get
  const getWishlist = async() => {
    try {
      const {data} = await axios.post(`${apiDomain}/api/v1/wishlist/get/${auth?.user._id}`)
      setTotal(data?.total)
      setProduct(data?.wishList)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth])

  // CART 
  const addToCart = async(id) => {
    try {
      const {data} = await axios.post(`${apiDomain}/api/v1/cart/create`, {product: id, user: auth?.user._id})
      if(data.success){
        toast.success(data.message)
      }else{
        toast.info(data.message)
      }
    } catch (error) {
      toast.error("Internal Server Error")
    }
  }

  const handleDelete = async(id)=>{
    try {
      const {data} = await axios.delete(`${apiDomain}/api/v1/wishlist/delete/${id}`)
      if(data.success){
        toast.info(data.message)
        getWishlist();
      }else{
        toast.info(data.message)
      }
    } catch (error) {
      
    }
  }

  return (
    <>
    <SeoHelmet title={total > 0 ? `(${total}) Item In WishList` : "My WishList"} description="Welcome to your curated collection, your very own wishlist! This space is all about you—where dreams meet the click of a button. Add, remove, and organize items that catch your eye, making it effortless to keep track of the things you love. Whether it's creating different lists for various occasions or refining your selection, your wishlist is your personal style guide. Keep your favorite products close at hand, ready for your next shopping adventure. It's more than just a list; it's your ever-evolving catalog of desires, making shopping with us a reflection of your unique taste and preferences."/>
    { total > 0 ? <>
      <div className='dashbord'>
      <div className='dashbord-menu'><UserMenu/></div>
      <div className='dashbord-content'>
      <div className="product-box">
        {product?.map(p => (
          <div key={p?.product?._id} className="product-box-card">
            <div className="product-box-image-main">
              <img className="product-box-image" src={p?.product?.image} alt={p?.product?.title.slice(0, 8)}/>
            </div>
            <div className="product-box-text">
            <div className="product-card-icon">
                <div className="product-icon-wishlist" onClick={() => {handleDelete(p._id)}}><MdDelete/></div>
                <div className="product-icon-cart" onClick={() => {addToCart(p?.product?._id)}}><FaCartPlus/></div>
              </div>
              <div className="product-box-title">{p?.product?.title.slice(0, 10)}...</div>
              <div className="product-box-price">{p?.product?.price}</div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
    </> : <><CartEmpty title={'Your WishList Is Empty'}/></>}
    
    
    </>
  )
}

export default Wishlist
