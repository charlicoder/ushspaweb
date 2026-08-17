'use client';

import { useState } from 'react';

interface Testimonial {
    avatar: string;
    alt: string;
    name: string;
    role: string;
    text: string;
}

const testimonials: Testimonial[] = [
    {
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
        alt: 'Sarah M., satisfied USH Spa client and fashion designer',
        name: 'Sarah M.',
        role: 'Fashion Designer',
        text: 'USH Spa is absolutely incredible! The combination massage I received was the most relaxing experience of my life. The therapists are highly skilled and the ambiance is divine. I leave feeling completely renewed every single time.'
    },
    {
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
        alt: 'Elizabeth Ross, regular USH Spa client and wellness enthusiast',
        name: 'Elizabeth Ross',
        role: 'Wellness Enthusiast',
        text: 'I\'ve been coming to USH Spa for over two years and it never disappoints. The facial treatments have transformed my skin completely. The staff is professional, warm, and genuinely caring. Highly recommend the aromatherapy package!'
    },
    {
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&q=80',
        alt: 'Carmen Garcia, USH Spa client and graphic designer',
        name: 'Carmen Garcia',
        role: 'Graphic Designer',
        text: 'The hot stone massage at USH Spa is simply magical. I came in with terrible back pain and left feeling like a new person. The attention to detail and personalized care is what sets this spa apart from all others I\'ve visited.'
    },
    {
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80',
        alt: 'Priya Patel, USH Spa client and business manager',
        name: 'Priya Patel',
        role: 'Business Manager',
        text: 'As someone with a hectic schedule, USH Spa is my sanctuary. The booking process through their app is seamless, and the treatments are consistently exceptional. The deep tissue massage is my go-to for stress relief.'
    },
    {
        avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&q=80',
        alt: 'Kelly Walker, loyal USH Spa client and yoga instructor',
        name: 'Kelly Walker',
        role: 'Yoga Instructor',
        text: 'The body scrub and wrap treatment at USH Spa is phenomenal. My skin has never felt so soft and radiant. The therapists use the most luxurious products and the whole experience is pure bliss from start to finish.'
    },
    {
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80',
        alt: 'Linda Ferrell, USH Spa client and interior designer',
        name: 'Linda Ferrell',
        role: 'Interior Designer',
        text: 'I gifted my mother a USH Spa gift card and she absolutely loved it! The staff made her feel so special and pampered. The supreme skincare package gave her glowing results. We\'re both now regular clients!'
    }];


export default function TestimonialsSection() {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    const currentTestimonials = testimonials.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <section id="testimonials" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <div className="section-title mb-14">
                    <span className="section-id text-spa-rose">Testimonials</span>
                    <h2 className="font-lustria text-4xl md:text-5xl text-spa-text mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-spa-muted max-w-2xl mx-auto">
                        Don&apos;t just take our word for it. Here&apos;s what our valued clients have to say
                        about their USH Spa experience.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {currentTestimonials.map((testimonial, idx) =>
                        <div
                            key={idx}
                            className="bg-spa-cream p-6 rounded-sm shadow-spa hover:shadow-spa-md transition-shadow duration-300">

                            {/* Avatar + Author */}
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.alt}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-spa-rose" />

                                <div>
                                    <h6 className="font-lustria text-sm text-spa-text">{testimonial.name}</h6>
                                    <p className="text-spa-rose text-xs">{testimonial.role}</p>
                                </div>
                            </div>
                            {/* Stars */}
                            <div className="flex gap-1 mb-3">
                                {[1, 2, 3, 4, 5].map((star) =>
                                    <svg key={star} className="w-4 h-4 text-spa-rose" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                )}
                            </div>
                            {/* Text */}
                            <p className="text-spa-muted text-sm leading-relaxed italic">
                                &ldquo;{testimonial.text}&rdquo;
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3">
                    {Array.from({ length: totalPages }).map((_, idx) =>
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(idx)}
                            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${currentPage === idx ?
                                    'bg-spa-rose border-spa-rose' : 'bg-transparent border-spa-muted hover:border-spa-rose'}`
                            }
                            aria-label={`Go to testimonial page ${idx + 1}`} />

                    )}
                </div>
            </div>
        </section>);

}