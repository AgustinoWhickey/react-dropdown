import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import DropdownPage from './components/Dropdown.stories'
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/dropdown",
    errorElement: <DropdownPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
