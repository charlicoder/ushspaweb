'use client';

import { useState, useEffect } from 'react';

const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Services', href: '#services' },
    { label: 'Our Experts', href: '#team' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Gallery', href: '#gallery' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-white shadow-md py-2'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
                    className="flex items-center gap-2 group"
                >
                    <div className="flex flex-col leading-none">
                        <span
                            className={`font-lustria text-2xl font-bold tracking-widest transition-colors duration-300 ${scrolled ? 'text-spa-cherry' : 'text-white'
                                }`}
                        >
                            USH
                        </span>
                        <span
                            className={`font-brush text-xl tracking-wider transition-colors duration-300 ${scrolled ? 'text-spa-rose' : 'text-spa-petal'
                                }`}
                        >
                            Spa
                        </span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                            className={`text-sm font-medium uppercase tracking-wider px-3 py-2 transition-colors duration-300 hover:text-spa-rose ${scrolled ? 'text-spa-text' : 'text-white'
                                }`}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="#booking"
                        onClick={(e) => { e.preventDefault(); handleNavClick('#booking'); }}
                        className="btn-spa btn-rose ml-4 text-xs"
                    >
                        Book Now
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={`lg:hidden flex flex-col gap-1.5 p-2 transition-colors duration-300 ${scrolled ? 'text-spa-text' : 'text-white'
                        }`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden bg-white shadow-lg transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                            className="text-sm font-medium uppercase tracking-wider py-2 text-spa-text hover:text-spa-rose transition-colors duration-300 border-b border-spa-petal"
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="#booking"
                        onClick={(e) => { e.preventDefault(); handleNavClick('#booking'); }}
                        className="btn-spa btn-rose mt-2 text-center text-xs"
                    >
                        Book Now
                    </a>
                </div>
            </div>
        </header>
    );
}
