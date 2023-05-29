import React from "react";
import { Link } from "react-router-dom";

const MyAddedBooksRow = ({ bookData, handleBookDelete }) => {
  const { _id, bookName, bookAuthor, bookQuantity, bookRating } = bookData;
  return (
    <tr className="space-y-8 text-center">
      <td>{bookName}</td>
      <td>{bookAuthor}</td>
      <td>{bookRating}</td>
      <td>{bookQuantity}</td>
      <td>
        <button
        onClick={()=> handleBookDelete(_id)}
          className="btn-grad text-[16px]"
          style={{ padding: "8px 12px", textTransform: "capitalize" }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MyAddedBooksRow;
