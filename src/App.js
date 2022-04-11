import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";

function App() {
  return (
    <div className="App h-screen font-poppins">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/room/:room" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
