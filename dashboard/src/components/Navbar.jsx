"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconHome,
  IconMessage,
  IconUser,
  IconMenu2,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4" />,
    },
    {
      name: "Phishing",
      link: "/phishing",
      icon: <IconUser className="h-4 w-4" />,
    },
    {
      name: "Deepfake",
      link: "/deepfake",
      icon: <IconMessage className="h-4 w-4" />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 w-full z-50 flex justify-center pt-6 md:pt-4 transition-all duration-300">
      <div className="w-full max-w-7xl px-4 flex justify-center">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "relative w-full rounded-2xl backdrop-blur-xl md:transition-all md:duration-300",
            isScrolled
              ? "bg-background/80 shadow-lg shadow-black/5"
              : "bg-background/40"
          )}
        >
          <div className="h-16 flex items-center justify-between px-6">
            <Link
              href="/"
              className="text-foreground hover:text-foreground/80 transition-colors flex items-center gap-2 shrink-0"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/90 to-primary-foreground/90 flex items-center justify-center shadow-lg shadow-primary/20">
                <IconHome className="h-4 w-4 text-background" />
              </div>
              <span className="text-sm font-semibold transition-opacity duration-300 md:block hidden">
                Security Scanner
              </span>
            </Link>

            <div className="flex-1 flex items-center justify-center">
              <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-primary/5"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 shrink-0">
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-xl"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg shadow-primary/20 rounded-xl">
                  Sign Up
                </Button>
              </Link>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/5 rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <IconMenu2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-background/95 backdrop-blur-lg rounded-b-2xl"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground rounded-xl hover:bg-primary/5 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
                <div className="pt-3 space-y-2">
                  <Link href="/signin">
                    <Button
                      variant="ghost"
                      className="w-full justify-start hover:bg-primary/5 rounded-xl"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full bg-primary/90 text-primary-foreground hover:bg-primary shadow-lg shadow-primary/20 rounded-xl">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </motion.nav>
      </div>
    </div>
  );
}
