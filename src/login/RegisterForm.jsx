import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Notification from "../notifications/Notification";
import { SERVER_URL } from "../config";
import PasswordStrengthMeter from "./PasswordStrength/PasswordStrengthMeter";
import PasswordStrengthError from "./PasswordStrength/PasswordStrengthError";

const RegisterForm = ({
  showNotification,
  setShowNotification,
  setHasAccount,
}) => {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [lnameEmpty, setLnameEmpty] = useState(false);

  const [emailR, setEmailR] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);

  const [passwordR, setPasswordR] = useState("");
  const [invalidPass, setInvalidPass] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passDontMatch, setPassDontMatch] = useState(false);

  const [termsAndConditions, setTermsAndCondition] = useState(false);
  const [termsAndConditionsUnchecked, setTermsAndConditionUnchecked] =
    useState(false);

  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [privacyPolicyUnchecked, setPrivacyPolicyUnchecked] = useState(false);

  const [signUpFailed, setSignUpFailed] = useState([false, ""]);

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expression for email validation

    return regex.test(email);
  }
 
  const handleRegister = async (e) => {
    e.preventDefault();
    // Validate input fields
    if (!lname) setLnameEmpty(true);
    if (!validateEmail(emailR)) setInvalidEmail(true);
    if (passwordR.length < 8) setInvalidPass(true);
    if (passwordR !== confirmPassword) setPassDontMatch(true);
    if (!privacyPolicy) setPrivacyPolicyUnchecked(true);
    if (!termsAndConditions) setTermsAndConditionUnchecked(true);

    if (
      lnameEmpty ||
      invalidEmail ||
      invalidPass ||
      passDontMatch ||
      privacyPolicyUnchecked ||
      termsAndConditionsUnchecked
    ) {
      setSignUpFailed([true, "Please fill the required fields"]);
      return;
    }
    setSignUpFailed([false, ""]);
    // Send registration data to backend
    const registerData = {
      name: {
        first_name: fname,
        last_name: lname,
      },
      email: emailR,
      password: passwordR,
    };

    try {
      const response = await fetch(`${SERVER_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await response.json();
      if (data.success) {
        // Registration successful
        setHasAccount(true);
        setShowNotification([
          ...showNotification,
          {
            message: "Registration successful!",
            type: "success",
          },
        ]);

        localStorage.setItem("jwt", response.token);
        navigate("/");
        
      } else if (data.success === false) {
        // Registration failed
        setSignUpFailed([true, data.message]);
        setShowNotification([
          ...showNotification,
          {
            message: data.message,
            type: "error",
          },
        ]);
      } else {
        setSignUpFailed([
          true,
          "An error occurred while registering. Please try again later.",
        ]);
        setShowNotification([
          ...showNotification,
          {
            message:
              "An error occurred while registering. Please try again later.",
            type: "error",
          },
        ]);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setShowNotification([
        ...showNotification,
        {
          message:
            "An error occurred while registering. Please try again later.",
          type: "error",
        },
      ]);
    }
  };


  return (
    <form
      className="flex flex-col lg:gap-y-3 sm:gap-y-10 md:gap-y-10 sm:gap-x-10 md:gap-x-10"
      action="#"
    >
      <div>
        <div className="flex items-center w-full justify-center">
          <hr className="w-full border-1 border-gray-600" />
          <p className="text-gray-400 mx-2">or </p>
          <hr className="w-full border-1 border-gray-600" />
        </div>
      </div>

      <div className="relative flex lg:gap-x-3 sm:gap-x-10 md:gap-x-10">
        <input
          type={"text"}
          className="bg-stone-800  lg:p-3 sm:p-5 md:p-5 text-gray-400  focus:outline focus:outline-gray-600 lg:text-base sm:text-3xl md:text-3xl rounded-lg focus:0 block w-full p-2.5"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <div className="flex flex-col w-full">
          <input
            type={"text"}
            className={`bg-stone-800  lg:p-3 sm:p-5 md:p-5 text-gray-400  focus:outline focus:outline-gray-600 lg:text-base sm:text-3xl md:text-3xl rounded-lg focus:0 block w-full p-2.5 ${
              lnameEmpty ? "outline outline-1 outline-red-600 text-red-500" : ""
            }`}
            placeholder={`Last Name`}
            value={lnameEmpty ? `*This is a required field` : lname}
            onChange={(e) => setLname(e.target.value)}
            onClick={() => {
              setLnameEmpty(false);
            }}
          />
        </div>
      </div>

      <div className="relative">
        <input
          type="Email"
          className={`bg-stone-800  lg:p-3 sm:p-5 md:p-5 text-gray-400  focus:outline focus:outline-gray-600 lg:text-base sm:text-3xl md:text-3xl rounded-lg focus:0 block w-full p-2.5 ${
            invalidEmail ? "outline outline-1 outline-red-600 text-red-500" : ""
          }`}
          placeholder="Email"
          value={invalidEmail ? "*Invalid Email" : emailR}
          onChange={(e) => setEmailR(e.target.value)}
          onClick={(e) => {
            setInvalidEmail(false);
          }}
        />
      </div>
      <div className="relative flex lg:gap-x-3  sm:gap-x-10 md:gap-x-10">
        <input
          type={invalidPass ? "text" : "password"}
          className={`bg-stone-800  lg:p-3 sm:p-5 md:p-5 text-gray-400  focus:outline focus:outline-gray-600 lg:text-base sm:text-3xl md:text-3xl rounded-lg focus:0 block w-full p-2.5 ${
            invalidPass || passDontMatch
              ? "outline outline-1 outline-red-600 text-red-500"
              : ""
          }`}
          placeholder="Password"
          id="password"
          value={invalidPass ? "*Enter 8 char long valid password" : passwordR}
          onChange={(e) => {setPasswordR(e.target.value)}}
          onClick={(e) => {
            setInvalidPass(false);
          }}
        />
        <input
          type={passDontMatch ? "text" : "password"}
          className={`bg-stone-800 text-gray-400  lg:p-3 sm:p-5 md:p-5  focus:outline focus:outline-gray-600 lg:text-base sm:text-3xl md:text-3xl rounded-lg focus:0 block w-full p-2.5 ${
            invalidPass || passDontMatch
              ? "outline outline-1 outline-red-600 text-red-500"
              : ""
          }`}
          placeholder="Confirm Password"
          value={passDontMatch ? "*Passwords dont match" : confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onClick={(e) => setPassDontMatch(false)}
        />
      </div>
      
      <div><PasswordStrengthMeter password={passwordR}/></div>
      <div>{passwordR !== "" && (<PasswordStrengthError passwordR={passwordR}/>)}</div>

      <div className="flex flex-col justify-center mx-auto">
        <div className="flex items-center  mt-4">
          <input
            id="terms-checkbox"
            type="checkbox"
            value={termsAndConditions}
            checked={termsAndConditions}
            onChange={(e) => {
              setTermsAndCondition(!termsAndConditions);
              setTermsAndConditionUnchecked(false);
            }}
            className={`lg:w-4 lg:h-4  sm:w-10 sm:h-10 md:w-10 md:h-10  accent-stone-900 bg-gray-100 border-gray-300 rounded-lg focus:outline-none ${
              termsAndConditionsUnchecked
                ? "outline outline-1 outline-red-600"
                : ""
            }`}
          />
          <label
            for="terms-checkbox"
            className={`ml-2 lg:text-base sm:text-2xl md:text-2xl font-medium text-gray-300 ${
              termsAndConditionsUnchecked ? "text-red-600" : ""
            }`}
          >
            Check the box to agree with our{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>

        <div className="flex items-center  lg:mt-1 sm:mt-5 md:mt-5">
          <input
            id="privacy-checkbox"
            type="checkbox"
            value={privacyPolicy}
            checked={privacyPolicy}
            onChange={(e) => {
              setPrivacyPolicy(!privacyPolicy);
              setPrivacyPolicyUnchecked(false);
            }}
            className={`lg:w-4 lg:h-4 sm:w-10 sm:h-10 md:w-10 md:h-10 accent-stone-900 bg-gray-100 border-gray-300 rounded-lg focus:outline-none ${
              privacyPolicyUnchecked ? "outline outline-1 outline-red-600" : ""
            }`}
          />
          <label
            for="privacy-checkbox"
            className={`ml-2  lg:text-base sm:text-2xl md:text-2xl  font-medium text-gray-300 ${
              privacyPolicyUnchecked ? "text-red-600" : ""
            }`}
          >
            Check the box to agree with our{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              privacy policy
            </a>
            .
          </label>
        </div>
      </div>
      <button
        type="button"
        className=" text-white bg-gradient-to-r   to-pink-500 from-blue-400 hover:to-pink-600 hover:from-blue-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg lg:text-base lg:px-5 lg:py-2.5 sm:text-3xl md:text-3xl sm:py-5 md:py-5 text-center inline-flex items-center mr-2 mb-2 gap-x-3 w-full justify-center mt-5"
        onClick={handleRegister}
      >
        Sign Up
      </button>
      {signUpFailed[0] ? (
        <span className="text-red-600 sm:text-2xl md:text-2xl lg:text-base">
          *sign up failed: {signUpFailed[1]}
        </span>
      ) : (
        <></>
      )}
    </form>
  );
};

export default RegisterForm;
