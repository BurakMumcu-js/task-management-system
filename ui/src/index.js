import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginComponent from "./pages/login";
import RegisterComponent from "./pages/register";
import HomeComponent from "./pages/home";
import LayoutComponent from "./pages/layout";

function AppComponent  ()  {
  return(
      <>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<LayoutComponent/>}>
                      <Route index element={<HomeComponent/>}></Route>
                  </Route>
                  <Route path='login' element={<LoginComponent/>}></Route>
                  <Route path='register' element={<RegisterComponent/>}></Route>
              </Routes>
          </BrowserRouter>
      </>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppComponent/>);


reportWebVitals();
