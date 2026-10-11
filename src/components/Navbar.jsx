import { useEffect, useState } from "react";
import { navLinks } from "../constants/index.js";
import { menu, close } from "../assets";

const Navbar = ({ onOpenChat }) => {
  const [scrolled, setScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["about", "skills", "experience", "projects", "certifications", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "glass-strong py-3 shadow-xl" : "bg-transparent py-5"
        }`}
      >
        <div className='max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between'>
          <button
            onClick={() => {
              setActive("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className='flex items-center gap-3'
          >
            <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center font-display font-bold text-white text-lg shadow-glow'>
              R
            </div>
            <div className='text-left leading-tight'>
              <p className='text-white text-[16px] font-bold font-display tracking-wide'>
                Rhulani Mashala
              </p>
              <p className='text-[10.5px] text-secondary uppercase tracking-[0.22em]'>
                Software · AI Engineer
              </p>
            </div>
          </button>

          <ul className='hidden xl:flex items-center gap-6'>
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <button
                  onClick={() => goTo(nav.id)}
                  className={`text-[14.5px] font-medium transition-colors duration-200 ${
                    active === nav.id
                      ? "text-white"
                      : "text-secondary hover:text-white"
                  }`}
                >
                  {nav.title}
                </button>
              </li>
            ))}
          </ul>

          <div className='hidden xl:flex items-center gap-3'>
            <button
              onClick={onOpenChat}
              className='btn-outline text-white text-[14px] font-medium px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap'
            >
              <span className='h-2 w-2 rounded-full bg-emerald-400 animate-pulse' />
              AI Assistant
            </button>
            <button
              onClick={() => goTo("contact")}
              className='btn-gradient text-white text-[14px] font-medium px-4 py-2 rounded-full whitespace-nowrap'
            >
              Let's Talk
            </button>
          </div>

          <button
            onClick={() => setToggle(!toggle)}
            className='xl:hidden text-white p-2'
            aria-label='Toggle menu'
          >
            <img src={toggle ? close : menu} alt='menu' className='w-7 h-7 object-contain' />
          </button>
        </div>
      </nav>

      {toggle && (
        <div className='xl:hidden fixed top-16 left-4 right-4 glass-strong p-6 rounded-2xl z-50'>
          <ul className='flex flex-col gap-4'>
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <button
                  onClick={() => {
                    setToggle(false);
                    goTo(nav.id);
                  }}
                  className={`text-[16px] font-medium ${
                    active === nav.id ? "text-white" : "text-secondary"
                  }`}
                >
                  {nav.title}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setToggle(false);
                  onOpenChat();
                }}
                className='btn-gradient w-full text-white font-medium py-2.5 rounded-xl'
              >
                Ask the AI Assistant
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;