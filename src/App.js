import React from "react";
import { Route, Routes } from "react-router-dom";
import EventCalendar from "./pages/EventCalendar";
import HOLDS from "./pages/HODLS";
import Info from "./pages/Info";
import WTChecker from "./pages/WTChecker";
import "./styles/styles.css";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<WTChecker />} />
                <Route path="/info" element={<Info />} />
                <Route path="/holds" element={<HOLDS />} />
                <Route path="/events-calendar" element={<EventCalendar />} />
            </Routes>
        </div>
    );
}

export default App;
