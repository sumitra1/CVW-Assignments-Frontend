import { useEffect, useRef, useState } from "react";

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Count resize events
  const resizeCount = useRef(0);

  // Store previous size
  const previousSize = useRef(size);

  useEffect(() => {
    const handleResize = () => {
      resizeCount.current++;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Update only if dimensions changed
      if (
        previousSize.current.width !== width ||
        previousSize.current.height !== height
      ) {
        previousSize.current = { width, height };

        setSize({
          width,
          height,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width: size.width,
    height: size.height,
    resizeCount,
  };
}

export default useWindowSize;