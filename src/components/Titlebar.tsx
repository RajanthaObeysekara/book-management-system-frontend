import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUserCircle } from "@fortawesome/free-solid-svg-icons"; // Import icons
import { applicationRoutes } from "../constants/routepath";

const TitleBar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate(); // Initialize navigate
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update time every second
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate(applicationRoutes.LOGIN_PAGE); // Redirect to the dashboard page after logout
  };

  return (
    <div className="bg-gray-700 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faClock} className="text-yellow-400" />{" "}
        <h1 className="text-xl font-bold">{currentTime}</h1>{" "}
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-lg flex items-center space-x-2">
          <FontAwesomeIcon icon={faUserCircle} className="text-blue-300" />{" "}
          <span>Hello, {user?.name || "Guest"}</span>
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
