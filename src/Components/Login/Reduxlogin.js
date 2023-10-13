// Login.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { setIsAuthenticated, setIsLoading } from "../Redux Store/authSlice"; // Import your authSlice actions

import loadingImage from "../../Images/XOsX.gif";
import loginImg from "../../Images/q.jpg";
import './Reduxlogin.scss'

const Reduxlogin = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const isAuthenticatedRedux = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Set isLoading in Redux based on the value from Auth0
    dispatch(setIsLoading(isLoading));
  }, [dispatch, isLoading]);

  if (isLoading || isLoading !== isAuthenticatedRedux) {
    return (
      <div className="loading-img-div">
        <img src={loadingImage} className="loading-img" alt="loading" />
      </div>
    );
  }

  if (isAuthenticated || isAuthenticatedRedux) {
    return <Navigate to="/reduxdashboard" />;
  }

  return (
    <div className="login">
      <div className="login__outer">
        <img className="login__image" src={loginImg} alt="github-user" />
        <button onClick={loginWithRedirect} className="login__btn">
          login
        </button>
      </div>
    </div>
  );
};

export default Reduxlogin;
