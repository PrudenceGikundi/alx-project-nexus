"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in (on page load)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("User already logged in:", storedUser);
      router.push("/"); // Redirect to homepage
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://cinewhisper.up.railway.app/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        console.log("Login successful:", data);

        // Store user details correctly
        localStorage.setItem("auth-token", data.access); // Store access token
        localStorage.setItem("refresh-token", data.refresh); // Store refresh token
        localStorage.setItem(
          "user",
          JSON.stringify({
            user_id: data.user_id,
            email: data.email,
            username: data.username,
          })
        );

        console.log("User stored in localStorage:", localStorage.getItem("user"));

        // Redirect to profile page after successful login
        router.push("/profile");
      } else {
        setError(data.detail || "Invalid credentials. Please try again.");
      }
    } catch {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-800 to-pink-500 text-white transition-all duration-500">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">Login</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 rounded border bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 rounded border bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-pink-600 dark:bg-pink-700 text-white rounded hover:bg-pink-700 dark:hover:bg-pink-800 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-100">
          Don&apos;t have an account?{" "}
          <Link href="/Signup" className="text-purple-300 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
