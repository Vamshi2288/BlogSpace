import { Signin, Signup } from "@dev-zod/medium-commons";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/config.ts";
import Errormessage from "./Errors.tsx";

export default function Auth({ type }: { type: "signup" | "signin" }) {
  const [signupBody, setSignup] = useState<Signup>({
    name: "",
    email: "",
    password: "",
  });

  const [signinBody, setSignin] = useState<Signin>({
    email: "",
    password: "",
  });
  const [errmessage, seterrmessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center space-y-6 w-full">
      <h1 className="text-3xl font-primary  drop-shadow-md">
        {type === "signup" ? "Create an Account" : "Login to your account"}
      </h1>

      {type === "signup" && (
        <LabelNames
          title="Username"
          placeholder="Enter your username"
          onChange={(e) =>
            setSignup((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      )}

      <LabelNames
        title="Email"
        placeholder="Enter your email"
        onChange={(e) =>
          type === "signup"
            ? setSignup((prev) => ({ ...prev, email: e.target.value }))
            : setSignin((prev) => ({ ...prev, email: e.target.value }))
        }
      />

      <LabelNames
        title="Password"
        type="password"
        placeholder="Enter your password"
        onChange={(e) =>
          type === "signup"
            ? setSignup((prev) => ({ ...prev, password: e.target.value }))
            : setSignin((prev) => ({ ...prev, password: e.target.value }))
        }
      />

      <button
        className="w-full bg-white hover:bg-slate-600 text-black font-primary py-3 rounded-md hover:cursor-pointer"
        onClick={async () => {
          try {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/user/${
                type === "signup" ? "signup" : "signin"
              }`,
              type === "signup" ? signupBody : signinBody
            );
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
          } catch (error) {
            console.log(error);
            seterrmessage("Provide valid credentials");
          }
        }}
      >
        {type === "signup" ? "Sign Up" : "Login"}
      </button>
      {errmessage ? <Errormessage errormessage={errmessage} /> : null}

      <p className="text-sm font-primary">
        {type === "signup"
          ? "Already have an account? "
          : "Don't have an account? "}
        <button
          className="text-slate-200 hover:text-slate-500 font-semibold hover:cursor-pointer"
          onClick={() => navigate(type === "signup" ? "/signin" : "/")}
        >
          <u className="font-primary">
            {type === "signup" ? "Login" : "Signup"}
          </u>
        </button>
      </p>
    </div>
  );
}

interface LabelNamesProps {
  title: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  message?: string;
}

function LabelNames({
  title,
  placeholder,
  onChange,
  type,
  message,
}: LabelNamesProps) {
  return (
    <div className="w-full">
      <label className="text-md font-primary text-left block mb-1">
        {title}
      </label>
      <input
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-6 py-3 font-primary rounded-md border border-gray-300 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {message ? <Errormessage errormessage={message} /> : null}
    </div>
  );
}
