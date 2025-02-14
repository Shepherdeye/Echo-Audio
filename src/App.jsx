import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Echo from "./Pages/Echo/Echo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/echo" element={<Echo />} />
        <Route path="*" element={
          <h1
            className="text-center text-3xl m-10 font-bold">
            404 Not Found
          </h1>
        } />
      </Routes>
    </Router>
  );
}

export default App;
