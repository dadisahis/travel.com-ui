import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./screens/Explore/Explore";
import Home from "./screens/Home/Home";
import List from "./screens/List/List";
import Login from "./screens/Login/Login";
import SingleItem from "./screens/SingleItem/SingleItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<SingleItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
