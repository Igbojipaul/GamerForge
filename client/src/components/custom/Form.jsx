import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Form = ({ formType, formData, onChange, onSubmit, isMatch }) => {
  const isSignIn = formType === "signIn";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 w-full max-w-sm p-4 rounded-lg sm:p-8 sm:max-w-md lg:max-w-lg" // Responsive width & padding
    >
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 sm:text-3xl">
        {isSignIn ? "Sign In" : "Sign Up"}
      </h2>
      <p className="mb-3 text-center text-red-500">
        {!isMatch && !isSignIn && "Passwords don't match!"}
      </p>
      <form className="space-y-6" onSubmit={onSubmit}>
        {!isSignIn && (
          <div className="relative">
            <label className="block mb-2 text-sm text-gray-500" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full px-1 py-2 text-black bg-transparent border-b-2 border-purple-500 outline-none focus:border-blue-500"
              value={formData.name}
              onChange={onChange}
            />
          </div>
        )}
        <div className="relative">
          <label className="block mb-2 text-sm text-gray-500" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Your email"
            className="w-full px-1 py-2 text-black bg-transparent border-b-2 border-purple-500 outline-none focus:border-blue-500"
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div className="relative">
          <label
            className="block mb-2 text-sm text-gray-500"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Your password"
            className="w-full px-1 py-2 text-black bg-transparent border-b-2 border-purple-500 outline-none focus:border-blue-500"
            value={formData.password}
            onChange={onChange}
          />
        </div>
        {!isSignIn && (
          <div className="relative">
            <label
              className="block mb-2 text-sm text-gray-500"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm password"
              className={`w-full px-1 py-2 text-black bg-transparent border-b-2 ${
                isMatch ? "border-purple-500" : "bg-red-200"
              } outline-none focus:border-blue-500`}
              value={formData.confirmPassword}
              onChange={onChange}
            />
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-2 mt-4 text-white transition-colors duration-300 bg-purple-600 rounded-md hover:bg-blue-700"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </motion.button>

        <div className="flex items-center justify-center gap-1">
          <p>
            {isSignIn
              ? `Don't have an account? `
              : `Already have an account? `}
          </p>
          {isSignIn ? (
            <Link to="/auth/signup" className="text-purple-500">
              Sign up
            </Link>
          ) : (
            <Link to="/auth/login" className="text-purple-500">
              Sign in
            </Link>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default Form;
