import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles.js";
import { EarthCanvas } from "./canvas/index.js";
import { SectionWrapper } from "../hoc/index.js";
import { slideIn } from "../utils/motion.js";

const envOr = (value, fallback) =>
  value && !value.startsWith("your_") ? value : fallback;

const SERVICE_ID = envOr(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID, "service_jo5ofyi");
const TEMPLATE_ID = envOr(import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID, "template_t7j1zqf");
const PUBLIC_KEY = envOr(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY, "77YSTsnIXBxTPIMrU");

const contactInfo = [
  { label: "Email", value: "nascode.dev@gmail.com", href: "mailto:nascode.dev@gmail.com" },
  { label: "GitHub", value: "github.com/Nas103", href: "https://github.com/Nas103" },
  { label: "Location", value: "South Africa · Remote / Hybrid" },
];

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Rhulani Mashala",
          from_email: form.email,
          to_email: "nascode.dev@gmail.com",
          message: form.message,
        },
        PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I'll get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Oh no! Something went wrong. Please try again.");
        }
      );
  };

  const inputClass =
    "bg-black-200/70 border border-white/10 py-3.5 px-5 placeholder:text-secondary text-white rounded-xl outline-none focus:border-violet-400/60 transition-colors font-medium";

  return (
    <div className='xl:mt-10 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.9] glass gradient-border p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>
          Let's <span className='text-gradient'>talk</span>.
        </h3>

        <form ref={formRef} onSubmit={handleSubmit} className='mt-10 flex flex-col gap-6'>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2 text-[14px]'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              required
              className={inputClass}
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2 text-[14px]'>Your Email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2 text-[14px]'>Your Message</span>
            <textarea
              rows={6}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What would you like to say?'
              required
              className={`${inputClass} resize-none`}
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className='btn-gradient py-3.5 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md disabled:opacity-60'
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      <div className='xl:flex-1 flex flex-col gap-5'>
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className='glass gradient-border rounded-2xl overflow-hidden xl:h-[440px] md:h-[400px] h-[320px]'
        >
          <EarthCanvas />
        </motion.div>

        <div className='grid sm:grid-cols-3 gap-4'>
          {contactInfo.map((info) => (
            <div
              key={info.label}
              className='glass rounded-xl p-4 transition-colors duration-300 hover:border-violet-400/40'
            >
              <p className='text-[11px] uppercase tracking-[0.2em] text-secondary'>
                {info.label}
              </p>
              {info.href ? (
                <a
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel='noreferrer'
                  className='text-white text-[13.5px] font-medium mt-1.5 block hover:text-gradient'
                >
                  {info.value}
                </a>
              ) : (
                <p className='text-white text-[13.5px] font-medium mt-1.5'>
                  {info.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");