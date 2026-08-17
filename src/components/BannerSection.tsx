'use client';

interface BannerProps {
    discount: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
    bgImage?: string;
    bgColor?: string;
}

export default function BannerSection({
    discount,
    title,
    subtitle,
    ctaText,
    ctaHref,
    bgImage,
    bgColor = 'bg-spa-rose',
}: BannerProps) {
    const handleScroll = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            className={`relative py-20 text-center text-white overflow-hidden ${bgImage ? 'bg-cover bg-center bg-no-repeat' : bgColor
                }`}
            style={bgImage ? { backgroundImage: `url('${bgImage}')` } : {}}
        >
            {bgImage && <div className="absolute inset-0 bg-spa-cherry/70" />}
            <div className="relative z-10 max-w-3xl mx-auto px-4">
                <h2 className="font-lustria text-6xl md:text-8xl font-bold mb-3 leading-none">
                    {discount}
                </h2>
                <h3 className="font-lustria text-2xl md:text-3xl uppercase tracking-widest mb-4">
                    {title}
                </h3>
                <p className="text-lg opacity-90 mb-8 font-light">{subtitle}</p>
                <button
                    onClick={() => handleScroll(ctaHref)}
                    className="btn-spa btn-tra-white text-base px-10 py-4"
                >
                    {ctaText}
                </button>
            </div>
        </section>
    );
}
