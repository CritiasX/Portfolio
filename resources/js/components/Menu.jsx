import { useState } from 'react';
import { motion } from 'framer-motion';
import {Link} from "@inertiajs/react";
export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className={"text-lg font-roboto-mono w-40 text-center"}>
                <motion.button
                    onClick={()=> {setIsOpen(!isOpen)}}
                    className={"font-bold cursor-pointer hover:bg-[#04141b] hover:text-white p-1 mt-2 w-full rounded-lg"}
                    whileHover={{scale: 1.2, transition : {duration: 0.5, type: "spring"}}}
                    whileTap={{scale: .75, transition : {duration: 0.5, type: "spring"}}}>
                    {!isOpen ? "Menu" : "Close"}</motion.button>
                    {isOpen &&
                    <ul className={"flex flex-col w-40 gap-4 items-center mt-2"}>
                        <motion.li
                            initial={{scale: 0, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{delay: 0.1}}
                            className={"p-1 px-4 rounded-lg w-full hover:bg-[#04141b] hover:text-white"}><Link href="/">Home</Link></motion.li>
                        <motion.li
                            initial={{scale: 0, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{delay: 0.2}}
                            className={"p-1 px-4 rounded-lg w-full hover:bg-[#04141b] hover:text-white"}><Link href="/">About</Link></motion.li>
                        <motion.li
                            initial={{scale: 0, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{delay: 0.3}}
                            className={"p-1 px-4 rounded-lg w-full hover:bg-[#04141b] hover:text-white"}><Link href="/">Project</Link></motion.li>
                        <motion.li
                            initial={{scale: 0, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{delay: 0.4}}
                            className={"p-1 px-4 rounded-lg w-full hover:bg-[#04141b] hover:text-white"}><Link href="/">Contact</Link></motion.li>
                    </ul>
                }
            </div>


            {/*<div className='text-lg font-roboto-mono item-center justify-center mx-auto w-full flex text-center'>*/}
            {/*    {isOpen ?*/}
            {/*        <motion.ul*/}
            {/*            className='flex flex-col gap-4'*/}
            {/*            >*/}
            {/*            <li className={"p-2"}><motion.button*/}
            {/*                onClick={()=>(setIsOpen(false))}*/}
            {/*                className={"font-bold cursor-pointer hover:bg-[#04141b] hover:text-white p-2 rounded-lg"}*/}
            {/*                whileHover={{scale: 1.2, transition : {duration: 0.5, type: "spring" }}}*/}
            {/*                whileTap={{scale: .75, transition : {duration: 0.5, type: "spring"}}}>Close</motion.button></li>*/}
            {/*            <motion.li*/}
            {/*                className={"p-1 px-4 rounded-lg hover:bg-[#04141b] hover:text-white"}*/}
            {/*                initial={{scale: 0}}*/}
            {/*                animate={{scale: 1}}*/}
            {/*                transition={{delay: 0.1}}*/}
            {/*                whileHover={{scale: 1.2, transition : {duration: 0.5, type: "spring" }}}*/}
            {/*                whileTap={{scale: 0.85, transition : {duration: 0.5, type: "spring"}}}><a href="/">Home</a></motion.li>*/}
            {/*            <motion.li*/}
            {/*                className={"p-1 px-4 rounded-lg hover:bg-[#04141b] hover:text-white"}*/}
            {/*                initial={{scale: 0}}*/}
            {/*                animate={{scale: 1}}*/}
            {/*                transition={{delay: 0.2}}*/}
            {/*                whileHover={{scale: 1.2, transition : {duration: 0.5, type: "spring" }}}*/}
            {/*                whileTap={{scale: 0.85, transition : {duration: 0.5, type: "spring"}}}><a href="/">About</a></motion.li>*/}
            {/*            <motion.li*/}
            {/*                className={"p-1 px-4 rounded-lg hover:bg-[#04141b] hover:text-white"}*/}
            {/*                initial={{scale: 0}}*/}
            {/*                animate={{scale: 1}}*/}
            {/*                transition={{delay: 0.3}}*/}
            {/*                whileHover={{scale: 1.2, transition : {duration: 0.5, type: "spring" }}}*/}
            {/*                whileTap={{scale: 0.85, transition : {duration: 0.5, type: "spring"}}}><a href="/">Project</a></motion.li>*/}
            {/*            <motion.li*/}
            {/*                className={"p-1 px-4 rounded-lg hover:bg-[#04141b] hover:text-white"}*/}
            {/*                initial={{scale: 0}}*/}
            {/*                animate={{scale: 1}}*/}
            {/*                transition={{delay: 0.4}}*/}
            {/*                whileHover={{scale: 1.2, transition : {duration: 0.5, type: "spring" }}}*/}
            {/*                whileTap={{scale: 0.85, transition : {duration: 0.5, type: "spring"}}}><Link href="/">Contacts</Link></motion.li>*/}
            {/*        </motion.ul> : <motion.button*/}
            {/*                onClick={() => setIsOpen(true)}*/}
            {/*                className={"font-bold cursor-pointer hover:bg-[#04141b] hover:text-white p-2 rounded-lg"}*/}
            {/*                whileHover={{scale: 1.2, transition : {duration: 0.5, type: "spring" }}}*/}
            {/*                whileTap={{scale: .75, transition : {duration: 0.5, type: "spring"}}}>MENU</motion.button>}*/}
            {/*</div>*/}
        </>
    );
}
