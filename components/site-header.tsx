"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import Image from "next/image"
import { Menu, HelpCircle, Info } from 'lucide-react'

export function SiteHeader() {
  const links = [
    { href: "/about", label: "About", icon: Info },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 select-none">
      <div className="container mx-auto max-w-4xl">
        <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1.5">
            <div className="h-25 w-25 sm:h-17 sm:w-18 relative">
              <Image 
                src="/WhatsApp Image 2025-09-16 at 11.07.24 AM.jpeg" 
                alt="NextIgnition logo" 
                fill
                sizes="(max-width: 768px) 64px, 100px"
                className="object-contain" 
                priority
              />
            </div>
            <span className="font-semibold tracking-wide text-white">NextIgnition</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm text-gray-600">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-purple-600 transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
            
            {/* Desktop CTA */}
            <Button
              asChild
              className="bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5
                         hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                         transition-all"
            >
        <Link href="https://chat.whatsapp.com/FqTkzzorqpNHavQLCKlj0c?mode=ems_wa_t" target="_blank" rel="noopener noreferrer">
          Join Community
        </Link>
            </Button>
          </div>


          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 bg-gray-900/80 text-gray-200 hover:bg-gray-800"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-gray-200 p-0 w-64 flex flex-col">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Mobile navigation menu for NextIgnition website
                </SheetDescription>
                
                {/* Brand Header */}
                <div className="flex items-center gap-1.5 px-4 py-4 border-b border-gray-200">
                  <span className="font-semibold tracking-wide text-gray-900 text-lg">NextIgnition</span>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 mt-2">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 hover:text-purple-600 transition-colors text-gray-700"
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 text-gray-600">
                        <l.icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm">{l.label}</span>
                    </Link>
                  ))}
                </nav>

              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
