'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepOne, StepTwo, StepThree } from '../../../components/pages/onboarding/index';
import './onboarding.sass';

export default function Onboarding() {
    const [step, setStep] = useState(0);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const savedStep = sessionStorage.getItem("onboardingStep");
        if (savedStep !== null) {
            setStep(parseInt(savedStep, 10));
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem("onboardingStep", step.toString());
    }, [step]); 

    const next = () => setStep((prev) => Math.min(prev + 1, 2));
    const prev = () => setStep((prev) => Math.max(prev - 1, 0));

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
                    {step === 0 && <StepOne next={next} />}
                    {step === 1 && <StepTwo next={next} prev={prev} setUsername={setUsername} />}
                    {step === 2 && <StepThree next={next} prev={prev} username={username} />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}