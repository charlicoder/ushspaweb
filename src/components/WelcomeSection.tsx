'use client';

interface ServiceItem {
    id: string;
    iconClass: string;
    title: string;
    description: string;
    featured?: boolean;
}

const services: ServiceItem[] = [
    {
        id: 's1',
        iconClass: 'flaticon-relax-stones',
        title: 'Massage Therapy',
        description: 'Augue luctus neque purus an ipsum neque dolor primis libero tempus at blandit at purus venenatis',
    },
    {
        id: 's2',
        iconClass: 'flaticon-cream-2',
        title: 'Skin Care',
        description: 'Augue luctus neque purus an ipsum neque dolor primis libero tempus at blandit at purus venenatis',
        featured: true,
    },
    {
        id: 's3',
        iconClass: 'flaticon-towel',
        title: 'Body Treatments',
        description: 'Augue luctus neque purus an ipsum neque dolor primis libero tempus at blandit at purus venenatis',
    },
];

export default function WelcomeSection() {
    const handleReadMore = () => {
        document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="welcome" style={{ backgroundColor: '#faf7f5' }} className="overflow-hidden">

            {/* ── Section Title ── */}
            <div className="text-center pt-20 pb-2 px-4 relative">
                {/* Large translucent brush watermark — sits behind the h2 */}
                <span
                    aria-hidden="true"
                    className="font-brush block leading-none select-none pointer-events-none"
                    style={{
                        fontSize: '6rem',
                        color: '#9a7570',
                        opacity: 0.12,
                        marginBottom: '-3.4rem',
                        letterSpacing: '3px',
                    }}
                >
                    Welcome To
                </span>
                <h2
                    className="font-lustria text-spa-text relative z-10 mb-4"
                    style={{ fontSize: '2.6rem', letterSpacing: '0.5px', fontWeight: 700, color: '#727475' }}
                >
                    Massage Therapy Center
                </h2>
                <p
                    className="text-spa-muted mx-auto leading-relaxed"
                    style={{ fontSize: '1.05rem', maxWidth: '520px' }}
                >
                    Aliquam a augue suscipit, luctus neque purus ipsum neque undo dolor primis libero
                    tempus, blandit a cursus varius at magna tempor
                </p>
            </div>

            {/* ── Service Cards ── */}
            <div className="max-w-5xl mx-auto px-4 pb-20 pt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 items-stretch">

                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="flex flex-col items-center text-center transition-shadow duration-300"
                            style={{
                                padding: '3rem 2.5rem',
                                ...(service.featured ? {
                                    backgroundColor: '#fff',
                                    boxShadow: '0 8px 50px rgba(0,0,0,0.09)',
                                    borderRadius: '4px',
                                    position: 'relative' as const,
                                    zIndex: 10,
                                } : {}),
                            }}
                        >
                            {/* Blush circle with flaticon — ico-80 sets glyph to 80px */}
                            <div
                                className="flex items-center justify-center rounded-full mb-8 ico-80"
                                style={{
                                    width: '160px',
                                    height: '160px',
                                    backgroundColor: '#f7f4f0',
                                    flexShrink: 0,
                                    color: '#efa697',
                                }}
                            >
                                <span className={service.iconClass} />
                            </div>

                            {/* Title */}
                            <h5
                                className="font-lustria text-spa-text mb-3"
                                style={{ fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.3px' }}
                            >
                                {service.title}
                            </h5>

                            {/* Description */}
                            <p
                                className="text-spa-muted leading-relaxed mb-8"
                                style={{ fontSize: '0.95rem', maxWidth: '210px' }}
                            >
                                {service.description}
                            </p>

                            {/* Outlined rose button */}
                            <button
                                onClick={handleReadMore}
                                className="btn-spa btn-tra-rose"
                                style={{ fontSize: '0.78rem', padding: '9px 30px', letterSpacing: '0.8px' }}
                            >
                                Read More
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
