"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usernameSchema } from "../../../utils/validation";

interface StepProps {
  next: () => void;
  prev: () => void;
  setUsername: (username: string) => void;
}

export default function StepTwo({ next, prev, setUsername }: StepProps) {
  const [usernameInput, setUsernameInput] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const result = usernameSchema.safeParse({ username: usernameInput });

    if (!result.success) {
      setError(result.error.issues[0].message);
      setIsAvailable(false);
    } else if (usernameInput.length >= 3) {
      setError(null);
      setLoading(true);

      const timeoutId = setTimeout(async () => {
        try {
          const res = await fetch(`/api/user?username=${usernameInput}`, {
            method: "HEAD",
          });
          setIsAvailable(res.status === 404); 
        } catch (err) {
          console.error(err);
          setError("Error checking username availability");
          setIsAvailable(null);
        } finally {
          setLoading(false);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setError(null);
      setIsAvailable(null);
    }
  }, [usernameInput]);

  const isValid = usernameSchema.safeParse({ username: usernameInput }).success && isAvailable === true;

  const handleNext = () => {
    if (isValid) {
      setUsername(usernameInput);
      next();
    }
  };

  return (
    <div className="onboarding">
      <motion.div
        className="onboarding__inner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="onboarding__progress">
          <div className="onboarding__progress-bar">
            <div className="onboarding__progress-indicator completed"></div>
            <div className="onboarding__progress-indicator active"></div>
            <div className="onboarding__progress-indicator"></div>
          </div>
          <span className="onboarding__progress-text">Step 2 of 3</span>
        </div>

        <motion.div
          className="onboarding__header no-select"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>Your Blogging Journey Starts Here</h1>
        </motion.div>

        <motion.div
          className="onboarding__description no-select"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <span>Choose a unique name for your blog. You can always change it later!</span>
        </motion.div>

        <motion.div
          className="onboarding__input"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Select Username"
            value={usernameInput}
            onChange={e => setUsernameInput(e.target.value)}
            autoComplete="off"
            maxLength={20}
          />
          {error && usernameInput.length > 0 && (
            <div className="onboarding__availability taken">
              <i className="fas fa-times-circle"></i>
              <span>{error}</span>
            </div>
          )}
          {loading && <div className="onboarding__availability">Checking...</div>}
          {isAvailable !== null && !error && !loading && (
            <div className={`onboarding__availability ${isAvailable ? "available" : "taken"}`}>
              <i className={`fas ${isAvailable ? "fa-check-circle" : "fa-times-circle"}`}></i>
              <span>{isAvailable ? "Username is available" : "Username is taken"}</span>
            </div>
          )}
        </motion.div>

        <motion.div
          className="onboarding__nav"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          <button onClick={prev} className="onboarding__button back">
            <i className="fas fa-arrow-left"></i> <span>Back</span>
          </button>
          <button onClick={handleNext} className="onboarding__button next" disabled={!isValid}>
            <span>Next</span> <i className="fas fa-arrow-right"></i>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
