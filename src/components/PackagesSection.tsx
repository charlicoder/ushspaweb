'use client';

interface Package {
    image: string;
    alt: string;
    title: string;
    includes: string[];
    price: string;
}

const packages: Package[] = [
    {
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_14ea820b6-1776868633883.png",
        alt: 'Combination massage package with custom massage and facial treatment',
        title: 'Combination Massage',
        includes: [
            'Custom Massage (20 min)',
            'Detox Custom Facial (50 min)'],

        price: '$65'
    },
    {
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_137aa3333-1786991984482.png",
        alt: 'Supreme skincare package with sea salt scrub and body wrap treatments',
        title: 'Supreme Skincare',
        includes: [
            'Organic Sea Salt Scrub (30 min)',
            'Soothing Skin Body Wrap (40 min)',
            'Hydrating Facial (20 min)'],

        price: '$119'
    },
    {
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb336078-1773907383325.png",
        alt: 'Hot stones massage package with sea salt scrub and body wrap',
        title: 'Hot Stones Massage',
        includes: [
            'Organic Sea Salt Scrub (20 min)',
            'Hot Stone Body Massage (50 min)'],

        price: '$85'
    },
    {
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb336078-1773907383325.png",
        alt: 'Relaxing massage package with aromatherapy and body wrap',
        title: 'Relaxing Massage',
        includes: [
            'Aromatherapy Scrub (20 min)',
            'Full Body Relaxing Massage (50 min)'],

        price: '$55'
    }];


export default function PackagesSection() {
    return (
        <section id="packages" className="py-24 bg-spa-pearl">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <div className="section-title mb-14">
                    <span className="section-id text-spa-rose">Packages</span>
                    <h2 className="font-lustria text-4xl md:text-5xl text-spa-text mb-4">
                        Relax, Renew, Revitalize
                    </h2>
                    <p className="text-spa-muted max-w-2xl mx-auto">
                        Our carefully curated spa packages combine multiple treatments for a complete wellness
                        experience at exceptional value.
                    </p>
                </div>

                {/* Packages Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packages.map((pkg) =>
                        <div key={pkg.title} className="package-card bg-white">
                            {/* Image */}
                            <div className="overflow-hidden h-48">
                                <img
                                    src={pkg.image}
                                    alt={pkg.alt}
                                    className="w-full h-full object-cover transition-transform duration-400 hover:scale-105" />

                            </div>
                            {/* Content */}
                            <div className="p-5">
                                <div className="mb-4">
                                    <h5 className="font-lustria text-lg text-spa-text mb-3">{pkg.title}</h5>
                                    <ul className="flex flex-col gap-1">
                                        {pkg.includes.map((item) =>
                                            <li key={item} className="text-spa-muted text-sm flex items-start gap-2">
                                                <span className="text-spa-rose mt-0.5 flex-shrink-0">•</span>
                                                {item}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-spa-petal">
                                    <span className="font-lustria text-2xl text-spa-rose">{pkg.price}</span>
                                    <a
                                        href="#booking"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="text-spa-muted text-sm hover:text-spa-rose transition-colors duration-300 font-medium">

                                        Book Now →
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>);

}