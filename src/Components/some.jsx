import React, { useState } from "react";

const MyBorrowedRow = ({ book }) => {
  const [alertMessage, setAlertMessage] = useState("");

  const handleReturn = () => {
    fetch(`http://localhost:5000/borrowed/${book._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetch(`http://localhost:5000/addBook/${book.bookId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ $inc: { bookQuantity: 1 } }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setAlertMessage("Book returned successfully.");
              } else {
                setAlertMessage("Error occurred while updating book quantity.");
              }
            })
            .catch((error) => {
              setAlertMessage("Error occurred while updating book quantity.");
            });
        } else {
          setAlertMessage("Error occurred while returning the book.");
        }
      })
      .catch((error) => {
        setAlertMessage("Error occurred while returning the book.");
      });
  };

  return (
    <tr className="text-center">
      <td>{book.bookName}</td>
      <td>{book.bookAuthor}</td>
      <td>{book.bookRating}</td>
      <td>
        <button onClick={handleReturn} className="btn-grad">
          Return
        </button>
      </td>
      {alertMessage && (
        <td>
          <p className={alertMessage.includes("Error") ? "text-red-500" : "text-green-500"}>
            {alertMessage}
          </p>
        </td>
      )}
    </tr>
  );
};

export default MyBorrowedRow;
