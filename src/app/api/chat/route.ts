import { NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(request: Request) {
  try {
    const { messages, userProfile } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ success: false, error: 'Messages required' }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';

    // Smart conversational recommendation logic
    let replyText = '';
    let quickReplies: string[] = [];
    let showQuoteCTA = false;
    let showWhatsAppCTA = true;

    if (
      lastUserMessage.includes('hello') ||
      lastUserMessage.includes('hi') ||
      lastUserMessage.includes('hey') ||
      lastUserMessage.includes('namaste')
    ) {
      replyText = `Namaste! 🙏 Welcome to **Shivansh Decoration** – *"We Make Your Moments Beautiful."*\n\nI am your AI Event Decor Assistant. How can I help you make your upcoming celebration unforgettable?\n\nTo get personalized decoration ideas & package recommendations, what type of event are you planning?`;
      quickReplies = ['Wedding / Mandap', 'Engagement / Ring Ceremony', 'Haldi & Mehendi', 'Birthday Celebration', 'Baby Shower', 'Corporate Event'];
    } else if (
      lastUserMessage.includes('wedding') ||
      lastUserMessage.includes('marriage') ||
      lastUserMessage.includes('shaadi') ||
      lastUserMessage.includes('mandap')
    ) {
      replyText = `✨ **Congratulations on the upcoming wedding!**\n\nFor luxury Indian weddings and sacred mandaps, we specialize in:\n• **Royal Maharaja & Floating Glass Mandaps** with fresh exotic flowers\n• **Grand Stage & Reception Backdrops** with crystal chandeliers\n• **Starlit Fairy Light Canopies & Royal Entrance Gateways**\n\nCould you share your approximate **guest count** and **event location** so I can recommend the perfect package (Basic, Premium, or Royal)?`;
      quickReplies = ['100 - 250 Guests (₹50k - ₹1L)', '250 - 500 Guests (₹85k - ₹2L)', '500+ Guests (Royal Grand Setup ₹2.5L+)', 'View Mandap Gallery'];
      showQuoteCTA = true;
    } else if (
      lastUserMessage.includes('haldi') ||
      lastUserMessage.includes('mehendi') ||
      lastUserMessage.includes('sangeet')
    ) {
      replyText = `🌼 **Vibrant Haldi & Mehendi Celebrations!**\n\nOur top trending setups include:\n• **Traditional Brass Urli Bath** with floating marigold petals & Rajasthani umbrellas\n• **Bohemian Floral Jhoola (Swing)** for bride photography\n• **Color-burst Drapes & Low Diwan Seating** for guests\n\nWould you prefer an outdoor lawn/poolside setup or an indoor banquet decor?`;
      quickReplies = ['Outdoor / Lawn Setup', 'Indoor Banquet Setup', 'Poolside Haldi Fiesta', 'Get Free Quote'];
      showQuoteCTA = true;
    } else if (
      lastUserMessage.includes('birthday') ||
      lastUserMessage.includes('kids') ||
      lastUserMessage.includes('balloon')
    ) {
      replyText = `🎂 **Exciting Birthday Themes!**\n\nWe design magical birthday celebrations:\n• **Kids Themes:** Princess Castle, Jungle Safari, Space Odyssey, Superhero\n• **Milestone Celebrations:** Chic Rose-Gold Lounge, Neon Marquee Letters, Organic Chrome Balloon Arches\n\nOur birthday packages start from just **₹15,000**. What is the age/theme you have in mind?`;
      quickReplies = ['1st Birthday Royal Theme', 'Kids Cartoon / Safari Theme', 'Adult Elegant Lounge Theme', 'Custom Theme Enquiry'];
      showQuoteCTA = true;
    } else if (
      lastUserMessage.includes('engagement') ||
      lastUserMessage.includes('ring') ||
      lastUserMessage.includes('roka')
    ) {
      replyText = `💍 **Enchanting Engagement & Ring Ceremony!**\n\nWe create romantic Pinterest-worthy moments with:\n• **Giant Infinity Floral Rings & Geometric Gold Frames**\n• **Customized Couple Neon Hashtag Signs**\n• **Mirror Walkway with Cold Pyros & Fog Effects**\n\nOur **Premium Engagement Package (₹85,000)** is the most popular choice!`;
      quickReplies = ['Pastel Blush Theme', 'Royal Gold & Crimson Theme', 'Modern Minimalist Glass Setup', 'Request Quote'];
      showQuoteCTA = true;
    } else if (
      lastUserMessage.includes('baby shower') ||
      lastUserMessage.includes('godh bharai') ||
      lastUserMessage.includes('seemantham') ||
      lastUserMessage.includes('naming')
    ) {
      replyText = `👶 **Heartwarming Baby Shower & Naming Ceremony!**\n\nWe offer tender, elegant decor:\n• **Adorned Lotus / Temple Floral Cradle (Palna)**\n• **Pastel Cloud Backdrops with Twinkle Lighting**\n• **Teddy Bear Props & Mom-to-be Royal Seating**\n\nPackages start from **₹20,000**. Would you like a home setup or venue decor?`;
      quickReplies = ['Home Setup', 'Banquet Hall Decor', 'Traditional Temple Style', 'Get Free Quote'];
      showQuoteCTA = true;
    } else if (
      lastUserMessage.includes('price') ||
      lastUserMessage.includes('cost') ||
      lastUserMessage.includes('package') ||
      lastUserMessage.includes('budget') ||
      lastUserMessage.includes('rate')
    ) {
      replyText = `💰 **Shivansh Decoration Packages & Pricing Overview:**\n\n1. **Basic Package (Starting ₹25,000):**\n   • Ideal for intimate 50-150 guest gatherings, simple stage/backdrop, standard lighting & balloons.\n\n2. **Premium Package (Starting ₹85,000 - Most Popular):**\n   • Ideal for 150-400 guests. 24ft 3D stage/mandap, fresh exotic flowers, couple sofa, entrance arch & fairy lights.\n\n3. **Royal Package (Starting ₹2,50,000):**\n   • Turnkey luxury for 400+ guests. Bespoke mandap, crystal chandeliers, imported Dutch florals, full venue fairy canopy & dedicated director.\n\nWould you like an instant customized price breakdown for your date?`;
      quickReplies = ['Get Basic Package Quote', 'Get Premium Package Quote', 'Get Royal Package Quote', 'Speak to Decorator on WhatsApp'];
      showQuoteCTA = true;
    } else if (
      lastUserMessage.includes('guest') ||
      lastUserMessage.includes('300') ||
      lastUserMessage.includes('500') ||
      lastUserMessage.includes('200') ||
      lastUserMessage.includes('100') ||
      lastUserMessage.includes('50')
    ) {
      replyText = `Great! For your guest count, our **Premium Package (₹85,000)** or **Royal Package (₹2,50,000)** will ensure all stages, entrance pathways, and photo zones accommodate your guests grandly.\n\nWould you like our creative team to reserve your date and send you a formal quotation?`;
      quickReplies = ['Request Free Quote Now', 'Chat on WhatsApp', 'View Real Event Photos'];
      showQuoteCTA = true;
    } else if (
      lastUserMessage.includes('quote') ||
      lastUserMessage.includes('book') ||
      lastUserMessage.includes('contact') ||
      lastUserMessage.includes('call')
    ) {
      replyText = `Awesome! 🌟 You can fill out our quick **Free Quote Form** or directly connect with our senior decorator on WhatsApp for immediate availability and custom sketches.`;
      quickReplies = ['Open Quote Form', 'WhatsApp: +91 98765 43210', 'Call Now'];
      showQuoteCTA = true;
    } else {
      replyText = `Thank you for reaching out to Shivansh Decoration! ✨\n\nWhether you need an opulent palace wedding mandap, an intimate Haldi setup, or a grand themed birthday, our team of seasoned decorators will bring your dream vision to life with 100% on-time execution.\n\nWould you like to get a free quote, explore our packages, or chat directly with our design specialist?`;
      quickReplies = ['Explore Packages', 'Get Free Quote', 'Chat on WhatsApp', 'View Gallery'];
      showQuoteCTA = true;
    }

    return NextResponse.json({
      success: true,
      reply: replyText,
      quickReplies,
      showQuoteCTA,
      showWhatsAppCTA
    });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json({
      success: false,
      reply: 'Namaste! I am currently experiencing high demand. Please click "Get Free Quote" or message us on WhatsApp directly for immediate assistance.'
    });
  }
}
