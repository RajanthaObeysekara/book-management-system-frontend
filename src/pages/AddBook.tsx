import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axiosInstance from "../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useBooks } from "../context/Bookcontext";
import { AddBookProps, BookFormInputs } from "../types/BookTypes";
import { toast } from "react-toastify";
import { applicationRoutes } from "../constants/routepath";

const AddBook: React.FC<AddBookProps> = ({ isEdit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BookFormInputs>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { getBookById, selectedBook, fetchBooks } = useBooks(); // Fetch the method to get a book by its ID from context

  useEffect(() => {
    if (isEdit && id && selectedBook) {
      getBookById(id as string);

      // Pre-fill the form with existing book data
      setValue("title", selectedBook.title);
      setValue("author", selectedBook.author);
      setValue("publishDate", selectedBook.publication_date);
      setValue("isbn", selectedBook.ISBN);
      setValue("category", selectedBook.category);

      // You cannot set a value for the file input. Instead, show the image using an <img> tag.
    }
  }, [isEdit, id, setValue, selectedBook, getBookById]);
  const onSubmit: SubmitHandler<BookFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("isbn", data.isbn);
    formData.append("publishDate", data.publishDate);
    formData.append("category", data.category);

    if (data.bookImage && data.bookImage.length > 0) {
      formData.append("bookImage", data.bookImage[0]);
    }

    try {
      isEdit && id
        ? await axiosInstance.put(`/books/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        : await axiosInstance.post("/books", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      if (isEdit) {
        toast.success("updated Successfully");
      } else {
        toast.success("inserted successfully");
      }
      fetchBooks();
      navigate(applicationRoutes.DASBOARD_PAGE);
    } catch (error) {
      fetchBooks();
      toast.error("Opertaion failed");
      console.error("Operation failed:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Book" : "Add New Book"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Title */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter book title"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Author */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            {...register("author", { required: "Author is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author's name"
          />
          {errors.author && (
            <span className="text-red-500 text-sm">
              {errors.author.message}
            </span>
          )}
        </div>

        {/* ISBN */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="isbn"
          >
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            {...register("isbn", { required: "ISBN is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ISBN"
          />
          {errors.isbn && (
            <span className="text-red-500 text-sm">{errors.isbn.message}</span>
          )}
        </div>

        {/* Publish Date */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="publishDate"
          >
            Publish Date
          </label>
          <input
            type="date"
            id="publishDate"
            {...register("publishDate", {
              required: "Publish date is required",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.publishDate && (
            <span className="text-red-500 text-sm">
              {errors.publishDate.message}
            </span>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="Fiction">Fiction</option>
            <option value="Comedy">Comedy</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Young Adult (YA)">Young Adult (YA)</option>
            <option value="Children’s Books">Children’s Books</option>
            <option value="Thriller & Suspense">Thriller & Suspense</option>
            <option value="Science Fiction & Fantasy">
              Science Fiction & Fantasy
            </option>
            <option value="Biography & Memoir">Biography & Memoir</option>
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>

        {/* Existing Book Image */}
        {isEdit && selectedBook?.cover_image && (
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Current Book Image
            </label>
            <img
              src={selectedBook.cover_image}
              alt="Book Cover"
              className="w-32 h-40 object-cover rounded-lg mb-4"
            />
          </div>
        )}

        {/* Book Image Upload */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="bookImage"
          >
            Upload New Book Image
          </label>
          <input
            type="file"
            id="bookImage"
            {...register("bookImage")}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
          />
          {errors.bookImage && (
            <span className="text-red-500 text-sm">
              {errors.bookImage.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isEdit ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
