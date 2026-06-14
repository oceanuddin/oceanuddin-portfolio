"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import SshLoader from "@/components/boot/SshLoader";
import Nav from "@/components/layout/Nav";
import Terminal from "@/components/easter/Terminal";

export default function SiteShell({ children }: { children: ReactNode }) {
  const [booting, setBooting] = useState(true);
  const [ready, setReady] = useState(false);

  // only show the SSH loader once per browser session
  useEffect(() => {
    const seen = sessionStorage.getItem("ou_booted");
    if (seen) {
      setBooting(false);
      setReady(true);
    }
  }, []);

  const handleDone = () => {
    sessionStorage.setItem("ou_booted", "1");
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
