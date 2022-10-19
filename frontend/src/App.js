import './App.css'; 
import { Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { Bmi } from './Components/Bmi';
import Profile from './Components/Profile';
function App() {
  return (
    <div className="App">
      <h1>BMI Calculator</h1>
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/bmi' element={<Bmi />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
