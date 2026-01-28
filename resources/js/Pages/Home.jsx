import React from 'react';
import { Head } from "@inertiajs/react";
import { motion } from 'framer-motion';
import Typewriter from "typewriter-effect";
import Nav from "@/components/Nav.jsx";
import { SiReact, SiLaravel, SiPhp, SiTailwindcss, SiFramer, SiInertia } from 'react-icons/si';

export default function Home() {

    return (
        <>
            <Head title="Home" />
            <Nav/>
            {/* HOME SECTION*/}
            <div className="mx-auto min-h-screen px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 flex flex-col justify-center items-center text-center select-none py-20 sm:py-24 md:py-0">
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
                            initial={{opacity:0, y:-20}}
                            animate={{opacity:1, y:0}}
                            transition={{duration: 1, delay:0.2, type:'spring', stiffness:100}}>
                            <motion.span
                                style={{ display: 'inline-block' }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                                ASPIRING
                            </motion.span>
                        </motion.div>
                        <motion.div
                            initial={{opacity:0, scale:0.6}}
                            animate={{opacity:1, scale:1}}
                            transition={{duration: 1, delay:0.4, type:'spring', stiffness:100}}
                            className="w-full flex justify-center">
                            <motion.span
                                className="flex flex-row flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
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
                            </motion.span>
                        </motion.div>
                        <motion.div
                            initial={{opacity:0, y:20}}
                            animate={{opacity:1, y:0}}
                            transition={{duration: 1, delay:0.6, type:'spring', stiffness:100}}>
                            <motion.span
                                style={{ display: 'inline-block' }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.8 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                                DEVELOPER
                            </motion.span>
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
                            initial={{opacity:0, x:-20}}
                            animate={{opacity:1, x:0}}
                            transition={{duration: 1, delay:1.2, type:'spring', stiffness:100}}
                            className="w-full sm:w-auto">
                            <motion.p
                                className="bg-[#04141b] text-[#F0EAD6] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 rounded-4xl hover:bg-[#03346E] w-full sm:w-auto text-sm sm:text-base cursor-pointer transition-colors"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                                Resume
                            </motion.p>
                        </motion.div>
                        <motion.div
                            initial={{opacity:0, x:20}}
                            animate={{opacity:1, x:0}}
                            transition={{duration: 1, delay:1.4, type:'spring', stiffness:100}}
                            className="w-full sm:w-auto">
                            <motion.a
                                className="border-2 border-[#04141b] text-[#04141b] hover:border-[#03346E] hover:text-[#F0EAD6] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 rounded-4xl hover:bg-[#03346E] w-full sm:w-auto text-sm sm:text-base cursor-pointer transition-colors block text-center"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                href="https://www.linkedin.com/in/tanglao-jamesroi-1ab47b189/" target="_blank" rel="noopener noreferrer" >
                                LinkedIn
                            </motion.a>
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
                    initial={{opacity:0, scale:0.8}}
                    animate={{opacity:1, scale:1}}
                    transition={{duration: 1, delay:1.6, type:'spring', stiffness:100}}>
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
            <div className="min-h-screen select-none flex flex-col sm:flex-row bg-[#04141b] text-[#F0EAD6] py-16 sm:py-20 md:py-0">
                <div className="hidden sm:flex sm:w-1/2 items-center justify-center p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16">
                    <motion.img src="/images/me.JPG" alt="me" className="max-h-[60vh] sm:max-h-[70vh] md:max-h-[75vh] lg:max-h-[80vh] w-auto rounded-4xl object-cover shadow-2xl"
                        initial={{scale: 0.8, opacity: 0, y: -100}}
                        whileInView={{scale: 1, opacity: 1, y: 0}}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{delay: .5, type: "spring", stiffness:100}}/>
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
                        initial={{opacity:0, y:20}}
                        whileInView={{opacity:1, y:0}}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{duration: 1, delay:0.9, type:'spring', stiffness:100}}>
                        I am James Roi, a fresh graduate with a Bachelor of Science in Information Technology. I am passionate about developing innovative software solutions and eager to contribute my skills in a dynamic work environment.
                    </motion.p>
                    <motion.p
                        className="text-xs sm:text-sm md:text-base lg:text-lg font-roboto-mono mb-7 sm:mb-8 md:mb-9 text-center sm:text-left"
                        initial={{opacity:0, y:20}}
                        whileInView={{opacity:1, y:0}}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{duration: 1, delay:1.0, type:'spring', stiffness:100}}>
                        I am constantly seeking opportunities to learn and grow as a developer, bringing fresh perspectives and enthusiasm to every project I undertake.
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full sm:w-auto">
                        <motion.span
                            className="text-[#F0EAD6] border-[#F0EAD6] border-2 rounded-4xl cursor-pointer hover:bg-[#03346E] hover:border-[#03346E] transition-colors"
                            initial={{opacity:0, x:-20}}
                            whileInView={{opacity:1, x:0}}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{duration: 1, delay:1.1, type:'spring', stiffness:100}}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.95 }}>
                            <a href="mailto:tjamesroi@email.com" className="px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 block text-center text-sm sm:text-base">
                                Email
                            </a>
                        </motion.span>
                        <motion.span
                            className="text-[#F0EAD6] border-[#F0EAD6] border-2 rounded-4xl cursor-pointer hover:bg-[#03346E] hover:border-[#03346E] transition-colors"
                            initial={{opacity:0, x:-20}}
                            whileInView={{opacity:1, x:0}}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{duration: 1, delay:1.2, type:'spring', stiffness:100}}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.95 }}>
                            <a href="https://www.linkedin.com/in/tanglao-jamesroi-1ab47b189/" target="_blank" rel="noopener noreferrer" className="px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 block text-center text-sm sm:text-base">
                                LinkedIn
                            </a>
                        </motion.span>
                        <motion.span
                            className="text-[#F0EAD6] border-[#F0EAD6] border-2 rounded-4xl cursor-pointer hover:bg-[#03346E] hover:border-[#03346E] transition-colors"
                            initial={{opacity:0, x:-20}}
                            whileInView={{opacity:1, x:0}}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{duration: 1, delay:1.3, type:'spring', stiffness:100}}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.95 }}>
                            <a href="https://github.com/critiasx" target="_blank" rel="noopener noreferrer" className="px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 block text-center text-sm sm:text-base">
                                Github
                            </a>
                        </motion.span>
                    </div>
                </div>
            </div>
            {/* PROJECTS SECTION*/}
            <div className="min-h-screen bg-[#efece3] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Section Title */}
                    <motion.div
                        className="text-center mb-12 sm:mb-16"
                        initial={{opacity: 0, y: -50}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{duration: 0.6, type: 'spring', stiffness: 100}}>
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
                            className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            initial={{opacity: 0, y: 50}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{ once: true, amount: 0.2 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
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
                            className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            initial={{opacity: 0, y: 50}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{ once: true, amount: 0.2 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                            <div className="h-40 sm:h-48 bg-gradient-to-br from-[#03346E] to-[#021024] flex items-center justify-center">
                                <span className="text-[#F0EAD6] text-4xl sm:text-5xl md:text-6xl font-bold">2</span>
                            </div>
                            <div className="p-4 sm:p-5 md:p-6">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-[#04141b] mb-2">
                                    E-Commerce Platform
                                </h3>
                                <p className="text-sm font-roboto-mono text-[#04141b]/70 mb-4">
                                    Full-stack e-commerce solution with shopping cart, payment integration, and admin dashboard for product management.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">PHP</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">MySQL</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">JavaScript</span>
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

                        {/* Project Card 3 */}
                        <motion.div
                            className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            initial={{opacity: 0, y: 50}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{ once: true, amount: 0.2 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                            <div className="h-40 sm:h-48 bg-gradient-to-br from-[#021024] to-[#04141b] flex items-center justify-center">
                                <span className="text-[#F0EAD6] text-4xl sm:text-5xl md:text-6xl font-bold">3</span>
                            </div>
                            <div className="p-4 sm:p-5 md:p-6">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-[#04141b] mb-2">
                                    Task Management App
                                </h3>
                                <p className="text-sm font-roboto-mono text-[#04141b]/70 mb-4">
                                    Collaborative task management application with real-time updates, team features, and productivity tracking.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">React</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">Node.js</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">MongoDB</span>
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

                        {/* Project Card 4 */}
                        <motion.div
                            className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            initial={{opacity: 0, y: 50}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{ once: true, amount: 0.2 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                            <div className="h-40 sm:h-48 bg-gradient-to-br from-[#03346E] to-[#04141b] flex items-center justify-center">
                                <span className="text-[#F0EAD6] text-4xl sm:text-5xl md:text-6xl font-bold">4</span>
                            </div>
                            <div className="p-4 sm:p-5 md:p-6">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-[#04141b] mb-2">
                                    Weather Dashboard
                                </h3>
                                <p className="text-sm font-roboto-mono text-[#04141b]/70 mb-4">
                                    Real-time weather application with location search, forecasts, and beautiful visualizations using weather APIs.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">JavaScript</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">API</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">CSS</span>
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

                        {/* Project Card 5 */}
                        <motion.div
                            className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            initial={{opacity: 0, y: 50}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{ once: true, amount: 0.2 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                            <div className="h-40 sm:h-48 bg-gradient-to-br from-[#021024] to-[#03346E] flex items-center justify-center">
                                <span className="text-[#F0EAD6] text-4xl sm:text-5xl md:text-6xl font-bold">5</span>
                            </div>
                            <div className="p-4 sm:p-5 md:p-6">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-[#04141b] mb-2">
                                    Blog Platform
                                </h3>
                                <p className="text-sm font-roboto-mono text-[#04141b]/70 mb-4">
                                    Content management system with markdown support, comments, categories, and SEO optimization features.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">Laravel</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">Vue.js</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">MySQL</span>
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

                        {/* Project Card 6 */}
                        <motion.div
                            className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            initial={{opacity: 0, y: 50}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{ once: true, amount: 0.2 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                            <div className="h-40 sm:h-48 bg-gradient-to-br from-[#04141b] to-[#021024] flex items-center justify-center">
                                <span className="text-[#F0EAD6] text-4xl sm:text-5xl md:text-6xl font-bold">6</span>
                            </div>
                            <div className="p-4 sm:p-5 md:p-6">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-bold text-[#04141b] mb-2">
                                    Fitness Tracker
                                </h3>
                                <p className="text-sm font-roboto-mono text-[#04141b]/70 mb-4">
                                    Health and fitness tracking app with workout logs, progress charts, and personalized goal setting.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">React Native</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">Firebase</span>
                                    <span className="px-3 py-1 bg-[#04141b]/10 text-[#04141b] text-xs font-roboto-mono rounded-full">Charts</span>
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
                    </div>

                    {/* View All Projects Button */}
                    <motion.div
                        className="text-center mt-12 sm:mt-16"
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{duration: 0.6, delay: 0.7}}>
                        <motion.a
                            href="https://github.com/critiasx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#04141b] text-[#F0EAD6] px-6 sm:px-8 py-3 sm:py-4 rounded-4xl font-poppins font-bold hover:bg-[#03346E] transition-colors text-sm sm:text-base"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}>
                            View All Projects on GitHub
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
// TODO: Add Footer Component, Contact Form, Improve Buttons, Improve Responsive Design - each Breakpoints
