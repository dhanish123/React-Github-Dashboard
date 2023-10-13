
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import GitHubUserInfo from "./Components/Github dashboard/GitHubUserInfo";
import Reduxnavbar from "./Components/Navbar/Reduxnavbar";
import Reduxfooter from "./Components/Footer/Reduxfooter";
import Reduxdashboard from "./Components/Dashboard/Reduxdashboard";
import Reduxlogin from "./Components/Login/Reduxlogin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Reduxlogin />} />
          <Route path="/reduxdashboard" element={<Reduxdashboard />} />
        </Routes>
      </BrowserRouter>

      {/* <Reduxnavbar />
      <GitHubUserInfo /> */}
      {/* <Reduxfooter /> */}
     
    </div>
  );
}

export default App;
