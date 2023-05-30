import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import MyBorrowedRow from "./MyBorrowedRow";
import Swal from "sweetalert2";

const MyBorrowed = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch(`https://lm-server-mrnalve.vercel.app/borrowed?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  // handle return button

  const handleReturn = (_id, bookQuantity, bookId) => {
    const updatedQuantity = bookQuantity + 1;
    console.log(updatedQuantity);
    fetch(`https://lm-server-mrnalve.vercel.app/borrowed/${bookId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ bookQuantity: updatedQuantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Book quantity updated:", data);
      })
      .catch((error) => {
        console.error("Error updating book quantity:", error);
      });
    fetch(`https://lm-server-mrnalve.vercel.app/borrowed/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Return book successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          const remaining = books.filter((book) => book._id !== _id);
          setBooks(remaining);
        }
      });
  };

  return (
    <div>
      <h3 className="text-center text-yellow-500 font-bold my-7">
        My Borrowed
      </h3>
      <div className="overflow-x-auto my-8">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>Books Name</th>
              <th>Books Author</th>
              <th>Rating</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* row 1 */}
            {books?.map((book) => (
              <MyBorrowedRow
                handleReturn={handleReturn}
                key={book._id}
                book={book}
              ></MyBorrowedRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBorrowed;
