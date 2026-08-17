'use client';

import { useState } from 'react';

interface GalleryItem {
    src: string;
    alt: string;
    title: string;
    category: string;
}

const galleryItems: GalleryItem[] = [
    {
        src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
        alt: 'Client receiving a relaxing full-body massage at USH Spa',
        title: 'Relaxing Massage',
        category: 'SPA & Wellness'
    },
    {
        src: "https://img.rocket.new/generatedImages/rocket_gen_img_1412db922-1772488337954.png",
        alt: 'Aromatherapy treatment with essential oils and candles',
        title: 'Aromatherapy',
        category: 'Aroma & Skin Care'
    },
    {
        src: "https://img.rocket.new/generatedImages/rocket_gen_img_1659097b4-1767312782153.png",
        alt: 'Deep tissue massage therapy session',
        title: 'Deep Tissue Massage',
        category: 'SPA & Massage Therapy'
    },
    {
        src: "https://img.rocket.new/generatedImages/rocket_gen_img_1a861e5eb-1764905106158.png",
        alt: 'Facial treatment with natural skincare products',
        title: 'Supreme Skincare',
        category: 'Aroma & Skin Care'
    },
    {
        src: "https://img.rocket.new/generatedImages/rocket_gen_img_19ab11eae-1785421948742.png",
        alt: 'Hot stone massage therapy with volcanic stones',
        title: 'Hot Stones Therapy',
        category: 'SPA & Massage Therapy'
    },
    {
        src: "https://img.rocket.new/generatedImages/rocket_gen_img_10e65110a-1768849367647.png",
        alt: 'Thai massage stretching and pressure point therapy',
        title: 'Thai Massage',
        category: 'Herbs & Skin Care'
    },
    {
        src: "https://images.unsplash.com/photo-1672883562106-5e6aea8ebc3b",
        alt: 'Body scrub treatment with sea salt and essential oils',
        title: 'Scrub Treatment',
        category: 'Aroma & Massage Therapy'
    },
    {
        src: "https://img.rocket.new/generatedImages/rocket_gen_img_1b73f4754-1772703715205.png",
        alt: 'Luxury spa suite with rose petals and candles',
        title: 'Luxury Suite',
        category: 'SPA & Wellness'
    }];


const categories = ['All', 'SPA & Wellness', 'Aroma & Skin Care', 'SPA & Massage Therapy', 'Herbs & Skin Care', 'Aroma & Massage Therapy'];

export default function GallerySection() {
    const [activeFilter, setActiveFilter] = useState('All');

    const filtered = activeFilter === 'All' ?
        galleryItems :
        galleryItems.filter((item) => item.category === activeFilter);

    return (
        <section id="gallery" className="py-24 bg-spa-cream">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <div className="section-title mb-12">
                    <span className="section-id text-spa-rose">Our Gallery</span>
                    <h2 className="font-lustria text-4xl md:text-5xl text-spa-text mb-4">
                        Beautiful Skin Starts Here
                    </h2>
                    <p className="text-spa-muted max-w-2xl mx-auto">
                        Explore our gallery of transformative spa experiences and discover the art of natural
                        beauty at USH Spa.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((cat) =>
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`font-lustria text-base px-4 py-2 border-b-2 transition-all duration-300 bg-transparent ${activeFilter === cat ?
                                    'text-spa-rose border-spa-rose' : 'text-spa-muted border-transparent hover:text-spa-text hover:border-spa-muted'}`
                            }>

                            {cat}
                        </button>
                    )}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map((item, idx) =>
                        <div key={idx} className="gallery-item h-56 cursor-pointer">
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover" />

                            <div className="item-overlay" />
                            <div className="image-description">
                                <div className="image-data">
                                    <h6 className="font-lustria text-white text-sm font-bold">{item.title}</h6>
                                    <p className="text-white/80 text-xs">{item.category}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>);

}