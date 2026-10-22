// import { Modal } from 'antd';
// import React, { useEffect, useState } from 'react'
// import AdminMenu from './AdminSidebar'
// import axios from 'axios';
// import { Select } from "antd";
// import { toast } from 'react-toastify';
// import SeoHelmet from '../../components/SeoHelmet';
// const { Option } = Select;

// const Product = () => {
//   const apiDomain = process.env.REACT_APP_API_URL;

//   const [data, setData] = useState([])
//   const [total, setTotal] = useState(0)
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [categories, setCategories] = useState([]);

//   const [ title, setTitle] = useState("")
//   const [ description,setDescription ] = useState("")
//   const [ image, setImage ] = useState("")
//   const [ category, setCategory ] = useState("")
//   const [ price, setPrice ] = useState("")
//   const [ countInStock, setCountInStock ] = useState("")
//   const [ rating, setRating ] = useState("")
//   const [ numReviews, setNumReviews ] = useState("")
//   const [ isFeatured, setIsFeatured ] = useState("")
//   const [ imageFirst, setImageFirst] = useState("");
//   const [ imageSecond, setImageSecond] = useState("");
//   const [ imageThird, setImageThird] = useState("");

//   const [id, setId] = useState("");
//   const [ updateTitle, setUpdateTitle] = useState("")
//   const [ updateDescription,setUpdateDescription ] = useState("")
//   const [ updateImage, setUpdateImage ] = useState("")
//   const [ updateCategory, setUpdateCategory ] = useState("")
//   const [ updatePrice, setUpdatePrice ] = useState("")
//   const [ updateCountInStock, setUpdateCountInStock ] = useState("")
//   const [ updateRating, setUpdateRating ] = useState("")
//   const [ updateNumReviews, setUpdateNumReviews ] = useState("")
//   const [ updateIsFeatured, setUpdateIsFeatured ] = useState("")
//   const [ updateImageFirst, setUpdateImageFirst] = useState("");
//   const [ updateImageSecond, setUpdateImageSecond] = useState("");
//   const [ updateImageThird, setUpdateImageThird] = useState("");

//   const allProducts =async()=>{
//     try {
//       const res = await axios.get(`${apiDomain}/api/v1/product/get`)
//       console.log(res.data)
//       setData(res.data.products)
//       setTotal(res.data.counTotal)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   useEffect(()=>{
//     allProducts()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[])

// // get all category
//  const getAllCategory = async () => {
//   try {
//     const { data } = await axios.get(`${apiDomain}/api/v1/category/get`);
//     if (data?.success) {
//       setCategories(data.categories);
//       console.log(data.categories);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   getAllCategory();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

// const handleSubmit =async(e)=>{
//   e.preventDefault();
//   try {
//     const {data} = await axios.post(`${apiDomain}/api/v1/product/create`, {
//       title, description, image, images: [imageFirst, imageSecond, imageThird], category, price, countInStock, rating, numReviews, isFeatured
//     })
//     if (data?.success) {
//       toast.success(data.message);
//       setTitle("");
//       setDescription("");
//       setImage("");
//       setPrice("");
//       setCountInStock("");
//       setRating("");
//       setNumReviews("");
//       setImageFirst("");
//       setImageSecond("");
//       setImageThird("");
//       allProducts();
//     }else{
//       toast.error(data.message)
//     }
//   } catch (error) {
//     toast.error("Internal Server error")
//   }
// }

// const handleCancel = () => {
//   setIsModalOpen(false);
// };

// const updateProduct = async(e)=>{
//   e.preventDefault();
//   try {
//     const {data} = await axios.put(`${apiDomain}/api/v1/product/update/${id}`,
//     {title: updateTitle,
//       description: updateDescription,
//       image: updateImage,
//       images: [updateImageFirst, updateImageSecond, updateImageThird],
//       category: updateCategory,
//       price: updatePrice,
//       countInStock: updateCountInStock,
//       rating: updateRating,
//       numReviews: updateNumReviews,
//       isFeatured: updateIsFeatured});
//       allProducts();
//     toast.success(data.message)
//     setIsModalOpen(false)
//   } catch (error) {
//    toast.error("Internal Server Error")
//   }
// }
// const editProduct = async(p)=>{
//   setIsModalOpen(true);
//   setId(p._id)
//   setUpdateTitle(p.title)
//   setUpdateDescription(p.description)
//   setUpdateImage(p.image)
//   setUpdateCategory(p?.category?._id)
//   setUpdatePrice(p.price)
//   setUpdateCountInStock(p.countInStock)
//   setUpdateRating(p.rating)
//   setUpdateNumReviews(p.numReviews)
//   setUpdateIsFeatured(p.isFeatured)
//   setUpdateImageFirst(p.images[0])
//   setUpdateImageSecond(p.images[1])
//   setUpdateImageThird(p.images[2])
// }

//   return (
//     <>
//     <SeoHelmet title="Manage Product" description={`The "Admin Create Product" feature within an eCommerce platform is a critical tool that enables administrators or store owners to add new products to their online store inventory. It's a centralized interface where they can input, manage, and publish product information, making items available for customers to browse, search, and purchase.`}/>
//     <div className='dashbord'>
//       <div className='dashbord-menu'><AdminMenu/></div>
//       <div className='dashbord-admin-product-contain'>
// {/* CREATE */}
//       <form className="form-group" onSubmit={handleSubmit}>
//         <h2 className='dashbord-form-heading'>Create Product</h2>
//         <div className='dashbord-admin-product'>
//         <Select
//             placeholder="Select a category"
//             showSearch
//             className="form-control-select"
//             required
//             onChange={(value) => {setCategory(value)}}>
//             {categories?.map((c) => (
//               <Option key={c._id} value={c._id}>
//                 {c.name}
//               </Option>
//             ))}
//           </Select>
//           <Select
//             className="form-control-select"
//             placeholder="Male/Female"
//             required
//             onChange={(value) => {setIsFeatured(value)}}>
//               <Option value="Male">Male</Option>
//               <Option value="Female">Female</Option>
//               <Option value="Male, Female">Male, Female</Option>
//           </Select>
//           <input
//             type="text"
//             value={title}
//             onChange={(e)=> setTitle(e.target.value)}
//             className="form-control"
//             placeholder="Enter Title"
//             required
//           />
//           <input
//             type="text"
//             value={description}
//             onChange={(e)=> setDescription(e.target.value)}
//             className="form-control"
//             placeholder="Enter Description"
//             required
//           />
//           <input
//             type="Number"
//             value={price}
//             onChange={(e)=> setPrice(e.target.value)}
//             className="form-control"
//             placeholder="Enter Price"
//             required
//           />
//           <input
//             type="Number"
//             value={countInStock}
//             onChange={(e)=> setCountInStock(e.target.value)}
//             className="form-control"
//             placeholder="Enter Count In Stock"
//             required
//           />
//           <input
//             type="text"
//             value={rating}
//             onChange={(e)=> setRating(e.target.value)}
//             className="form-control"
//             placeholder="Enter Rating"
//             required
//           />
//           <input
//             type="Number"
//             value={numReviews}
//             onChange={(e)=> setNumReviews(e.target.value)}
//             className="form-control"
//             placeholder="Enter Num Reviews"
//             required
//           />
// {/* IMAGE */}
//           <input
//             type="text"
//             value={image}
//             onChange={(e)=> setImage(e.target.value)}
//             className="form-control"
//             placeholder="Enter Thumbnail Url"
//             required
//           />
// {/* IMAGES */}
//           <input
//             type="text"
//             value={imageFirst}
//             onChange={(e)=> setImageFirst(e.target.value)}
//             className="form-control"
//             placeholder="Enter Image 2"
//             required
//           />
//           <input
//             type="text"
//             value={imageSecond}
//             onChange={(e)=> setImageSecond(e.target.value)}
//             className="form-control"
//             placeholder="Enter Image 3"
//             required
//           />
//           <input
//             type="text"
//             value={imageThird}
//             onChange={(e)=> setImageThird(e.target.value)}
//             className="form-control"
//             placeholder="Enter Image 4"
//             required
//           />
//           </div>
//           <div className='dashbord-admin-product'>
//             <div className='dashbord-admin-product-card'>
//               <h4>Thumbnail</h4>
//               <img className='dashbord-admin-product-image' src={image} alt="Thumbnail" />
//             </div>
//             <div className='dashbord-admin-product-card'>
//               <h4>Image 2nd</h4>
//               <img className='dashbord-admin-product-image' src={imageFirst} alt="Dp 2nd" />
//             </div>
//             <div className='dashbord-admin-product-card'>
//               <h4>Image 3rd</h4>
//               <img className='dashbord-admin-product-image' src={imageSecond} alt="dp 3rd" />
//             </div>
//             <div className='dashbord-admin-product-card'>
//               <h4>Image 4th</h4>
//               <img className='dashbord-admin-product-image' src={imageThird} alt="Dp 4th" />
//             </div>
//           </div>
//           <div className="form-submit"><button type="submit" >Submit</button></div>
//       </form>
// {/* Show Product */}
//       <h2 className='dashbord-form-heading'>Total Product:- {total}</h2>
//       <div className="dashbord-product-box">
//         {data?.map((p) => (
//           <div key={p._id} className="dashbord-product-box-card">
//               <div className="dashbord-product-box-image-main"
//               onClick={(()=> editProduct(p))}>
//                 <img className="dashbord-product-box-image" src={p.image} alt={p.title.slice(0, 10)}/></div>
//             <div className="dashbord-product-box-text">
//               <div className="dashbord-product-card-icon">
//               </div>
//               <div className="dashbord-product-box-title">{p.title.slice(0, 15)}...</div>
//               <div className="dashbord-product-box-price">{p.price}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//       </div>

// {/* UPDATE */}
//       <Modal title="Update Product" open={isModalOpen} footer={null} onCancel={handleCancel}>
//       <form className="form-group" onSubmit={updateProduct}>
//         <div className='dashbord-admin-product'>
//         <Select
//             placeholder="Select a category"
//             showSearch
//             className="form-control-select"
//             required
//             value={updateCategory}
//             onChange={(value) => {setUpdateCategory(value)}}>
//             {categories?.map((c) => (
//               <Option key={c._id} value={c._id}>
//                 {c.name}
//               </Option>
//             ))}
//           </Select>
//           <Select
//             className="form-control-select"
//             placeholder="Male/Female"
//             required
//             value={updateIsFeatured}
//             onChange={(value) => {setUpdateIsFeatured(value)}}>
//               <Option value="Male">Male</Option>
//               <Option value="Female">Female</Option>
//               <Option value="Male, Female">Male, Female</Option>
//           </Select>
//           <input
//             type="text"
//             value={updateTitle}
//             onChange={(e)=> setUpdateTitle(e.target.value)}
//             className="form-control"
//             placeholder="Enter Title"
//             required
//           />
//           <input
//             type="text"
//             value={updateDescription}
//             onChange={(e)=> setUpdateDescription(e.target.value)}
//             className="form-control"
//             placeholder="Enter Description"
//             required
//           />
//           <input
//             type="Number"
//             value={updatePrice}
//             onChange={(e)=> setUpdatePrice(e.target.value)}
//             className="form-control"
//             placeholder="Enter Price"
//             required
//           />
//           <input
//             type="Number"
//             value={updateCountInStock}
//             onChange={(e)=> setUpdateCountInStock(e.target.value)}
//             className="form-control"
//             placeholder="Enter Count In Stock"
//             required
//           />
//           <input
//             type="text"
//             value={updateRating}
//             onChange={(e)=> setUpdateRating(e.target.value)}
//             className="form-control"
//             placeholder="Enter Rating"
//             required
//           />
//           <input
//             type="Number"
//             value={updateNumReviews}
//             onChange={(e)=> setUpdateNumReviews(e.target.value)}
//             className="form-control"
//             placeholder="Enter Num Reviews"
//             required
//           />
// {/* IMAGE */}
//           <input
//             type="text"
//             value={updateImage}
//             onChange={(e)=> setUpdateImage(e.target.value)}
//             className="form-control"
//             placeholder="Enter Thumbnail Url"
//             required
//           />
// {/* IMAGES */}
//           <input
//             type="text"
//             value={updateImageFirst}
//             onChange={(e)=> setUpdateImageFirst(e.target.value)}
//             className="form-control"
//             placeholder="Enter Image 2"
//             required
//           />
//           <input
//             type="text"
//             value={updateImageSecond}
//             onChange={(e)=> setUpdateImageSecond(e.target.value)}
//             className="form-control"
//             placeholder="Enter Image 3"
//             required
//           />
//           <input
//             type="text"
//             value={updateImageThird}
//             onChange={(e)=> setUpdateImageThird(e.target.value)}
//             className="form-control"
//             placeholder="Enter Image 4"
//             required
//           />
//           </div>
//           <div className='dashbord-admin-product'>
//             <div className='dashbord-admin-product-card'>
//               <h4>Thumbnail</h4>
//               <img className='dashbord-admin-product-image' src={updateImage} alt="Thumbnail" />
//             </div>
//             <div className='dashbord-admin-product-card'>
//               <h4>Image 2nd</h4>
//               <img className='dashbord-admin-product-image' src={updateImageFirst} alt="Dp 2nd" />
//             </div>
//             <div className='dashbord-admin-product-card'>
//               <h4>Image 3rd</h4>
//               <img className='dashbord-admin-product-image' src={updateImageSecond} alt="Dp 3rd" />
//             </div>
//             <div className='dashbord-admin-product-card'>
//               <h4>Image 4th</h4>
//               <img className='dashbord-admin-product-image' src={updateImageThird} alt="Dp 4th" />
//             </div>
//           </div>
//           <div className="form-submit"><button type="submit" >Submit</button></div>
//       </form>
//       </Modal>
//     </div>
//     </>
//   )
// }

// export default Product

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSlider from "./AdminSidebar";
import "../../style/Products.css";
import AddProduct from "./AddProduct";
import axios from "axios";

// const productsData = [
//   {
//     id: 1,
//     name: "GenBy Premium Hoodie",
//     sku: "GB-HOD-001",
//     category: "Fashion",
//     price: 1499,
//     stock: 42,
//     sold: 248,
//     status: "Active",
//     image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200",
//   },
//   {
//     id: 2,
//     name: "Classic White Sneakers",
//     sku: "GB-SNK-002",
//     category: "Footwear",
//     price: 1999,
//     stock: 18,
//     sold: 210,
//     status: "Active",
//     image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200",
//   },
//   {
//     id: 3,
//     name: "Wireless Earbuds Pro",
//     sku: "GB-EAR-003",
//     category: "Electronics",
//     price: 2499,
//     stock: 7,
//     sold: 183,
//     status: "Active",
//     image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=200",
//   },
//   {
//     id: 4,
//     name: "Urban Laptop Backpack",
//     sku: "GB-BAG-004",
//     category: "Accessories",
//     price: 1799,
//     stock: 0,
//     sold: 142,
//     status: "Out of Stock",
//     image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",
//   },
//   {
//     id: 5,
//     name: "Essential Cotton T-Shirt",
//     sku: "GB-TSH-005",
//     category: "Fashion",
//     price: 999,
//     stock: 65,
//     sold: 128,
//     status: "Active",
//     image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
//   },
//   {
//     id: 6,
//     name: "Minimal Watch",
//     sku: "GB-WAT-006",
//     category: "Accessories",
//     price: 2999,
//     stock: 4,
//     sold: 96,
//     status: "Active",
//     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
//   },
//   {
//     id: 7,
//     name: "Everyday Sunglasses",
//     sku: "GB-SUN-007",
//     category: "Accessories",
//     price: 799,
//     stock: 31,
//     sold: 84,
//     status: "Draft",
//     image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200",
//   },
//   {
//     id: 8,
//     name: "Portable Bluetooth Speaker",
//     sku: "GB-SPK-008",
//     category: "Electronics",
//     price: 1599,
//     stock: 12,
//     sold: 76,
//     status: "Active",
//     image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200",
//   },
// ];

function Product() {

  const apiDomain = import.meta.env.VITE_API_URL;

  const [category, setCategory] = useState("All");
  const [stock, setStock] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productsData, setProductsData] = useState([]);

  const categories = [
    "All",
    "Fashion",
    "Footwear",
    "Electronics",
    "Accessories",
  ];
  
  useEffect(()=>{
    const getallProducts =async()=>{
    try {
      const res = await axios.get(`${apiDomain}/api/v1/product/get`);
      setProductsData(res.data.products);
      console.log(res.data.products);
    } catch (error) {
      console.log(error);
    };
  };
    getallProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // const filteredProducts = productsData.filter((product) => {
  //   const matchesSearch =
  //     product.name.toLowerCase().includes(search.toLowerCase()) ||
  //     product.sku.toLowerCase().includes(search.toLowerCase());

  //   const matchesCategory = category === "All" || product.category === category;

  //   const matchesStatus = status === "All" || product.status === status;

  //   let matchesStock = true;

  //   if (stock === "In Stock") {
  //     matchesStock = product.stock > 0;
  //   }

  //   if (stock === "Low Stock") {
  //     matchesStock = product.stock > 0 && product.stock <= 10;
  //   }

  //   if (stock === "Out of Stock") {
  //     matchesStock = product.stock === 0;
  //   }

  //   return matchesSearch && matchesCategory && matchesStatus && matchesStock;
  // });

  const toggleProduct = (id) => {
    setSelectedProducts((current) =>
      current.includes(id)
        ? current.filter((productId) => productId !== id)
        : [...current, id],
    );
  };

  const toggleAll = () => {
    if (selectedProducts.length === productsData.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(productsData.map((product) => product.id));
    }
  };

  return (
    <>
      <AdminSlider />
      <div className="admin-dashbord-layout">
        
        {/* ================= CONTENT ================= */}
        <div className="products-content">
          {/* Heading */}

          <div className="products-heading">
            <div>
              <div className="breadcrumb">
                Dashboard
                <span>/</span>
                Products
              </div>
              <h1>Products</h1>
              <p>Manage your products, inventory and product information.</p>
            </div>
            <div onClick={() => setShowProductForm(!showProductForm)} className="add-product-btn">
              {showProductForm ?  "Close Product Form" : "Add Product"}
            </div>
          </div>

          {/* ================= STATS ================= */}

          <div className="product-stats">
            <div className="product-stat">
              <div className="product-stat-icon blue">📦</div>
              <div>
                <span>Total Products</span>
                <strong>246</strong>
              </div>
            </div>

            <div className="product-stat">
              <div className="product-stat-icon green">✓</div>
              <div>
                <span>Active Products</span>
                <strong>218</strong>
              </div>
            </div>

            <div className="product-stat">
              <div className="product-stat-icon orange">⚠</div>
              <div>
                <span>Low Stock</span>
                <strong>12</strong>
              </div>
            </div>

            <div className="product-stat">
              <div className="product-stat-icon red">×</div>
              <div>
                <span>Out of Stock</span>
                <strong>16</strong>
              </div>
            </div>
          </div>

          {/*================= Add Product =================*/}
          {showProductForm && <AddProduct />}

          {/* ================= PRODUCT CARD ================= */}

          <div className="products-card">
            <div className="products-toolbar">
              <div className="toolbar-left">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>

                  {categories
                    .filter((item) => item !== "All")
                    .map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                </select>

                <select
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                >
                  <option value="All">All Stock</option>

                  <option value="In Stock">In Stock</option>

                  <option value="Low Stock">Low Stock</option>

                  <option value="Out of Stock">Out of Stock</option>
                </select>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <button className="filter-btn">⚙ Filters</button>
            </div>

            {/* Bulk Actions */}

            {selectedProducts.length > 0 && (
              <div className="bulk-bar">
                <span>{selectedProducts.length} selected</span>

                <button>Activate</button>
                <button>Deactivate</button>

                <button className="bulk-delete">Delete</button>
              </div>
            )}

            {/* Table */}
            <div className="products-table-wrapper">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Sold</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

{/* Show Products */}
                <tbody>
                  {productsData.map((product) => (
                    <tr key={product._id}>

                      {/* Product */}
                      <td>
                        <div to= "/" className="product-info">
                        <Link to={`/product/${product._id}`}><img src={product.images[0].url} alt={product.name} /></Link>

                          <div>
                            <strong>{product.title.slice(0, 20)}</strong>

                            <span>SKU: {product.description.slice(0, 20)+"..."}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}

                      <td>
                        <span className="category-text">
                          {product.category.name} / {product.subCategory.name}
                        </span>
                      </td>

                      {/* Price */}
                      <td>
                        <strong className="product-price">
                          ₹{product.price.toLocaleString("en-IN")}
                        </strong>
                      </td>

                      {/* Stock */}

                      <td>
                        <span
                          className={`stock-value ${
                            product.stock === 0
                              ? "stock-out"
                              : product.stock <= 10
                                ? "stock-low"
                                : "stock-good"
                          }`}
                        >
                          {product.stock === 0
                            ? "Out of stock"
                            : `${product.stock} units`}
                        </span>
                      </td>

                      {/* Sold */}

                      <td>{product.sold}</td>

                      {/* Status */}

                      <td>
                        {/* <span
                          className={`product-status ${product.status
                            .toLowerCase()
                            .replaceAll(" ", "-")}`}
                        >
                          <i />
                          {product.status}
                        </span> */}
                      </td>

                      {/* Actions */}

                      <td>
                        <div className="product-actions">
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            title="Edit"
                          >
                            ✎
                          </Link>

                          <button title="Delete">🗑</button>

                          <button title="More">⋮</button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Empty */}

                  {productsData.length === 0 && (
                    <tr>
                      <td colSpan="8" className="empty-products">
                        <div>
                          <span>📦</span>

                          <strong>No products found</strong>

                          <p>Try changing your search or filters.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ================= PAGINATION ================= */}

            <div className="products-pagination">
              <span>
                Showing <strong>{productsData.length}</strong> of{" "}
                <strong>246</strong> products
              </span>

              <div className="pagination-buttons">
                <button disabled>←</button>

                <button className="active">1</button>

                <button>2</button>

                <button>3</button>

                <span>...</span>

                <button>25</button>

                <button>→</button>
              </div>
            </div>
          </div>
        </div>

        {/* </main> */}
      </div>
    </>
  );
}

export default Product;
