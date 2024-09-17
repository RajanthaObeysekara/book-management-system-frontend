import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBookOpen,
  faPlus,
  faSearch,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { applicationRoutes } from "../constants/routepath";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-700 text-white flex flex-col font-sans">
      <div className="p-4 text-2xl font-extrabold text-blue-300 flex items-center">
        <FontAwesomeIcon icon={faBook} className="w-8 h-8 mr-2 text-blue-300" />
        Self - Library
      </div>
      <div className="flex-1 p-4">
        <ul>
          <li>
            <Link
              to={applicationRoutes.DASBOARD_PAGE}
              className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >
              <FontAwesomeIcon
                icon={faHome}
                className="w-5 h-5 mr-2 text-blue-300"
              />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to={applicationRoutes.ALL_BOOKS}
              className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >
              <FontAwesomeIcon
                icon={faBookOpen}
                className="w-5 h-5 mr-2 text-blue-300"
              />
              <span>View All Books</span>
            </Link>
          </li>
          <li>
            <Link
              to={applicationRoutes.ADD_BOOK}
              className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="w-5 h-5 mr-2 text-blue-300"
              />
              <span>Add Books</span>
            </Link>
          </li>
          <li>
            <Link
              to={applicationRoutes.SEARCH_BOOKS}
              className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="w-5 h-5 mr-2 text-blue-300"
              />
              <span>Search Books</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
