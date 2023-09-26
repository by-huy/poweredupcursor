import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function Cursor({ linksRef, videoRef }) {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isHovered, setIsHovered] = useState(false)

  // Cursor Logic & Tracking
  const cursorSize = isHovered ? 48 : 16;
  const cursor = {
    y: useMotionValue(0),
    x: useMotionValue(0),
  };


  const trackCursor = (e) => {
    const { clientY, clientX } = e;
    cursor.y.set(clientY - cursorSize / 2);
    cursor.x.set(clientX - cursorSize / 2);
  };

  // Variants to change when hovered
  const variants = {
    default: {
      width: cursorSize,
      height: cursorSize,
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    links: {
      width: cursorSize,
      height: cursorSize,
    },
  };

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
  };

  const linkOver = () => {
    setCursorText('👋')
    setCursorVariant("links")
    setIsHovered(true)
  }

  const linkLeave = () => {
    setCursorText('')
    setCursorVariant("default")
    setIsHovered(false)
  }

  useEffect(() => {
    linksRef.current.forEach((link) => {
        link.addEventListener("mouseover", linkOver)
        link.addEventListener("mouseleave", linkLeave)
    })
    window.addEventListener("mousemove", trackCursor);
    return () => {
      window.removeEventListener("mousemove", trackCursor);
      linksRef.current.forEach((link) => {
        link.removeEventListener("mouseover", linkOver)
        link.removeEventListener("mouseleave", linkLeave)
    })
    };
  });

  return (
    <div>
      <motion.div
        variants={variants}
        transition={spring}
        animate={cursorVariant}
        style={{ left: cursor.x, top: cursor.y }}
        className="z-[999] w-4 h-4 bg-red-500 rounded-full fixed pointer-events-none flex justify-center items-center"
      >
        <span>{cursorText}</span>
      </motion.div>
    </div>
  );
}
