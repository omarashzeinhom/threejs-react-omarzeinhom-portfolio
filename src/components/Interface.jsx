import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { styles } from "./styles";
import { slideIn } from "../utils/motion";
import StarsCanvas from "./canvas/Stars";
import EarthCanvas from "./canvas/Earth";
import Carousel from 'react-spring-3d-carousel';
import uuidv4 from "uuid";
import { config } from "react-spring";



const Section = (props) => {
  const { children } = props;

  return (
    <motion.section
      className={`h-screen w-screen p-8 max-w-screen-2xl mx-auto flex flex-col items-start justify-center`}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.5,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

const Interface = () => {
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection />
      <SkillsSection />
      <WorkSection />
      <CertificateSection/>
      <ContactSection />
    </div>
  );
};

const AboutSection = () => {
  return (
    <Section>
      <h1 className="text-6xl font-extrabold leading-snug">
        Hi, Im
        <br />
        <span className="bg-white px-1 italic rounded"> Omar Zeinhom</span>
      </h1>
      <motion.p
        className="text-lg text-teal-900 mt-4"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            delay: 1.5,
          },
        }}
      >
        I develop 3D and animated Javascript and php websites from scratch.
      </motion.p>
      <motion.button
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            delay: 2.5,
          },
        }}
        className="bg-teal-500 text-white py-4 px-8 rounded-lg font-bold"
      >
        <a href="#contact">Contact</a>
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "React",
    level: 85,
  },
  {
    title: " JavaScript",
    level: 80,
  },

  {
    title: "TypeScript",
    level: 75,
  },
  {
    title: "PHP",
    level: 70,
  },
  {
    title: "Threejs",
    level: 70,
  },
  {
    title: "CSS",
    level: 65,
  },
  {
    title: "Node js",
    level: 60,
  },
  {
    title: "SCSS",
    level: 55,
  },

  {
    title: "3D Modelling",
    level: 45,
  },
];

const languages = [
  {
    title: "Arabic 🇪🇬",
    level: 100,
  },
  {
    title: "English 🇺🇸",
    level: 90,
  },
];

const SkillsSection = (props) => {
  const { section } = props;
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-5xl font-bold"> Skills</h2>

        <div className="mt-8 space-y-4">
          {skills.map((skill, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
                className="text-xl font-bold text-gray-800"
              >
                {skill?.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${skill?.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  whileInView={{
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 1,
                    delay: 1 + index * 0.2,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-5xl font-bold">Languages</h2>
        <div className="mt-8 space-y-4">
          {languages.map((language, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                variants={{
                  visible: {
                    scaleX: 1,
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
                className="text-xl font-bold text-gray-800"
              >
                {language?.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${language?.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  whileInView={{
                    scaleX: 1,
                  }}
                  transition={{
                    duration: 1,
                    delay: 2 + index * 0.2,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

const WorkSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full gap-7 items-center justify-center">
        <button
          className="hover:text-teal-700 transition-colors"
          onClick={previousProject}
        >
          ← Previous
        </button>
        <h2 className="text-5xl font-bold">Work</h2>
        <button
          className="hover:text-teal-600 transition-colors"
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
    </Section>
  );
};

const CertificateSection = () => {

  const getTouches = (evt) => {
    return (
      evt.touches || evt.originalEvent.touches // browser API
    );
  };
  state = {
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    enableSwipe: true,
    config: config.gentle
  };

  const slides = [
    {
      key: uuidv4(),

      content: <img src="https://res.cloudinary.com/dmbzzkneb/image/upload/v1698357334/812dc6fd-a43e-49c2-b312-b107a9731318_yzx11u.webp" alt="1" />
    },
    {
      key: uuidv4(),

      content: <img src="https://res.cloudinary.com/dmbzzkneb/image/upload/v1698357324/f69c9db9-a2c3-44b4-ae4d-02262fef86a9_htvjw3.webp" alt="2" />
    },
    {
      key: uuidv4(),

      content: <img src="https://res.cloudinary.com/dmbzzkneb/image/upload/v1698357334/812dc6fd-a43e-49c2-b312-b107a9731318_yzx11u.webp" alt="3" />
    },
    {
      key: uuidv4(),

      content: <img src="https://res.cloudinary.com/dmbzzkneb/image/upload/v1698357324/f69c9db9-a2c3-44b4-ae4d-02262fef86a9_htvjw3.webp" alt="4" />
    },
    {
      key: uuidv4(),

      content: <img src="https://res.cloudinary.com/dmbzzkneb/image/upload/v1698357334/812dc6fd-a43e-49c2-b312-b107a9731318_yzx11u.webp" alt="5" />
    },

    {
      key: uuidv4(),

      content: <img src="https://res.cloudinary.com/dmbzzkneb/image/upload/v1698357324/f69c9db9-a2c3-44b4-ae4d-02262fef86a9_htvjw3.webp" alt="6" />
    },
    {
      key: uuidv4(),

      content: <img src="https://res.cloudinary.com/dmbzzkneb/image/upload/v1698357334/812dc6fd-a43e-49c2-b312-b107a9731318_yzx11u.webp" alt="7" />
    },
    {
      key: uuidv4(),

      content: <img src="https://res.cloudinary.com/dmbzzkneb/image/upload/v1698357324/f69c9db9-a2c3-44b4-ae4d-02262fef86a9_htvjw3.webp" alt="8" />
    }
  ];
  return (
    <Section>
      <div className="flex w-full h-full gap-7 items-center justify-center">
     
        <h2 className="text-5xl font-bold">Certificates</h2>




<Carousel slides={slides} />

      </div>
    </Section>
  );
};

const ContactSection = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        //import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        //import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Omar Ashraf",
          from_email: form.email,
          to_email: "omar.ashraf.zeinhom@outlook.com",
          message: form.message,
        },
        //import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };
  return (
    <Section>
<section id="contact">
<div
      className={` flex flex-row xl:flex-col-reverse overflow-hidden w-full`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className=' flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='text-black bg-tertiary py-4 px-6 placeholder:text-secondary  rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <StarsCanvas />

      </motion.div>
    </div>
</section>
    </Section>
  );
};

export default Interface;
