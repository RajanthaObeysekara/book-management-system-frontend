import { useNavigate } from "react-router-dom";
import { useBooks } from "../context/Bookcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { BookCardProps } from "../types/BookTypes";

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  const { removeBook } = useBooks();

  const handleDelete = () => {
    removeBook(book.id);
  };

  const handleDetails = () => {
    navigate(`/bookdetail/${book.id}`);
  };

  return (
    <div className="max-w-xs rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out bg-white relative group hover:scale-105">
      {/* Image Section */}
      <img
        className="w-full h-40 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        src={book.cover_image}
        alt={book.title}
      />
      {/* Details Section */}
      <div className="p-5 transition-all duration-300 ease-in-out group-hover:pt-4 group-hover:pb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">
          {book.title}
        </h2>
        <p className="text-gray-600 text-sm mb-2 truncate">by {book.author}</p>
        <p className="text-gray-500 text-xs mb-3">{book.publication_date}</p>
        <p className="text-gray-500 text-xs">ISBN: {book.ISBN}</p>
        <p className="text-gray-700 text-sm line-clamp-3 mb-3 transition-opacity duration-300 ease-in-out group-hover:opacity-70">
          {book?.category}
        </p>
        <div className="flex gap-4 justify-between mt-4">
          <button
            className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-all duration-300 flex items-center gap-2"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
            <span>Delete</span>
          </button>
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300 flex items-center gap-2"
            onClick={handleDetails}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
