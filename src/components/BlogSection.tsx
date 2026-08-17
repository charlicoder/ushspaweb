'use client';

interface BlogPost {
    image: string;
    alt: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
}

const posts: BlogPost[] = [
    {
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_143835b43-1767951777624.png",
        alt: 'Skincare tips and natural beauty products for glowing skin',
        category: 'Skincare',
        title: '5 Essential Skincare Tips for Radiant, Glowing Skin',
        excerpt: 'Discover the secrets to achieving naturally radiant skin with our expert skincare tips, from daily routines to professional treatments that make a real difference...',
        author: 'Stacey Richardson',
        date: 'Nov 15, 2024'
    },
    {
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f57a010f-1778341951225.png",
        alt: 'Massage therapy benefits for stress relief and muscle recovery',
        category: 'Massage Therapy',
        title: 'The Healing Benefits of Regular Massage Therapy',
        excerpt: 'Regular massage therapy offers far more than just relaxation. Learn how consistent treatments can improve your overall health, reduce stress, and enhance your quality of life...',
        author: 'Jennifer Harper',
        date: 'Nov 08, 2024'
    },
    {
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_159444a96-1768552377135.png",
        alt: 'Aromatherapy essential oils and their therapeutic benefits',
        category: 'Aromatherapy',
        title: 'A Guide to Aromatherapy: Scents That Heal and Restore',
        excerpt: 'Explore the ancient art of aromatherapy and discover how essential oils can transform your wellness routine, from lavender for relaxation to eucalyptus for clarity...',
        author: 'Jane Smith',
        date: 'Oct 28, 2024'
    }];


export default function BlogSection() {
    return (
        <section id="blog" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <div className="section-title mb-14">
                    <span className="section-id text-spa-rose">Our Blog</span>
                    <h2 className="font-lustria text-4xl md:text-5xl text-spa-text mb-4">
                        Latest News &amp; Events
                    </h2>
                    <p className="text-spa-muted max-w-2xl mx-auto">
                        Stay up to date with the latest wellness trends, spa tips, and beauty insights from
                        our expert team at USH Spa.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post) =>
                        <div key={post.title} className="blog-post group cursor-pointer">
                            {/* Image */}
                            <div className="blog-post-img h-56 mb-5">
                                <img
                                    src={post.image}
                                    alt={post.alt}
                                    className="w-full h-full object-cover" />

                            </div>
                            {/* Content */}
                            <div>
                                <span className="inline-block text-spa-rose text-xs font-bold uppercase tracking-wider mb-2">
                                    {post.category}
                                </span>
                                <h5 className="font-lustria text-lg text-spa-text mb-3 group-hover:text-spa-rose transition-colors duration-300 leading-snug">
                                    {post.title}
                                </h5>
                                <p className="text-spa-muted text-sm leading-relaxed mb-3">
                                    {post.excerpt}
                                </p>
                                <p className="text-spa-muted text-xs">
                                    {post.author} &mdash; {post.date}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>);

}
