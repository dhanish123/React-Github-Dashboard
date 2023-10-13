
// Wrap Your App with Redux Provider:

// In our index.js or main entry point, 
// wrap our application with the Redux Provider to provide access to the Redux store:


// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Components/Redux Store/store'; // Import the Redux store
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dhanish.us.auth0.com"
        clientId="yHsnn3L93GNqRbnAyt2pHSNmI14Oe3Sy"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
