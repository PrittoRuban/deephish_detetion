"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  IconHome,
  IconMessage,
  IconUser,
  IconMenu2,
  IconShield,
  IconChevronDown,
  IconLogout,
  IconBell,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/utils/supabase/supabase";
import { Tooltip } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { TooltipProvider } from "./ui/tooltip";

// Improved Portal component with AnimatePresence
function Portal({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.body) : null;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // Set active link based on current path
    setActiveLink(window.location.pathname);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }

      // Close mobile menu when clicking outside
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest('button[aria-label="Toggle mobile menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Close on escape key
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await supabase.auth.signOut();
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4" />,
      description: "Dashboard overview",
    },
    {
      name: "Phishing",
      link: "/phishing",
      icon: <IconShield className="h-4 w-4" />,
      description: "Phishing protection tools",
      badge: "New",
    },
    {
      name: "Deepfake",
      link: "/deepfake",
      icon: <IconUser className="h-4 w-4" />,
      description: "Deepfake detection",
    },
  ];

  return (
    <TooltipProvider>
      <div className="fixed left-0 top-0 w-full z-50 flex justify-center pt-6 md:pt-4 transition-all duration-300">
        <div className="w-full max-w-7xl px-4 flex justify-center">
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
              "relative w-full rounded-2xl backdrop-blur-xl transition-all duration-300",
              isScrolled
                ? "bg-background/90 shadow-lg shadow-black/5 border border-border/40"
                : "bg-background/50"
            )}
          >
            <div className="h-16 flex items-center justify-between px-4 md:px-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/90 to-primary-foreground/90 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <IconShield className="h-5 w-5 text-background" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold hidden md:block">
                    Secure One
                  </span>
                  <span className="text-xs text-muted-foreground hidden md:block">
                    Protection tools
                  </span>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                {navItems.map((item) => {
                  const isActive = activeLink === item.link;
                  return (
                    <Tooltip
                      key={item.name}
                      content={item.description}
                      side="bottom"
                    >
                      <Link
                        href={item.link}
                        className={cn(
                          "relative text-sm flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200",
                          isActive
                            ? "text-foreground bg-primary/10 font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                        )}
                        onClick={() => setActiveLink(item.link)}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge
                            variant="outline"
                            className="text-xs py-0 h-5 bg-primary/10 border-primary/20 text-primary"
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary mx-3 rounded-t-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    </Tooltip>
                  );
                })}
              </div>

              <div className="hidden md:flex items-center gap-4 relative">
                {user ? (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full relative"
                    >
                      <IconBell className="h-5 w-5 text-muted-foreground" />
                      <span className="absolute -top-0.5 -right-0.5 bg-primary w-2 h-2 rounded-full" />
                    </Button>

                    <Button
                      variant="ghost"
                      className="h-10 pl-3 pr-2 gap-2 rounded-full hover:bg-accent transition-colors flex items-center text-sm font-medium"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      ref={triggerRef}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      <Avatar className="h-7 w-7 border border-border">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback>
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="truncate max-w-[100px]">
                        {user.user_metadata?.full_name ||
                          user.email?.split("@")[0]}
                      </span>
                      <IconChevronDown
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          dropdownOpen && "transform rotate-180"
                        )}
                      />
                    </Button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <Portal>
                          <motion.div
                            ref={dropdownRef}
                            className="w-64 absolute z-50 bg-background/95 backdrop-blur-md shadow-lg border border-border rounded-lg p-2"
                            initial={{ opacity: 0, scale: 0.95, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -5 }}
                            transition={{ duration: 0.15 }}
                            style={{
                              top: triggerRef.current
                                ? triggerRef.current.getBoundingClientRect()
                                    .bottom +
                                  8 +
                                  "px"
                                : "60px",
                              right: "1rem",
                            }}
                          >
                            <div className="p-2 mb-1">
                              <div className="font-medium">
                                {user.user_metadata?.full_name || "User"}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {user.email}
                              </div>
                            </div>
                            <div className="h-px bg-border my-1" />
                            <div className="p-1">
                              <Link href="/profile">
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start text-sm h-9"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  <IconUser className="h-4 w-4 mr-2" />
                                  My Profile
                                </Button>
                              </Link>
                              <Link href="/settings">
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start text-sm h-9"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  <IconShield className="h-4 w-4 mr-2" />
                                  Security Settings
                                </Button>
                              </Link>
                            </div>
                            <div className="h-px bg-border my-1" />
                            <div className="p-1">
                              <Button
                                variant="destructive"
                                className="w-full justify-start text-sm h-9 bg-destructive/10 hover:bg-destructive/20 text-destructive"
                                onClick={handleSignOut}
                              >
                                <IconLogout className="h-4 w-4 mr-2" />
                                Log out
                              </Button>
                            </div>
                          </motion.div>
                        </Portal>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="ghost" size="sm" className="h-9">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button
                        className="bg-primary hover:bg-primary/90 text-primary-foreground h-9"
                        size="sm"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <IconMenu2 className="h-5 w-5" />
              </Button>
            </div>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  ref={mobileMenuRef}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden bg-background/95 backdrop-blur-lg rounded-b-2xl overflow-hidden"
                >
                  <div className="px-4 py-4 space-y-2">
                    {navItems.map((item) => {
                      const isActive = activeLink === item.link;
                      return (
                        <Link
                          key={item.name}
                          href={item.link}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                            isActive
                              ? "bg-primary/10 text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                          )}
                          onClick={() => {
                            setActiveLink(item.link);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              isActive ? "bg-primary/20" : "bg-accent"
                            )}
                          >
                            {item.icon}
                          </div>
                          <div className="flex flex-col">
                            <span>{item.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          </div>
                          {item.badge && (
                            <Badge
                              variant="outline"
                              className="ml-auto text-xs py-0 h-5 bg-primary/10 border-primary/20 text-primary"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      );
                    })}

                    {user ? (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-3 px-4 py-2">
                          <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage src={user.user_metadata?.avatar_url} />
                            <AvatarFallback>
                              {user.email?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">
                              {user.user_metadata?.full_name || "User"}
                            </span>
                            <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                              {user.email}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 space-y-1 px-1">
                          <Link href="/profile">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-sm h-10"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <IconUser className="h-4 w-4 mr-2" />
                              My Profile
                            </Button>
                          </Link>

                          <Link href="/settings">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-sm h-10"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <IconShield className="h-4 w-4 mr-2" />
                              Security Settings
                            </Button>
                          </Link>

                          <Button
                            variant="destructive"
                            className="w-full justify-start text-sm h-10 bg-destructive/10 hover:bg-destructive/20 text-destructive mt-2"
                            onClick={handleSignOut}
                          >
                            <IconLogout className="h-4 w-4 mr-2" />
                            Log out
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 pt-4 border-t border-border space-y-2">
                        <Link
                          href="/auth/login"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Button variant="outline" className="w-full">
                            Login
                          </Button>
                        </Link>
                        <Link
                          href="/auth/signup"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Button className="w-full bg-primary text-primary-foreground">
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </div>
      </div>
    </TooltipProvider>
  );
}
