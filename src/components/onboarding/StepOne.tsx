import { motion } from "framer-motion";

interface StepProps {
    next: () => void;
  }
  
  export default function StepOne({ next }: StepProps) {
    return (
        <div className="onboarding">
        <motion.div 
            className="onboarding__inner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <motion.div 
                className="onboarding__header no-select"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h1>Welcome to PLACEHOLDER</h1>
            </motion.div>

            <motion.div 
                className="onboarding__description no-select"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            >
                <span>Placeholder empowers you to craft and share your stories effortlessly, giving you a beautifully designed space to express yourself and engage your audience.</span>
            </motion.div>

            <motion.div 
                className="onboarding__button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            >
                <button onClick={next}>Get Started!</button>
            </motion.div>
        </motion.div>
    </div>
    );
  }