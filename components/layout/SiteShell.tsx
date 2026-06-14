"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import SshLoader from "@/components/boot/SshLoader";
import Nav from "@/components/layout/Nav";
import Terminal from "@/components/easter/Terminal";

export default function SiteShell({ children }: { children: ReactNode }) {
  // Play the SSH boot sequence on every fresh load/refresh.
  // It's fully skippable (any key or the skip button), and respects
  // prefers-reduced-motion (the loader finishes instantly in that case).
  const [booting, setBooting] = useState(true);
  const [ready, setReady] = useState(false);

  const handleDone = () => {
    setBooting(false);
    setReady(true);
  };

  return (
    <>
      {booting && <SshLoader onDone={handleDone} />}

      <motion.div
        initial={false}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      >
        <Nav />
        <main>{children}</main>
        <Terminal />
      </motion.div>
    </>
  );
}
