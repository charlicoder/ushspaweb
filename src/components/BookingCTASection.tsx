'use client';

export default function BookingCTASection() {
    const handleScroll = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="py-20 bg-spa-petal">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text */}
                    <div>
                        <h3 className="font-lustria text-3xl md:text-4xl text-spa-text mb-6 leading-tight">
                            Want to Make a Booking or Have a Question?
                        </h3>
                        <p className="text-spa-muted leading-relaxed mb-8">
                            Call us:{' '}
                            <a
                                href="tel:+15551234567"
                                className="text-spa-rose font-medium hover:text-spa-cherry transition-colors duration-300">

                                +1 (555) 123-4567
                            </a>{' '}
                            or fill out our online booking form and we will contact you within 24 hours.
                        </p>
                        <button
                            onClick={() => handleScroll('#booking')}
                            className="btn-spa btn-rose text-base px-8 py-4">

                            Make an Appointment
                        </button>
                    </div>

                    {/* Right: Image */}
                    <div className="relative">
                        <img
                            src="https://img.rocket.new/generatedImages/rocket_gen_img_19330abe5-1772905195171.png"
                            alt="Welcoming spa reception desk with fresh flowers and warm lighting"
                            className="w-full h-80 object-cover rounded-sm shadow-spa-lg" />

                    </div>
                </div>
            </div>
        </section>);

}
