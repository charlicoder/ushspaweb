'use client';

interface TeamMember {
    image: string;
    alt: string;
    name: string;
    role: string;
    bio: string;
}

const team: TeamMember[] = [
    {
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
        alt: 'Stacey Richardson, certified beauty expert and spa therapist at USH Spa',
        name: 'Stacey Richardson',
        role: 'Beauty Expert',
        bio: 'Certified beauty therapist with 8 years of experience in advanced skincare and facial treatments.'
    },
    {
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80',
        alt: 'Jennifer Harper, SPA master and wellness specialist at USH Spa',
        name: 'Jennifer Harper',
        role: 'SPA Master',
        bio: 'Internationally trained spa master specializing in holistic wellness and therapeutic massage.'
    },
    {
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
        alt: 'Michael Torres, licensed beautician and skincare specialist at USH Spa',
        name: 'Michael Torres',
        role: 'Beautician',
        bio: 'Licensed beautician with expertise in body treatments, wraps, and aromatherapy techniques.'
    },
    {
        image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&q=80',
        alt: 'Jane Smith, certified beauty therapist and massage specialist at USH Spa',
        name: 'Jane Smith',
        role: 'Beauty Therapist',
        bio: 'Passionate beauty therapist dedicated to creating personalized wellness experiences for every client.'
    }];


export default function TeamSection() {
    return (
        <section id="team" className="py-24 bg-spa-cream">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Title */}
                <div className="section-title mb-14">
                    <span className="section-id text-spa-rose">Our Team</span>
                    <h2 className="font-lustria text-4xl md:text-5xl text-spa-text mb-4">
                        Relax, You&apos;re In Good Hands
                    </h2>
                    <p className="text-spa-muted max-w-2xl mx-auto">
                        Our team of certified therapists and beauty experts are dedicated to providing you with
                        the most exceptional spa experience possible.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {team.map((member) =>
                        <div key={member.name} className="team-member bg-white">
                            {/* Photo */}
                            <div className="relative overflow-hidden h-72">
                                <img
                                    src={member.image}
                                    alt={member.alt}
                                    className="w-full h-full object-cover" />

                                {/* Social Links */}
                                <div className="tm-social">
                                    <div className="flex justify-center gap-2">
                                        {['f', 't', 'in'].map((social) =>
                                            <a
                                                key={social}
                                                href="#"
                                                className="w-9 h-9 bg-black/40 text-white rounded-full flex items-center justify-center text-sm hover:bg-spa-rose transition-colors duration-300"
                                                aria-label={`${member.name} social link`}>

                                                {social === 'f' ? 'f' : social === 't' ? 't' : 'in'}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Info */}
                            <div className="p-5 text-center border-t border-spa-petal">
                                <h6 className="font-lustria text-base text-spa-text mb-1">{member.name}</h6>
                                <span className="text-spa-rose text-sm">{member.role}</span>
                                <p className="text-spa-muted text-xs mt-2 leading-relaxed">{member.bio}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>);

}