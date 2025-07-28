import React from "react";
import { motion } from "framer-motion";

export interface MascotCharacterProps {
  type: "camera" | "star" | "square";
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
  animate?: boolean;
}

const MascotCharacter: React.FC<MascotCharacterProps> = ({
  type = "camera",
  size = "md",
  color,
  className = "",
  animate = true,
}) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const defaultColors = {
    camera: "text-red-500",
    star: "text-amber-500",
    square: "text-yellow-500",
  };

  const colorClass = color || defaultColors[type];

  const bounceAnimation = {
    initial: { y: 0 },
    animate: animate
      ? {
          y: [-5, 0, -5],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }
      : {},
  };

  const renderMascot = () => {
    switch (type) {
      case "camera":
        return (
          <div
            className={`relative ${sizeClasses[size]} ${colorClass} ${className}`}
          >
            <div className="absolute inset-0 rounded-lg bg-current">
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 rounded-full bg-white border-2 border-blue-900"></div>
              <div className="absolute top-1/6 right-1/4 w-1/6 h-1/6 rounded-full bg-blue-400"></div>
            </div>
            <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/4 bg-current rounded-b-lg"></div>
            <div className="absolute -left-1/4 top-1/3 w-1/4 h-1/3 bg-current rounded-l-lg"></div>
          </div>
        );
      case "star":
        return (
          <div
            className={`relative ${sizeClasses[size]} ${colorClass} ${className}`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path d="M12,1L15.36,8.48L23,9.69L17.5,15.37L18.96,23L12,19.5L5.04,23L6.5,15.37L1,9.69L8.64,8.48L12,1Z" />
            </svg>
            <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3">
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-black"></div>
              <div className="absolute top-1/3 left-1/3 w-1/4 h-1/4 rounded-full bg-white"></div>
            </div>
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-1/2 h-1/6 bg-black rounded-full"></div>
          </div>
        );
      case "square":
        return (
          <div
            className={`relative ${sizeClasses[size]} ${colorClass} ${className}`}
          >
            <div className="absolute inset-0 rounded-lg bg-current">
              <div className="absolute top-1/4 left-1/4 w-1/6 h-1/6 rounded-full bg-black"></div>
              <div className="absolute top-1/4 right-1/4 w-1/6 h-1/6 rounded-full bg-black"></div>
              <div className="absolute bottom-1/4 left-1/3 w-1/3 h-1/6 bg-black rounded-full"></div>
            </div>
            <div className="absolute -bottom-1/4 left-0 w-1/3 h-1/3 bg-current rounded-b-lg"></div>
            <div className="absolute -bottom-1/4 right-0 w-1/3 h-1/3 bg-current rounded-b-lg"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={bounceAnimation}
      className="relative"
    >
      {renderMascot()}
    </motion.div>
  );
};

export default MascotCharacter;
