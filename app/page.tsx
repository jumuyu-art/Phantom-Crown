"use client";

import { useEffect, useState } from "react";
import Particles from "@/components/Particles";

export default function Home() {
  const [boot, setBoot] = useState(false);

  useEffect(() => {
    setBoot(true);
    const t = setTimeout(() => setBoot(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {boot && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.22),transparent_60%)] animate-pulse" />
          <div className="text-center">
            <p className="text-yellow-300 tracking-[0.5em] text-xs mb-6 animate-pulse">
              INITIALIZING
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-widest animate-fadeIn">
              <span className="text-white">⚜️『𝑷𝒉𝒂𝒏𝒕𝒐𝒎✧𝑪𝒓𝒐𝒘𝒏』⚜️</span>
            </h1>
            <div className="mt-6 w-52 sm:w-64 h-px bg-white/20 mx-auto overflow-hidden">
              <div className="h-full w-full bg-yellow-400 animate-loadingBar" />
            </div>
          </div>
        </div>
      )}

      <main className="relative min-h-screen bg-[#0b0d14] text-white flex items-center justify-center" dir="rtl">
        <Particles />
        <h1 className="relative z-10 text-5xl sm:text-7xl md:text-9xl font-extrabold tracking-widest text-white">
          Talcero
        </h1>
      </main>
    </>
  );
}