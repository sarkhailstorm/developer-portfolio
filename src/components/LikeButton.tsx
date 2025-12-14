"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
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
    try {
      const res = await fetch("/api/likes", { method: "POST" });
      const data = await res.json();
      localStorage.setItem("has_liked_portfolio", "true");
      setHasLiked(true);
    } catch {}
  }

  return (
    <Button onClick={handleClick} disabled={hasLiked}>
      <LuThumbsUp className={`${hasLiked ? "text-blue-500" : "text-black"}`} /> {likes ?? 0}
    </Button>
  );
};

export default LikeButton;
