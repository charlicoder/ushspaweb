'use client';

export default function FooterCTASection() {
    const handleScroll = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            className="relative py-24 text-center text-white bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=80')`,
            }}
        >
            <div className="absolute inset-0 bg-spa-cherry/75" />
            <div className="relative z-10 max-w-3xl mx-auto px-4">
                <span className="font-brush text-4xl text-spa-petal opacity-80 block mb-2">Welcome to</span>
                <h3 className="font-lustria text-4xl md:text-5xl mb-4 leading-tight">
                    USH Spa &mdash; Where Beauty Meets Wellness
                </h3>
                <p className="text-lg opacity-90 mb-10 font-light leading-relaxed">
                    Experience the transformative power of our expert treatments. Your journey to radiant
                    beauty and deep relaxation begins with a single appointment.
                </p>
                <button
                    onClick={() => handleScroll('#booking')}
                    className="btn-spa btn-tra-white text-base px-10 py-4"
                >
                    Book an Appointment
                </button>
            </div>
        </section>
    );
}
