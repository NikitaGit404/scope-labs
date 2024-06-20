import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar";
import Videos from "./components/videos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VideoPage from "./components/videoPage";

function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Videos />} />
          <Route path="/video/:id" element={<VideoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
