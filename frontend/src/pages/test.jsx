// import axios from 'axios';
// import { useEffect, useState } from 'react'
// import { useParams, useNavigate, useLocation } from 'react-router-dom'
// import { useAuth } from '../../context/auth';
// import { FaHome, FaUser,FaPhoneAlt } from "react-icons/fa";
// import axios from 'axios';
// import '../../style/PaymentBuy.css'
// import { Collapse } from 'antd';
// import { toast } from 'react-toastify';
// import { Modal } from "antd";
// import Coungraculation from "../../image/right.png";
// import SeoHelmet from '../../components/SeoHelmet';

// const PaymentBuy = () => {
//   const apiDomain = import.meta.env.VITE_API_URL;

//     const params = useParams();
//     const loacation = useLocation()
//     const navigate = useNavigate();
//     const[auth] = useAuth();
//     const [product, setProduct] = useState("");
//     const [showkay, setShowkey] = useState(2)
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // All Product
//     useEffect(()=>{
//       const getProduct = async () => {
//       try {
//         const { data } = await axios.get(`${apiDomain}/api/v1/product/get/${params.id}`);
//         setProduct(data.product)
//       } catch (error) {
//         console.log(error);
//      }
//     };

//     getProduct();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[])

//   const conformOrder =async()=> {
//     try {
//       const {data} = await axios.post(`${apiDomain}/api/v1/order/createone`, {cart: product?._id, id: auth?.user?._id, price: product?.price });
//       if(data.success){
//         setIsModalOpen(true);
//         setTimeout(() => {
//           handleCancel();
//         }, 5000);
//       }else{
//         toast.warn(data.message)
//       }
//     } catch (error) {
//       toast.error("Internal Server Error")
//       error;
//     }
//   }

//   const login = () => {
//     navigate('/login', {state: loacation.pathname})
//   }
//   const register = () => {
//     navigate('/register', {state: loacation.pathname})
//   }
//   const editProfile = () => {
//     navigate('/dashbord/profile', {state: loacation.pathname})
//   }
//   const handleCancel = ()=> {
//     setIsModalOpen(false)
//     navigate('/dashbord/order')
//   }

//   return (
//     <>
//     <SeoHelmet title="💸(COD) Order Product" description="Cash on Delivery,' a hassle-free way to complete your purchase. With this method, you can finalize your order by paying in cash upon the delivery of your chosen items. Enjoy the flexibility and peace of mind knowing that you can inspect your products before making the payment. It's a simple, reliable way to shop, ensuring your satisfaction every step of the way. Select 'Cash on Delivery' at checkout and indulge in a seamless shopping experience, where convenience meets trust."/>
//     {auth?.user ? <>
//         <div className='payment-buy'>
//         <Collapse accordion={true} expandIconPosition='right' activeKey={[showkay]} size='small' >
//             <Collapse.Panel className='payment-collapse' key={"1"} header={<div className='payment-collapse-header'><div className='payment-collapse-number'>1</div> LOGIN</div>}>
//                 <div>login success </div>
//             </Collapse.Panel>

//             <Collapse.Panel className='payment-collapse' key={"2"} header={<div className='payment-collapse-header'><div className='payment-collapse-number'>2</div>DELIVERY ADDRESS</div>}>
//             <div className='payment-collapse-auth'>
//               <div>
//                 <div><FaUser/> {auth?.user?.name}</div>
//                 <div><FaPhoneAlt/> {auth?.user?.phone}</div>
//                 <div><FaHome/> {auth?.user?.address}</div>
//               </div>
//               <div onClick={editProfile} className='payment-collapse-change'>Edit</div>
//             </div>
//                 <button onClick={()=> setShowkey(3)} className='payment-collapse-order-button'>DELIVER HERE</button>
//             </Collapse.Panel>
//             <Collapse.Panel className='payment-collapse' key={"3"} header={<div className='payment-collapse-header'> <div className='payment-collapse-number'>3</div>ORDER SUMMERY</div>}>
//             <div className='payment-collapse-product-card'>
//                 <img className='payment-collapse-product-image' src={product.image} alt={product?.title?.slice(0, 8)} />
//                 <div className='payment-collapse-product-title'>
//                     <div>{product?.title?.slice(0, 20)}</div>
//                     <div className='payment-collapse-product-price'><strong>Price:- </strong>₹{product.price}</div>
//                     <button onClick={()=> setShowkey(4)} className='payment-collapse-order-button'>CONTINUE</button>
//                 </div>
//             </div>
//             </Collapse.Panel>

//             <Collapse.Panel className='payment-collapse' key={"4"} header={<div className='payment-collapse-header'><div className='payment-collapse-number'>4</div>PAYMENT OPTION</div>}>
//                 <img className='payment-collapse-cod' src="https://i.postimg.cc/br9ntbrT/cod.png" alt="" />
//                 <button onClick={conformOrder} style={{float: "right"}} className='payment-collapse-order-button'>CONFORM ORDER</button>
//             </Collapse.Panel>
//         </Collapse>
//         <div className='payment-buy-right'>
//             <div className='payment-buy-price-heading'>Payment-details</div>
//             <div className='payment-buy-line'/>
//             <div className='payment-buy-item'>
//                 <div>Price( 1 item )</div>
//                 <div>{product.price}</div>
//             </div>
//             <div className='payment-buy-item'>
//                 <div>Delivery Charges</div>
//                 <div className='payment-buy-delivery-free'>FREE</div>
//             </div>
//             <div className='payment-buy-line'/>
//             <div className='payment-buy-item-total-price'>
//                 <div>Total Payable:- </div>
//                 <div>₹{product.price}</div>
//             </div>
//         </div>
//         </div>
//         </> : <>
//           <div className='user-routes'>
//             <div className='user-routes-card'>
//               <div className='user-routes-text'>I have an account</div>
//               <div className='user-routes-button' onClick={login} >Login</div>

//               <div className='user-routes-text'>I don't have an account</div>
//               <div className='user-routes-button' onClick={register}>Create</div>
//             </div>
//           </div>
//         </>}

//         <Modal className='model-container' open={isModalOpen} maskClosable={false} footer={null} onCancel={handleCancel}>
//           <div className='model-order-placed'>
//             <div className='model-order-placed-coungration'>Coungraculation</div>
//             <div className='model-order-placed-image-main'>
//               <img className='model-order-placed-image' src={Coungraculation} alt="" />
//             </div>
//             <div className='model-order-placed-text'>YOUR ORDER HAS BEEN CONFORMED</div>
//             <div className='model-order-placed-thanks'>THANKS</div>
//           </div>
//         </Modal>
//     </>
//   )
// }

// export default PaymentBuy







import { useState } from "react";
// import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../style/PaymentBuy.css";
import { useAuth } from "../../context/auth";
import OrderSuccessModal from "../../components/OrderSuccessModal";

// const BuyNow = ({ product }) => {
const BuyNow = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [auth, setAuth] = useAuth();

  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");

  const apiDomain = import.meta.env.VITE_API_URL;
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [addressType, setAddressType] = useState("Home");
  const [placeOrder, setPlaceOrder] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    mobile: "",
    pincode: "",
    house: "",
    landmark: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlaceOrder(false)
        if (!auth?.address && !(
            shippingAddress.name &&
            shippingAddress.mobile &&
            shippingAddress.pincode &&
            shippingAddress.house &&
            shippingAddress.landmark &&
            shippingAddress.city &&
            shippingAddress.state
          )
        ) {
          setPlaceOrder(true);
          return alert("Fill The full Delivery Details");
        }
        const { data } = await axios.post(`${apiDomain}/api/v1/order/create-one-order`,
          {
            name: shippingAddress.name,
            mobile: shippingAddress.mobile,
            pincode: shippingAddress.pincode,
            house: shippingAddress.house,
            landmark: shippingAddress.landmark,
            city: shippingAddress.city,
            state: shippingAddress.state,
            productid: product?._id,
            quantity: 1,
            paymentMethod: "COD",
            addressid:auth?.address?._id || null,
            userid:auth?.user?._id || null,
          },
        );
        console.log(data);
        setPlacedOrderId(data.order?._id || data.orderId || "");
        setShowOrderSuccess(true);
        setPlaceOrder(true)
        if(!auth?.address){
          setAuth({ ...auth, user: data?.user, token: data?.token, address:data?.address });
          localStorage.setItem("auth",JSON.stringify({...auth, user:data?.user, token:data?.token, address:data?.address,}),);
        }
      };

  const productPrice = product?.price || 0;
  const productMRP = product?.compareAtPrice || 0;
  const deliveryCharge = 0;
  const discount =(product?.compareAtPrice - product?.price);

  const totalAmount = productPrice + deliveryCharge;

  return (
    <>
      <div className="buy-now-page">
        <div className="buy-now-container">
          {/* ================= LEFT SECTION ================= */}

          {/* PAYMENT */}

          <div className="checkout-card">
            <div className="card-heading">
              {/* <span className="step-number">2</span> */}

              <div>
                <h2>Payment Method</h2>
                <p>Select your preferred payment method</p>
              </div>
            </div>

            <div className="payment-options">
              <label
                className={
                  paymentMethod === "COD"
                    ? "payment-option active"
                    : "payment-option"
                }
              >
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <div className="payment-icon">💵</div>

                <div className="payment-info">
                  <strong>Cash on Delivery</strong>

                  <span>Pay when your order is delivered</span>
                </div>
              </label>

              {/* FUTURE PAYMENT OPTIONS */}

              {/* <label className="payment-option disabled">
                <input type="radio" disabled />

                <div className="payment-icon">💳</div>
                <div className="payment-info">
                  <strong>Credit / Debit Card</strong>
                  <span>Coming soon</span>
                </div>
              </label> */}

              <label className="payment-option disabled">
                <input type="radio" disabled />

                <div className="payment-icon">📱</div>
                <div className="payment-info">
                  <strong>UPI</strong>
                  <span>Coming soon</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}


        <div className="checkout-right">
          {/* PRODUCT */}

          <div className="checkout-left">
            {/* SHIPPING ADDRESS */}

          {auth?.address ?
          <div className="checkout-card">
            <div className="card-heading">
                  <h2>Delivery Address</h2>
                  {/* <h4>Change Address</h4> */}
            </div>
               <div>
                <div>{auth?.address?.name} {auth?.address?.mobile}</div>
                <div>{auth?.address?.house}</div>
                <div>{auth?.address?.landmark}</div>
                <div>{auth?.address?.city+" "+auth?.address?.state+", "+auth?.address?.pincode}</div>
              </div>           
          </div>
           : 
            <div className="checkout-card">
              <div className="card-heading">
                  <h2>Delivery Address</h2>
                  <p>Where should we deliver your order?</p>
              </div>

              <form className="shipping-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>

                    <input
                      type="text"
                      name="name"
                      value={shippingAddress.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Mobile Number *</label>

                    <input
                      type="tel"
                      name="mobile"
                      value={shippingAddress.mobile}
                      onChange={handleChange}
                      placeholder="10 digit mobile number"
                      maxLength="10"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  {/* <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    value={shippingAddress.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </div> */}

                  <div className="form-group">
                    <label>Pincode *</label>

                    <input
                      type="text"
                      name="pincode"
                      value={shippingAddress.pincode}
                      onChange={handleChange}
                      placeholder="Enter pincode"
                      maxLength="6"
                      required
                    />
                  </div>
                </div>

                {/* <div className="form-group">
                <label>Full Address *</label>

                <textarea
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleChange}
                  placeholder="House No, Building, Street, Area"
                  rows="3"
                />
              </div> */}

                <div className="form-group">
                  <label>House no / Building Name</label>

                  <input
                    type="text"
                    name="house"
                    value={shippingAddress.house}
                    onChange={handleChange}
                    placeholder="House no / Building Name"
                  />
                </div>
                <div className="form-group">
                  <label>Landmark</label>

                  <input
                    type="text"
                    name="landmark"
                    value={shippingAddress.landmark}
                    onChange={handleChange}
                    placeholder="Road Name / Area / Colony"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>

                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="form-group">
                    <label>State *</label>

                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                    />
                  </div>
                </div>

                {/* ADDRESS TYPE */}

                <div className="address-type">
                  <label>Address Type</label>

                  <div className="address-type-options">
                    <button
                      type="button"
                      className={
                        addressType === "Home"
                          ? "address-type-btn active"
                          : "address-type-btn"
                      }
                      onClick={() => setAddressType("Home")}
                    >
                      🏠 Home
                    </button>

                    <button
                      type="button"
                      className={
                        addressType === "Work"
                          ? "address-type-btn active"
                          : "address-type-btn"
                      }
                      onClick={() => setAddressType("Work")}
                    >
                      🏢 Work
                    </button>
                  </div>
                </div>
              </form>
            </div>}

{/* Product Details */}
            <div className="checkout-card product-summary">
            <div className="card-heading">
              {/* <span className="step-number">3</span> */}

              <div>
                <h2>Order Summary</h2>
                <p>Review your order</p>
              </div>
            </div>

            <div className="summary-product">
              <img src={product?.images?.[0]?.url} alt={product?.title} />

              <div className="summary-product-info">
                <h3>{product?.title?.slice(0, 20) + "..."}</h3>

                <p>
                  Quantity: <strong>1</strong>
                </p>

                <strong className="summary-price">
                  ₹{productPrice.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>
          </div>

            {/* PRICE DETAILS */}

            <div className="checkout-card price-card">
              <h2>Price Details</h2>

              <div className="price-row">
                <span>MRP (incl. of all taxes)</span>
                <strong>₹{productMRP.toLocaleString("en-IN")}</strong>
              </div>
              {/* <div className="price-row">
                <span>Product Price</span>
                <strong>₹{productPrice.toLocaleString("en-IN")}</strong>
              </div> */}

              <div className="price-row">
                <span>Delivery Charges</span>

                <strong className="free">FREE</strong>
              </div>

              {discount > 0 && (
                <div className="price-row discount">
                  <span>Discount</span>

                  <strong>- ₹{discount.toLocaleString("en-IN")}</strong>
                </div>
              )}

              <div className="price-divider"></div>

              <div className="total-row">
                <span>Total Amount</span>

                <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
              </div>

              <div className="cod-note">
                💵 You will pay ₹{totalAmount.toLocaleString("en-IN")} when your
                order is delivered.
              </div>

              {placeOrder ?
              <button type="button" className="place-order-btn" onClick={handlePlaceOrder} > Place Order </button>
              : <button type="button" className="place-order-btn" disabled={true}> Processing... </button>}

              <p className="secure-text">🔒 Safe and secure checkout</p>
            </div>
          </div>
        </div>
      </div>

              {/* Order Confirm */}
      <OrderSuccessModal
        isOpen={showOrderSuccess}
        onClose={() => setShowOrderSuccess(false)}
        orderId={placedOrderId}
        estimatedDelivery="4-6 days business days"
      />
    </>
  );
};

export default BuyNow;
