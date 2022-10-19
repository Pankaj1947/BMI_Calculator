import React, { useState } from "react"; // Importing React and useState from react
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom
import "../styles.css"; // Path: frontend\src\styles.css

export const Login = () => {
  const [user, setUser] = useState({});  // Creating a state variable user and setUser
  const navigate = useNavigate();   // Creating a state variable navigate and setNavigate


  const handleChange = (e) => { // Function to handle change in input fields
    let { name, value } = e.target; // Destructuring name and value from e.target
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = () => { 
    console.log(user);
    if (user.email === "" || user.password === "") {    // Checking if email or password is empty
      alert("Please enter email and password"); 
    } else {
      let payload = JSON.stringify(user);   // Converting user object to string
      fetch("http://localhost:8080/auth/login", {   // Fetching data from the backend
        headers: {
          "Content-Type": "Application/json", 
        },
        method: "POST",
        body: payload,
      }) 
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.token) {
            localStorage.setItem("userid", JSON.stringify(data._id));   // Storing userid in local storage
            localStorage.setItem("token", JSON.stringify(data.token));  // Storing token in local storage
            localStorage.setItem("name", JSON.stringify(data.name));    // Storing name in local storage
            alert("User Logged In Successfully");
            navigate("/bmi");  // Redirecting to bmi page
          } else {
            alert("Either entered Invalid Credentials or you are not registered, please signup");
          }
        })
        .catch((err) => console.log(err));  // Catching error
    }
  };
  return (
    <>
      <h2>Login</h2>
      <div className="form">
        <input
          className="input"
          placeholder="email"
          type="text"
          onChange={handleChange}
          name="email"
        />
        <input
          className="input"
          placeholder="password"
          type="text"
          onChange={handleChange}
          name="password"
        />
        <button className="button" type="submit" onClick={handleSubmit}>
          LOGIN
        </button>
      </div>
    </>
  );
};
