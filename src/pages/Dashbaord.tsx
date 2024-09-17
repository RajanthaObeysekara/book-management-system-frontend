import React, { useEffect, useState } from "react";
import { useBooks } from "../context/Bookcontext";
import BookCard from "../components/BookCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faBook } from "@fortawesome/free-solid-svg-icons";
import { Book, CategoryCount } from "../types/BookTypes";

const Dashboard: React.FC = () => {
  const { books, totalBooks } = useBooks();
  const [categoryCounts, setCategoryCounts] = useState<CategoryCount>({});

  useEffect(() => {
    const tempCategoryCounts: CategoryCount = {};
    for (const book of books) {
      const { category } = book;
      if (tempCategoryCounts[category]) {
        tempCategoryCounts[category]++;
      } else {
        tempCategoryCounts[category] = 1;
      }
    }
    setCategoryCounts(tempCategoryCounts);
  }, [books]);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Library Book Status
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="bg-green-600 p-4 rounded-lg shadow-md text-center text-white flex flex-col items-center justify-center h-24 w-full">
            <FontAwesomeIcon icon={faBookOpen} className="text-2xl mb-2" />
            <h3 className="text-md font-semibold mb-1">Total Books</h3>
            <p className="text-xl font-bold">{totalBooks}</p>
          </div>
          {Object.entries(categoryCounts).map(([category, count]) => (
            <div
              key={category}
              className="bg-blue-500 p-4 rounded-lg shadow-lg text-center text-white flex flex-col items-center justify-center h-24 w-full"
            >
              <FontAwesomeIcon icon={faBook} className="text-2xl mb-2" />
              <h3 className="text-md font-semibold mb-1">{category}</h3>
              <p className="text-md">
                {count as number} book{(count as number) > 1 ? "s" : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Newly Added Books</h2>
        <div className="grid grid-cols-4 gap-4">
          {books.slice(0, 4).map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
