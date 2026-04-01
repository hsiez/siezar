"use client";

import { useCallback, useRef, useState } from "react";
import { HalftoneDots } from "@paper-design/shaders-react";
import { FadeBox } from "@/app/components/fade-box/fade-box";
import styles from "./page.module.css";

export default function WorkingTogether() {
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 2);
    setCanScrollDown(el.scrollTop < el.scrollHeight - el.clientHeight - 2);
  }, []);

  const scrollClass = [
    styles.scrollArea,
    canScrollUp && styles.fadeTop,
    canScrollDown && styles.fadeBottom,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.container}>
      <HalftoneDots
        style={{ width: "100%", height: "100%" }}
        colorBack="#0095ff"
        colorFront="#ffffff"
        originalColors={false}
        type="gooey"
        grid="hex"
        inverted={true}
        size={0.47}
        radius={1.25}
        contrast={0.4}
        grainMixer={0.1}
        grainOverlay={0.1}
        grainSize={0.05}
      />
      <FadeBox fadeSize="100px" className={styles.textBlock}>
        <div ref={scrollRef} onScroll={handleScroll} className={scrollClass}>
          <div className={styles.paragraphs}>
            <h1 className={styles.title}>Working Together</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
            <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
            <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
            <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
          </div>
        </div>
      </FadeBox>
      <div className={styles.imageWrapper}>
        <HalftoneDots
          style={{ width: "100%", height: "100%" }}
          image="/dev/sword.png"
          colorBack="#f2f1e900"
          colorFront="#6D93A8" // 91C2E3
          originalColors={false}
          type="gooey"
          grid="hex"
          inverted={false}
          size={0.47}
          radius={1.25}
          contrast={0.4}
          grainMixer={0}
          grainOverlay={0}
          grainSize={0.5}
          fit="contain"
        />
      </div>
    </div>
  );
}
