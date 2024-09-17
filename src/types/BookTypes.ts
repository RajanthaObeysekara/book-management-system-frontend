export type Book = {
  id: string;
  title: string;
  author: string;
  publication_date: string;
  ISBN: string;
  category: string;
  cover_image: string;
};

export type CategoryCount = {
  [category: string]: number;
};

export type BookFormInputs = {
  title: string;
  author: string;
  publishDate: string;
  isbn: string;
  category: string;
  bookImage: FileList;
};

export interface AddBookProps {
  isEdit: boolean;
}
export interface BookCardProps {
  book: Book;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface BooksContextType {
  books: Book[];
  totalBooks: number;
  removeBook: (id: string) => void;
  getBookById: (id: string) => Promise<Book | undefined>;
  fetchBooks: () => void;
  selectedBook: Book | undefined;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  bookLoading: boolean;
}
