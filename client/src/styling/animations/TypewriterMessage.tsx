import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
  speed?: number; // ms per character
}

const TypewriterMessage: React.FC<Props> = ({ content, speed = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    let cancelled = false;

    const type = () => {
      if (cancelled) return;

      if (currentIndex <= content.length) {
        setDisplayedText(content.slice(0, currentIndex));
        currentIndex++;
        setTimeout(type, speed);
      }
    };

    type();

    return () => {
      cancelled = true; // Stop typing if the component unmounts
    };
  }, [content, speed]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

export default TypewriterMessage;
