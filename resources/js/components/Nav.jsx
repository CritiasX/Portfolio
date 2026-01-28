import {Link} from "@inertiajs/react";
import { motion, AnimatePresence } from 'framer-motion';
import { useState,useEffect } from 'react';

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down & past threshold
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };
        // Event listener for every scroll
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navItems = [
        { name: 'Home', delay: 0.6 },
        { name: 'About', delay: 0.7 },
        { name: 'Projects', delay: 0.8 },
        { name: 'Contacts', delay: 0.9 }
    ];

    return (<>
        <motion.div
            className="w-[90%] lg:w-[80%] mx-auto min-h-16 bg-white/20 backdrop-blur-md border border-white/30 shadow-xl rounded-lg flex flex-col lg:flex-row items-center px-4 py-4 lg:py-0 justify-between mt-5 font-roboto-mono fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: isVisible ? 0 : -100 }}
            transition={{ duration: 1, ease: 'easeOut' }}>
            {/* Header with Logo and Hamburger */}
            <div className="w-full lg:w-auto flex justify-between items-center">
                <motion.div
                    className="font-bold text-xl md:text-2xl font-poppins text-gray-800"
                    initial={{scale: 0, opacity: 0}}
                    animate={{scale:1, opacity: 1}}
                    transition={{
                        duration: 0.5, type: "spring", delay: 0.5
                    }}>
                    <motion.p
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={"cursor-pointer select-none uppercase"}>James Roi</motion.p>
                </motion.div>

                {/* Hamburger Menu Button */}
                <motion.button
                    className="lg:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Toggle menu">
                    <motion.span
                        className="w-6 h-0.5 bg-gray-800 block"
                        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="w-6 h-0.5 bg-gray-800 block"
                        animate={{ opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="w-6 h-0.5 bg-gray-800 block"
                        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:block">
                <ul className="flex space-x-8 xl:space-x-14 text-gray-800 font-medium justify-evenly items-center py-2">
                    {navItems.map((item) => (
                        <motion.li
                            key={item.name}
                            initial={{scale: 0, opacity: 0}}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    duration: 0.5,
                                    type: "spring",
                                    delay: item.delay
                                }
                            }}>
                            <motion.div
                                whileHover={{
                                    scale: 1.2,
                                    transition: { duration: 0.2}
                                }}
                                whileTap={{
                                    scale: 0.9,
                                    transition: { duration: 0.1}
                                }}
                                className={"hover:bg-[#04141b] hover:text-[#F0EAD6] rounded-lg cursor-pointer"}>
                                <Link
                                    className={"block w-full h-full px-3 py-2"}>
                                    {item.name}
                                </Link>
                            </motion.div>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="lg:hidden w-full mt-4 pb-2"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}>
                        <ul className="flex flex-col space-y-2 text-gray-800 font-medium">
                            {navItems.map((item, index) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ delay: index * 0.05 }}>
                                    <motion.div
                                        whileTap={{ scale: 0.95 }}
                                        className={"hover:bg-[#04141b] hover:text-[#F0EAD6] rounded-lg cursor-pointer"}>
                                        <Link
                                            className={"block w-full h-full px-3 py-2"}
                                            onClick={() => setIsOpen(false)}>
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                </motion.li>
                            ))}
                            {/* Mobile Get Started Button */}
                            <motion.li
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ delay: navItems.length * 0.05 }}>
                                <motion.button
                                    className="w-full px-4 py-2 bg-[#04141b] text-[#F0EAD6] rounded-lg hover:bg-[#03346E]"
                                    whileTap={{scale: 0.95}}
                                    onClick={() => {
                                        console.log("Get Started clicked");
                                        setIsOpen(false);
                                    }}>
                                    Message me
                                </motion.button>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Get Started Button */}
            {/* Desktop Get Started Button */}
            <div className="hidden lg:block">
                <motion.div
                    initial={{scale: 0, opacity: 0}}
                    animate={{scale:1, opacity: 1}}
                    transition={{
                        duration: 1, type: "spring", delay: 1
                    }}>
                    <motion.button
                        className="px-4 py-2 bg-[#04141b] text-[#F0EAD6] rounded-lg hover:bg-[#03346E]"
                        whileHover={{scale: 1.2}}
                        whileTap={{scale: 0.9}}
                        onClick={() => {
                            console.log("Get Started clicked");
                        }}>
                        Message me
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    </>);
}
