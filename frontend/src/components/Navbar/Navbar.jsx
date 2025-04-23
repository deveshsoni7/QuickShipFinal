import { useContext, useState, useRef, useEffect } from "react";
import { Search, Plus, UserRound, LogOut, Package, CarFront, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export default function QuickShipNavbar({ setLoginPop }) {
  const navigate = useNavigate();
  const { token, setToken } = useContext(StoreContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();



  const svgData = `data:image/svg+xml;utf8,
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
    <circle cx='12' cy='8' r='5'/>
    <path d='M20 21a8 8 0 0 0-16 0'/>
  </svg>
`;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };
  

  return (
    <nav className="flex items-center justify-center px-6 py-3 bg-[#496580] shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between w-full max-w-5xl">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer space-x-2 text-2xl font-bold text-white"
          onClick={() => navigate("/")}
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            🚀
          </motion.span>
          <span>QuickShip</span>
        </div>

        {/* Options */}
        <div className="flex items-center space-x-6 text-white">
          <div
            onClick={() => navigate("/RideSearch")}
            className="flex items-center space-x-2 cursor-pointer hover:text-black"
          >
            <Search size={20} />
            <span>Search</span>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer hover:text-black"
            onClick={() => navigate("/PublishRide")}
          >
            <Plus size={20} />
            <span>Publish a Ride</span>
          </div>

          {!token ? (
            <button
              onClick={() => setLoginPop(true)}
              className="bg-white text-[#496580] hover:bg-black hover:text-white 
              rounded-full px-6 py-2 font-bold shadow-lg transition"
            >
              Sign In
            </button>
          ) : (
            // 👇 Profile Dropdown Starts Here
            <div className="relative" ref={dropdownRef}>
              <img
                src={svgData}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer  border-black border-2 invert"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-xl text-black z-50">
                  <div
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/parcel");
                      setDropdownOpen(false);
                    }}
                  >
                    <Package size={18} />
                    Parcel
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/myRides");
                      setDropdownOpen(false);
                    }}
                  >
                    <CarFront size={18} />
                    Published Rides
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                  >
                    <UserIcon size={18} />
                    Profile
                  </div>
                  <div
                    className="flex items-center gap-2 px-4 py-3 hover:bg-red-100 text-red-500 cursor-pointer rounded-b-xl"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    Logout
                  </div>
                </div>
              )}
            </div>
            // 👆 Profile Dropdown Ends Here
          )}
        </div>
      </div>
    </nav>
  );
}
