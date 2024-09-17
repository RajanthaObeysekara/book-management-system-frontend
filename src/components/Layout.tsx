import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import TitleBar from "./Titlebar";
import { useBooks } from "../context/Bookcontext";
import Spinner from "./Spinner";

const Layout: React.FC = () => {
  const { bookLoading } = useBooks();
  return (
    <>
      {bookLoading && <Spinner />}
      <div className="flex h-screen w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TitleBar />
          <div className="flex-1 p-4 overflow-auto max-h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
