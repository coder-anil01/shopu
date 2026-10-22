// import { FaUser, FaHome, FaPhoneAlt } from "react-icons/fa";
// import React, { useEffect, useState } from 'react'
// import AdminMenu from './AdminSidebar'
// import axios from 'axios'
// import { Link } from 'react-router-dom';
// import { Select } from "antd";
// import { toast } from "react-toastify";
// import SeoHelmet from "../../components/SeoHelmet";
// const { Option } = Select;

// const AllOrders = () => {
//   const apiDomain = process.env.REACT_APP_API_URL;

//   const [orders, setOrders] = useState([]);
//   const[total, setTotal] = useState("");
//   const allOrders = async() => {
//     try {
//       const {data} = await axios.get(`${apiDomain}/api/v1/order/get-all`)
//       setOrders(data?.order)
//       setTotal(data?.total)
//     } catch (error) {

//     }
//   }

//   useEffect(()=> {
//     allOrders();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[])

//   const handleChange = async (id, value) => {
//     try {
//       const { data } = await axios.put(`${apiDomain}/api/v1/order/update/${id}`, {status: value});
//       toast.success(data?.message)
//     } catch (error) {
//       toast.error("Internal Server Error");
//     }
//   };

//   const options = {
//     year: 'numeric', month: 'numeric', day: 'numeric',
//     hour: 'numeric', minute: 'numeric', second: 'numeric',
//     hour12: false // 24-hour format
//   };

//   return (
//     <>
//     <SeoHelmet title={`(${total}) Items Order`} description="An admin order dashboard in an eCommerce platform is a central interface specifically designed for administrators or store owners to oversee and manage all aspects of incoming orders. It serves as a control center providing a comprehensive view of the order fulfillment process, enabling effective handling of customer purchases and streamlining operational workflows."/>
//     <div className='dashbord'>
//       <div className='dashbord-menu'><AdminMenu/></div>
//       <div className='dashbord-admin-product-contain'>
//       <h2 className='dashbord-form-heading'>All Orders:- {total}</h2>
//       <div className='dashbord-admin-order-content'>
//           {orders?.map(item => (
//             <div className='dashbord-admin-order-card' key={item?.product?._id}>
//                 <Link className="dashbord-admin-order-image-main" to={`/product/${item?.product?._id}`}><img className='dashbord-admin-order-image' src={item?.product?.image} alt="" /></Link>
//                 <div className='dashbord-admin-order-text'>
//                   <div className="dashbord-admin-order-id"> <strong>Order Id:- </strong>{item?._id}</div>
//                   <div className='dashbord-admin-order-title'>{item?.product?.title.slice(0,30)}...</div>
//                   <div className='dashbord-admin-order-price'><strong>Price:- </strong>₹ {item?.price}/-</div>
//                   <div className='dashbord-admin-order-payment'><strong>Payment:- </strong>{item?.payment}</div>
//                   <div className="dashbord-admin-order-date"><strong>Date:- </strong>{new Date(item?.createdAt).toLocaleDateString('en-US', options)}</div>
//                   <div className='dashbord-admin-order-status'><strong>Status:- </strong>
//                   <Select
//                     defaultValue={item?.status}
//                     className='dashbord-admin-order-status-select'
//                     style={{width: "150px", marginLeft: "10px"}}
//                     onChange={(value) => handleChange(item?._id, value)}>
//                       <Option value="Processing">Processing</Option>
//                       <Option value="Shipped">Shipped</Option>
//                       <Option value="Out Of Delivery">Out Of Delivery</Option>
//                       <Option value="Delivered">Delivered</Option>
//                       <Option value="Out Of Stock">Out Of Stock</Option>
//                       <Option value="Pending">Pending</Option>
//                       <Option value="Cancelled">Cancelled</Option>
//                       <Option value="Refunded">Refunded</Option>
//                       <Option value="Return">Return</Option>
//                   </Select>
//                   </div>
//                 </div>
//                 <div className="dashbord-admin-order-text">
//                   <div className="dashbord-admin-order-user-name"><FaUser/> {item?.user?.name}</div>
//                   <div className="dashbord-admin-order-user-phone"><FaPhoneAlt/> {item?.user?.phone}</div>
//                   <div className="dashbord-admin-order-user-home"><FaHome/> {item?.user?.address}</div>

//                 </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </>
//   )
// }

// export default AllOrders



import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminSlider from "./AdminSidebar";
import "../../style/Orders.css";


const ordersData = [
  {
    id: "ORD-1001",
    customer: "Aarav Sharma",
    email: "aarav@example.com",
    items: 3,
    amount: 2499,
    payment: "Paid",
    status: "Delivered",
    date: "01 Oct 2026",
  },
  {
    id: "ORD-1002",
    customer: "Priya Singh",
    email: "priya@example.com",
    items: 2,
    amount: 1599,
    payment: "Paid",
    status: "Shipped",
    date: "01 Oct 2026",
  },
  {
    id: "ORD-1003",
    customer: "Rahul Kumar",
    email: "rahul@example.com",
    items: 1,
    amount: 899,
    payment: "Pending",
    status: "Processing",
    date: "30 Sep 2026",
  },
  {
    id: "ORD-1004",
    customer: "Sneha Verma",
    email: "sneha@example.com",
    items: 4,
    amount: 4299,
    payment: "Paid",
    status: "Delivered",
    date: "30 Sep 2026",
  },
  {
    id: "ORD-1005",
    customer: "Vikash Yadav",
    email: "vikash@example.com",
    items: 2,
    amount: 1299,
    payment: "Failed",
    status: "Cancelled",
    date: "29 Sep 2026",
  },
  {
    id: "ORD-1006",
    customer: "Anjali Gupta",
    email: "anjali@example.com",
    items: 1,
    amount: 749,
    payment: "Paid",
    status: "Processing",
    date: "29 Sep 2026",
  },
];

function AllOrders() {
  const [orders, setOrders] = useState(ordersData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [selectedOrders, setSelectedOrders] = useState([]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(searchText) ||
        order.customer.toLowerCase().includes(searchText) ||
        order.email.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" || order.payment === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Processing" || order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.payment === "Paid")
    .reduce((total, order) => total + order.amount, 0);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (id) => {
    setSelectedOrders((current) =>
      current.includes(id)
        ? current.filter((orderId) => orderId !== id)
        : [...current, id]
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) return;

    setOrders((current) =>
      current.filter((order) => order.id !== id)
    );

    setSelectedOrders((current) =>
      current.filter((orderId) => orderId !== id)
    );
  };

  return (
    <>
      <AdminSlider />
    <div className="admin-layout">

      <main className="admin-main orders-content">


        {/* Breadcrumb */}
        <div className="orders-breadcrumb">
          <Link to="/admin">Dashboard</Link>
          <span>/</span>
          <strong>Orders</strong>
        </div>

        {/* Stats */}
        <section className="orders-stats">
          <div className="order-stat-card">
            <div className="order-stat-icon">🛍️</div>
            <div>
              <span>Total Orders</span>
              <strong>{totalOrders}</strong>
            </div>
          </div>

          <div className="order-stat-card">
            <div className="order-stat-icon">⏳</div>
            <div>
              <span>Pending Orders</span>
              <strong>{pendingOrders}</strong>
            </div>
          </div>

          <div className="order-stat-card">
            <div className="order-stat-icon">✓</div>
            <div>
              <span>Delivered</span>
              <strong>{deliveredOrders}</strong>
            </div>
          </div>

          <div className="order-stat-card">
            <div className="order-stat-icon">₹</div>
            <div>
              <span>Revenue</span>
              <strong>₹{totalRevenue.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="orders-toolbar">
          <div className="orders-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search order, customer or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="orders-filters">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="All">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </section>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="orders-bulk-bar">
            <strong>{selectedOrders.length} selected</strong>

            <button
              onClick={() => setSelectedOrders([])}
            >
              Clear Selection
            </button>
          </div>
        )}

        {/* Orders Table */}
        <section className="orders-table-card">
          <div className="orders-table-header">
            <div>
              <h2>All Orders</h2>
              <span>{filteredOrders.length} orders found</span>
            </div>

            <button className="export-orders-btn">
              ↓ Export
            </button>
          </div>

          {filteredOrders.length > 0 ? (
            <div className="orders-table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={
                          filteredOrders.length > 0 &&
                          filteredOrders.every((order) =>
                            selectedOrders.includes(order.id)
                          )
                        }
                        onChange={(e) =>
                          handleSelectAll(e.target.checked)
                        }
                      />
                    </th>

                    <th>Order</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() =>
                            handleSelectOrder(order.id)
                          }
                        />
                      </td>

                      <td>
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="order-id"
                        >
                          #{order.id}
                        </Link>
                      </td>

                      <td>
                        <div className="customer-cell">
                          <div className="customer-avatar">
                            {order.customer.charAt(0)}
                          </div>

                          <div>
                            <strong>{order.customer}</strong>
                            <small>{order.email}</small>
                          </div>
                        </div>
                      </td>

                      <td>{order.items} items</td>

                      <td>
                        <strong>
                          ₹{order.amount.toLocaleString("en-IN")}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`payment-badge ${order.payment.toLowerCase()}`}
                        >
                          {order.payment}
                        </span>
                      </td>

                      <td>
                        <select
                          className={`order-status-select ${order.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="Processing">
                            Processing
                          </option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">
                            Delivered
                          </option>
                          <option value="Cancelled">
                            Cancelled
                          </option>
                        </select>
                      </td>

                      <td>{order.date}</td>

                      <td>
                        <div className="order-actions">
                          <Link
                            to={`/admin/orders/${order.id}`}
                            title="View Order"
                          >
                            👁
                          </Link>

                          <button
                            onClick={() => handleDelete(order.id)}
                            title="Delete Order"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="orders-empty">
              <div>📦</div>
              <h3>No orders found</h3>
              <p>
                Try changing your search or filter.
              </p>
            </div>
          )}
        </section>

        {/* Footer Info */}
        <div className="orders-footer-info">
          <span>
            Showing {filteredOrders.length} of {orders.length} orders
          </span>

          <div className="orders-pagination">
            <button disabled>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>
          </div>
        </div>
      </main>
    </div>
    </>

  );
}

export default AllOrders;