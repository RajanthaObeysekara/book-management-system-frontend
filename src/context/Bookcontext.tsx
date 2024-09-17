import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../axiosInstance";
import { Book, BooksContextType } from "../types/BookTypes";
import { apiRoutePaths } from "../constants/routepath";

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bookLoading, setBookLoading] = useState<boolean>(false); // State variable to
  const itemsPerPage = 4;
  // Fetch books from the backend

  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    setBookLoading(true);
    try {
      const response = await axiosInstance.get(apiRoutePaths.BOOKS_GET);
      setBooks(response.data);
      setTotalBooks(response.data.length);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setBookLoading(false);
  };

  // Remove a book from the list by id
  const removeBook = async (id: string) => {
    setBookLoading(true);
    try {
      await axiosInstance.delete(`/books/${id}`); // Replace with your backend API endpoint
    } catch (error) {
      console.error("Error removing book:", error);
    }
    fetchBooks();
    setBookLoading(false);
  };

  // Get a book by id
  const getBookById = async (id: string): Promise<Book | undefined> => {
    // Try to find the book in the current state
    let selectedBook = books.find((book) => String(book.id) === String(id));
    if (selectedBook) {
      setSelectedBook(selectedBook);
    }

    return selectedBook;
  };

  // Pass context values to the provider
  const value = {
    books,
    totalBooks,
    removeBook,
    getBookById,
    fetchBooks,
    selectedBook,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    bookLoading,
  };

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
