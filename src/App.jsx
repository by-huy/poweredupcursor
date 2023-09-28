import { useRef } from "react";
import Cursor from "./components/Cursor";

export default function App() {
  const linksRef = useRef([]);
  const videoRef = useRef(null);

  const links = [
    {
      label: "Youtube",
      href: "https://www.youtube.com/channel/UCBOAB9RV647G93GxLhEXleA",
    },
    {
      label: "Linkedin",
      href: "https://www.linkedin.com/in/huyngxyz/",
    },
    {
      label: "Bento",
      href: "https://www.bento.me/huyng",
    },
  ];

  return (
    <main className=" font-borna flex-col flex h-screen items-center justify-center">
      <Cursor linksRef={linksRef} videoRef={videoRef} />
      <h1 className="uppercase tracking-tighter text-5xl">
        Custom Cursor Effect
      </h1>
      <a
        href="https://www.youtube.com/channel/UCBOAB9RV647G93GxLhEXleA"
        className="my-20 h-72 gap-x-4 rounded-md item flex max-w-5xl mx-auto cursor-pointer"
        ref={videoRef}
      >
        <div className=" overflow-hidden">
          <img
            className="object-cover object-center"
            src="https://images.unsplash.com/photo-1584448098255-234156529929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2582&q=80"
            alt=""
          />
        </div>
        <div>
          <span className="text-base text-gray-600">Insights</span>
          <h2 className="text-4xl pb-4">
            Nostalgia: Exploring the Resurgence of Retro Culture
          </h2>
          <p>
            Dive into the enchanting world of retro nostalgia as we uncover the
            cultural revival of vintage aesthetics and their impact on modern
            trends. From fashion to music and everything in between, discover
            how the past is shaping our present in unexpected ways.
          </p>
        </div>
      </a>
      <div className="space-x-6">
        {links.map((link, index) => {
          return (
            <a
              ref={(ref) => (linksRef.current[index] = ref)}
              key={index}
              href={link.href}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </main>
  );
}
