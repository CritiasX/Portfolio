import React from 'react';
import { Head } from "@inertiajs/react";
import { motion } from 'framer-motion';
import Typewriter from "typewriter-effect";
import Nav from "@/components/Nav.jsx";
import { SiReact, SiLaravel, SiPhp, SiTailwindcss, SiFramer, SiInertia } from 'react-icons/si';
import { useLenis } from 'lenis/react';

// Animation variants - defined once, reused everywhere for better performance
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1 }
};

const imageReveal = {
    hidden: { scale: 0.8, opacity: 0, y: -100 },
    visible: { scale: 1, opacity: 1, y: 0 }
};

const cardReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
};

const marqueeReveal = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
};

const sectionTitle = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
};

const buttonReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

// Spring transition preset
const springTransition = {
    type: 'spring',
    stiffness: 100
};

export default function Home() {
    const lenis = useLenis();

    // Scroll handler using Lenis
    const scrollToSection = (href) => {
        if (lenis) {
            lenis.scrollTo(href, {
                offset: -100,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        }
    };

    return (
        <>
            <Head title="Home" />
            <Nav/>
            {/* HOME SECTION*/}
            <div id="home" className="mx-auto min-h-screen px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 flex flex-col justify-center items-center text-center select-none py-20 sm:py-24 md:py-0">
                    <div className="text-xs sm:text-sm md:text-base lg:mt-30 lg:text-lg font-roboto-mono text-[#04141b]/75 mb-4 sm:mb-5 md:mb-6">
                        <Typewriter options={{
                            strings: ['Hello, I am James Roi.'],
                            autoStart: true,
                            typeSpeed: 0,
                            delay: 40,
                            deleteSpeed: Infinity,
                            cursor: '',
                        }}/>
                    </div>

                    <div className={"text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-poppins font-bold select-none mb-5 sm:mb-6 md:mb-8 uppercase"}>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInDown}
                            transition={{ duration: 1, delay: 0.2, ...springTransition }}>
                            <span className="inline-block hover:scale-110 active:scale-90 transition-transform cursor-pointer">
                                ASPIRING
                            </span>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={scaleIn}
                            transition={{ duration: 1, delay: 0.4, ...springTransition }}
                            className="w-full flex justify-center">
                            <span className="flex flex-row flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 hover:scale-110 active:scale-90 transition-transform cursor-pointer">
                                <span className="whitespace-nowrap">JUNIOR</span>
                                <span className="inline-block">
                                    <Typewriter
                                        onInit={(typewriter) => {
                                            typewriter
                                                .pauseFor(2000)
                                                .typeString('Front-end')
                                                .pauseFor(4000)
                                                .deleteAll()
                                                .typeString('Back-end')
                                                .pauseFor(4000)
                                                .deleteAll()
                                                .typeString('Software')
                                                .pauseFor(4000)
                                                .deleteAll()
                                                .typeString('Game')
                                                .pauseFor(4000)
                                                .deleteAll()

                                                .start();
                                        }}
                                        options={{
                                            delay: 100,
                                            deleteSpeed: 100,
                                            loop: true,
                                            }}>
                                    </Typewriter>
                                </span>
                            </span>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ duration: 1, delay: 0.6, ...springTransition }}>
                            <span className="inline-block hover:scale-110 active:scale-90 transition-transform cursor-pointer">
                                DEVELOPER
                            </span>
                        </motion.div>
                    </div>
                    <div className="text-[#04141b]/75 text-xs sm:text-sm md:text-base lg:text-lg font-roboto-mono uppercase w-full max-w-full sm:max-w-2xl md:max-w-3xl px-2 sm:px-0 min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] mb-6 sm:mb-7 md:mb-8">
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .pauseFor(1000)
                                    .typeString('a fresh graduate of BSIT based in the philippines')
                                    .start();
                            }}
                            options={{
                                delay: 20,
                                deleteSpeed: Infinity,
                                cursor: '',
                            }}
                        />
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .pauseFor(2000)
                                    .typeString('looking for a job to enhance my skills')
                                    .start();
                            }}
                            options={{
                                delay: 20,
                                deleteSpeed: Infinity,
                                cursor: '',
                            }}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full sm:w-auto px-4 sm:px-0 max-w-md sm:max-w-none">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInLeft}
                            transition={{ duration: 1, delay: 1.2, ...springTransition }}
                            className="w-full sm:w-auto">
                            <p className="bg-[#04141b] text-[#F0EAD6] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 rounded-4xl hover:bg-[#03346E] w-full sm:w-auto text-sm sm:text-base cursor-pointer transition-all hover:scale-110 active:scale-95">
                                Resume
                            </p>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInRight}
                            transition={{ duration: 1, delay: 1.4, ...springTransition }}
                            className="w-full sm:w-auto">
                            <a
                                className="border-2 border-[#04141b] text-[#04141b] hover:border-[#03346E] hover:text-[#F0EAD6] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 rounded-4xl hover:bg-[#03346E] w-full sm:w-auto text-sm sm:text-base cursor-pointer transition-all hover:scale-110 active:scale-95 block text-center"
                                href="https://www.linkedin.com/in/tanglao-jamesroi-1ab47b189/" target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                        </motion.div>

                    </div>
                    <div className="mt-12 sm:mt-14 md:mt-16 lg:mt-20 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base lg:text-lg font-roboto-mono uppercase flex flex-row text-[#04141b]/60">
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            viewport={{ once: true }}
                            transition={{delay: 0.1}}>M</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            viewport={{ once: true }}
                            transition={{delay: 0.2}}>A</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            viewport={{ once: true }}
                            transition={{delay: 0.3}}>d</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            viewport={{ once: true }}
                            transition={{delay: 0.4}}>e</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            viewport={{ once: true }}
                            transition={{delay: 0.5}}
                            className={"mr-2 sm:mr-2"}> </motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            viewport={{ once: true }}
                            transition={{delay: 0.6}}>w</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            viewport={{ once: true }}
                            transition={{delay: 0.7}}>i</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            viewport={{ once: true }}
                            transition={{delay: 0.8}}>t</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            viewport={{ once: true }}
                            transition={{delay: 0.9}}>h</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            viewport={{ once: true }}
                            transition={{delay: 1.0}}>:</motion.span>
                    </div>
                <motion.div
                    className="w-full overflow-hidden py-3 sm:py-4"
                    initial="hidden"
                    animate="visible"
                    variants={marqueeReveal}
                    transition={{ duration: 1, delay: 1.6, ...springTransition }}>
                    <div className="flex animate-marquee whitespace-nowrap">
                        <div className="flex flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 items-center mx-8 sm:mx-10 md:mx-12">
                            <SiReact className="h-7 w-7 text-[#04141b]" />
                            <SiFramer className="h-7 w-7 text-[#04141b]" />
                            <SiInertia className="h-7 w-7 text-[#04141b]" />
                            <SiLaravel className="h-7 w-7 text-[#04141b]" />
                            <SiPhp className="h-7 w-7 text-[#04141b]" />
                            <SiTailwindcss className="h-7 w-7 text-[#04141b]" />
                        </div>
                        <div className="flex flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 items-center mx-8 sm:mx-10 md:mx-12">
                            <SiReact className="h-7 w-7 text-[#04141b]" />
                            <SiFramer className="h-7 w-7 text-[#04141b]" />
                            <SiInertia className="h-7 w-7 text-[#04141b]" />
                            <SiLaravel className="h-7 w-7 text-[#04141b]" />
                            <SiPhp className="h-7 w-7 text-[#04141b]" />
                            <SiTailwindcss className="h-7 w-7 text-[#04141b]" />
                        </div>
                        <div className="flex flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 items-center mx-8 sm:mx-10 md:mx-12">
                            <SiReact className="h-7 w-7 text-[#04141b]" />
                            <SiFramer className="h-7 w-7 text-[#04141b]" />
                            <SiInertia className="h-7 w-7 text-[#04141b]" />
                            <SiLaravel className="h-7 w-7 text-[#04141b]" />
                            <SiPhp className="h-7 w-7 text-[#04141b]" />
                            <SiTailwindcss className="h-7 w-7 text-[#04141b]" />
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* ABOUT ME SECTION*/}
            <div id="about" className="min-h-screen select-none flex flex-col sm:flex-row bg-[#04141b] text-[#F0EAD6] py-16 sm:py-20 md:py-0">
                <div className="hidden sm:flex sm:w-1/2 items-center justify-center p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16">
                    <motion.img
                        src="/images/me.JPG"
                        alt="me"
                        className="max-h-[60vh] sm:max-h-[70vh] md:max-h-[75vh] lg:max-h-[80vh] w-auto rounded-4xl object-cover shadow-2xl"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={imageReveal}
                        transition={{ delay: 0.5, ...springTransition }}
                    />
                </div>
                <div className="w-full sm:w-1/2 p-8 sm:p-10 md:p-12 lg:p-14 xl:p-20 flex flex-col justify-center items-center sm:items-start">
                    <div className="mb-8 sm:mb-10 md:mb-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold flex flex-row justify-center sm:justify-start">
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            transition={{delay: 0.1}}
                            viewport={{ once: true, amount: 0.3 }}>A</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            transition={{delay: 0.2}}
                            viewport={{ once: true, amount: 0.3 }}>b</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            transition={{delay: 0.3}}
                            viewport={{ once: true, amount: 0.3 }}>o</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            transition={{delay: 0.4}}
                            viewport={{ once: true, amount: 0.3 }}>u</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            transition={{delay: 0.5}}
                            viewport={{ once: true, amount: 0.3 }}>t</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            transition={{delay: 0.6}}
                            className={"mr-2 sm:mr-3"}
                            viewport={{ once: true, amount: 0.3 }}> </motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            transition={{delay: 0.7}}
                            viewport={{ once: true, amount: 0.3 }}>m</motion.span>
                        <motion.span
                            initial={{scale:0.8, opacity:0,y: -10}}
                            whileInView={{scale:1, opacity:1,y: 0}}
                            transition={{delay: 0.8}}
                            viewport={{ once: true, amount: 0.3 }}>e</motion.span>
                    </div>
                    <motion.p
                        className="text-xs sm:text-sm md:text-base lg:text-lg font-roboto-mono mb-5 sm:mb-6 md:mb-7 text-center sm:text-left"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                        transition={{ duration: 1, delay: 0.9, ...springTransition }}>
                        I am James Roi, a fresh graduate with a Bachelor of Science in Information Technology. I am passionate about developing innovative software solutions and eager to contribute my skills in a dynamic work environment.
                    </motion.p>
                    <motion.p
                        className="text-xs sm:text-sm md:text-base lg:text-lg font-roboto-mono mb-7 sm:mb-8 md:mb-9 text-center sm:text-left"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                        transition={{ duration: 1, delay: 1.0, ...springTransition }}>
                        I am constantly seeking opportunities to learn and grow as a developer, bringing fresh perspectives and enthusiasm to every project I undertake.
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full sm:w-auto">
                        <motion.span
                            className="text-[#F0EAD6] border-[#F0EAD6] border-2 rounded-4xl cursor-pointer hover:bg-[#03346E] hover:border-[#03346E] transition-all hover:scale-110 active:scale-95"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInLeft}
                            transition={{ duration: 1, delay: 1.1, ...springTransition }}>
                            <a href="mailto:tjamesroi@email.com" className="px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 block text-center text-sm sm:text-base">
                                Email
                            </a>
                        </motion.span>
                        <motion.span
                            className="text-[#F0EAD6] border-[#F0EAD6] border-2 rounded-4xl cursor-pointer hover:bg-[#03346E] hover:border-[#03346E] transition-all hover:scale-110 active:scale-95"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInLeft}
                            transition={{ duration: 1, delay: 1.2, ...springTransition }}>
                            <a href="https://www.linkedin.com/in/tanglao-jamesroi-1ab47b189/" target="_blank" rel="noopener noreferrer" className="px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 block text-center text-sm sm:text-base">
                                LinkedIn
                            </a>
                        </motion.span>
                        <motion.span
                            className="text-[#F0EAD6] border-[#F0EAD6] border-2 rounded-4xl cursor-pointer hover:bg-[#03346E] hover:border-[#03346E] transition-all hover:scale-110 active:scale-95"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInLeft}
                            transition={{ duration: 1, delay: 1.3, ...springTransition }}>
                            <a href="https://github.com/critiasx" target="_blank" rel="noopener noreferrer" className="px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 block text-center text-sm sm:text-base">
                                Github
                            </a>
                        </motion.span>
                    </div>
                </div>
            </div>
            {/* PROJECTS SECTION*/}
            <div id="projects" className="min-h-screen bg-[#efece3] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section Title */}
                    <motion.div
                        className="text-center mb-12 sm:mb-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={sectionTitle}
                        transition={{ duration: 0.6, ...springTransition }}>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-poppins font-bold text-[#04141b] mb-2 sm:mb-4">
                            My Projects
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-roboto-mono text-[#04141b]/70">
                            Here are some of my recent works
                        </p>
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        {/* Project Card 1 */}
                        <motion.div
                            className="bg-white/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-98"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={cardReveal}
                            transition={springTransition}>
                            <div className="h-40 sm:h-48 bg-gradient-to-br from-[#04141b] to-[#03346E] flex items-center justify-center">
                                <span className="text-[#F0EAD6] text-4xl sm:text-5xl md:text-6xl font-bold">1</span>
                            </div>
                            <div className="p-4 sm:p-5 md:p-6">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-[#04141b] mb-2">
                                    Portfolio Website
                                </h3>
                                <p className="text-sm font-roboto-mono text-[#04141b]/70 mb-4">
                                    A modern, responsive portfolio website built with React, Laravel, and Framer Motion featuring smooth animations and beautiful UI.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">React</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">Laravel</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">Tailwind</span>
                                </div>
                                <div className="flex gap-4">
                                    <motion.a
                                        href="https://github.com/critiasx"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#04141b] hover:text-[#03346E] font-roboto-mono text-sm underline"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}>
                                        View Code →
                                    </motion.a>
                                    <motion.a
                                        href="#"
                                        className="text-[#04141b] hover:text-[#03346E] font-roboto-mono text-sm underline"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}>
                                        Live Demo →
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                        {/* Project Card 2 */}
                        <motion.div
                            className="bg-white/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-98"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={cardReveal}
                            transition={springTransition}>
                            <div className="h-40 sm:h-48 bg-gradient-to-br from-[#03346E] to-[#021024] flex items-center justify-center">
                                <span className="text-[#F0EAD6] text-4xl sm:text-5xl md:text-6xl font-bold">2</span>
                            </div>
                            <div className="p-4 sm:p-5 md:p-6">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-[#04141b] mb-2">
                                    BulSU Intern-Connect
                                </h3>
                                <p className="text-sm font-roboto-mono text-[#04141b]/70 mb-4">
                                    A web application that connects BulSU students with internship opportunities, featuring company profiles and application tracking.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">Laravel</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">ReactJS</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">TypeScript</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">MySQL</span>
                                </div>
                                <div className="flex gap-4">
                                    <a
                                        href="https://github.com/CritiasX/InternConnect-BulSU"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#04141b] hover:text-[#03346E] font-roboto-mono text-sm underline hover:scale-105 active:scale-95 transition-transform inline-block">
                                        View Code →
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Project Card 3 */}
                        <motion.div
                            className="bg-white/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-98"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={cardReveal}
                            transition={springTransition}>
                            <div className="h-40 sm:h-48 bg-gradient-to-br from-[#021024] to-[#04141b] flex items-center justify-center">
                                <span className="text-[#F0EAD6] text-4xl sm:text-5xl md:text-6xl font-bold">3</span>
                            </div>
                            <div className="p-4 sm:p-5 md:p-6">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-[#04141b] mb-2">
                                    Survey Builder
                                </h3>
                                <p className="text-sm font-roboto-mono text-[#04141b]/70 mb-4">
                                    A dynamic survey builder application that allows users to create, distribute, and analyze surveys with ease using a user-friendly interface.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">Django</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">Javascript</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">MySQL</span>
                                </div>
                                <div className="flex gap-4">
                                    <a
                                        href="https://github.com/CritiasX/Survey-Web-Builder-Django"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#04141b] hover:text-[#03346E] font-roboto-mono text-sm underline hover:scale-105 active:scale-95 transition-transform inline-block">
                                        View Code →
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* View All Projects Button */}
                    <motion.div
                        className="text-center mt-12 sm:mt-16"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={buttonReveal}
                        transition={{ duration: 0.6, delay: 0.7 }}>
                        <a
                            href="https://github.com/critiasx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#04141b] text-[#F0EAD6] px-6 sm:px-8 py-3 sm:py-4 rounded-4xl font-poppins font-bold hover:bg-[#03346E] transition-all text-sm sm:text-base hover:scale-110 active:scale-95">
                            View All Projects on GitHub
                        </a>
                    </motion.div>
                </div>
            </div>
            {/* Footer*/}
            <div id="contacts" className="bg-[#04141b] text-[#F0EAD6] py-6 sm:py-8 flex flex-col">
                <div className="text-left text-2xl font-roboto-mono flex flex-col gap-1 sm:gap-2 mt-20 ml-70 mb-8">
                    <span>
                    Let’s build and ship something remarkable. Open to agency
                    </span>
                        <span>
                        collaborations, freelance work, and fully remote full-time
                    </span>
                        <span>
                        opportunities.
                    </span>
                </div>
                <a
                    href="#contacts"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('#contacts');
                    }}
                    className="mt-4 sm:mt-6 bg-[#03346E] hover:bg-[#efece3] hover:text-[#04141b] text-[#F0EAD6] px-5 sm:px-6 py-2.5 sm:py-3 rounded-4xl font-poppins font-bold hover:scale-110 active:scale-95 transition-transform w-max ml-70 mb-20 inline-block text-center cursor-pointer">
                    Let's Connect
                </a>
                <div className="grid grid-cols-3 mt-8 text-sm font-roboto-mono justify-evenly items-center ml-70 mr-10 ">
                    <div className="flex flex-col gap-1 sm:gap-2">
                        <a href="mailto:tjamesroi@gmail.com">
                            tjamesroi@gmail.com
                        </a>
                        <a href="https://www.instagram.com/jemsroooii/" target="_blank" rel="noopener noreferrer">
                            Instagram
                        </a>
                        <a href="https://www.linkedin.com/in/tanglao-jamesroi-1ab47b189/" target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-2">
                        <a
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('#home');
                            }}
                            className="hover:underline cursor-pointer">
                            Back to Top
                        </a>
                        <span>
                            Timezone: GMT+8
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-2">
                        <span>
                            Designed by James Roi
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
// TODO: Message me button
