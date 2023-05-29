import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext);
  console.log(user);
  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error.message));
  };
  const list = (
    <>
      {loading ? (
        <progress className="progress w-56 mt-5"></progress>
      ) : (
        user?.displayName === "arfatul1412" && (
          <>
            <li>
              <Link to={"/addBook"}>Add Book</Link>
            </li>
            <li>
              <Link to={"/addedBooks"}>My Added Books</Link>
            </li>
          </>
        )
      )}
      {loading ? (
        <progress className="progress w-56 mt-5"></progress>
      ) : (
        user?.displayName !== "arfatul1412" && user && (
          <>
            <li>
              <Link to={"/bookStore"}>Book Store</Link>
            </li>
            <li>
              <Link to={"/myBorrowed"}>My Borrowed Books</Link>
            </li>
          </>
        )
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {list}
          </ul>
        </div>
        <a className="md:text-3xl text-xl font-bold text-black w-full ">Library Management</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{list}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        ) : (
          <li className="btn">
            <Link to={"/login"}>Login</Link>
          </li>
        )}
      </div>
    </div>
  );
};

export default Navbar;
