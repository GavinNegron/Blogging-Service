import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import api from "@/utils/axios.config";
import { completeOnboarding } from "@/services/AccountService";

interface StepProps {
  prev: () => void;
  username: string;
}

export default function StepThree({ prev, username }: StepProps) {
  const [domainOption, setDomainOption] = useState<"subdomain" | "custom">("subdomain");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isValid = domainOption === "subdomain" || (domainOption === "custom");

  const handleCompleteOnboarding = async () => {
    try {
      setLoading(true);

      const cookieHeader = document.cookie;

      const session = await api.get('/api/auth/get-session', {
        headers: {
          cookie: cookieHeader,
        },
      });
    
      const userId = session.data?.user?.id
      
      await completeOnboarding(userId, cookieHeader, username);

      router.push('/dashboard');
    } catch (error) {
      console.error("Onboarding completion error:", error);
    } finally {
      setLoading(false);
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
            <div className="onboarding__progress-indicator completed"></div>
            <div className="onboarding__progress-indicator active"></div>
          </div>
          <span className="onboarding__progress-text no-select">Step 3 of 3</span>
        </div>
        <motion.div
          className="onboarding__header no-select"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1>Select Your Blog URL</h1>
        </motion.div>

        <motion.div
          className="onboarding__description no-select"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <span>Choose how you want your blog URL to be structured.</span>
        </motion.div>

        <motion.div
          className="onboarding__domain-options"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <div
            className={`onboarding__domain-option ${domainOption === "subdomain" ? "selected" : ""}`}
            onClick={() => setDomainOption("subdomain")}
          >
            <h2><i className="fas fa-globe"></i> Subdomain</h2>
            <p>{username || 'yourblog'}.domain.com</p>
          </div>
          <div
            className={`onboarding__domain-option ${domainOption === "custom" ? "selected" : ""}`}
            onClick={() => setDomainOption("custom")}
          >
            <h2><i className="fas fa-certificate"></i> Custom Domain</h2>
            <p>{username || 'yourblog'}.com</p>
            <span className="premium-feature">Premium</span>
          </div>
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
          <button onClick={handleCompleteOnboarding} className="onboarding__button next" disabled={!isValid || loading}>
            <span>{loading ? "Finishing..." : "Finish"}</span> <i className="fas fa-arrow-right"></i>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
