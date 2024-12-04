import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { DarkModeContextProvider } from "./context/darkModeContext";
import { PusherProvider } from './context/PusherContext';
import store from "./store/ReduxStore";
import { Provider } from "react-redux";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PusherProvider>
//         <DarkModeContextProvider>
//           <App />
//         </DarkModeContextProvider>
//       </PusherProvider>
//     </Provider>
//   </React.StrictMode>
// );
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PusherProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </PusherProvider>
  </Provider>
);


