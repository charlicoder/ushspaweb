'use client';

export default function OpenHoursSection() {
    const handleScroll = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hours" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Hours */}
                    <div>
                        <h5 className="font-lustria text-2xl text-spa-rose mb-4">Open Hours:</h5>
                        <p className="text-spa-muted leading-relaxed mb-8">
                            We welcome you to visit USH Spa during our operating hours. Walk-ins are welcome,
                            but we recommend booking in advance to secure your preferred time slot.
                        </p>

                        <ul className="flex flex-col gap-4 mb-8">
                            {[
                                { day: 'Mon – Fri', hours: '9:00 AM – 7:00 PM' },
                                { day: 'Saturday', hours: '9:00 AM – 6:00 PM' },
                                { day: 'Sunday', hours: '10:00 AM – 4:00 PM' }].
                                map((item) =>
                                    <li
                                        key={item.day}
                                        className="flex justify-between items-center py-3 border-b border-spa-petal">

                                        <span className="font-lustria text-spa-text">{item.day}</span>
                                        <span className="text-spa-rose font-medium">{item.hours}</span>
                                    </li>
                                )}
                        </ul>

                        <button
                            onClick={() => handleScroll('#booking')}
                            className="btn-spa btn-rose">

                            Book Now
                        </button>
                    </div>

                    {/* Right: Image */}
                    <div className="relative">
                        <img
                            src="https://img.rocket.new/generatedImages/rocket_gen_img_132edc4a8-1772445380897.png"
                            alt="Serene spa reception area with warm lighting and floral arrangements"
                            className="w-full h-[450px] object-cover rounded-sm shadow-spa-lg" />

                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-spa-petal rounded-full opacity-60" />
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-spa-rose rounded-full opacity-40" />
                    </div>
                </div>
            </div>
        </section>);

}
