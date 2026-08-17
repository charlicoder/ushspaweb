'use client';

interface PriceItem {
    name: string;
    duration: string;
    price: string;
}

const massages: PriceItem[] = [
    { name: 'Swedish Massage', duration: '50 Minute Session', price: '$60' },
    { name: 'Combination Massage', duration: '60 Minute Session', price: '$65' },
    { name: 'Deep Tissue Massage', duration: '45 Minute Session', price: '$65' },
    { name: 'Hot Stone Massage', duration: '55 Minute Session', price: '$84' },
    { name: 'Relaxing Massage', duration: '60 Minute Session', price: '$55' },
];

const treatments: PriceItem[] = [
    { name: 'Aroma Balance', duration: '50 Minute Session', price: '$80' },
    { name: 'Supreme Skincare', duration: '60 Minute Session', price: '$119' },
    { name: 'Calming Facial', duration: '55 Minute Session', price: '$87' },
    { name: 'Aromatherapy Facial', duration: '70 Minute Session', price: '$95' },
    { name: 'Coconut Body Wrap', duration: '40 Minute Session', price: '$90' },
];

function PriceList({ items }: { items: PriceItem[] }) {
    return (
        <ul className="pricing-list">
            {items.map((item) => (
                <li key={item.name} className="flex items-start justify-between">
                    <div className="flex-1">
                        <h5 className="font-lustria text-base text-spa-text mb-1">{item.name}</h5>
                        <p className="text-spa-muted text-sm">{item.duration}</p>
                    </div>
                    <h4 className="font-lustria text-xl text-spa-rose ml-4 flex-shrink-0">{item.price}</h4>
                </li>
            ))}
        </ul>
    );
}

export default function PricingSection() {
    return (
        <section id="pricing" className="py-24 bg-spa-pearl">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <div className="section-title mb-14">
                    <span className="section-id text-spa-rose">Pricing</span>
                    <h2 className="font-lustria text-4xl md:text-5xl text-spa-text mb-4">
                        Transparent Pricing
                    </h2>
                    <p className="text-spa-muted max-w-2xl mx-auto">
                        We believe in honest, transparent pricing with no hidden fees. All prices include
                        consultation, treatment, and aftercare advice.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Massages */}
                    <div className="bg-white p-8 rounded-sm shadow-spa">
                        <h3 className="font-lustria text-2xl text-spa-text mb-8 pb-4 border-b border-spa-petal">
                            Massages
                        </h3>
                        <PriceList items={massages} />
                    </div>

                    {/* Treatments */}
                    <div className="bg-white p-8 rounded-sm shadow-spa">
                        <h3 className="font-lustria text-2xl text-spa-text mb-8 pb-4 border-b border-spa-petal">
                            Treatments
                        </h3>
                        <PriceList items={treatments} />
                    </div>
                </div>
            </div>
        </section>
    );
}
