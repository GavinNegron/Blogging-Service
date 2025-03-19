import { useState, useEffect } from 'react';

interface UseTypingEffectProps {
  words: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  pauseBeforeDelete?: number;
  pauseBeforeNextWord?: number;
}

export function useTypingEffect({
  words,
  typingSpeed = 100,
  deleteSpeed = 50,
  pauseBeforeDelete = 1000,
  pauseBeforeNextWord = 500,
}: UseTypingEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      if (charIndex > 0) {
        setTimeout(() => {
          setDisplayText(currentWord.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), pauseBeforeNextWord);
      }
    } else {
      if (charIndex < currentWord.length) {
        setTimeout(() => {
          setDisplayText(currentWord.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseBeforeDelete);
      }
    }
  }, [
    charIndex,
    isDeleting,
    isPaused,
    currentWordIndex,
    words,
    typingSpeed,
    deleteSpeed,
    pauseBeforeDelete,
    pauseBeforeNextWord,
  ]);

  return displayText;
}
