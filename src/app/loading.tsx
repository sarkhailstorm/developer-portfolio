"use client";
import { HashLoader } from "react-spinners";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);
  
  if (!mounted) return null;
  
  return isLoading ? (
    <div className="dark:bg-[radial-gradient(circle_at_top,#1e1e1e,#000000)] inset-0 z-50 fixed flex items-center justify-center">
      <HashLoader color={theme === "dark" ? "#FF0000" : "#3730a3"} size={100} />
    </div>
  ) : null;
};

export default Loading;
