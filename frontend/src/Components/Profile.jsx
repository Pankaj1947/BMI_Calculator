import React, { useEffect, useState } from "react"; // Importing React and useState from react
import { useParams,useNavigate } from "react-router-dom"; // Importing useParams from react-router-dom
import "../styles.css";

const Profile = () => {
  const [user, setUser] = useState({});  // Creating a state variable user and setUser
  const params = useParams(); // Creating a state variable params and setParams
  const id = params.id; // Creating a state variable id and setId
  const navigate=useNavigate(); // Creating a state variable navigate and setNavigate

  // useEffect is a hook that runs after every render
  useEffect(() => {
    getProfile();
  }, []); // Passing an empty array as a second argument to useEffect so that it runs only once

  // Fetching data from the backend
  const getProfile = () => {
    fetch(`http://localhost:8080/auth/${id}`, {
      params: {
        id: id,
      },
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data); // Setting the user state variable to the data
      })
      .catch((err) => console.log(err));
  };
  console.log(user);
  return (
  <div>
    <h1>Profile</h1>
    <h2>Name: {user.name}</h2>
    <h2>Email: {user.email}</h2>
    <button className="button" onClick={()=>navigate("/bmi")}>Check your BMI</button>
  </div>
  )
};

export default Profile;
