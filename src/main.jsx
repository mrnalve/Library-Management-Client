import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Layout/Main.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import AddBook from "./Components/AddBook.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import Home from "./Components/Home";
import PrivateRoute from "./Route/PrivateRoute";
import MyAddedBooks from "./Components/MyAddedBooks";
import UserPrivateRoute from "./Route/UserPrivateRoute";
import BookStore from "./Components/Bookstore";
import MyBorrowed from "./Components/MyBorrowed";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Login></Login>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addBook",
        element: <PrivateRoute><AddBook></AddBook></PrivateRoute>,
      },
      {
        path: "/addedBooks",
        element: <PrivateRoute><MyAddedBooks></MyAddedBooks></PrivateRoute>,
      },
      {
        path: '/bookStore',
        element: <UserPrivateRoute><BookStore></BookStore></UserPrivateRoute>
      },
      {
        path: '/myBorrowed',
        element: <UserPrivateRoute><MyBorrowed></MyBorrowed></UserPrivateRoute>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <div className="container mx-auto">
    <RouterProvider router={router} />
    </div>
  </AuthProvider>
);
