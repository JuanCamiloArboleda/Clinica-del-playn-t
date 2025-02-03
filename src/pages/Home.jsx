"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { TextInput } from "@tremor/react";

export default function Example() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [join_access, setJoinAccess] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Clinica del Playn't", {
            body: "La página se ha cargado correctamente.",
          });
        }
      });
    } else if (Notification.permission === "granted") {
      new Notification("Clinica del Playn't", {
        body: "La página se ha cargado correctamente.",
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await signIn(email, join_access);
    if (error) {
      setError("Invalid email or join access");
    } else {
      setError(null);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-4 py-10 lg:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h3 className="text-center text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Clinica del Playn't
        </h3>
        <p className="text-center text-tremor-default text-tremor-content dark:text-dark-tremor-content mt-2">
          Enter your credentials to access your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Email
            </label>
            <TextInput
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="john@company.com"
              className="mt-2"
            />
          </div>
          <div>
            <label
              htmlFor="join_access"
              className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Join Access
            </label>
            <TextInput
              type="password"
              id="join_access"
              name="join_access"
              value={join_access}
              onChange={(e) => setJoinAccess(e.target.value)}
              placeholder="Join Access"
              className="mt-2"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-tremor-brand py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content text-center">
          Forgot your join access?{" "}
          <a
            href="#"
            className="font-medium text-tremor-brand hover:text-tremor-brand-emphasis dark:text-dark-tremor-brand dark:hover:text-dark-tremor-brand-emphasis"
          >
            Reset access
          </a>
        </p>
      </div>
    </div>
  );
}
