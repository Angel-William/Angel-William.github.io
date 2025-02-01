// Transition settings for consistent usage across multiple animations
export const transition: { type: string; duration: number } = { type: "spring", duration: 0.8 };

// Type for the slide animation direction
type SlideDirection = "left" | "right" | "up" | "down" | "none";

// Slide animation for various directions
export const slideAnimation = (direction: SlideDirection) => {
  const xMovement = direction === "left" ? -100 : direction === "right" ? 100 : 0;
  const yMovement = direction === "up" ? 100 : direction === "down" ? -100 : 0;

  return {
    initial: {
      x: xMovement,
      y: yMovement,
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: xMovement,
      y: yMovement,
      transition: { ...transition, delay: 0 },
    },
  };
};

// Fade animation (simplified)
export const fadeAnimation = {
  initial: { opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { opacity: 0, transition: { ...transition, delay: 0 } },
};

// Type for the spring animation transition
interface SpringTransition {
  type: "spring";
  damping: number;
  stiffness: number;
  restDelta: number;
  duration: number;
  delay?: number;
  delayChildren?: number;
}

// Headline text animation (with spring movement)
export const headTextAnimation = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 5,
    stiffness: 40,
    restDelta: 0.001,
    duration: 0.3,
  } as SpringTransition,
};

// Headline content animation (with delayed spring animation)
export const headContentAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 7,
    stiffness: 30,
    restDelta: 0.001,
    duration: 0.6,
    delay: 0.2,
    delayChildren: 0.2,
  } as SpringTransition,
};

// Headline container animation (simple entry/exit with delayed effect)
export const headContainerAnimation = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
};
