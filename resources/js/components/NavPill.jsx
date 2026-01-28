import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function NavPill(){
    return (
        <motion.div className={"bg-[#04141b] uppercase w-11/12 md:w-1/4 max-w-md mx-auto mt-3 flex h-12 rounded-4xl shadow-lg fixed left-1/2 -translate-x-1/2 z-5"}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5}}>
            <ul className={"flex w-full justify-center p-0.5 gap-0.5 h-full text-xs font-bold "}>
                <Link className={"bg-[#efece3] rounded-4xl h-full inline-flex items-center justify-center w-full font-roboto-mono transition-all duration-300 ease-in-out border-1 hover:bg-[#04141b] hover:text-[#efece3] active:bg-[#4a70a9]"}>Home</Link>
                <Link className={"bg-[#efece3] rounded-4xl h-full inline-flex items-center justify-center w-full font-roboto-mono transition-all duration-300 ease-in-out border-1 hover:bg-[#04141b] hover:text-[#efece3] active:bg-[#4a70a9]"}>About</Link>
                <Link className={"bg-[#efece3] rounded-4xl h-full inline-flex items-center justify-center w-full font-roboto-mono transition-all duration-300 ease-in-out border-1 hover:bg-[#04141b] hover:text-[#efece3] active:bg-[#4a70a9]"}>Projects</Link>
            </ul>
        </motion.div>
    );
}
