import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Notification from "../notifications/Notification";
import { SERVER_URL } from "../config";
import LoginForm from "./LoginForm";
import axios from "axios";
import RegisterForm from "./RegisterForm";

import {
  useGoogleLogin,
  GoogleLogin,
  hasGrantedAllScopesGoogle,
} from "@react-oauth/google";

const LoginCard = () => {
  const [hasAccount, setHasAccount] = useState(true);

  const variants = {
    small: {
      transition: {
        duration: 1,
      },
    },
    big: {
      transition: {
        duration: 1,
      },
    },
  };

  const [showNotification, setShowNotification] = useState([]);

  const onLoginSuccess = async (tokenResponse) => {
    console.log("tokenResponse", tokenResponse);
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      }
    );
    const decoded = await response.json();
    console.log(decoded);
    try {
      console.log("here");
      const res = await axios.post(`${SERVER_URL}/api/user/register/google`, {
        name: decoded.name,
        email: decoded.email,
        profile: decoded.picture,
      });
      console.log(res);
      const jwtToken = res.data.token.token;
      console.log(jwtToken);
      localStorage.setItem("jwt", jwtToken);
      window.location.href = "/";

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const onLoginFail = (res) => {
    console.log(res);
  };

  const handleGLogin = async (e) => {
    e.preventDefault();

    const response = await fetch(`${SERVER_URL}/api/user/login/google`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        credentials: "include", // Include credentials (cookies) in the request
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const width = 600;
      const height = 400;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;

      window.open(
        data.authUrl,
        "_blank",
        `width=${width},height=${height},left=${left},top=${top}`
      );

      const formattedUrl = SERVER_URL.replace("https://", "");
      // Open a WebSocket connection to the backend WebSocket server
      const socket = new WebSocket("wss://" + formattedUrl);

      // Handle received messages
      socket.onmessage = async (event) => {
        const d2 = JSON.parse(event.data);
        const jwtToken = d2.token;
        console.log("object", d2);
        localStorage.setItem("jwt", jwtToken);
        window.location.href = "/";
      };

      // Clean up the WebSocket connection
      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };
    } else {
      console.log("here");
      setShowNotification([
        ...showNotification,
        {
          type: "error",
          message: "Something went wrong",
        },
      ]);
    }
  };

  return (
    <motion.div animate={hasAccount ? "small" : "big"} variants={variants}>
      <div className="fixed lg:top-32 sm:top-48 md:top-48 left-10">
        {showNotification.map((el) => {
          return (
            <Notification
              title={el.type}
              message={el.message}
              color={el.type}
            />
          );
        })}
      </div>
      <div
        className="lg:w-[650px] sm:w-[800px] md:w-[800px] bg-[#101010] rounded-lg lg:p-30 sm:p-10 md:p-10  flex flex-col justify-center lg:gap-y-2 sm:gap-y-10 md:gap-y-10"
        style={{
          boxShadow: " 0 0px 40px -1px rgba(0, 0, 0, 0.6)",
        }}
      >
        {/* logo */}

        <div className="flex flex-col gap-y-3 mb-4">
          <h1 className=" mr-auto ml-auto lg:text-7xl sm:text-9xl md:text-9xl sm:px-16  text-center font-extrabold  tracking-tight ">
            <span
              className="text-gray-300 "
              style={{ filter: "drop-shadow(0px 0px 1px #fff)" }}
            >
              Welcome
            </span>
          </h1>
          <p className="flex gap-x-2 text-slate-50 justify-center lg:text-base sm:text-4xl md:text-4xl">
            {hasAccount ? "Don't have an account?" : "Have an account."}
            <div
              className="cursor-pointer !text-blue-700"
              onClick={() => setHasAccount(!hasAccount)}
            >
              {hasAccount ? "Sign up here." : "Sign in here."}
            </div>
          </p>
        </div>
        <button
          type="button"
          className="text-white  bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg lg:text-base sm:text-3xl md:text-3xl px-5 lg:py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2 gap-x-3 w-full justify-center sm:py-5 md:py-5"
          onClick={useGoogleLogin({
            onSuccess: (tokenResponse) => {
              onLoginSuccess(tokenResponse);
            },
          })}
        >
          <svg
            className="lg:w-4 lg:h-4 sm:w-8 sm:h-8 md:w-8 md:h-8 mr-2 -ml-1 "
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
        </button>

        {hasAccount ? (
          <LoginForm
            showNotification={showNotification}
            setShowNotification={setShowNotification}
          />
        ) : (
          <RegisterForm
            showNotification={showNotification}
            setShowNotification={setShowNotification}
            setHasAccount={setHasAccount}
          />
        )}
      </div>
    </motion.div>
  );
};

export default LoginCard;
