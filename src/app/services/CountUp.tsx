import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

type CountUpProps = {
  from?: number;
  to: number;
  duration?: number;
  topText?: string;
  bottomText?: string;
};

const CountUp = ({
  from = 0,
  to,
  duration = 4,
  topText: initialText = "",
  bottomText: endText = "",
}: CountUpProps) => {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const animation = animate(from, to, {
        duration,
        delay: 1,
        onUpdate: (latest) => setCount(Math.round(latest)),
      });

      return () => animation.stop();
    }
  }, [isInView, from, to, duration]);

  return (
    <div ref={ref}>
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold dark:bg-gradient-to-r dark:from-neutral-400/80 dark:via-neutral-200 dark:to-neutral-400/80 dark:[-webkit-text-stroke:1.5px] dark:bg-clip-text dark:text-transparent">{count}+</h2>
        <p className="text-sm font-bold dark:text-white text-gray-800">
          {initialText} <br /> {endText}
        </p>
      </div>
    </div>
  );
};

export default CountUp;
