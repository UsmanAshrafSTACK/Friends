import './App.css';
import Login from './Componenets/Login';
import SignUp from './Componenets/SignUp';
import { Routes, Route, Link } from "react-router-dom"
import Home from './Home';

function App() {
  return (

    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp />}/>
    <Route path="/home" element={<Home />}/>
  </Routes>
  );
}

export default App;
