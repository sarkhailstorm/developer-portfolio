"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaDiscord } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaSignalMessenger } from "react-icons/fa6";
import { ModeToggle } from "./ModeToggle";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { IoIosClose } from "react-icons/io";
import { useTheme } from "next-themes";
import { TbMessage2Up } from "react-icons/tb";
import LikeButton from "./LikeButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div
        className="md:hidden fixed bottom-5 right-5 text-4xl z-50 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <IoIosClose className="text-white bg-[#FF0000] rounded-full" />
        ) : (
          <TbMessage2Up className="dark:text-white text-slate-800 text-[2.5rem]" />
        )}
      </div>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className={`fixed left-0 bottom-0 md:bottom-auto p-4 flex md:bg-transparent md:border-none border-2 dark:border-t-[#FF0000] border-t-indigo-800 dark:bg-gray-950 dark:md:bg-transparent bg-gray-200 items-center justify-between w-full px-24 py-4 z-40 ${
          isOpen
            ? "translate-x-0 -bottom-1 opacity-100 transform transition-all duration-200 ease-out"
            : "translate-x-full bottom-[-100px] opacity-0 scale-75 md:scale-100 md:transition-none transform transition-all duration-200 ease-in"
        } md:translate-x-0 md:opacity-100`}
      >
        {mounted && (
          <Link href="/" className="hidden md:flex items-center">
            <span className="text-6xl font-black select-none text-black dark:md:bg-gradient-to-b dark:md:from-gray-200 dark:md:to-gray-500 dark:md:bg-clip-text dark:md:text-transparent transition-transform duration-300 hover:scale-105">
              S
            </span>
          </Link>
        )}

        <div className="flex gap-4 justify-center md:justify-start">
          <div className="flex gap-4">
            <LikeButton />
            <a
              href="#"
              title="Discord"
              className="dark:bg-[#09090B] bg-slate-800 outline outline-1 outline-[#2c2c2c] dark:hover:bg-[#5865F2] hover:bg-[#5865F2] ease-in-out duration-300 rounded-full w-[39px] h-[39px] flex justify-center items-center"
              onClick={(e) => {
                if (e.currentTarget.getAttribute("href") === "#") {
                  e.preventDefault();
                  toast.error("Discord is currently unavailable!");
                  setIsOpen(false);
                }
              }}
            >
              <FaDiscord className="text-2xl ease-in-out duration-300 hover:scale-125" />
            </a>
            <a
              href="https://github.com/sarkhailstorm"
              target="_blank"
              rel="noopener noreferrer"
              title="Github"
              className="dark:bg-[#09090B] bg-slate-800 outline outline-1 outline-[#2c2c2c] dark:hover:bg-blue-100 hover:bg-blue-100 ease-in-out duration-300 text-white hover:text-black rounded-full w-[39px] h-[39px] flex justify-center items-center"
              onClick={() => setIsOpen(false)}
            >
              <FaGithub className="text-2xl ease-in-out duration-300 hover:scale-125 hover:text-black" />
            </a>
            <a
              href="#"
              title="Signal Messenger"
              className="dark:bg-[#09090B] bg-slate-800 outline outline-1 outline-[#2c2c2c] dark:hover:bg-[#184fbc] hover:bg-[#184fbc] ease-in-out duration-300 rounded-full w-[39px] h-[39px] flex justify-center items-center"
              onClick={(e) => {
                if (e.currentTarget.getAttribute("href") === "#") {
                  e.preventDefault();
                  toast.error("Signal is currently unavailable!");
                  setIsOpen(false);
                }
              }}
            >
              <FaSignalMessenger className="text-xl ease-in-out duration-300 hover:scale-125" />
            </a>
            <ModeToggle onClick={() => setIsOpen(false)} />
          </div>
          <div className="dark:bg-gradient-to-b dark:from-gray-200 dark:to-gray-500 dark:text-black hover:opacity-90 transition-all  bg-indigo-700 hover:bg-indigo-600 rounded-lg px-4 py-2 dark:hover:bg-[#ff1414] hover:scale-110 ease-in-out duration-300 cursor-pointer md:block hidden">
            <Link href="/contact">Hire Me</Link>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
