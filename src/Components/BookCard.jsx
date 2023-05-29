import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';

const BookCard = ({ bookData }) => {
  const { bookAuthor, bookImage, bookName, bookQuantity, bookRating, _id } =
  bookData;
  const { user } = useContext(AuthContext);
  const handleBorrow = () => {
    if (bookQuantity > 0) {
      if (user?.email) {
        const borrowedBook = {
          bookId: _id,
          bookAuthor,
          bookName,
          bookQuantity,
          bookRating,
          email: user.email,
        };
        fetch("http://localhost:5000/borrowed", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(borrowedBook),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              const updatedQuantity = bookQuantity - 1;
              updateBookQuantity(_id, updatedQuantity);
              toast.success('Successfully Borrowed!');
            }
          });
      }
    } else {
      toast.error("This Book is out of stock");
    }
  };

  const updateBookQuantity = (_id, quantity) => {
    // Send a request to the backend to update the book quantity
    fetch(`http://localhost:5000/borrowed/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ bookQuantity: quantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Book quantity updated:", data);
      })
      .catch((error) => {
        console.error("Error updating book quantity:", error);
      });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="h-72" src={bookImage} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {bookName}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{bookAuthor}</p>
        <div className="card-actions justify-end items-center">
          <div className="badge badge-outline">
            <span>{bookRating}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-500 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 0l6 18H4l6-18zm0 0l-6 18h12l-6-18zm-1.239 8.048l-.588-1.813L5 7.397l1.94-1.412L8.333 3l.555 1.985L10 7l1.112-1.015L13.06 3l1.392 2.985L15 7.397l-2.173.838-.588 1.813L10 8.476zM10 15.313l-3.531 2.156 1.032-3.563L3.75 9.876l3.625-.282L10 6l1.625 3.594 3.625.282-2.75 2.031 1.032 3.563L10 15.312z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="">
            <button onClick={handleBorrow} className="btn-grad disabled:bg-white">
              Borrow
            </button>
            <Toaster></Toaster>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
