import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/components/assets/Logo2.png";
import DialogWrapper from "./DialogWrapper.astro";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // HideNavbar con GSAP + ScrollTrigger
    const showAnim = gsap
      .from(".main-tool-bar", {
        yPercent: -100,
        paused: true,
        duration: 0.2,
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (!menuOpen) {
          // No esconder el navbar si el menú está abierto
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        }
      },
    });

    // Cleanup
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [menuOpen]);

  // Bloquear scroll del body cuando menú abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <nav
        className="main-tool-bar max-w-[90%] mx-auto flex items-center justify-between px-4 md:px-8 py-3 md:py-6 bg-white rounded-2xl my-6 border border-gray-400 gap-4 relative"
        role="navigation"
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="#" aria-label="Inicio">
            <img
              src={Logo.src}
              alt="Logo desktop"
              className="sm:block w-auto sm:h-14 md:h-16 object-cover"
            />
          </a>
        </div>

        {/* Links desktop */}
        <ul className="hidden md:flex space-x-6 md:space-x-10 text-md text-primary">
          <li>
            <a href="#servicios" className="hover:text-gray-400 font-normal">
              Servicios
            </a>
          </li>
          <li>
            <a href="#nosotros" className="hover:text-gray-400 font-normal">
              Nosotros
            </a>
          </li>
          <li>
            <a href="#links" className="hover:text-gray-400 font-normal">
              Links
            </a>
          </li>
        </ul>

        {/* Burger para móvil */}
        <div className="md:hidden">
          <button
            aria-label="Abrir menú"
            className="flex items-center text-blue-600 p-3"
            onClick={() => setMenuOpen(true)}
          >
            <svg
              className="block h-6 w-6 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú móvil fullscreen */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-white md:hidden flex flex-col overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <a
              href="#"
              aria-label="Logo"
              className="text-3xl font-bold leading-none"
            >
              <img src={Logo.src} alt="Logo" className="h-12 object-contain" />
            </a>
            <button
              aria-label="Cerrar menú"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setMenuOpen(false)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contenido menú móvil con DialogWrapper */}
          <nav className="h-[100svh] px-6 py-4 flex flex-col items-center justify-center">
            <ul className="space-y-6 text-lg font-semibold text-gray-700 text-center">
              <li>
                <a
                  href="#servicios"
                  className="block hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  className="block hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#links"
                  className="block hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Links
                </a>
              </li>
              <li></li>
            </ul>
            <DialogWrapper />
          </nav>
        </div>
      )}
    </header>
  );
}
