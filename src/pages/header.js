import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="bg-gray-light">
        <nav className="py-4 px-8">
          <div className="flex flex-row justify-between">
            <li className="text-3xl flex flex-col justify-center text-white">
              <Link to="/">Opendream🌙</Link>
            </li>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
