import { createSignal } from 'solid-js'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function Layout(props) {
  return (
    <>
      <div class="relative min-h-screen">
        <Navbar />
        {props.children}
      </div>
      {props.extra}
      <Footer />
    </>
  )
}

export default Layout
