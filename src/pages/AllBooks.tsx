// src/pages/ViewAllBooks.tsx
import React from "react";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import { useBooks } from "../context/Bookcontext";

const ViewAllBooks: React.FC = () => {
  const { books, currentPage, itemsPerPage, setCurrentPage } = useBooks();

  // Calculate pagination
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = books.slice(startIndex, endIndex);

  return (
    <div className="relative">
      <div className="pt-12 pb-16">
        <div className="grid grid-cols-3 gap-4">
          {currentBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ViewAllBooks;
