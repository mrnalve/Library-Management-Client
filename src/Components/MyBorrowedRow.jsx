import React, { useEffect, useState } from "react";

const MyBorrowedRow = ({ book, handleReturn }) => {
  const [update, setUpdate] = useState([]);
  useEffect(() => {
    fetch(`https://lm-server-mrnalve.vercel.app/addBook/${book.bookId}`)
      .then((res) => res.json())
      .then((data) => {
        setUpdate(data);
      });
  }, []);
  const bookQuantity = update[0]?.bookQuantity;
  return (
    <tr className="text-center">
      <td>{book.bookName}</td>
      <td>{book.bookAuthor}</td>
      <td>{book.bookRating}</td>
      <td>
        <button
          onClick={() => handleReturn(book._id, bookQuantity, book.bookId)}
          className="btn-grad"
        >
          Return
        </button>
      </td>
    </tr>
  );
};

export default MyBorrowedRow;
