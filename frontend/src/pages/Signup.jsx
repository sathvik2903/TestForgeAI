import { useState } from "react";
import axios from "axios";

function Signup() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const signup = async () => {

    try {

      await axios.post(
        "https://testforgeai-backend.onrender.com/signup",
        formData
      );

      alert("Account created");

      window.location.href = "/";

    } catch (error) {
      alert("Signup failed");
    }
  };

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-950
      text-white
    ">

      <div className="
        bg-slate-900
        p-10
        rounded-2xl
        w-[400px]
        border
        border-slate-800
      ">

        <h1 className="
          text-4xl
          font-bold
          mb-8
          text-center
        ">
          Signup
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="
              w-full
              p-3
              rounded-xl
              bg-slate-800
              outline-none
            "
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full
              p-3
              rounded-xl
              bg-slate-800
              outline-none
            "
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <button
            onClick={signup}
            className="
              w-full
              bg-green-600
              hover:bg-green-500
              p-3
              rounded-xl
              font-bold
              transition-all
            "
          >
            Signup
          </button>

        </div>

      </div>
    </div>
  );
}

export default Signup;