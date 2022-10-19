import React from "react";  // Importing React from react
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom
import "../styles.css"; // Path: frontend\src\styles.css

export const Home = () => { // Creating a functional component Home
  const navigate = useNavigate(); // Creating a state variable navigate and setNavigate
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
        margin: "auto",
      }}
    >
      <button
        className="button"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
      <button
        className="button"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Signup
      </button>
    </div>
  );
};
