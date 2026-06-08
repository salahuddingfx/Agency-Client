import React, { useState, useEffect } from 'react';

/**
 * A beautiful, highly performant Typing Animation component.
 * Rotates through an array of strings, typing and erasing each one with a custom blinking cursor.
 */
export default function TypingAnimation({ 
  words = [], 
  typingSpeed = 80, 
  deletingSpeed = 40, 
  delayBetweenWords = 1800,
  className = "",
  cursorColor = "bg-brand-primary"
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    let timer;
    const currentFullWord = words[currentWordIndex];

    if (!isDeleting) {
      // Typing phase
      if (currentText.length < currentFullWord.length) {
        timer = setTimeout(() => {
          setCurrentText(currentFullWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Complete word is typed, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      }
    } else {
      // Deleting/backspacing phase
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentFullWord.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        // Word is completely erased, switch to next word index
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className="inline-flex items-center">
      <span className={className}>{currentText}</span>
      <span 
        className={`cursor-blink ml-1.5 inline-block w-[3px] h-[0.85em] ${cursorColor} rounded-full`}
        style={{ transform: 'translateY(1px)' }}
      />
    </span>
  );
}
