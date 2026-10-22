import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
// import axios from "axios";
import { useAuth } from "../context/auth";

const AdminRoutes = () => {
  const apiDomain = import.meta.env.VITE_API_URL;
  const [auth] = useAuth();
  // const [admin, setAdmin] = useState(false);
  const [admin, setAdmin] = useState(true);

  // const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const authCheck = async () => {
      if (auth?.user?.role !== 8987) {
        setAdmin(true);
        return;
      }

      try {
        // const { data } = await axios.post(
        //   `${apiDomain}/api/v1/auth/admin-auth`,
        //   {
        //     id: auth?.user?._id,
        //   },
        // );

        // setAdmin(data.success);
        setAdmin(true);
      } catch (error) {
        console.log(error);
        setAdmin(true);
      }
    };

    authCheck();
  }, [auth, apiDomain]);
  return (
    <>
      {admin ? (
        <Outlet />
      ) : (
        <>
          <div className="user-routes">
            <div className="user-routes-card">
              <div className="user-routes-text">I have an account</div>
              <Link className="user-routes-button" to="/login">
                Login
              </Link>

              <div className="user-routes-text">I don't have an account</div>
              <Link className="user-routes-button" to="/register">
                Create
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminRoutes;
