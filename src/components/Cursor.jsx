import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
// useMotionValue avoids things from doing unnecessary rerendering --> Switch from useState

export default function Cursor({ linksRef, videoRef }) {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false)

  // Cursor Logic & Tracking
  const cursorSize = isHovered ? (isVideoHovered ? 100 : 56) : 16;


  //   setting the initial positions of the cursor
  const cursor = {
    y: useMotionValue(0),
    x: useMotionValue(0),
  };

  //   Transition configuration
  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 50,
    mass: 0.5,
  };

  //   Smoothing the mouse cursor when moved
  const smoothMouse = {
    x: useSpring(cursor.x, spring),
    y: useSpring(cursor.y, spring),
  };

  //   Tracking the cursor
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
      backgroundColor: "#618264",
    },
    video: {
      width: cursorSize,
      height: cursorSize, 
      backgroundColor: "#3085C3",
    },
  };

  //   Hovering functions
  const linkOver = () => {
    setCursorText("👋");
    setCursorVariant("links");
    setIsHovered(true);
  };

  const linkLeave = () => {
    setCursorText("");
    setCursorVariant("default");
    setIsHovered(false);
  };

  const videoOver = () => {
    setCursorText("view");
    setCursorVariant("video");
    setIsVideoHovered(true)
    setIsHovered(true);

  };

  const videoLeave = () => {
    setCursorText("");
    setCursorVariant("default");
    setIsVideoHovered(false)
    setIsHovered(false);

  };

  useEffect(() => {
    console.log(videoRef.current);

    window.addEventListener("mousemove", trackCursor);
    linksRef.current.forEach((link) => {
      link.addEventListener("mouseover", linkOver);
      link.addEventListener("mouseleave", linkLeave);
    });
    videoRef.current.addEventListener("mouseover", videoOver);
    videoRef.current.addEventListener("mouseleave", videoLeave);

    // Cleaning up the listeners after it has unmounted
    return () => {
      window.removeEventListener("mousemove", trackCursor);
      linksRef.current.forEach((link) => {
        link.removeEventListener("mouseover", linkOver);
        link.removeEventListener("mouseleave", linkLeave);
      });
      videoRef.current.addEventListener("mouseover", videoOver);
      videoRef.current.addEventListener("mouseleave", videoLeave);
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
        <span className="text-xs">{cursorText}</span>
      </motion.div>
    </div>
  );
}
