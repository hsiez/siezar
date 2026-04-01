import { CSSProperties, ReactNode } from "react";
import styles from "./fade-box.module.css";

interface FadeBoxProps {
  children: ReactNode;
  fadeSize?: string;
  className?: string;
  style?: CSSProperties;
}

export function FadeBox({
  children,
  fadeSize = "80px",
  className,
  style,
}: FadeBoxProps) {
  return (
    <div
      className={`${styles.fadeBox} ${className ?? ""}`}
      style={{ "--fade-size": fadeSize, ...style } as CSSProperties}
    >
      {children}
    </div>
  );
}
