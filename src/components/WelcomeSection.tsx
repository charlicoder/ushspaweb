'use client';

interface ServiceItem {
    icon: string;
    title: string;
    description: string;
}

const services: ServiceItem[] = [
    {
        icon: '💆',
        title: 'Massage Therapy',
        description: 'Relieve tension and restore balance with our expert massage therapies, tailored to your body\'s unique needs and preferences.',
    },
    {
        icon: '✨',
        title: 'Skin Care',
        description: 'Reveal your natural radiance with our advanced skincare treatments using premium organic products and techniques.',
    },
    {
        icon: '🌿',
        title: 'Body Treatments',
        description: 'Indulge in our luxurious body wraps, scrubs, and detox treatments designed to nourish and revitalize your skin.',
    },
];

export default function WelcomeSection() {
    return (
        <section id="welcome" className="py-24 bg-spa-cream">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Title */}
                    <div>
                        <span className="section-id text-spa-rose">Welcome To</span>
                        <h2 className="font-lustria text-4xl md:text-5xl text-spa-text mb-6 leading-tight">
                            USH Spa &amp; Wellness Center
                        </h2>
                        <p className="text-spa-muted text-lg leading-relaxed mb-8">
                            At USH Spa, we believe that true beauty begins with inner harmony. Our sanctuary of
                            wellness offers a curated collection of treatments designed to restore, rejuvenate,
                            and revitalize your body and spirit.
                        </p>
                        <p className="text-spa-muted leading-relaxed">
                            Each visit is a personalized journey guided by our expert therapists, using only the
                            finest natural ingredients and time-honored techniques blended with modern innovation.
                        </p>
                    </div>

                    {/* Right: Service Cards */}
                    <div className="flex flex-col gap-6">
                        {services.map((service) => (
                            <div
                                key={service.title}
                                className="flex gap-5 p-6 bg-white rounded-sm shadow-spa hover:shadow-spa-md transition-shadow duration-400 group"
                            >
                                <div className="flex-shrink-0 w-14 h-14 bg-spa-blush rounded-full flex items-center justify-center text-2xl">
                                    {service.icon}
                                </div>
                                <div>
                                    <h5 className="font-lustria text-lg text-spa-text mb-2 group-hover:text-spa-rose transition-colors duration-300">
                                        {service.title}
                                    </h5>
                                    <p className="text-spa-muted text-sm leading-relaxed mb-3">
                                        {service.description}
                                    </p>
                                    <a
                                        href="#services"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="text-spa-rose text-sm font-medium hover:text-spa-cherry transition-colors duration-300"
                                    >
                                        Read More →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
