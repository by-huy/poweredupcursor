import { useRef } from "react"
import Cursor from "./components/Cursor"

export default function App() {

  const linksRef = useRef([])
  const videoRef = useRef(null)

  const links = [
    {
      label: "Youtube",
      href: 'https://www.youtube.com/channel/UCBOAB9RV647G93GxLhEXleA'
    },
    {
      label: "Linkedin",
      href: 'https://www.linkedin.com/in/huyngxyz/'
    },
    {
      label: 'Bento',
      href: 'https://www.bento.me/huyng'
    }

  ]


  return (
    <main className=" font-borna flex-col flex h-screen items-center justify-center">
      <Cursor linksRef={linksRef} videoRef={videoRef}/>
      <h1 className="uppercase tracking-tighter text-5xl">Custom Cursor Effect</h1>
      <video ref={videoRef}>
        <source src="https://www.youtube.com/watch?v=AJdTBPuZkHU" type="" />
      </video>
      <div className="space-x-6">
        {links.map((link, index) => {
          return (
            <a ref={(ref) => (linksRef.current[index] = ref)} key={index} href={link.href}>{link.label}</a>
          )
        })}
      </div>
    </main>
  )
}