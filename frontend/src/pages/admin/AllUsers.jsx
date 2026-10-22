// import React, { useEffect, useState } from 'react'
// import AdminMenu from './AdminSidebar'
// import axios from 'axios';
// import { Modal } from 'antd';
// import { toast } from 'react-toastify';
// import { IoIosMail } from "react-icons/io";
// import { FaPhoneAlt,FaUser,  } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import SeoHelmet from '../../components/SeoHelmet';

// const AllUsers = () => {
//   const apiDomain = process.env.REACT_APP_API_URL;

//   const [users, setUsers] = useState([]);
//   const[total, setTotal] = useState("");
//   const[id, setId] = useState("");
//   const[name, setName] = useState("");
//   const[email, setEmail] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const getAllUsers = async() => {
//     try {
//       const {data} = await axios.get(`${apiDomain}/api/v1/auth/get-allusers`)
//         setUsers(data.allUsers);
//         setTotal(data.counTotal)
//     } catch (error) {
//       console.log(error)
//     }
//   }
// useEffect(()=>{
//   getAllUsers();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// },[])

// const deleteUser = async()=>{
//   try {
//     const {data} = await axios.delete(`${apiDomain}/api/v1/auth/admin-delete/${id}`)
//     if(data.success){
//       toast.success(data.message)
//     }
//     setIsModalOpen(false);
//     getAllUsers();
//   } catch (error) {
//     toast.error("Internal Server Error")
//   }
// }

//   return (
//     <>
//     <SeoHelmet title={`(${total} ) Users Registered`} description='The "Admin All Users" section within an eCommerce platform provides administrators or store owners with a comprehensive view and management interface for all user accounts accessing the system. This area allows administrators to oversee, manage, and maintain user profiles, ensuring smooth operations and access control within the eCommerce environment'/>
//     {/* <SeoHelmet title="" description=""/> */}
//     <div className='dashbord'>
//       <div className='dashbord-menu'><AdminMenu/></div>
//       <div className=''>
//         <div className='dashbord-menu-total'>All Users:- {total}</div>
//         <div className='dashbord-menu-box'>
//           {users?.map((u)=>(
//             <div className='dashbord-menu-box-card'>
//               <div><FaUser/> {u.name}</div>
//               <div><IoIosMail/> {u.email}</div>
//               <div><FaPhoneAlt/> {u.phone}</div>
//               <div className='dashbord-menu-box-card-delete' onClick={()=> {showModal(); setId(u._id); setName(u.name); setEmail(u.email)}} ><MdDelete/></div>
//             </div>
//           ))}
//         </div>
//         <Modal title="Delete User" open={isModalOpen} onOk={deleteUser} onCancel={handleCancel}>
//         <h3>If you want to delete then click on "Ok"</h3>
//         <p><strong>Name:- </strong>{name}</p>
//         <p><strong>Email:- </strong>{email}</p>
//       </Modal>
//       </div>
//     </div>
//     </>
//   )
// }

// export default AllUsers

import { useState } from "react";
import { Link } from "react-router-dom";
import AdminSlider from "./AdminSidebar";
import "../../style/AllUsers.css";

const customersData = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 90000 00001",
    orders: 24,
    spent: 18500,
    status: "Active",
    joined: "Sep 28, 2026",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "+91 90000 00002",
    orders: 18,
    spent: 12400,
    status: "Active",
    joined: "Sep 25, 2026",
    image: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "+91 90000 00003",
    orders: 12,
    spent: 8600,
    status: "Inactive",
    joined: "Sep 20, 2026",
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 4,
    name: "Sneha Verma",
    email: "sneha@example.com",
    phone: "+91 90000 00004",
    orders: 31,
    spent: 24500,
    status: "Active",
    joined: "Sep 18, 2026",
    image: "https://i.pravatar.cc/100?img=44",
  },
  {
    id: 5,
    name: "Rohan Gupta",
    email: "rohan@example.com",
    phone: "+91 90000 00005",
    orders: 7,
    spent: 4200,
    status: "Blocked",
    joined: "Sep 15, 2026",
    image: "https://i.pravatar.cc/100?img=13",
  },
  {
    id: 6,
    name: "Ananya Patel",
    email: "ananya@example.com",
    phone: "+91 90000 00006",
    orders: 15,
    spent: 11200,
    status: "Active",
    joined: "Sep 12, 2026",
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 7,
    name: "Vivek Singh",
    email: "vivek@example.com",
    phone: "+91 90000 00007",
    orders: 9,
    spent: 6800,
    status: "Active",
    joined: "Sep 10, 2026",
    image: "https://i.pravatar.cc/100?img=68",
  },
  {
    id: 8,
    name: "Neha Sharma",
    email: "neha@example.com",
    phone: "+91 90000 00008",
    orders: 21,
    spent: 15900,
    status: "Inactive",
    joined: "Sep 05, 2026",
    image: "https://i.pravatar.cc/100?img=49",
  },
];

function AllUsers() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  const filteredCustomers = customersData.filter((customer) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      customer.name.toLowerCase().includes(searchValue) ||
      customer.email.toLowerCase().includes(searchValue) ||
      customer.phone.toLowerCase().includes(searchValue);

    const matchesStatus = status === "All" || customer.status === status;

    return matchesSearch && matchesStatus;
  });

  const toggleCustomer = (id) => {
    setSelectedCustomers((current) =>
      current.includes(id)
        ? current.filter((customerId) => customerId !== id)
        : [...current, id],
    );
  };

  const toggleAll = () => {
    if (
      selectedCustomers.length === filteredCustomers.length &&
      filteredCustomers.length > 0
    ) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map((customer) => customer.id));
    }
  };

  return (
    <>
      <AdminSlider />

      <div className="admin-dashbord-layout">
        <div className="customer-content">
          {/* ================= HEADING ================= */}

          <div className="customer-heading">
            <div>
              <div className="customer-breadcrumb">
                <span>Dashboard</span>
                <b>/</b>
                <span>Customers</span>
              </div>

              <h1>Customers</h1>

              <p>Manage and monitor your store customers.</p>
            </div>

            <Link to="/admin/customers/add" className="add-customer-btn">
              <span>+</span>
              Add Customer
            </Link>
          </div>

          {/* ================= STATS ================= */}

          <section className="customer-stats">
            <div className="customer-stat-card">
              <div className="customer-stat-icon blue">👥</div>

              <div>
                <span>Total Customers</span>
                <strong>248</strong>
              </div>
            </div>

            <div className="customer-stat-card">
              <div className="customer-stat-icon green">✓</div>

              <div>
                <span>Active Customers</span>
                <strong>218</strong>
              </div>
            </div>

            <div className="customer-stat-card">
              <div className="customer-stat-icon orange">🛒</div>

              <div>
                <span>Total Orders</span>
                <strong>1,426</strong>
              </div>
            </div>

            <div className="customer-stat-card">
              <div className="customer-stat-icon purple">₹</div>

              <div>
                <span>Total Revenue</span>
                <strong>₹12.8L</strong>
              </div>
            </div>
          </section>

          {/* ================= CUSTOMER CARD ================= */}

          <section className="customers-card">
            {/* ================= TOOLBAR ================= */}

            <div className="customers-toolbar">
              <div className="customer-toolbar-left">
                <div className="customer-search">
                  <span>⌕</span>

                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="All">All Status</option>

                  <option value="Active">Active</option>

                  <option value="Inactive">Inactive</option>

                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              {selectedCustomers.length > 0 && (
                <div className="customer-bulk-actions">
                  <span>{selectedCustomers.length} selected</span>

                  <button>Activate</button>

                  <button>Block</button>

                  <button className="customer-delete">Delete</button>
                </div>
              )}
            </div>

            {/* ================= TABLE ================= */}

            <div className="customers-table-wrapper">
              <table className="customers-table">
                <thead>
                  <tr>
                    <th className="customer-checkbox">
                      <input
                        type="checkbox"
                        checked={
                          filteredCustomers.length > 0 &&
                          selectedCustomers.length === filteredCustomers.length
                        }
                        onChange={toggleAll}
                      />
                    </th>

                    <th>Customer</th>

                    <th>Phone</th>

                    <th>Orders</th>

                    <th>Total Spent</th>

                    <th>Joined</th>

                    <th>Status</th>

                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      {/* Checkbox */}

                      <td>
                        <input
                          type="checkbox"
                          checked={selectedCustomers.includes(customer.id)}
                          onChange={() => toggleCustomer(customer.id)}
                        />
                      </td>

                      {/* Customer */}

                      <td>
                        <div className="customer-info">
                          <img src={customer.image} alt={customer.name} />

                          <div>
                            <strong>{customer.name}</strong>

                            <span>{customer.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}

                      <td>
                        <span className="customer-phone">{customer.phone}</span>
                      </td>

                      {/* Orders */}

                      <td>
                        <strong className="customer-order-count">
                          {customer.orders}
                        </strong>
                      </td>

                      {/* Total Spent */}

                      <td>
                        <strong className="customer-spent">
                          ₹{customer.spent.toLocaleString("en-IN")}
                        </strong>
                      </td>

                      {/* Joined */}

                      <td>
                        <span className="customer-joined">
                          {customer.joined}
                        </span>
                      </td>

                      {/* Status */}

                      <td>
                        <span
                          className={`customer-status ${customer.status.toLowerCase()}`}
                        >
                          <i />

                          {customer.status}
                        </span>
                      </td>

                      {/* Actions */}

                      <td>
                        <div className="customer-actions">
                          <Link
                            to={`/admin/customers/view/${customer.id}`}
                            title="View"
                          >
                            👁
                          </Link>

                          <Link
                            to={`/admin/customers/edit/${customer.id}`}
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

                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td colSpan="8" className="customers-empty">
                        <div>
                          <span>👥</span>

                          <strong>No customers found</strong>

                          <p>Try changing your search or status filter.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ================= PAGINATION ================= */}

            <div className="customers-pagination">
              <span>
                Showing <strong>{filteredCustomers.length}</strong> of{" "}
                <strong>{customersData.length}</strong> customers
              </span>

              <div className="customer-pagination-buttons">
                <button disabled>←</button>

                <button className="active">1</button>

                <button>2</button>

                <button>3</button>

                <button>→</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default AllUsers;
