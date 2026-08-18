'use client';

const features = [
    {
        id: 'f1',
        iconClass: 'flaticon-relax-stones',
        title: 'Safety Standards',
        desc: 'Congue augue egestas magna volutpat dictum suscipit ipsum egestas magna vitae purus',
    },
    {
        id: 'f2',
        iconClass: 'flaticon-mortar',
        title: 'Lifestyle Program',
        desc: 'Congue augue egestas magna volutpat dictum suscipit ipsum egestas magna vitae purus',
    },
    {
        id: 'f3',
        iconClass: 'flaticon-gift',
        title: 'Gift Cards',
        desc: 'Congue augue egestas magna volutpat dictum suscipit ipsum egestas magna vitae purus',
    },
];

export default function ExperienceSection() {
    return (
        <section id="experience" className="bg-white pt-20 pb-16 overflow-visible">
            <div className="max-w-5xl mx-auto px-4">

                {/* ── Section Title ── */}
                <div className="text-center mb-12 relative">
                    {/* Translucent brush watermark */}
                    <span
                        aria-hidden="true"
                        className="font-brush block leading-none select-none pointer-events-none"
                        style={{
                            fontSize: '5.5rem',
                            color: '#9a7570',
                            opacity: 0.13,
                            marginBottom: '-3.2rem',
                            letterSpacing: '3px',
                        }}
                    >
                        Experience
                    </span>
                    <h2
                        className="font-lustria text-spa-text relative z-10 mb-5"
                        style={{ fontSize: '2.4rem', fontWeight: 700, letterSpacing: '0.3px' }}
                    >
                        Feel Natural, Be Natural
                    </h2>
                    <p
                        className="text-spa-muted mx-auto leading-relaxed"
                        style={{ fontSize: '0.97rem', maxWidth: '520px' }}
                    >
                        Aliquam a augue suscipit, luctus neque purus ipsum neque undo dolor primis
                        libero tempus, blandit a cursus varius at magna tempor
                    </p>
                </div>

                {/* ── Photo Mosaic Grid ──
                     Layout: 3 columns — left col (2 rows), center (1 tall spanning 2 rows), right col (2 rows)
                ── */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1.45fr 1fr',
                        gridTemplateRows: '1fr 1fr',
                        gap: '6px',
                        height: '420px',
                        marginBottom: '56px',
                    }}
                >
                    {/* Left-top */}
                    <div style={{ gridColumn: '1', gridRow: '1', overflow: 'hidden' }}>
                        <img
                            src="/images/gallery/img-1.jpg"
                            alt="Woman receiving relaxing back massage"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </div>

                    {/* Center — tall, spans both rows */}
                    <div style={{ gridColumn: '2', gridRow: '1 / span 2', overflow: 'hidden' }}>
                        <img
                            src="/images/image-12.jpg"
                            alt="Client receiving luxury facial clay treatment"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </div>

                    {/* Right-top */}
                    <div style={{ gridColumn: '3', gridRow: '1', overflow: 'hidden' }}>
                        <img
                            src="/images/gallery/img-3.jpg"
                            alt="Aromatherapy oil being poured near candles"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </div>

                    {/* Left-bottom */}
                    <div style={{ gridColumn: '1', gridRow: '2', overflow: 'hidden' }}>
                        <img
                            src="/images/gallery/img-4.jpg"
                            alt="Natural spa soaps, herbs and towels on wooden tray"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </div>

                    {/* Right-bottom */}
                    <div style={{ gridColumn: '3', gridRow: '2', overflow: 'hidden' }}>
                        <img
                            src="/images/gallery/img-5.jpg"
                            alt="Woman with towel receiving face massage"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </div>
                </div>

                {/* ── Feature Items Row ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div key={feature.id} className="flex items-start gap-5">
                            {/* Icon circle */}
                            <div
                                className="flex-shrink-0 flex items-center justify-center rounded-full ico-50"
                                style={{
                                    width: '72px',
                                    height: '72px',
                                    backgroundColor: '#f7f4f0',
                                    color: '#efa697',
                                }}
                            >
                                <span className={feature.iconClass} />
                            </div>

                            {/* Text */}
                            <div>
                                <h5
                                    className="font-lustria text-spa-text mb-2"
                                    style={{ fontSize: '1.05rem', fontWeight: 700 }}
                                >
                                    {feature.title}
                                </h5>
                                <p
                                    className="text-spa-muted leading-relaxed"
                                    style={{ fontSize: '0.875rem' }}
                                >
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
