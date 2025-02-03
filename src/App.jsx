import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DropdownPage from "./pages/dropdown";

function App() {

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  return (
    <div className="flex justify-center min-h-screen items-center">
      {/* <LoginPage></LoginPage> */}
      <DropdownPage options={options} multiple></DropdownPage>
    </div>
  )
}

export default App
