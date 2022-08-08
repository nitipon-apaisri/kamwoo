import React from "react";
import { Route, Routes } from "react-router-dom";
import Info from "./pages/Info";
import WTChecker from "./pages/WTChecker";
import "./styles/styles.css";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<WTChecker />} />
                <Route path="/info" element={<Info />} />
            </Routes>
        </div>
    );
}

export default App;
