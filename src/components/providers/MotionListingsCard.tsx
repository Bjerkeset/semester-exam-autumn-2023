"use client";

import React from "react";
import {motion} from "framer-motion";

export default function MotionListingCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{opacity: 0, x: 20}}
      animate={{opacity: 1, x: 0, transition: {duration: 0.5}}}
      exit={{opacity: 0, x: 20}}
    >
      {children}
    </motion.div>
  );
}
