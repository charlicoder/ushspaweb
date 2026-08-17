'use client';

import { useState } from 'react';

export default function BookingSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section id="booking" className="py-24 bg-spa-petal">
            {/* Also serves as contact section */}
            <div id="contact" className="max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Info */}
                    <div>
                        <span className="section-id text-spa-rose">Book Now</span>
                        <h2 className="font-lustria text-4xl md:text-5xl text-spa-text mb-6 leading-tight">
                            Schedule Your Visit
                        </h2>
                        <p className="text-spa-muted leading-relaxed mb-8">
                            Ready to experience the ultimate in relaxation and beauty? Book your appointment
                            online or download our mobile app for the most convenient booking experience.
                        </p>

                        {/* App Download CTA */}
                        <div className="bg-white p-6 rounded-sm shadow-spa mb-8">
                            <h5 className="font-lustria text-lg text-spa-text mb-3">📱 Book via Our Mobile App</h5>
                            <p className="text-spa-muted text-sm leading-relaxed mb-4">
                                Download the USH Spa app for instant booking, exclusive offers, and personalized
                                wellness recommendations at your fingertips.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href="#"
                                    className="flex items-center gap-2 bg-spa-text text-white px-4 py-2.5 rounded-sm hover:bg-spa-cherry transition-colors duration-300 text-sm font-medium"
                                >
                                    <span className="text-lg">🍎</span>
                                    App Store
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center gap-2 bg-spa-text text-white px-4 py-2.5 rounded-sm hover:bg-spa-cherry transition-colors duration-300 text-sm font-medium"
                                >
                                    <span className="text-lg">🌐</span>
                                    Google Play
                                </a>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-spa-muted">
                                <span className="text-spa-rose text-lg">📞</span>
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3 text-spa-muted">
                                <span className="text-spa-rose text-lg">✉️</span>
                                <span>hello@ushspa.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-spa-muted">
                                <span className="text-spa-rose text-lg">📍</span>
                                <span>123 Wellness Boulevard, Suite 100, Beverly Hills, CA 90210</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white p-8 rounded-sm shadow-spa">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="text-5xl mb-4">🌸</div>
                                <h4 className="font-lustria text-2xl text-spa-text mb-3">Booking Received!</h4>
                                <p className="text-spa-muted">
                                    Thank you for booking with USH Spa. We&apos;ll confirm your appointment within 24 hours.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="btn-spa btn-rose mt-6"
                                >
                                    Book Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <h4 className="font-lustria text-xl text-spa-text mb-2">Appointment Request</h4>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-spa-muted text-sm mb-1.5">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your full name"
                                            className="w-full h-12 px-4 border border-spa-petal rounded-sm text-spa-text text-sm focus:outline-none focus:border-spa-rose transition-colors duration-300 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-spa-muted text-sm mb-1.5">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="your@email.com"
                                            className="w-full h-12 px-4 border border-spa-petal rounded-sm text-spa-text text-sm focus:outline-none focus:border-spa-rose transition-colors duration-300 bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-spa-muted text-sm mb-1.5">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full h-12 px-4 border border-spa-petal rounded-sm text-spa-text text-sm focus:outline-none focus:border-spa-rose transition-colors duration-300 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-spa-muted text-sm mb-1.5">Service *</label>
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-12 px-4 border border-spa-petal rounded-sm text-spa-text text-sm focus:outline-none focus:border-spa-rose transition-colors duration-300 bg-white"
                                        >
                                            <option value="">Select a service</option>
                                            <option value="swedish">Swedish Massage</option>
                                            <option value="deep-tissue">Deep Tissue Massage</option>
                                            <option value="hot-stone">Hot Stone Massage</option>
                                            <option value="combination">Combination Massage</option>
                                            <option value="facial">Facial Treatment</option>
                                            <option value="aromatherapy">Aromatherapy</option>
                                            <option value="body-wrap">Body Wrap</option>
                                            <option value="package">Spa Package</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-spa-muted text-sm mb-1.5">Preferred Date *</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            className="w-full h-12 px-4 border border-spa-petal rounded-sm text-spa-text text-sm focus:outline-none focus:border-spa-rose transition-colors duration-300 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-spa-muted text-sm mb-1.5">Preferred Time</label>
                                        <select
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            className="w-full h-12 px-4 border border-spa-petal rounded-sm text-spa-text text-sm focus:outline-none focus:border-spa-rose transition-colors duration-300 bg-white"
                                        >
                                            <option value="">Select time</option>
                                            <option value="9:00">9:00 AM</option>
                                            <option value="10:00">10:00 AM</option>
                                            <option value="11:00">11:00 AM</option>
                                            <option value="12:00">12:00 PM</option>
                                            <option value="13:00">1:00 PM</option>
                                            <option value="14:00">2:00 PM</option>
                                            <option value="15:00">3:00 PM</option>
                                            <option value="16:00">4:00 PM</option>
                                            <option value="17:00">5:00 PM</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-spa-muted text-sm mb-1.5">Special Requests</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Any special requests or health considerations..."
                                        className="w-full px-4 py-3 border border-spa-petal rounded-sm text-spa-text text-sm focus:outline-none focus:border-spa-rose transition-colors duration-300 bg-white resize-none"
                                    />
                                </div>

                                <button type="submit" className="btn-spa btn-rose w-full text-base py-4 mt-2">
                                    Request Appointment
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

