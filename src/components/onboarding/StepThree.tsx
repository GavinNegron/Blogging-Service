import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface StepProps {
  next: () => void
  prev: () => void
}

const takenUsernames = ["admin", "user123", "testblog", "john_doe"] 

export default function StepThree({ next, prev }: StepProps) {
  const [username, setUsername] = useState("")
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    if (username.length >= 3) {
      setIsAvailable(!takenUsernames.includes(username.toLowerCase()))
    } else {
      setIsAvailable(null)
    }
  }, [username])

  const isValid = username.length >= 3 && isAvailable === true

  return (
    <div className="onboarding">
      <motion.div
        className="onboarding__inner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          {isAvailable !== null && (
            <div className={`onboarding__availability ${isAvailable ? "available" : "taken"}`}>
              <i className={`fas ${isAvailable ? "fa-check-circle" : "fa-times-circle"}`}></i>
              <span>{isAvailable ? "Username is available" : "Username is taken"}</span>
            </div>
          )}
        </motion.div>

        {/* Bottom Navigation Buttons */}
        <motion.div
          className="onboarding__nav"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          <button onClick={prev} className="onboarding__button back">
            <i className="fas fa-arrow-left"></i> <span>Back</span>
          </button>
          <button onClick={next} className="onboarding__button next" disabled={!isValid}>
            <span>Next</span> <i className="fas fa-arrow-right"></i>
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
