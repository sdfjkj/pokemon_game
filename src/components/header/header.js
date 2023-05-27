import React, { useState , useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
function Header() {
  const [pagename, setPagename] = useState("Main Page");
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/proposal":
        setPagename("Report");
        break;
      case "/aboutus":
        setPagename("About Us");
        break;
      case "/main":
        setPagename("Main");
        break;
      default:
        setPagename("Randering");
    }
  }, [location]);

  return (
    <div className="header">
      <div className="pagename">{pagename}</div>
      <div className="nav">
        <Link to="/">Randering</Link>
        <Link to="/proposal">Report</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/main">Main</Link>

      </div>
      <img
        src="https://lh3.googleusercontent.com/3TSaKxXGo2wT0lu0AyNUBnkk6wkCC2AzOhJyy3JXIPm-AmZ1k9DSAroWeBUyePswCZSs5lVp3mPF7HzUpY9VPlyOV5eddITONINr3WSqLNLm=e365-w512"
        className="header_logo"
        alt="logo"
      />
    </div>
  );
}

export default Header;
