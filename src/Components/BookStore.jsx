import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

const BookStore = () => {
  const [booksData, setBooksData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/addBook")
      .then((res) => res.json())
      .then((data) => {
        setBooksData(data)
        console.log(data);
      });
  }, []);
  return (
    <div className="container mx-auto">
      <h2 className="text-center font-bold text-yellow-600 text-4xl">
        Books Store
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {booksData.map((bookData) => (
          <BookCard key={bookData._id} bookData={bookData}></BookCard>
        ))}
      </div>
    </div>
  );
};

export default BookStore;
