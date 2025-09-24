import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route} from "react-router-dom"
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
