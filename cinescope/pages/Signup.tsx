"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ email?: string; password?: string; general?: string }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password2", password2);
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    try {
      const res = await fetch("https://cinewhisper.up.railway.app/auth/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        // Store user data in localStorage
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username,
            email,
            profilePicture: profilePicture ? URL.createObjectURL(profilePicture) : "",
          })
        );

        // Redirect to profile page
        router.push("/profile");
      } else {
        const newErrors: { email?: string; password?: string; general?: string } = {};
        if (data.detail) {
          newErrors.general = data.detail;
        }
        if (data.email) {
          newErrors.email = data.email[0];
        }
        if (data.password) {
          newErrors.password = data.password[0];
        }
        setError(newErrors);
      }
    } catch {
      setLoading(false);
      setError({ general: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-purple-800 to-pink-500 text-white transition-all duration-500">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">Sign Up</h1>

        {error.general && <p className="text-red-500 text-center">{error.general}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full p-2 rounded border bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 rounded border bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 rounded border bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {error.password && <p className="text-red-500 text-sm">{error.password}</p>}

          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
            className="w-full p-2 rounded border bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 rounded border bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-pink-600 dark:bg-pink-700 text-white rounded hover:bg-pink-700 dark:hover:bg-pink-800 transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-100">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-300 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
