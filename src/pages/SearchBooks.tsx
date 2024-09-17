import React, { useEffect, useState } from "react";
import { useBooks } from "../context/Bookcontext";
import BookCard from "../components/BookCard";
import { Book } from "../types/BookTypes";

const SearchBooks: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const { books } = useBooks();

  useEffect(() => {
    setFilteredBooks(
      query === ""
        ? []
        : books.filter(
            (book) =>
              book.title.toLowerCase().includes(query.toLowerCase()) ||
              book.author.toLowerCase().includes(query.toLowerCase())
          )
    );
  }, [books, query]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Search Books
        </h1>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for books..."
            className="w-full p-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0A8.5 8.5 0 1112 4.5a8.5 8.5 0 014.65 12.15z"
              />
            </svg>
          </span>
        </div>
      </div>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
        {query && filteredBooks.length === 0 && (
          <div className="bg-white p-4 rounded-lg shadow-lg col-span-full">
            <h2 className="text-xl font-semibold text-gray-700">Results:</h2>
            <p className="text-gray-600">No results to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
