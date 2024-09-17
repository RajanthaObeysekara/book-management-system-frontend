import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBooks } from "../context/Bookcontext"; // Assuming you have a Book context to fetch book data
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCalendarAlt,
  faBook,
  faTag,
  faBarcode,
} from "@fortawesome/free-solid-svg-icons";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the book ID from the URL params
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { getBookById, selectedBook } = useBooks(); // Fetch the method to get a book by its ID from context

  // Fetch the book details on component mount
  React.useEffect(() => {
    getBookById(id as string);
  }, [id, getBookById]);

  const handleEditClick = () => {
    navigate(`/updatebooks/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-blue-50 shadow-lg rounded-lg mt-8">
      <div className="flex flex-col md:flex-row">
        {/* Book Cover */}
        <div className="md:w-1/3 mb-4 md:mb-0">
          <img
            src={
              selectedBook?.cover_image || "https://via.placeholder.com/300x400"
            } // added this dummy one for the testing,
            alt={selectedBook?.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Book Details */}
        <div className="md:w-2/3 md:ml-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            {selectedBook?.title}
          </h1>
          <div className="text-lg text-gray-700 mb-2 flex items-center">
            <FontAwesomeIcon icon={faBook} className="mr-2 text-blue-500" />
            {selectedBook?.author}
          </div>
          <div className="text-lg text-gray-700 mb-2 flex items-center">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="mr-2 text-blue-500"
            />
            {selectedBook?.publication_date}
          </div>
          <div className="text-lg text-gray-700 mb-2 flex items-center">
            <FontAwesomeIcon icon={faTag} className="mr-2 text-blue-500" />
            {selectedBook?.category}
          </div>
          <div className="text-lg text-gray-700 mb-6 flex items-center">
            <FontAwesomeIcon icon={faBarcode} className="mr-2 text-blue-500" />
            {selectedBook?.ISBN}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={handleEditClick}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit Book Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
