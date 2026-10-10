'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AccountMenu from "@/components/AccountMenu";
import logo from "../assects/SVG.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Find Scholarships", href: "/#scholarships" },
  { label: "Universities", href: "/universities" },
  { label: "Student Resources", href: "/#resources" },
  { label: "Success Stories", href: "/#stories" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/" || !activeHash) return;

    const sectionId = decodeURIComponent(activeHash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeHash, pathname]);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/" && !activeHash;
    if (href.startsWith("/#")) {
      return pathname === "/" && activeHash === href.slice(1);
    }
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Announcement Bar */}
      <div
        className="w-full text-white text-sm text-center py-2 px-4"
        style={{ backgroundColor: "#1E3A5F" }}
      >
        <span>
          🎓 138 Verified Scholarships found this week. Apply before deadlines:{" "}
          <strong>2 days left</strong>
        </span>{" "}
        <Link
          href="#scholarships"
          className="underline font-semibold ml-1 hover:text-blue-200 transition-colors"
        >
          View Now →
        </Link>
      </div>

      {/* Main Nav */}
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-600 font-bold text-xl shrink-0"
          aria-label="EduOrbit home"
        >
          <Image
            src={logo}
            alt="EduOrbit logo"
            width={120}
            height={32}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => {
                    if (link.href.startsWith("/#")) {
                      const hash = link.href.slice(1);
                      setActiveHash(hash);
                      if (pathname === "/" && activeHash === hash) {
                        document.getElementById(hash.slice(1))?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    } else if (link.href === "/") {
                      setActiveHash("");
                      if (pathname === "/") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }
                    setMobileOpen(false);
                  }}
                  className={[
                    "transition-colors relative",
                    active
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700 hover:text-blue-600",
                  ].join(" ")}
                >
                  <span className={active ? "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-blue-600" : ""}>
                    {link.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <AccountMenu />
          <Link
            href="/eligibility"
            className="text-sm font-semibold px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Check My Eligibility
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-gray-100 bg-white px-4 pb-4"
        >
          <ul className="flex flex-col gap-1 mt-2">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => {
                      if (link.href.startsWith("/#")) {
                        const hash = link.href.slice(1);
                        setActiveHash(hash);
                        if (pathname === "/" && activeHash === hash) {
                          document.getElementById(hash.slice(1))?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      } else if (link.href === "/") {
                        setActiveHash("");
                        if (pathname === "/") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }
                    }}
                    className={[
                      "block py-2 px-3 rounded-md transition-colors",
                      active
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-2 mt-4">
            <AccountMenu />
            <Link
              href="/eligibility"
              className="text-center py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Check My Eligibility
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
