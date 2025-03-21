'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepOne, StepTwo, StepThree } from '@/components/onboarding/index';
import './onboarding.sass';

const steps = [StepOne, StepTwo, StepThree];

export default function Onboarding() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const savedStep = localStorage.getItem("onboardingStep");
        if (savedStep !== null) {
            setStep(parseInt(savedStep, 10));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("onboardingStep", step.toString());
    }, [step]); 

    const StepComponent = steps[step];

    return (
        <div className="onboarding">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    <StepComponent 
                        next={() => setStep((prev) => Math.min(prev + 1, steps.length - 1))} 
                        prev={() => setStep((prev) => Math.max(prev - 1, 0))} 
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}