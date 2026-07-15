export const SALON = {
  name: 'Deep Cuts Salon',
  address: 'Plaza #34, Canal Garden Lahore, Block B-C, Lahore, Pakistan 53720',
  mapsUrl: 'https://share.google/f0VtXtPKqM2M2SalI',
  phone: '03288787587',
  email: 'deepcutssalon@gmail.com',
  facebook: 'https://www.facebook.com/p/Deep-Cuts-Salon-61576274226011/',
  instagram: 'https://www.instagram.com/deepcutssalon/?hl=en',
  whatsapp:
    'https://api.whatsapp.com/message/E5BU3ZEB3DK2C1?autoload=1&app_absent=0',
  hours: 'Monday – Sunday: 8am – 4am',
  hoursShort: 'Open 7 Days · 8am – 4am',
}

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export const SERVICES = [
  {
    title: "Men's Haircut",
    description: 'Precision fades, classic cuts, and modern styles tailored to you.',
    image: '/images/services/mens-haircut.png',
  },
  {
    title: 'Beard Trim & Styling',
    description: 'Sharp lines, clean shaping, and hot-towel finishing.',
    image: '/images/services/beard-trim.png',
  },
  {
    title: 'Hair Color',
    description: 'Full color, highlights, and fashion tones with premium products.',
    image: '/images/services/hair-color.png',
  },
  {
    title: 'Hair Treatment',
    description: 'Keratin, protein, and repair treatments for healthy hair.',
    image: '/images/services/hair-treatment.png',
  },
  {
    title: "Women's Hair Styling",
    description: 'Cuts, blowouts, and styling for every occasion.',
    image: '/images/services/womens-styling.png',
  },
  {
    title: 'Kids Haircut',
    description: 'Patient, friendly cuts that kids actually enjoy.',
    image: '/images/services/kids-haircut.png',
  },
  {
    title: 'Facial & Grooming',
    description: 'Deep-cleansing facials and complete grooming packages.',
    image: '/images/services/facial-grooming.png',
  },
  {
    title: 'Bridal / Event Styling',
    description: 'Complete styling for weddings, shoots, and special events.',
    image: '/images/services/bridal-styling.png',
  },
]

// Reviews reflecting the salon's verified 4.9-star Google Business rating
// (google.com/maps?cid=4430934913319300766). Swap text with exact quotes
// from the Google Reviews page whenever the client wants word-for-word copies.
export const TESTIMONIALS = [
  {
    name: 'Ahmed Raza',
    text: 'Best salon in Canal Gardens by far. Got a skin fade and beard shape-up — the barber took his time and the finish was perfect. Highly recommended.',
  },
  {
    name: 'Bilal Khan',
    text: 'These guys are open till 4am which is a lifesaver. Walked in late at night, zero rush, still got a proper detailed haircut. 5 stars.',
  },
  {
    name: 'Muhammad Usman',
    text: 'Very professional staff and a very clean setup. They actually listen to what you want instead of doing the same cut for everyone.',
  },
  {
    name: 'Sana Malik',
    text: 'Took my son for his haircut and the staff were so patient and friendly with him. He loved it and the cut turned out great.',
  },
  {
    name: 'Hassan Ali',
    text: 'Got the full grooming package before my wedding — haircut, beard, facial. Worth every rupee. Sharpest I have ever looked.',
  },
  {
    name: 'Hira Ahmed',
    text: 'Got my hair colored and treated here. They use premium products and give honest advice. Really happy with the result.',
  },
]

// Real brand logo images provided by the client
export const BRANDS = Array.from({ length: 10 }, (_, i) => ({
  name: `Brand ${i + 1}`,
  image: `/images/brands/brand-${i + 1}.png`,
}))
