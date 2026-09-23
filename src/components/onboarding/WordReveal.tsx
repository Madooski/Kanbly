"use client";

interface WordRevealProps {
  text: string;
  baseDelay?: number;
}

export default function WordReveal({ text, baseDelay = 0 }: WordRevealProps) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span key={index}>
          <span className="inline-block overflow-hidden">
            <span
              className="inline-block animate-[wordReveal_0.6s_cubic-bezier(0.16,1,0.3,1)_both]"
              style={{ animationDelay: `${baseDelay + index * 0.04}s` }}
            >
              {word}
            </span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}
