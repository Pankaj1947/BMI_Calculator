import React, { useState } from 'react' // Importing React and useState from react
import { useNavigate } from 'react-router-dom';
import "../styles.css"; // Path: frontend\src\styles.css

export const Signup = () => {
    const [user, setUser] = useState({}); // Creating a state variable user and setUser
    const navigate = useNavigate(); // Creating a state variable navigate and setNavigate

    const handleChange = (e) => {
        let { name, value } = e.target; // Destructuring name and value from e.target
        setUser({
            ...user, 
            [name]: value
        })
    }

    const handleSubmit = () => {
        console.log(user);
        let payload = JSON.stringify(user); // Converting user object to string
        fetch("http://localhost:8080/auth/signup", { // Fetching data from the backend
            headers: {
                "Content-Type": "Application/json"
            },
            method: "POST",
            body: payload
        })
            .then((res) => res.json())
            .then((data) => {
                alert("User Registered Successfully");
                navigate("/login"); // Redirecting to login page
            })
            .catch((err) => console.log(err)); // Catching error
    }
    return (
      <>
        <h2>Signup</h2>
        <div className='form'>
          <input
            className="input"
            placeholder="name"
            type="text"
            onChange={handleChange}
            name="name"
          />
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
            SIGN UP
          </button>
        </div>
      </>
    );
}
