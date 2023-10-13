import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Reduxnavbar.scss'


const Reduxnavbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();

  return (
    isAuthenticated && (
      <div className="nav">
        <div className="nav__navouter">
          <div className="nav__navleft">
            <img className="nav__navimg" src={user.picture} alt={user.name} />
          </div>
          <div className="nav__navright">
            <button
              className="nav__login__btn"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Reduxnavbar;
