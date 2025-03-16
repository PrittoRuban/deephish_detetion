"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Twitter, Shield } from "lucide-react";

export function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/PrittoRuban",
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/prittoruban",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/PrittoRuban",
      icon: <Twitter className="h-5 w-5" />,
    },
  ];

  const footerLinks = [
    {
      title: "Phishing Detection",
      items: [
        { name: "URL Scanner", href: "/phishing/url" },
        { name: "Message Analysis", href: "/phishing/message" },
        { name: "Email Verification", href: "/phishing/email" },
      ],
    },
    {
      title: "Deepfake Detection",
      items: [
        { name: "Image Analysis", href: "/deepfake/image" },
        { name: "Audio Verification", href: "/deepfake/audio" },
        { name: "Video Scanner", href: "/deepfake/video" },
      ],
    },
  ];

  return (
    <footer className="bg-background/95 backdrop-blur-xl border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <Link
                href="/"
                className="text-foreground hover:text-foreground/80 transition-colors flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/90 to-primary-foreground/90 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Shield className="h-4 w-4 text-background" />
                </div>
                <span className="text-sm font-semibold">Secure One</span>
              </Link>
              <p className="mt-3 text-sm text-muted-foreground">
                Software for advanced phishing and deepfake detection
              </p>
            </div>
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-foreground">
                  {group.title}
                </h3>
                <ul role="list" className="mt-3 space-y-2">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t pt-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex space-x-6">
                {socialLinks.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="sr-only">{item.name}</span>
                    {item.icon}
                  </motion.a>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Built for a safer digital world 💖 | ©{" "}
                {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
