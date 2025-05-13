import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const Section = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      {children}
    </motion.div>
  );
};

const container = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Portfolio() {
  const skillsRef = useRef(null);
  const cursorRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      const rect = skillsRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursor({ x, y });
    };

    const skillsEl = skillsRef.current;
    if (skillsEl) {
      skillsEl.addEventListener("mousemove", moveCursor);
    }

    return () => {
      if (skillsEl) skillsEl.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="scroll-smooth font-sans bg-gradient-to-tr from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 shadow-md transition duration-500">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Name with gradient hover and glow */}
          <h1 className="text-2xl font-bold text-indigo-300 transition duration-300 hover:scale-105 cursor-pointer hover:text-cyan-300 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
            Kande Vishnu
          </h1>


          {/* Navigation Links */}
          <ul className="flex gap-6 text-sm font-medium">
            {["intro", "experience", "projects", "skills", "contact"].map((id) => (
              <li key={id} className="group relative transition duration-300 hover:scale-115">
                <a
                  href={`#${id}`}
                  className="capitalize text-gray-700 dark:text-gray-200 hover:text-cyan-500 transition-colors duration-300"
                >
                  {id}
                  {/* Fancy underline effect */}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-700 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>


      <main className="max-w-6xl mx-auto px-4 py-12 space-y-24">
        {/* Intro Section */}
        <Section>
          <section id="intro" className="text-center">
            <img
              src="https://media-hosting.imagekit.io/c26f674aec9f4b50/kandevishnu.jpg?Expires=1841744058&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=puYlesF1lnjVlCYtojL0zrWc~26y0s~dotVlEzUsHm4rTUP2bZCA2C9F~7wKWMFmEzDiPL~yKK8sY2y1nztkwYmVx8I88uJszJP3rheSYBH1-DlmFR7jjAf4JqBUWHSnYvqaNyZiXi71Zn1yMwL9yGt2ppmVKqM2SwcCQGeDe~dcEwLJ790FMB9VEpO~qEj5-omuZd256RFhVrgqUcxRQAp7TofSfFm9qRlA3v3ya4va79x51osZ8B5JuU03GgOhL06G5~la~JyQNpXfl91unXLcVMlxzLwScoy~FMLipnujyDx34dIgYZmtx4pFehyGQhVv1ffLi5r0oLuh~I7iTw__"
              alt="Profile picture of Kande Vishnu"
              className="w-32 h-42 mx-auto  rounded-full  border-4 border-white shadow-lg hover:scale-110 transition-transform"
            />
            <h2 className="text-4xl font-bold mt-6">Hi, I'm Kande Vishnu 👋</h2>
            <p className="text-md max-w-xl mx-auto mt-4">
              A passionate full-stack developer focused on building beautiful and performant web applications.
            </p>
          </section>
        </Section>

        {/* Experience Section */}
        <Section>
          <section id="experience" className="text-center">
            <h2 className="text-4xl font-bold mb-4">Experience</h2>
            <p className="text-gray-600 dark:text-gray-300">
              <strong>Software Intern</strong> – Remote | 2024 – 2025<br />
              Interned on impactful full-stack projects for real clients.
            </p>
          </section>
        </Section>

        {/* Projects Section */}
        <Section>
          <section id="projects" className="text-center">
            <h2 className="text-4xl font-bold mb-10">Projects</h2>
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {[
                {
                  title: "Smart Expense Tracker",
                  desc: "A budgeting tool with charts, login, and expense analytics.",
                },
                {
                  title: "AI Career Guide",
                  desc: "Interactive AI-powered tech career suggestion system.",
                },
                {
                  title: "Guessing Game",
                  desc: "Python CLI game to guess numbers with difficulty levels.",
                },
                {
                  title: "Portfolio Website",
                  desc: "This dynamic React portfolio with animations and dark mode.",
                },
              ].map((proj, idx) => (
                <motion.div
                  key={idx}
                  className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl hover:scale-105 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all"
                  variants={item}
                >
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {proj.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{proj.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </Section>

        {/* Skills Section */}
        <Section>
          <section id="skills" className="relative overflow-hidden p-3" ref={skillsRef}>
            <h2 className="text-4xl font-bold mb-10">Skills</h2>
            <motion.ul
              className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300 relative z-10"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {[
                "HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Framer Motion",
                "Python", "Node.js", "MongoDB", "PHP", "Express.js", "MySQL",
                "Git", "GitHub", "Figma", "Adobe XD", "Web Design", "UI/UX Design",
              ].map((skill, idx) => (
                <motion.li
                  key={idx}
                  className=" p-3  relative  bg-white dark:bg-gray-800 shadow-xl rounded-2xl hover:scale-105 hover:bg-indigo-50 dark:hover:bg-gray-700 transition text-center"
                  variants={item}
                >
                  {skill}
                </motion.li>
              ))}
            </motion.ul>

            {/* Cursor Tracker Circle */}
            <div
              ref={cursorRef}
              className="pointer-events-none absolute w-24 h-24 rounded-full bg-indigo-400 blur-2xl transition-transform duration-200 ease-out"
              style={{
                top: 0,
                left: 0,
                transform: `translate3d(${cursor.x - 48}px, ${cursor.y - 48}px, 0)`,
              }}
            />

          </section>
        </Section>

        {/* Contact Section */}
        <Section>
          <section id="contact" className="text-center">
            <h2 className="text-4xl font-bold mb-10">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                {
                  title: "Email",
                  value: "kandevishnu1234@email.com",
                  link: "mailto:kandevishnu1234@email.com",
                  icon: "✉️",
                },
                {
                  title: "Phone",
                  value: "8074347470",
                  link: "tel:8074347470",
                  icon: "📞",
                },
                {
                  title: "GitHub",
                  value: "github.com/kandevishnu",
                  link: "https://github.com/kandevishnu",
                  icon: "💻",
                },
                {
                  title: "LinkedIn",
                  value: "linkedin.com/in/kande-vishnu",
                  link: "https://www.linkedin.com/in/kande-vishnu/",
                  icon: "🔗",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-left flex gap-4 items-center hover:scale-105 transition-transform duration-300 group"
                >
                  <span className="text-3xl group-hover:scale-125 transition-transform">{item.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 break-all">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </Section>

      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-600 dark:text-gray-400">
        © 2025 Kande Vishnu. All rights reserved.
      </footer>
    </div>
  );
}
