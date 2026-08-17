'use client';

interface Service {
    image: string;
    alt: string;
    title: string;
    description: string;
}

const services: Service[] = [
    {
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_19969baec-1767016827953.png",
        alt: 'Combination massage therapy with hot stones and essential oils',
        title: 'Combination Massage',
        description: 'A perfect blend of Swedish and deep tissue techniques to relieve tension and promote deep relaxation throughout your body.'
    },
    {
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_18984906e-1773053888957.png",
        alt: 'Special skincare facial treatment with natural products',
        title: 'Special Care Solutions',
        description: 'Customized skincare treatments designed to address your specific skin concerns using premium organic formulations.'
    },
    {
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb336078-1773907383325.png",
        alt: 'Relaxing body treatment with warm towels and aromatherapy',
        title: 'Relaxing Body Treatments',
        description: 'Immerse yourself in our signature body treatments that cleanse, nourish, and revitalize your skin from head to toe.'
    },
    {
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7c52ebe-1772222079321.png",
        alt: 'Aromatherapy oils and essential oil diffuser for spa treatment',
        title: 'Oils & Aromatherapy',
        description: 'Harness the healing power of pure essential oils in our aromatherapy sessions that calm the mind and restore the spirit.'
    }];


export default function ServicesSection() {
    return (
        <section id="services" className="py-24 bg-spa-pearl">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <div className="section-title mb-14">
                    <span className="section-id text-spa-rose">Our Services</span>
                    <h2 className="font-lustria text-4xl md:text-5xl text-spa-text mb-4">
                        The Art Of Natural Beauty
                    </h2>
                    <p className="text-spa-muted max-w-2xl mx-auto">
                        Discover our comprehensive range of spa services, each crafted to deliver an
                        exceptional wellness experience tailored to your individual needs.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) =>
                        <div
                            key={service.title}
                            className="service-card bg-white rounded-sm shadow-spa hover:shadow-spa-md transition-all duration-400 overflow-hidden group">

                            {/* Image */}
                            <div className="overflow-hidden h-52">
                                <img
                                    src={service.image}
                                    alt={service.alt}
                                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105" />

                            </div>
                            {/* Content */}
                            <div className="p-6">
                                <h5 className="font-lustria text-lg text-spa-text mb-3 group-hover:text-spa-rose transition-colors duration-300">
                                    {service.title}
                                </h5>
                                <p className="text-spa-muted text-sm leading-relaxed mb-4">
                                    {service.description}
                                </p>
                                <a
                                    href="#booking"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="text-spa-rose text-sm font-medium hover:text-spa-cherry transition-colors duration-300 inline-flex items-center gap-1">

                                    Find Out More
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>);

}