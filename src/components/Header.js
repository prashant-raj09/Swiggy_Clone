import { useState } from "react";
import { Link } from "react-router-dom"; 
const Header = () => {
  const [logBtn, setLogBtn] = useState(true);

  return (
    <div className="bg-red-300 flex justify-between items-center shadow-lg shadow-cyan-500/50 fixed top-0 left-0 w-full z-10">
      <div className="p-2">
        <img
          className="w-16 h-16 rounded-xl"
          alt="Logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzhsW-ubrEJG1LO1oSdWxsBU7S2C0Xcr4bSA&s"
        />
      </div>
      <div>
        <ul className="flex space-x-4 m-5 text-lg">
          <li className="p-2 cursor-pointer hover:text-yellow-50"><Link to="/">Home</Link></li>
          <li className="p-2 cursor-pointer hover:text-yellow-50"><Link to="/about">About</Link></li>
          <li className="p-2 cursor-pointer hover:text-yellow-50"><Link to="/contact">Contact</Link></li>
          <li className="p-2 cursor-pointer hover:text-yellow-50"><Link to="/cart">Cart</Link></li>
          <li className="p-2 hover:text-yellow-50">
            {logBtn ? (
              <button
                onClick={() => setLogBtn(false)}
                className="bg-blue-400 text-white rounded-md px-4 py-2"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => setLogBtn(true)}
                className="bg-blue-400 text-white rounded-md px-4 py-2"
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
