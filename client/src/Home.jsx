import React from "react";
import Main from "./components/main/Main";
import Sidebar from "./components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Home;
