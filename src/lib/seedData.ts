import { ServiceItem, ShowcaseEvent, DecorationPackage, GalleryImage, CustomerEnquiry, Testimonial } from '@/types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'mandap-decoration',
    title: 'Mandap Decoration',
    category: 'Mandap',
    shortDesc: 'Traditional and modern luxury mandap designs with exotic fresh flowers, velvet drapes, and royal chandelier lighting.',
    fullDesc: 'The wedding mandap is the sacred heart of your marriage ceremony. At Shivansh Decoration, we design bespoke traditional and contemporary mandaps tailored to your spiritual customs and royal aesthetic tastes. Featuring fresh exotic roses, marigolds, tuberoses, ornate brass kalash, carved wooden pillars, crystal hanging accents, and gentle ambient lighting for stunning photography.',
    startingPrice: 45000,
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Custom 4-pillar, 6-pillar, and circular dome mandap structures',
      'Fresh exotic floral cascades (Roses, Orchids, Rajnigandha, Jasmine)',
      'Royal Velvet & Gold Silk fabric drapery',
      'Ornate Havankund setup with brass diyas and traditional floor rangoli',
      'Photogenic warm-tone LED focus lighting & chandelier fixtures'
    ],
    packagesAvailable: ['Basic Mandap Setup', 'Premium Floral Mandap', 'Royal Maharaja Glass Mandap'],
    faqs: [
      {
        question: 'How much time is required to set up a wedding mandap?',
        answer: 'Our professional team typically requires 6 to 10 hours for a full luxury mandap installation. We ensure complete readiness 2 hours before the rituals begin.'
      },
      {
        question: 'Can we customize the floral colors according to the bride and groom attire?',
        answer: 'Absolutely! We offer complete color coordination to harmonize with your wedding outfits, theme, and venue ambience.'
      }
    ],
    isFeatured: true
  },
  {
    id: 'srv-2',
    slug: 'wedding-stage-decoration',
    title: 'Wedding Stage Decoration',
    category: 'Wedding',
    shortDesc: 'Grand stage backdrops, maharaja sofa seating, cascading floral walls, and dynamic spotlighting for memorable receptions.',
    fullDesc: 'Make your grand stage reception majestic with our grand royal backdrop architectures, velvet throne seating, layered floral arches, geometric gold frames, and multi-tier stage carpet layouts that elevate every photo and video frame.',
    startingPrice: 55000,
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      '3D luxury structural backdrops with LED video wall integration',
      'Carved Maharaja & Victorian couple seating with royal cushions',
      'High-density imported floral borders & hanging wisteria vines',
      'Stage carpet runners in red, ivory, or royal gold velvet',
      'Intelligent moving head spotlights and ambient beam washes'
    ],
    packagesAvailable: ['Classic Gold Stage', 'Royal Floral Symphony Stage', 'Modern Minimalist Glass Stage'],
    faqs: [
      {
        question: 'Do you provide stage lighting along with the backdrop?',
        answer: 'Yes, all our stage decoration services include stage wash lights, focus spotlights, and warm accent lighting.'
      }
    ],
    isFeatured: true
  },
  {
    id: 'srv-3',
    slug: 'reception-decoration',
    title: 'Reception Decoration',
    category: 'Wedding',
    shortDesc: 'Glamorous evening reception styling with starry fairy light ceilings, candlelit centerpieces, and grand entrance walkways.',
    fullDesc: 'An evening of celebration deserves breathtaking glamour. We transform banquet halls, lawns, and palace courtyards into magical fairy-tale reception settings complete with crystal chandeliers, candlelit tables, photo booths, and champagne bar setups.',
    startingPrice: 60000,
    heroImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Starlit LED tunnel pathways and fairy light canopies',
      'Crystal chandelier clusters and vintage lanterns',
      'Table runners, luxury linen, and tall floral centerpieces',
      'Personalized couple monogram neon boards and welcome signage'
    ],
    packagesAvailable: ['Twilight Glamour', 'Royal Banquet Elegance', 'Imperial Palace Reception'],
    faqs: [
      {
        question: 'Can you handle outdoor reception lawns?',
        answer: 'Yes! We specialize in both indoor banquet halls and large outdoor open-air garden venues.'
      }
    ],
    isFeatured: true
  },
  {
    id: 'srv-4',
    slug: 'birthday-decoration',
    title: 'Birthday Decoration',
    category: 'Birthday',
    shortDesc: 'Creative birthday themes, organic balloon arches, cartoon cutouts, neon backdrops, and dessert table styling.',
    fullDesc: 'From magical 1st birthday milestones to grand 50th jubilee celebrations, we craft customized theme decorations including Jungle Safari, Princess Castle, Superhero Adventure, Space Odyssey, and Chic Adult Rose-Gold Lounge themes.',
    startingPrice: 15000,
    heroImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Customized 3D theme backdrops with LED name marquee lights',
      'Organic pastel, chrome, and confetti balloon garlands',
      'Thematic dessert table pedestals and cake stands',
      'Selfie photo booths with customized fun props'
    ],
    packagesAvailable: ['Mini Joy Package', 'Deluxe Theme Party', 'Grand Carousel Experience'],
    faqs: [
      {
        question: 'Do you provide theme-based cartoon cutouts and lighting?',
        answer: 'Yes, we provide 3D life-sized character cutouts, illuminated marquee letters, and specialized party lighting.'
      }
    ],
    isFeatured: true
  },
  {
    id: 'srv-5',
    slug: 'engagement-decoration',
    title: 'Engagement Decoration',
    category: 'Engagement',
    shortDesc: 'Romantic ring ceremony themes with floral rings, infinity arches, monogram signage, and fairy light backdrops.',
    fullDesc: 'Celebrate the promise of forever with an enchanting engagement setup. We blend pastel florals, geometric gold arches, mirror floorings, and romantic candlelight to create an intimate yet grand setting for your ring exchange.',
    startingPrice: 35000,
    heroImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Giant floral ring and heart-shaped arches',
      'Mirror ramp walkway with ground fog / cold pyros compatibility',
      'Customized neon LED couple hashtags ("#DeepikaWedsRahul")',
      'Delicate eucalyptus, baby’s breath, and pastel carnation styling'
    ],
    packagesAvailable: ['Elegance Ring Package', 'Blush Romance Package', 'Imperial Crown Engagement'],
    faqs: [
      {
        question: 'Can we have customized couple hashtags in neon lights?',
        answer: 'Yes! We create custom laser-cut acrylic neon signs with your initials or hashtag.'
      }
    ],
    isFeatured: true
  },
  {
    id: 'srv-6',
    slug: 'floral-decoration',
    title: 'Floral Decoration',
    category: 'Wedding',
    shortDesc: 'Artisanal flower styling using fresh Dutch roses, orchids, lilies, carnations, and fragrant Indian marigolds.',
    fullDesc: 'Flowers bring life, aroma, and divine beauty to every event. Our floral decorators handcraft intricate flower canopies, floral carpets, suspended botanical ceilings, and fragrant marigold torans with precision and care.',
    startingPrice: 30000,
    heroImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      '100% Farm-fresh premium flowers procured on event day',
      'Custom color palettes matching your wedding stationery & outfits',
      'Intricate floral walls, rangolis, and waterfall chandeliers',
      'Long-lasting hydration treatment to keep blooms vibrant throughout'
    ],
    packagesAvailable: ['Traditional Marigold Delight', 'Exotic Orchid Bloom', 'Botanical Luxury Haven'],
    faqs: [
      {
        question: 'Are the flowers fresh on the day of the event?',
        answer: 'Yes, we source fresh blooms directly on the morning of the setup to ensure peak freshness and fragrance.'
      }
    ]
  },
  {
    id: 'srv-7',
    slug: 'balloon-decoration',
    title: 'Balloon Decoration',
    category: 'Birthday',
    shortDesc: 'Modern organic balloon art, metallic arches, pastel balloon walls, helium clusters, and mascot installations.',
    fullDesc: 'Elevate your party with breathtaking balloon sculptures! We use premium biodegradable latex and metallic foil balloons to build photogenic photo backdrops, balloon clouds, cascading staircases, and vibrant ceiling drops.',
    startingPrice: 12000,
    heroImage: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Organic balloon garlands in matte, pastel, and metallic chrome shades',
      'Balloon arch entrances and whimsical backdrop rings',
      'Helium table bouquets and confetti-filled clear jumbo balloons',
      'Integrated floral accents and LED strip accents'
    ],
    packagesAvailable: ['Festive Balloon Arch', 'Grand Organic Cloud', 'Luxe Chrome Experience'],
    faqs: [
      {
        question: 'How long do balloon installations stay inflated?',
        answer: 'Our air-filled balloon garlands stay fresh for up to 24-48 hours in indoor air-conditioned environments.'
      }
    ]
  },
  {
    id: 'srv-8',
    slug: 'haldi-decoration',
    title: 'Haldi Decoration',
    category: 'Haldi',
    shortDesc: 'Vibrant yellow & orange setups with traditional brass urli, marigold hangings, umbrella props, and colorful drapes.',
    fullDesc: 'Brighten up your pre-wedding Haldi ceremony with joyful vibrant shades of turmeric yellow, sunshine orange, and emerald green. Featuring floral jhoolas, giant brass urlis for the couple ritual, decorated traditional mud pots, and lively photo corners.',
    startingPrice: 25000,
    heroImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Traditional Brass Urli setup with floating flower petals',
      'Handcrafted Rajasthani umbrella photo booths and colorful pinwheels',
      'Marigold tassel curtains and floral swing (Jhoola) decoration',
      'Cushioned floor seating with vibrant ethnic gaddi and bolsters'
    ],
    packagesAvailable: ['Yellow Sunshine Haldi', 'Royal Brass Urli Haldi', 'Carnival Bohemian Haldi'],
    faqs: [
      {
        question: 'Do you provide the brass urli for the Haldi bath?',
        answer: 'Yes! We provide vintage hand-beaten brass urlis in various diameters with petal trays.'
      }
    ],
    isFeatured: true
  },
  {
    id: 'srv-9',
    slug: 'mehendi-decoration',
    title: 'Mehendi Decoration',
    category: 'Mehendi',
    shortDesc: 'Vibrant bohemian canopies, floral swings, dreamcatchers, moroccan lanterns, and colorful low seating setups.',
    fullDesc: 'Set the tone for singing, dancing, and henna rituals with our picturesque Mehendi setups. We combine colorful chiffon drapery, floral swings, macrame details, moroccan rugs, and quirky photo stations that your guests will adore.',
    startingPrice: 28000,
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Decorated wooden & floral swing for bride mehendi rituals',
      'Bespoke dreamcatcher, mirror work, and tassel installations',
      'Moroccan lantern alleys and colorful fairy light canopy',
      'Low diwan seating with printed ethnic cushion spreads'
    ],
    packagesAvailable: ['Boho Vibes Mehendi', 'Rajasthani Mela Mehendi', 'Luxe Floral Garden Mehendi'],
    faqs: [
      {
        question: 'Can we add outdoor games or a bangle bar setup?',
        answer: 'Yes, we can include interactive live bangle bars, mehendi favour corners, and photogenic rickshaw props.'
      }
    ],
    isFeatured: true
  },
  {
    id: 'srv-10',
    slug: 'entrance-decoration',
    title: 'Entrance Decoration',
    category: 'Wedding',
    shortDesc: 'Grand welcome arches, red carpet pathways, royal lanterns, floral tunnels, and customized couple signage.',
    fullDesc: 'The entrance creates the critical first impression for your guests. We craft magnificent entrance arches, mirror walkways, floral gates, warm torch lights, and personalized welcome easel frames that welcome your loved ones with majesty.',
    startingPrice: 25000,
    heroImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Multi-tiered floral gateway with brass bell hangings',
      'Illuminated pathway pillars with fresh flower bouquets',
      'Welcome board with acrylic mirror lettering and floral frame',
      'Red or ivory carpet runway with floor lanterns'
    ],
    packagesAvailable: ['Classic Welcome Gate', 'Royal Floral Tunnel', 'Grand Palace Gateways'],
    faqs: [
      {
        question: 'Do you create customized welcome boards?',
        answer: 'Yes! We create laser-engraved golden mirror boards or illuminated acrylic boards with your names.'
      }
    ]
  },
  {
    id: 'srv-11',
    slug: 'lighting-decoration',
    title: 'Lighting Decoration',
    category: 'Wedding',
    shortDesc: 'Architectural facade lighting, fairy light canopies, warm Edison bulbs, ambient LED washes, and crystal chandeliers.',
    fullDesc: 'Lighting defines the mood, richness, and photography quality of any evening celebration. Our master lighting technicians design fairy light tents, tree wrapping, ambient mood wash, sharp focus lights, and grand crystal chandeliers that create an awe-inspiring celestial environment.',
    startingPrice: 35000,
    heroImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Full venue fairy light sky canopy (10,000+ warm micro lights)',
      'RGB DMX controllable venue wash lights and tree illumination',
      'Edison vintage filament bulb hanging clusters',
      'Intelligent beam fixtures and hazers for grand entries'
    ],
    packagesAvailable: ['Golden Glow Lighting', 'Starlit Celestial Canopy', 'Architectural Grandeur'],
    faqs: [
      {
        question: 'Do you handle the generator power backup for lighting?',
        answer: 'We coordinate with silent generator power backups to ensure zero interruptions during your ceremonies.'
      }
    ]
  },
  {
    id: 'srv-12',
    slug: 'baby-shower-decoration',
    title: 'Baby Shower & Naming Ceremony',
    category: 'Baby Shower',
    shortDesc: 'Cute pastel themes, cradle floral styling, cloud backdrops, hot air balloon props, and gold lettering.',
    fullDesc: 'Welcome the new bundle of joy with love and elegance! We create heartwarming Baby Shower (Godh Bharai / Seemantham) and Naming Ceremony setups featuring floral cradles, pastel balloon arches, teddy bear props, and custom name reveals.',
    startingPrice: 20000,
    heroImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Floral adorned traditional silver / wooden baby cradle (Palna)',
      'Pastel blue, pink, or neutral ivory-gold theme backdrops',
      'Life-sized teddy bear props and cloud cutouts with twinkle lights',
      'Mom-to-be royal chair seating with floral canopy'
    ],
    packagesAvailable: ['Sweet Joy Setup', 'Pastel Wonderland', 'Royal Heritage Seemantham'],
    faqs: [
      {
        question: 'Can you decorate the traditional cradle at home?',
        answer: 'Yes, we provide both home setup and banquet hall decoration services for baby showers.'
      }
    ],
    isFeatured: true
  },
  {
    id: 'srv-13',
    slug: 'corporate-event-decoration',
    title: 'Corporate Events & Galas',
    category: 'Corporate',
    shortDesc: 'Sleek professional stage setups, LED walls, branding backdrops, award gala styling, and gala dinner centerpieces.',
    fullDesc: 'Elevate your brand presence with our corporate stage and conference styling. We deliver clean geometric backdrops, branded podiums, awards night glamour, and sleek networking lounge environments tailored to corporate identity.',
    startingPrice: 40000,
    heroImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Seamless brand-color backdrop with precision acrylic cut logos',
      'Audio-Visual LED wall framing and sleek speaker podiums',
      'Gala dinner VIP table setup with minimalist floral styling',
      'Step-and-repeat media press wall for guest red-carpet entries'
    ],
    packagesAvailable: ['Executive Summit Setup', 'Annual Awards Gala', 'VIP Product Launch Lounge'],
    faqs: [
      {
        question: 'Can you integrate our company brand guidelines and logo colors?',
        answer: 'Yes, our design team ensures exact brand pantone color matching and corporate precision.'
      }
    ]
  },
  {
    id: 'srv-14',
    slug: 'complete-venue-decoration',
    title: 'Complete Venue Decoration',
    category: 'Wedding',
    shortDesc: 'Full 360-degree turnkey event styling covering entrance, stage, mandap, dining, lawn illumination, and photo booths.',
    fullDesc: 'Our flagship turnkey service handles every square foot of your wedding or event venue. From the moment guests step onto the driveway to the sacred rituals at the mandap and dining experiences, we orchestrate a cohesive luxury visual theme.',
    startingPrice: 150000,
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Turnkey management: Entrance, Pathways, Stage, Mandap, VIP Lounges, and Dining',
      'Dedicated on-site production manager and 20+ craft technicians',
      'Over 500+ premium floral arrangements and custom furniture sets',
      'Comprehensive lighting mapping with backup electrical management'
    ],
    packagesAvailable: ['Heritage Royal Wedding', 'Imperial Palace Turnkey', 'Celebrity Grand Extravaganza'],
    faqs: [
      {
        question: 'Do you provide a 3D walkthrough or concept sketch prior to execution?',
        answer: 'Yes! For complete venue transformations, we provide 3D visual mockups and material swatches during planning.'
      }
    ],
    isFeatured: true
  }
];

export const INITIAL_PACKAGES: DecorationPackage[] = [
  {
    id: 'pkg-basic',
    name: 'Basic Package',
    tagline: 'Ideal for intimate home celebrations, small birthdays, and traditional poojas.',
    startingPrice: 25000,
    badge: 'Popular for Small Events',
    idealFor: '50 - 150 Guests',
    description: 'A charming, high-value decoration setup designed for intimate gatherings, birthday milestones, and pooja ceremonies.',
    inclusions: [
      'Custom 10x8 ft Backdrop Setup',
      'Organic Balloon Garland or Marigold Draping',
      'Warm LED Focus Spotlight (4 units)',
      'Thematic Couple / Birthday Seating',
      'Welcome Signage with Floral Accents',
      'Standard Cake / Ritual Table Decor',
      'Professional Setup & Dismantling Team'
    ]
  },
  {
    id: 'pkg-premium',
    name: 'Premium Package',
    tagline: 'Crafted for grand engagements, vibrant haldi-mehendi, and stylish weddings.',
    startingPrice: 85000,
    highlighted: true,
    badge: 'Most Chosen by Couples',
    idealFor: '150 - 400 Guests',
    description: 'Our most popular comprehensive package featuring lavish stage backdrops, fresh floral styling, and elegant entrance arches.',
    inclusions: [
      'Grand 24x12 ft 3D Stage / Mandap Structure',
      'Fresh Exotic Floral Arrangements (Roses, Carnations, Rajnigandha)',
      'Luxurious Couple Sofa / Maharaja Chairs with Royal Cushions',
      'Designer Welcome Arch with Mirror Monogram Signage',
      'Pathway Illumination with 12+ Decorative Lanterns & Pillars',
      'Fairy Light Canopy for Stage & Seating Zones',
      'Special Haldi / Mehendi Props or Ring Ceremony Arc',
      'Dedicated On-site Event Coordinator'
    ]
  },
  {
    id: 'pkg-royal',
    name: 'Royal Package',
    tagline: 'The ultimate luxury experience for palace weddings and multi-day celebrations.',
    startingPrice: 250000,
    badge: 'Luxury Signature Experience',
    idealFor: '400+ Guests & Large Lawns',
    description: 'An opulent, turnkey aesthetic masterpiece featuring 360-degree venue transformation, imported florals, and architectural lighting.',
    inclusions: [
      'Bespoke Royal Mandap with Glass / Carved Pillars & Floral Dome',
      'Palatial Stage Backdrop with Crystal Chandeliers & LED Ambience',
      'Imported Fresh Dutch Florals (Orchids, Lilies, Hydrangeas, Roses)',
      'Grand Royal Tunnel Entrance with Carpet Runway & Cold Pyros Setup',
      'Complete Venue Fairy Light Sky Ceiling & Tree Illumination',
      'VIP Lounge Styling with Plush Velvet Furniture & Floral Centerpieces',
      'Custom Neon Hashtag Signage & Interactive 360 Photo Booth Backdrop',
      'Senior Creative Director & 15+ Round-the-clock Decor Crew'
    ]
  }
];

export const INITIAL_EVENTS: ShowcaseEvent[] = [
  {
    id: 'evt-1',
    slug: 'royal-palace-wedding',
    title: 'The Royal Heritage Wedding of Aditi & Vikram',
    eventType: 'Wedding',
    location: 'Taj Jai Mahal Palace, Jaipur',
    date: 'February 2026',
    guestCount: 650,
    shortDesc: 'A majestic crimson and champagne gold palace wedding featuring a 10,000-bloom fresh rose mandap.',
    fullDesc: 'For Aditi & Vikram’s destination wedding, Shivansh Decoration transformed the royal courtyards with handcrafted brass kalash pillars, cascading red Dutch roses, velvet drape canopies, and fairy-lit tree avenues that captured the royal Rajputana essence.',
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80'
    ],
    servicesIncluded: ['Mandap Decoration', 'Wedding Stage', 'Entrance Gateway', 'Full Lighting'],
    packageUsed: 'Royal Package',
    clientReview: {
      author: 'Aditi & Vikram Singhania',
      rating: 5,
      comment: 'Shivansh Decoration made our dream wedding look like a royal movie set! Every guest was mesmerized by the fresh flowers and the majestic mandap. Truly unmatched quality.'
    },
    isFeatured: true
  },
  {
    id: 'evt-2',
    slug: 'luxury-glass-mandap',
    title: 'Modern Glass Mandap on Water Pavilion',
    eventType: 'Mandap',
    location: 'Udaivilas Resort, Udaipur',
    date: 'January 2026',
    guestCount: 400,
    shortDesc: 'An ethereal floating glass mandap surrounded by floating lotus petals and crystal hangings.',
    fullDesc: 'Set across the tranquil water reflection pool, this mandap featured clear acrylic pillars wrapped in baby’s breath and white lilies, with glowing underwater LED reflections that made the ceremony look divine.',
    heroImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    ],
    servicesIncluded: ['Mandap Decoration', 'Water Pavilion Styling', 'Ambient Spotlighting'],
    packageUsed: 'Royal Package',
    clientReview: {
      author: 'Rohan & Sneha Kapoor',
      rating: 5,
      comment: 'The glass reflection on the water was breathtaking. The team executed the complex structure flawlessly on time.'
    },
    isFeatured: true
  },
  {
    id: 'evt-3',
    slug: 'pastel-floral-engagement',
    title: 'Blush & Gold Garden Engagement',
    eventType: 'Engagement',
    location: 'The Oberoi Lawn, New Delhi',
    date: 'December 2025',
    guestCount: 250,
    shortDesc: 'A dreamy evening ring ceremony surrounded by pastel hydrangeas and a giant floral infinity arch.',
    fullDesc: 'A romantic pastel haven featuring soft blush roses, eucalyptus foliage, delicate crystal chandeliers, and custom neon hashtag photo booths that provided the perfect romantic backdrop.',
    heroImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80'
    ],
    servicesIncluded: ['Engagement Stage', 'Floral Arches', 'Fairy Light Pathways'],
    packageUsed: 'Premium Package',
    clientReview: {
      author: 'Pooja & Karan Mehra',
      rating: 5,
      comment: 'The pastel floral ring setup was straight out of Pinterest! The team was polite, responsive, and very creative.'
    },
    isFeatured: true
  },
  {
    id: 'evt-4',
    slug: 'vibrant-haldi-mela',
    title: 'Sunflower & Brass Urli Haldi Carnival',
    eventType: 'Haldi',
    location: 'Radisson Blu Resort, Alibaug',
    date: 'November 2025',
    guestCount: 200,
    shortDesc: 'A sun-drenched pool party Haldi with marigold tassels, brass bath urlis, and Rajasthani umbrellas.',
    fullDesc: 'Filled with high-energy colors, this Haldi event included a floating pool flower installation, vibrant floor diwans, sunflower backdrops, and interactive smoke flare photo zones.',
    heroImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80'
    ],
    servicesIncluded: ['Haldi Decoration', 'Floral Jhoola', 'Brass Urli Setup'],
    packageUsed: 'Premium Package',
    clientReview: {
      author: 'Ananya Sharma',
      rating: 5,
      comment: 'Super colorful and vibrant! Our family photos from the Haldi ceremony look absolutely incredible.'
    },
    isFeatured: true
  },
  {
    id: 'evt-5',
    slug: 'royal-1st-birthday',
    title: 'Prince Aaryan’s 1st Royal Carousel Birthday',
    eventType: 'Birthday',
    location: 'Hyatt Regency Banquet, Mumbai',
    date: 'October 2025',
    guestCount: 180,
    shortDesc: 'A grand pastel blue and gold carousel theme party with 3D castle cutouts and balloon clouds.',
    fullDesc: 'Designed to feel like a royal fairytale, this birthday featured an illuminated 12-ft castle facade, rotating carousel photo booth, chrome balloon clouds, and customized chocolate cart displays.',
    heroImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80'
    ],
    servicesIncluded: ['Birthday Decoration', 'Balloon Art', 'Thematic Lighting'],
    packageUsed: 'Premium Package',
    clientReview: {
      author: 'Dr. Nikhil & Neha Verma',
      rating: 5,
      comment: 'The carousel setup exceeded all our expectations! The kids and adults were both completely thrilled.'
    },
    isFeatured: true
  },
  {
    id: 'evt-6',
    slug: 'divine-baby-shower',
    title: 'Lotus & Gold Traditional Seemantham',
    eventType: 'Baby Shower',
    location: 'JW Marriott, Bengaluru',
    date: 'September 2025',
    guestCount: 120,
    shortDesc: 'An elegant golden lotus cradle ceremony with fresh jasmine garlands and brass bell chimes.',
    fullDesc: 'A divine celebration welcoming new life, with an intricately carved gold cradle wrapped in fresh tuberose, lotus bud centerpieces, and traditional temple floral archways.',
    heroImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80'
    ],
    servicesIncluded: ['Baby Shower Setup', 'Floral Cradle', 'Temple Backdrop'],
    packageUsed: 'Basic Package',
    clientReview: {
      author: 'Divya & Karthik Rao',
      rating: 5,
      comment: 'Traditional, sacred, and stunning. Shivansh Decoration respected all our cultural requests with great care.'
    },
    isFeatured: true
  }
];

export const INITIAL_GALLERY: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Royal Mandap with Cascading Red Roses',
    category: 'Mandap',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    location: 'Jaipur Palace',
    description: '10,000 fresh red Dutch roses crafted into a sacred royal mandap.',
    aspectRatio: 'landscape',
    isFeatured: true
  },
  {
    id: 'gal-v1',
    title: 'Grand Royal Palace Wedding Cinematic Walkthrough',
    category: 'Wedding',
    mediaType: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    youtubeId: 'ScMzIvxBSi4',
    duration: '02:45',
    location: 'Taj Jai Mahal Palace, Jaipur',
    description: 'Full 360-degree night walkthrough of our royal wedding decor and starlit pathway.',
    aspectRatio: 'landscape',
    isFeatured: true
  },
  {
    id: 'gal-2',
    title: 'Grand Palace Reception Stage',
    category: 'Wedding',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    location: 'Udaipur Grand Lawn',
    description: '3D Gold frame backdrop with crystal chandelier clusters.',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-v2',
    title: 'Waterfront Floating Glass Mandap Video Reel',
    category: 'Mandap',
    mediaType: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    youtubeId: 'kJQP7kiw5Fk',
    duration: '01:30',
    location: 'Udaivilas Resort, Udaipur',
    description: 'Ethereal floating glass mandap illuminated with crystal reflections.',
    aspectRatio: 'landscape',
    isFeatured: true
  },
  {
    id: 'gal-3',
    title: 'Fairy Light Starlit Ceiling Canopy',
    category: 'Wedding',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    location: 'New Delhi Farmhouse',
    description: 'Over 15,000 warm fairy lights creating an indoor galaxy effect.',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-v3',
    title: 'Vibrant Sunflower Haldi & Floral Jhoola Reel',
    category: 'Haldi',
    mediaType: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    youtubeId: '3JZ_D3ELwOQ',
    duration: '01:15',
    location: 'Alibaug Beach Resort',
    description: 'Joyful Haldi ceremony setup with authentic brass urli and marigold cascades.',
    aspectRatio: 'landscape',
    isFeatured: true
  },
  {
    id: 'gal-4',
    title: 'Vibrant Sunflower Haldi Urli Setup',
    category: 'Haldi',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80',
    location: 'Alibaug Beach Resort',
    description: 'Traditional hand-beaten brass urli surrounded by marigold blooms.',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-5',
    title: 'Pastel Floral Engagement Ring Arch',
    category: 'Engagement',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    location: 'The Leela, Mumbai',
    description: 'Circular infinity floral ring with pastel hydrangeas and roses.',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-6',
    title: 'Royal 1st Birthday Carousel Castle',
    category: 'Birthday',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    location: 'Hyatt Regency, Pune',
    description: 'Illuminated 3D castle facade with pastel balloon garlands.',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-7',
    title: 'Bohemian Floral Swing Mehendi',
    category: 'Mehendi',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
    location: 'Goa Heritage Villa',
    description: 'Intricately draped wooden jhoola with fresh marigolds and dreamcatchers.',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-8',
    title: 'Traditional Temple Lotus Baby Shower',
    category: 'Baby Shower',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    location: 'Bengaluru Banquet',
    description: 'Golden lotus cradle with fresh fragrant jasmine strings.',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-9',
    title: 'Waterfront Glass Mandap',
    category: 'Mandap',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80',
    location: 'Udaipur Lakeside',
    description: 'Reflective crystal glass pillars on open water pavilion.',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-10',
    title: 'Grand Entrance Royal Floral Gateway',
    category: 'Wedding',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    location: 'Kolkata Royal Club',
    description: 'Multi-tier floral gateway with brass lanterns and red carpet.',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-11',
    title: 'Luxe Corporate Annual Gala Stage',
    category: 'Corporate',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    location: 'Grand Hyatt, Mumbai',
    description: 'Geometric LED backdrop with branded awards stage setup.',
    aspectRatio: 'landscape'
  },
  {
    id: 'gal-12',
    title: 'Romantic Candlelit Dinner Tables',
    category: 'Wedding',
    mediaType: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    location: 'ITC Grand Bharat, Gurugram',
    description: 'Tall candelabras with ivory silk table runners and orchid centerpieces.',
    aspectRatio: 'landscape'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'tst-1',
    name: 'Rajesh & Sunita Singhal',
    eventType: 'Daughter’s Grand Wedding',
    location: 'Jaipur',
    rating: 5,
    comment: 'Shivansh Decoration exceeded all our expectations! From our initial phone call to the late-night wedding bidaai, their execution was flawless. The mandap was the talk of all our 800 guests. Thank you for making our daughter’s big day unforgettable!',
    date: 'January 2026',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'tst-2',
    name: 'Ankit & Ritu Aggarwal',
    eventType: 'Royal Reception & Sangeet',
    location: 'New Delhi',
    rating: 5,
    comment: 'Extremely professional team! The lighting and stage backdrop were world-class. They finished setup 3 hours before time, giving us full peace of mind. We wholeheartedly recommend Shivansh Decoration!',
    date: 'December 2025',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'tst-3',
    name: 'Meghna & Dhruv Shah',
    eventType: 'Haldi & Mehendi Fiesta',
    location: 'Ahmedabad',
    rating: 5,
    comment: 'The floral swing and the brass urli Haldi decoration were straight out of a dream! The colors were so vibrant, our wedding photos look like a magazine spread. Truly 10/10 service.',
    date: 'November 2025',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'tst-4',
    name: 'Vikram Joshi (VP Operations)',
    eventType: 'Corporate Annual Gala & Awards',
    location: 'Mumbai',
    rating: 5,
    comment: 'We hired Shivansh Decoration for our corporate summit of 500 delegates. The precision in brand colors, clean geometric stage lines, and punctual execution were top-notch.',
    date: 'October 2025',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_ENQUIRIES: CustomerEnquiry[] = [
  {
    id: 'enq-101',
    fullName: 'Shubham Deshmukh',
    mobile: '+91 98230 45678',
    email: 'shubham.d@gmail.com',
    eventType: 'Wedding / Marriage',
    eventDate: '2026-11-20',
    eventLocation: 'Pune Marriott Lawn',
    guestCount: 500,
    approxBudget: '₹2,00,000 - ₹3,50,000',
    decorationPreference: 'Royal Maharaja Mandap & Starlit Reception',
    message: 'Looking for a turnkey mandap and reception stage setup with fresh red and white flowers.',
    status: 'New',
    createdAt: '2026-09-01T10:30:00Z'
  },
  {
    id: 'enq-102',
    fullName: 'Priyanka Sen',
    mobile: '+91 97110 88990',
    email: 'priyanka.sen@outlook.com',
    eventType: 'Engagement',
    eventDate: '2026-10-15',
    eventLocation: 'South Delhi Banquet',
    guestCount: 200,
    approxBudget: '₹80,000 - ₹1,20,000',
    decorationPreference: 'Pastel Floral Ring & Monogram Neon',
    message: 'Need a romantic blush pink ring ceremony stage with couple seating and entrance arch.',
    status: 'Contacted',
    notes: 'Sent PDF package catalog on WhatsApp. Client interested in Premium Package.',
    createdAt: '2026-08-30T14:15:00Z'
  },
  {
    id: 'enq-103',
    fullName: 'Aakash Verma',
    mobile: '+91 99887 12345',
    email: 'aakash.v@gmail.com',
    eventType: 'Haldi',
    eventDate: '2026-10-28',
    eventLocation: 'Lonavala Villa',
    guestCount: 120,
    approxBudget: '₹50,000 - ₹75,000',
    decorationPreference: 'Yellow Marigold & Brass Urli Bath Setup',
    message: 'Poolside haldi setup needed with marigold tassels and low diwan seating.',
    status: 'Confirmed',
    notes: 'Advance token received. Team scheduled for 10am setup on Oct 28.',
    createdAt: '2026-08-28T09:00:00Z'
  }
];
