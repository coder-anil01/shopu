import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import CategorySlider from '../components/CategorySlider';
import SeoHelmet from '../components/SeoHelmet';

const CategoryProduct = () => {
  const apiDomain = process.env.REACT_APP_API_URL;

    const[product, setProduct] = useState([]);
    const[total, setTotal] = useState(0);
    const params = useParams();

    const getProduct = async()=> {
        try {
            const {data} = await axios.get(`${apiDomain}/api/v1/product/category/${params.id}`)
            if(data.success){
            console.log(data)
            setTotal(data.total)
            setProduct(data.product)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[params])

  return (
    <div>
    <SeoHelmet title="Filter Product By Category" description="Discover your perfect match with our intuitive category filtering system. Navigate through our extensive collection effortlessly by using our 'Filter by Category' feature. Whether you're looking for specific items or simply exploring, streamline your search by selecting from a diverse range of categories. From fashion to electronics, home essentials to hobbies, our organized categories help you pinpoint exactly what you're looking for. Refine your browsing experience"/>
{/* CAREGORY SHOW */}
      <div style={{marginBottom: "40px"}}><CategorySlider/></div>

        <div className='product-count-heading'>
          {total > 0 ? `Find ${total} Products` : "Product Not Avilavle" }
          </div>

{/* PRODUCT SHOW */}
      <div className="product-box">
        {product?.map((p) => (
          <div key={p._id} className="product-box-card">
            <Link to={`/product/${p._id}`} className="product-box-image-main">
              <img
                className="product-box-image"
                src={p.image}
                alt={p.title.slice(0, 10)}
              />
            </Link>
            <div className="product-box-text">
              <div className="product-box-title">{p.title.slice(0, 15)}...</div>
              <div className="product-box-price">{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryProduct
