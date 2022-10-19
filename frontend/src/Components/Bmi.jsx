import React, { useEffect, useState } from "react"; // Importing React and useState from react
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Path: frontend\src\styles.css

export const Bmi = () => {
  const userid = JSON.parse(localStorage.getItem("userid")); // Getting userid from localstorage
  const user=JSON.parse(localStorage.getItem("name")); // Getting the name of the user from local storage
  const [bmi, setBmi] = useState(""); // Initializing bmi with empty string
  const [data, setData] = useState([]); // useState is a hook that allows you to have state variables in functional components
  const navigate = useNavigate(); // useNavigate is a hook that returns a function to navigate to a new location
 
  useEffect(() => {
    getBmi();
  }, []);

  // Fetching data from backend
  const getBmi = () => {
    fetch(`http://localhost:8080/user/${userid}/bmi`,{
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        },
        method: "GET"
    })
      .then((res) => res.json()) // Converting the response to json
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (e) => {
    let { name, value } = e.target; // Destructuring the name and value from the event target
    setBmi({
      ...bmi,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    const { height, weight } = bmi;
    let payload = (weight * 10000) / (height * height); // Calculating the bmi
    payload=payload.toFixed(2); // Rounding off the bmi to 2 decimal places
    fetch(`http://localhost:8080/user/${userid}/bmi`, {
      headers: {
        "Content-Type": "Application/json",
      },
      method: "POST",
      body: JSON.stringify({ bmi: payload }), // Converting the payload to json
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getBmi();
      })
      .catch((err) => console.log(err));
  };

  const handleLogout=()=>{
    localStorage.clear(); // Clearing the local storage
    navigate("/login"); // Redirecting to login page
  }

  return (
    <>
      <div className="logoutDiv">
        <h2 className="logout" onClick={() => navigate(`/profile/${userid}`)}>
          Profile
        </h2>
        <h2 className="logout" onClick={handleLogout}>
          Logout
        </h2>
      </div>
      <h2 className="heading">Welcome {user}</h2>
      <h2>Please enter height in centimeter and weight in kg</h2>
      <div className="form">
        <input
          className="input"
          placeholder="height in cms"
          type="number"
          onChange={handleChange}
          name="height"
        />
        <input
          className="input"
          placeholder="weight in kg"
          type="number"
          onChange={handleChange}
          name="weight"
        />
        <button className="button" type="submit" onClick={handleSubmit}>
          Check your BMI
        </button>
        <br />
        {data && data.length > 0 && <h2>Your BMI History</h2>}
        <div>
          {data &&
            data.length &&
            data.map((e) => (
              <div key={e._id}>
                <h3>{`BMI: ${e.bmi}`}</h3>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
