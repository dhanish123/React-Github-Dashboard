import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Reduxnavbar from "../Navbar/Reduxnavbar";
import Reduxfooter from "../Footer/Reduxfooter";
import GitHubUserInfo from "../Userinfo/GitHubUserInfo";
import loadingImage from "../../Images/XOsX.gif";



const Reduxdashboard = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="loading-img-div">
        <img src={loadingImage} className="loading-img" alt="loading" />
      </div>
    );
  }
  
  return (
    <div>
      <Reduxnavbar />
      <div className="nav__usercomp">
        <GitHubUserInfo />
      
        <Reduxfooter />
      </div>
    </div>
  );
};

export default Reduxdashboard;
