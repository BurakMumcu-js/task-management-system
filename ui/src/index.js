import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginComponent from "./pages/login";
import RegisterComponent from "./pages/register";
import HomeComponent from "./pages/home";
const AppComponent = () => {
    <BrowserRouter>
        <Routes>
            <Route path='home' element={<HomeComponent/>}></Route>
            <Route path='login' element={<LoginComponent/>}></Route>
            <Route path='register' element={<RegisterComponent/>}></Route>
        </Routes>
    </BrowserRouter>
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
