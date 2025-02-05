import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Dropdown from "./components/Dropdown";

function HomePage() {
  return <h1>Home Page</h1>;
}

function DropdownPage() {
  const options = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
  ];

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Dropdown Component</h2>
      <Dropdown options={options} multiple withSearch />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dropdown" element={<DropdownPage />} />
      </Routes>
    </Router>
  );
}

export default App;
