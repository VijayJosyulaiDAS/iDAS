import React from "react";
import Typography from "@mui/material/Typography";
import { motion } from 'framer-motion';


function M1Header() {

    return (
        <div className="p-24 sm:p-32 w-full border-b-1">
            <div className="flex flex-col">
                <motion.span
                    initial={{x: -20}}
                    animate={{x: 0, transition: {delay: 0.2}}}
                >
                    <Typography className="text-24 md:text-32 font-extrabold tracking-tight leading-none">
                        M1 Data
                    </Typography>
                </motion.span>
            </div>
        </div>

    )
}

export default M1Header;