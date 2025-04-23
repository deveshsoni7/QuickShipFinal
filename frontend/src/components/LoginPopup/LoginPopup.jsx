// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios"; 
// import { StoreContext } from "../../context/StoreContext";

// const LoginPopup = ({ setLoginPop }) => {

//   const {setToken} = useContext(StoreContext);
//   const [isSignUp, setIsSignUp] = useState(false); 
//   const [isVisible, setIsVisible] = useState(false);

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     phone: ""
//   });

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data => ({ ...data, [name]: value }));
//   };

//   useEffect(() => {
//     console.log(data);
//   }, [data]);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     setTimeout(() => setIsVisible(true), 100);

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const closePopup = () => {
//     setIsVisible(false);
//     setTimeout(() => setLoginPop(false), 300);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = isSignUp
//       ? "http://localhost:4000/api/user/register"
//       : "http://localhost:4000/api/user/login";

//     try {
//       const response = await axios.post(url, data);
//       console.log(response.data);

//       if (response.data.success) {
//         setToken(response.data.token);
//         // localStorage.setItem("userId",response.data.user._id);
//         localStorage.setItem("token",response.data.token);
//         closePopup(); 
//       } else {
//         alert(response.data.message); 
//       }
//     } catch (err) {
//       console.log(err);
//       console.error("Error submitting form", err);
//       alert("Something went wrong. Please try again.");
//     }
//   };



//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-none z-50 transition-opacity duration-300 ease-in-out">
//       <div className={`bg-white p-6 rounded-lg shadow-lg w-96 relative transition-all duration-300 ease-in-out transform ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
//         <button
//           onClick={closePopup}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//         >
//           ✖
//         </button>

//         <h2 className="text-2xl font-bold text-center text-[#496580] mb-4">
//           {isSignUp ? "Sign Up" : "Sign In"}
//         </h2>

//         {/* FORM with onSubmit */}
//         <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="text-gray-700 font-semibold">Email</label>
//             <input
//               name="email"
//               onChange={onChangeHandler}
//               value={data.email}
//               type="email"
//               className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-gray-700 font-semibold">Password</label>
//             <input
//               name="password"
//               onChange={onChangeHandler}
//               value={data.password}
//               type="password"
//               className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {isSignUp && (
//             <div>
//               <label className="text-gray-700 font-semibold">phone Number</label>
//               <input
//                 name="phone"
//                 onChange={onChangeHandler}
//                 value={data.phone}
//                 type="tel"
//                 className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
//                 placeholder="Enter your phone number"
//                 required
//               />
//             </div>
//           )}

//           <div className="flex items-center">
//             <input type="checkbox" id="agree" className="mr-2" required />
//             <label htmlFor="agree" className="text-gray-700 text-sm">
//               Remember me
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="bg-[#496580] text-white py-2 rounded-md hover:bg-black transition font-bold"
//           >
//             {isSignUp ? "Sign Up" : "Login"}
//           </button>
//         </form>

//         <div className="text-center mt-4 text-gray-600 text-sm">
//           {isSignUp ? (
//             <p>
//               Already have an account?{" "}
//               <span
//                 className="text-[#496580] cursor-pointer hover:underline"
//                 onClick={() => setIsSignUp(false)}
//               >
//                 Login
//               </span>
//             </p>
//           ) : (
//             <p>
//               Don't have an account?{" "}
//               <span
//                 className="text-blue-500 cursor-pointer hover:underline"
//                 onClick={() => setIsSignUp(true)}
//               >
//                 Sign up
//               </span>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPopup;




























import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setLoginPop }) => {
  const { setToken, setUserId } = useContext(StoreContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsVisible(true), 100);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => setLoginPop(false), 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp
      ? "http://localhost:4000/api/user/register"
      : "http://localhost:4000/api/user/login";

    const payload = isSignUp
      ? data
      : { email: data.email, password: data.password };

    try {
      const response = await axios.post(url, payload);
      console.log(response.data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        setUserId(response.data.user._id);
        closePopup();
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className={`bg-white p-6 rounded-lg shadow-lg w-96 relative transform transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-center text-[#496580] mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-700 font-semibold">Email</label>
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              className="w-full border rounded-md p-2 mt-1"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold">Password</label>
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              className="w-full border rounded-md p-2 mt-1"
              placeholder="Enter your password"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <label className="text-gray-700 font-semibold">Phone Number</label>
              <input
                name="phone"
                onChange={onChangeHandler}
                value={data.phone}
                type="tel"
                className="w-full border rounded-md p-2 mt-1"
                placeholder="Enter your phone number"
                required
              />
            </div>
          )}

          <div className="flex items-center">
            <input type="checkbox" id="agree" className="mr-2" required />
            <label htmlFor="agree" className="text-gray-700 text-sm">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="bg-[#496580] text-white py-2 rounded-md hover:bg-black font-bold"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center mt-4 text-gray-600 text-sm">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-[#496580] cursor-pointer hover:underline"
                onClick={() => setIsSignUp(false)}
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setIsSignUp(true)}
              >
                Sign up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
