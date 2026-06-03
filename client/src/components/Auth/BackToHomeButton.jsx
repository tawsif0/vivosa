import React from "react";
import { motion } from "framer-motion";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const BackToHomeButton = ({ className = "", label = "Return Home" }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate("/")}
      className={`flex w-fit items-center gap-2 rounded-xl border border-gold-accent/30 bg-deep-forest px-4 py-2 text-xs font-semibold tracking-[0.18em] text-gold-accent shadow-lg shadow-[0_12px_28px_rgba(0,75,53,0.18)] backdrop-blur transition-all duration-300 hover:border-gold-accent/60 hover:bg-[#00543d] hover:shadow-[0_16px_30px_rgba(0,75,53,0.26)] ${className}`}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-accent text-deep-forest">
        <HomeIcon className="h-3.5 w-3.5" />
      </span>
      <span>{label}</span>
    </motion.button>
  );
};

export default BackToHomeButton;
