"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/constants/page";
import SearchBar from "./SearchBar";
import Button from "./Button";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart(); // get cart state from context

  const [backendStatus, setBackendStatus] = useState<"unknown" | "up" | "down">("unknown");

  const handleCartClick = () => {
    router.push("/cart"); // navigate to the cart page
  };

  const checkBackend = async () => {
    try {
      const res = await fetch("/api/status");
      if (res.ok) {
        setBackendStatus("up");
      } else {
        setBackendStatus("down");
      }
    } catch (error) {
      setBackendStatus("down");
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <Link
          href="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent hover:scale-110 hover:rotate-1 transition-transform duration-300 ease-out"
        >
          CaRTiFY
        </Link>
        <ul className="flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`hover:text-blue-600 transition ${
                  pathname === link.path
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <SearchBar />
        <Button onClick={handleCartClick}>
          <ShoppingCartIcon count={cart.length} />
        </Button>

        {/* ✅ New Backend Check Button */}
        <button
  onClick={checkBackend}
  className="flex items-center space-x-2 px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 font-semibold hover:bg-gray-100 transition"
>
  <span
    className={`h-3 w-3 rounded-full ${
      backendOnline ? "bg-green-500" : "bg-red-500"
    }`}
  ></span>
  <span>Check Backend</span>
</button>
      </div>
    </nav>
  );
};

export default Navbar;
