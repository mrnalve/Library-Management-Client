import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Toaster, toast } from "react-hot-toast";

const AddBook = () => {
  const { loading } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const bookName = form.bookName.value;
    const bookImage = form.bookImage.value;
    const bookAuthor = form.bookAuthor.value;
    const bookQuantity = parseInt(form.bookQuantity.value);
    const bookRating = form.bookQuantity.value;
    const bookData = {
      bookName,
      bookImage,
      bookAuthor,
      bookQuantity,
      bookRating,
    };
    console.log(bookData);
    fetch("https://lm-server-mrnalve.vercel.app/addBook", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Book add successfully");
        form.reset()
        console.log(data)});
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="bookName" className="block text-gray-700">
            Book Name
          </label>
          <input
            type="text"
            id="bookName"
            name="bookName"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bookImage" className="block text-gray-700">
            Book Image URL
          </label>
          <input
            type="text"
            id="bookImage"
            name="bookImage"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bookAuthor" className="block text-gray-700">
            Book Author
          </label>
          <input
            type="text"
            id="bookAuthor"
            name="bookAuthor"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bookQuantity" className="block text-gray-700">
            Book Quantity
          </label>
          <input
            type="number"
            id="bookQuantity"
            name="bookQuantity"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bookRating" className="block text-gray-700">
            Book Rating
          </label>
          <input
            type="number"
            id="bookRating"
            name="bookRating"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add Book
          </button>
          <Toaster />
        </div>
      </form>
    </div>
  );
};

export default AddBook;
