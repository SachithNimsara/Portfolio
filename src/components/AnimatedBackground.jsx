import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function AnimatedBackground() {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 60 },
          size: { value: 3 },
          move: { enable: true, speed: 1 },
          color: { value: "#ffffff" },
          links: { enable: true, color: "#ffffff" },
        },
        background: { color: "#0d47a1" }, // or use transparent
      }}
    />
  );
}
export default AnimatedBackground;
