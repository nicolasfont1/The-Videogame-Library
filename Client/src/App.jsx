import './App.css';
import { Routes, Route } from "react-router-dom"
import HomePage from './Components/HomePage/HomePage';
import LandingPage from "./Components/LandingPage/LandingPage"

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/home' element={<HomePage />}/>
      </Routes>
    </div>
  );
}

export default App;