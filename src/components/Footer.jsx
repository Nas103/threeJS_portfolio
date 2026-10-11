import { navLinks } from "../constants/index.js";

const Footer = () => {
  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className='relative mt-24 border-t border-white/5'>
      <div className='max-w-7xl mx-auto px-6 sm:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8'>
        <div className='flex items-center gap-3'>
          <div className='w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center font-display font-bold text-white text-lg shadow-glow'>
            R
          </div>
          <div>
            <p className='text-white font-display font-bold text-[16px]'>
              Rhulani Mashala
            </p>
            <p className='text-secondary text-[12px]'>
              Software Engineer · AI Engineer
            </p>
          </div>
        </div>

        <ul className='flex flex-wrap justify-center gap-x-6 gap-y-2'>
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <button
                onClick={() => goTo(nav.id)}
                className='text-secondary hover:text-white text-[13.5px] transition-colors'
              >
                {nav.title}
              </button>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-4'>
          <a
            href='https://github.com/Nas103'
            target='_blank'
            rel='noreferrer'
            className='text-secondary hover:text-white text-[13.5px] transition-colors'
          >
            GitHub
          </a>
          <a
            href='mailto:nascode.dev@gmail.com'
            className='text-secondary hover:text-white text-[13.5px] transition-colors'
          >
            Email
          </a>
        </div>
      </div>

      <div className='border-t border-white/5 py-5 text-center'>
        <p className='text-secondary text-[12.5px]'>
          © {new Date().getFullYear()} Rhulani Mashala · Built with React,
          Three.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;