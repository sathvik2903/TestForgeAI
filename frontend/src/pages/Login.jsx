import { useState } from "react";
import axios from "axios";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login = async () => {

    try {

      const res = await axios.post(
        "https://testforgeai-backend.onrender.com/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      window.location.href = "/dashboard";

    } catch (error) {
      alert("Invalid credentials");
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
          Login
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
  onClick={login}
  className="
    w-full
    bg-blue-600
    hover:bg-blue-500
    p-3
    rounded-xl
    font-bold
    transition-all
  "
>
  Login
</button>

<p className="
  mt-4
  text-center
  text-slate-300
">

  Don’t have an account?

  <span
    onClick={() =>
      window.location.href = "/signup"
    }
    className="
      text-blue-400
      cursor-pointer
      ml-2
    "
  >
    Signup
  </span>

</p>

        </div>

      </div>
    </div>
  );
}

export default Login;