import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";

function App() {
  return (
    <div className="App font-poppins">
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </div>
  );
}

export default App;
