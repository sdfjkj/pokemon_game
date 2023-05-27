import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { Randering } from "./pages/randering/randering";
import { Main } from "./pages/main/main";
import { Proposal } from "./pages/proposal/proposal";
import { AboutUs } from "./pages/aboutUs/aboutUs";

const rootElement = document.getElementById("root");
rootElement.style.height = '100vh';
rootElement.style.width = '100vw';
rootElement.style.display = 'flex';
rootElement.style.flexDirection = 'column';
rootElement.style.alignItems = 'center';
rootElement.style.backgroundColor = '#fafafa';
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Randering />} />
        <Route exact path="/main" element={<Main />} />
        <Route exact path="/proposal" element={<Proposal />} />
        <Route exact path="/aboutus" element={<AboutUs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
