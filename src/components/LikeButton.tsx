"use client";

import { useEffect, useState } from "react";
import { LuThumbsUp } from "react-icons/lu";

const LikeButton = () => {
  const [likes, setLikes] = useState();
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    async function fetchLikes() {
      const stored = localStorage.getItem("has_liked_portfolio");
      if (stored === "true") {
        setHasLiked(true);
      }

      const res = await fetch("/api/likes", { method: "GET" });
      const data = await res.json();
      setLikes(data.likes);
    }

    fetchLikes();
  }, []);

  async function handleClick() {
    setLikes((prev:any) => prev + 1);
    setHasLiked(true);

    try {
      const res = await fetch("/api/likes", { method: "POST" });
      const data = await res.json();
      localStorage.setItem("has_liked_portfolio", "true");
      setHasLiked(true);
    } catch {}
  }

  return (
    <div className="flex items-center justify-center gap-2 text-lg dark:text-white text-black">
      <LuThumbsUp
        onClick={!hasLiked ? handleClick : undefined}
        className={`flex flex-row cursor-pointer hover:scale-110 ease-in-out duration-300 ${
          hasLiked ? "dark:fill-white pointer-events-none cursor-not-allowed" : "dark:text-white text-black text-2xl"
        }`}
      />{" "}
      {likes ?? 0}
    </div>
  );
};

export default LikeButton;
