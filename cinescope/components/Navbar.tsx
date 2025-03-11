"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ username: string; user_id: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Retrieve user and token from localStorage
    const token = localStorage.getItem("auth-token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-purple-700 dark:bg-gray-900 text-white p-4 shadow-md transition-all">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          CineScope
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-gold">Home</Link>
          <Link href="/favorites" className="hover:text-gold">Favorites</Link>
          <Link href="/profile" className="hover:text-gold">Profile</Link>
        </div>

        {/* Right Section: Theme Toggle & Auth Button */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />

          {/* Show Username in Gold when Logged In */}
          {isLoggedIn && user && (
            <span className="text-[#FFD700] font-semibold">Hello, {user.username}</span>
          )}

          {/* Conditionally show Login or Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-gold text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-700 dark:bg-gray-900 p-4">
          <Link href="/" className="block text-white py-2">Home</Link>
          <Link href="/favorites" className="block text-white py-2">Favorites</Link>
          <Link href="/profile" className="block text-white py-2">Profile</Link>
          <ThemeToggle />
          {isLoggedIn && user && (
            <span className="block text-[#FFD700] font-semibold py-2">Hello, {user.username}</span>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition w-full text-left"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="block bg-gold text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition w-full text-left">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
