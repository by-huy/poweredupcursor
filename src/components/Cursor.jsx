import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
// useMotionValue avoids things from doing unnecessary rerendering --> Switch from useState

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

  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 50,
    mass: 0.5,
  };

  const smoothMouse = {
    x: useSpring(cursor.x, spring),
    y: useSpring(cursor.y, spring)
  }

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
    },
    links: {
      width: cursorSize,
      height: cursorSize,
      backgroundColor: '#618264'
    },
  };

  
//   Hovering functions
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

    // Cleaning up the listeners after it has unmounted
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
        animate={cursorVariant}
        transition={spring}
        style={{ left: smoothMouse.x, top: smoothMouse.y }}
        className="z-[999] w-4 h-4 bg-red-500 rounded-full fixed pointer-events-none flex justify-center items-center"
      >
        <span>{cursorText}</span>
      </motion.div>
    </div>
  );
}
