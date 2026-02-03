import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useLenis } from 'lenis/react';

// Move constants outside component to prevent recreation
const NAV_ITEMS = [
    { name: 'Home', delay: 0.6, href: '#home' },
    { name: 'About', delay: 0.7, href: '#about' },
    { name: 'Projects', delay: 0.8, href: '#projects' },
    { name: 'Contacts', delay: 0.9, href: '#contacts' }
];

// Memoize animation variants to prevent object recreation
const navVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, y: 0 },
    transition: { duration: 1, ease: 'easeOut' }
};

const logoVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
};

const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
};

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const lenis = useLenis();

    // Memoize callbacks to prevent recreation
    const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
    const closeMenu = useCallback(() => setIsOpen(false), []);

    // Smooth scroll function with Lenis and offset for fixed nav
    const handleScroll = useCallback((e, href) => {
        e.preventDefault();
        if (lenis) {
            lenis.scrollTo(href, {
                offset: -100, // Negative offset to account for fixed navigation
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        }
        closeMenu();
    }, [lenis, closeMenu]);

    return (
        <motion.nav
            className="w-[90%] lg:w-[80%] mx-auto min-h-16 bg-white/30 border border-white/30 shadow-xl rounded-lg flex flex-col lg:flex-row items-center px-4 py-4 lg:py-0 justify-between mt-5 font-roboto-mono fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
            initial="hidden"
            animate="visible"
            variants={navVariants}
            transition={navVariants.transition}>
            {/* Header with Logo and Hamburger */}
            <div className="w-full lg:w-auto flex justify-between items-center">
                <motion.div
                    className="font-bold text-xl md:text-2xl font-poppins text-gray-800"
                    initial="hidden"
                    animate="visible"
                    variants={logoVariants}
                    transition={{ duration: 0.5, type: "spring", delay: 0.5 }}>
                    <a
                        href="#home"
                        onClick={(e) => handleScroll(e, '#home')}
                        className="cursor-pointer select-none uppercase hover:scale-110 active:scale-90 transition-transform block">
                        James Roi
                    </a>
                </motion.div>

                {/* Hamburger Menu Button */}
                <button
                    className="lg:hidden flex flex-col gap-1.5 p-2 active:scale-90 transition-transform"
                    onClick={toggleMenu}
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
                </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:block">
                <ul className="flex space-x-8 xl:space-x-14 text-gray-800 font-medium justify-evenly items-center py-2">
                    {NAV_ITEMS.map((item) => (
                        <motion.li
                            key={item.name}
                            initial="hidden"
                            animate="visible"
                            variants={logoVariants}
                            transition={{
                                duration: 0.5,
                                type: "spring",
                                delay: item.delay
                            }}>
                            <a
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href)}
                                className="block px-3 py-2 hover:bg-[#04141b] hover:text-[#F0EAD6] rounded-lg cursor-pointer transition-all hover:scale-110 active:scale-95">
                                {item.name}
                            </a>
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
                            {NAV_ITEMS.map((item, index) => (
                                <motion.li
                                    key={item.name}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={menuItemVariants}
                                    transition={{ delay: index * 0.05 }}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleScroll(e, item.href)}
                                        className="block px-3 py-2 hover:bg-[#04141b] hover:text-[#F0EAD6] rounded-lg cursor-pointer transition-colors active:scale-95">
                                        {item.name}
                                    </a>
                                </motion.li>
                            ))}
                            {/* Mobile Get Started Button */}
                            <motion.li
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={menuItemVariants}
                                transition={{ delay: NAV_ITEMS.length * 0.05 }}>
                                <a
                                    href="#contacts"
                                    onClick={(e) => handleScroll(e, '#contacts')}
                                    className="w-full px-4 py-2 bg-[#04141b] text-[#F0EAD6] rounded-lg hover:bg-[#03346E] transition-colors active:scale-95 block text-center">
                                    Message me
                                </a>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Get Started Button */}
            <div className="hidden lg:block">
                <motion.a
                    href="#contacts"
                    onClick={(e) => handleScroll(e, '#contacts')}
                    className="px-4 py-2 bg-[#04141b] text-[#F0EAD6] rounded-lg hover:bg-[#03346E] transition-colors hover:scale-110 active:scale-90 inline-block"
                    initial="hidden"
                    animate="visible"
                    variants={logoVariants}
                    transition={{ duration: 0.5, type: "spring", delay: 1 }}>
                    Message me
                </motion.a>
            </div>
        </motion.nav>
    );
}
