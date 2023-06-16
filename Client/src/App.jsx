import './App.css';
import { Routes, Route } from "react-router-dom";
import DetailPage from './Components/DetailPage/DetailPage';
import FormCreateGame from './Components/FormCreateGame/FormCreateGame';
import HomePage from './Components/HomePage/HomePage';
import LandingPage from "./Components/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/detail/:id' element={<DetailPage />}/>
        <Route path='/create' element={<FormCreateGame />} />
      </Routes>
    </div>
  );
}

export default App;