'use client';

export default function AboutSection() {
    const handleScroll = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* About Part 1 - Image + Text */}
            <section id="about" className="py-24 bg-spa-pearl">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-sm shadow-spa-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=700&q=80"
                                    alt="USH Spa luxury treatment room with candles and relaxing ambiance"
                                    className="w-full h-[500px] object-cover" />

                            </div>
                            {/* Decorative badge */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-spa-rose rounded-full flex flex-col items-center justify-center text-white shadow-spa-md">
                                <span className="font-lustria text-2xl font-bold">10+</span>
                                <span className="text-xs text-center leading-tight">Years of Excellence</span>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="lg:pl-8">
                            <span className="section-id text-spa-rose">About Us</span>
                            <h3 className="font-lustria text-3xl md:text-4xl text-spa-text mb-6 leading-tight">
                                Your Beauty &amp; Wellness Journey Starts Here
                            </h3>
                            <p className="text-spa-muted leading-relaxed mb-6">
                                USH Spa is a premier wellness destination dedicated to providing transformative spa
                                experiences. Our team of certified therapists and beauty experts are passionate about
                                helping you look and feel your absolute best.
                            </p>
                            <p className="text-spa-muted leading-relaxed mb-8">
                                We combine ancient healing traditions with modern techniques, using only the finest
                                organic and natural products to deliver results that go beyond the surface.
                            </p>
                            <button
                                onClick={() => handleScroll('#services')}
                                className="btn-spa btn-rosybrown">

                                Discover More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Part 2 - Experience Features */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                        {/* Left: Title */}
                        <div>
                            <span className="section-id text-spa-rose">Experience</span>
                            <h3 className="font-lustria text-3xl md:text-4xl text-spa-text mb-6 leading-tight">
                                Feel Natural, Be Natural
                            </h3>
                            <p className="text-spa-muted leading-relaxed">
                                We believe wellness is a lifestyle. Our holistic approach ensures every treatment
                                nurtures your body, mind, and spirit in perfect harmony.
                            </p>
                        </div>

                        {/* Center: Image */}
                        <div className="relative">
                            <img
                                src="https://img.rocket.new/generatedImages/rocket_gen_img_1412db922-1772488337954.png"
                                alt="Spa therapist performing a relaxing aromatherapy treatment"
                                className="w-full h-80 object-cover rounded-sm shadow-spa" />

                        </div>

                        {/* Right: Feature list */}
                        <div className="flex flex-col gap-8">
                            {[
                                {
                                    icon: '🏥',
                                    title: 'Safety Standards',
                                    desc: 'We maintain the highest hygiene and safety protocols, ensuring a clean, safe, and comfortable environment for every client.'
                                },
                                {
                                    icon: '🌺',
                                    title: 'Lifestyle Program',
                                    desc: 'Our wellness programs are designed to complement your lifestyle, offering ongoing support for your health and beauty goals.'
                                },
                                {
                                    icon: '🎁',
                                    title: 'Gift Cards',
                                    desc: 'Share the gift of relaxation with our beautifully presented gift cards — perfect for any occasion or celebration.'
                                }].
                                map((feature) =>
                                    <div key={feature.title} className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-spa-blush rounded-full flex items-center justify-center text-xl">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h5 className="font-lustria text-base text-spa-text mb-2">{feature.title}</h5>
                                            <p className="text-spa-muted text-sm leading-relaxed">{feature.desc}</p>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </section>
        </>);

}