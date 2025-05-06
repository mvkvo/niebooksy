"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/features/auth/logout-button";

import "./header.scss";

const Elements = [
  { title: "article", href: "/article" },
  { title: "about", href: "/about" },
  { title: "contact", href: "/contact" },
];

export const Header = () => {
  const { data: session } = useSession();
  useEffect(() => {}, []);

  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__nav--element">
          <Link href="/">
            <Image
              priority
              src="/logo.svg"
              alt="logo-svg"
              width={44}
              height={71}
            />
          </Link>
        </div>
        <ul className="header__nav--desktop">
          {Elements.map((el, index) => (
            <li className="header__nav--element" key={index}>
              <Link href={el.href}>{el.title}</Link>
            </li>
          ))}
          {session ? (
            <>
              <li className="header__nav--element" key="dashboard">
                <Link href="/dashboard">dashboard</Link>
              </li>
              <LogoutButton />
            </>
          ) : (
            <div className="header__nav--auth-elements">
              <div className="header__nav--element">
                <Link href="/login">
                  <Button hasArrow={false}>login</Button>
                </Link>
              </div>
              <div className="header__nav--element">
                <Link href="/signup">
                  <Button hasArrow={false}>signup</Button>
                </Link>
              </div>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};
