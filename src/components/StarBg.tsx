"use client";
import { pb } from "@/services/pocketbase.service";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";

export default function StarBg() {
  const [init, setInit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  });
  
  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: "#aa4fe3",
        },
        links: {
          color: "#aa4fe3",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 250,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: false,
    }),
    []
  );

  return (
    <div className="flex items-center justify-center absolute">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="-z-10"
        style={{ zIndex: "-999" }}
      />
    </div>
  );
}
