import React, { useEffect, useState } from "react";
import MyAddedBooksRow from "./MyAddedBooksRow";
import "./css/MyAddedBooksRow.css";
import Swal from "sweetalert2";

const MyAddedBooks = () => {
  const [booksData, setBooksData] = useState([]);
  useEffect(() => {
    fetch("https://lm-server-mrnalve.vercel.app/addBook")
      .then((res) => res.json())
      .then((data) => {
        setBooksData(data);
        console.log(data);
      });
  }, []);

  // handle book delete
  const handleBookDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://lm-server-mrnalve.vercel.app/addBook/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your book has been deleted.", "success");
              const remaining = booksData.filter((bookData) => bookData._id !== _id);
              setBooksData(remaining);
            }
          });
      }
    });
  };
  return (
    <div className="overflow-x-auto my-8">
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
          <tr className="text-center">
            <th>Books Name</th>
            <th>Books Author</th>
            <th>Rating</th>
            <th>Available Quantity</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {booksData?.map((bookData) => (
            <MyAddedBooksRow
            handleBookDelete={handleBookDelete}
              key={bookData._id}
              bookData={bookData}
            ></MyAddedBooksRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAddedBooks;
