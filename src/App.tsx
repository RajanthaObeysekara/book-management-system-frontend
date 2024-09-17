// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashbaord";

import { AuthProvider } from "./context/Authcontext";
import Layout from "./components/Layout";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import { ToastContainer } from "react-toastify";
import { BooksProvider } from "./context/Bookcontext";
import ViewAllBooks from "./pages/AllBooks";
import SearchBooks from "./pages/SearchBooks";
import NonProtectedRoute from "./components/NonProtectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { applicationRoutes } from "./constants/routepath";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BooksProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route element={<NonProtectedRoute />}>
              <Route path={applicationRoutes.LOGIN_PAGE} element={<Login />} />
              <Route
                path={applicationRoutes.SIGNUP_PAGE}
                element={<Signup />}
              />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route
                  path={applicationRoutes.BOOKDETAIL}
                  element={<BookDetail />}
                />
                <Route
                  path={applicationRoutes.DASBOARD_PAGE}
                  element={<Dashboard />}
                />
                <Route
                  path={applicationRoutes.ADD_BOOK}
                  element={<AddBook isEdit={false} />}
                />
                <Route
                  path={applicationRoutes.UPDATE_BOOK}
                  element={<AddBook isEdit={true} />}
                />
                <Route
                  path={applicationRoutes.ALL_BOOKS}
                  element={<ViewAllBooks />}
                />
                <Route
                  path={applicationRoutes.SEARCH_BOOKS}
                  element={<SearchBooks />}
                />
                <Route
                  path="/"
                  element={<Navigate to={applicationRoutes.DASBOARD_PAGE} />}
                />
              </Route>
            </Route>
            <Route
              path="*"
              element={<Navigate to={applicationRoutes.DASBOARD_PAGE} />}
            />
          </Routes>
        </Router>
      </BooksProvider>
    </AuthProvider>
  );
};

export default App;
