/**
 * Central Configuration for Purvi's Cinematic Birthday Experience.
 * Crafted with love by Rahul for his girlfriend, Purvi.
 * All texts, media, photos, and messages are customized here.
 */

export interface BirthdayConfig {
  recipient: {
    name: string;
    nickname: string;
    birthDate: string;
    location: string;
    locationFlag: string;
    flowerName: string;
    flowerEmoji: string;
  };
  sender: {
    name: string;
    location: string;
    locationFlag: string;
  };
  languages: {
    primary: 'en';
    secondary: 'hi';
  };
  media: {
    introVideoUrl: string;
    introVideoPoster: string;
    song1: {
      title: string;
      artist: string;
      url: string;
    };
    song2: {
      title: string;
      artist: string;
      url: string;
    };
    photo1: {
      url: string;
      captionEn: string;
      captionHi: string;
      subCaptionEn: string;
      subCaptionHi: string;
    };
    photo2: {
      url: string;
      captionEn: string;
      captionHi: string;
      polaroidDate: string;
    };
    photo3: {
      url: string;
      captionEn: string;
      captionHi: string;
      quoteEn: string;
      quoteHi: string;
    };
    landscapeBannerUrl: string;
  };
  distance: {
    kilometers: number;
    miles: number;
    aerialDistance: string;
    railDistance: string;
    railDuration: string;
    roadDistance: string;
    roadDuration: string;
    flightDuration: string;
    representativeRoute: string;
  };
  translations: {
    en: TranslationContent;
    hi: TranslationContent;
  };
}

export interface TranslationContent {
  loader: {
    status1: string;
    status2: string;
    status3: string;
  };
  gateway: {
    badge: string;
    teaser: string;
    openButton: string;
    subtext: string;
  };
  video: {
    tapToPlay: string;
    skipButton: string;
  };
  bloom: {
    greeting: string;
    sub: string;
  };
  musicBar: {
    playOurSong: string;
    nowPlaying: string;
    switchTrack: string;
    volume: string;
  };
  welcome: {
    greetingBadge: string;
    headline: string;
    subheadline: string;
    playSongCta: string;
    scrollHint: string;
  };
  timeline: {
    title: string;
    subtitle: string;
    steps: Array<{
      tag: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
  photo1Section: {
    tag: string;
    title: string;
    text: string;
  };
  learned: {
    tag: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      detail: string;
      tag: string;
    }>;
  };
  appreciation: {
    tag: string;
    title: string;
    subtitle: string;
    qualities: Array<{
      title: string;
      detail: string;
    }>;
  };
  distanceSection: {
    tag: string;
    title: string;
    subtitle: string;
    caption: string;
    senderLabel: string;
    senderRegion: string;
    recipientLabel: string;
    recipientRegion: string;
    approxNote: string;
    dreamNote: string;
    reflection: string;
    stats: {
      aerial: string;
      rail: string;
      road: string;
      flight: string;
      bond: string;
    };
  };
  futureDreams: {
    tag: string;
    title: string;
    subtitle: string;
    dreams: Array<{
      badge: string;
      locationTag?: string;
      title: string;
      quote: string;
      icon: string;
    }>;
  };
  scrapbook: {
    tag: string;
    title: string;
    subtitle: string;
  };
  evenWithoutMeeting: {
    tag: string;
    title: string;
    quote: string;
    reflection: string;
  };
  photo3Section: {
    tag: string;
    title: string;
  };
  thankYou: {
    tag: string;
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      text: string;
    }>;
    highlightCard: string;
  };
  cake: {
    teaser: string;
    title: string;
    subtitle: string;
    wishStepPrompt: string;
    wishStepButton: string;
    wishStepDone: string;
    blowStepPrompt: string;
    blowStepButton: string;
    blowStepDone: string;
    cutStepPrompt: string;
    cutStepButton: string;
    unlockedMessage: string;
  };
  letter: {
    tag: string;
    title: string;
    salutation: string;
    paragraphs: string[];
    signOff: string;
  };
  keepsake: {
    tag: string;
    title: string;
    clickToOpen: string;
    memoryText: string;
  };
  secretEnvelope: {
    tag: string;
    title: string;
    tapToReveal: string;
    innerNote: string;
    signature: string;
  };
  giftPhilosophy: {
    tag: string;
    title: string;
    text: string;
  };
  finale: {
    title: string;
    subtitle: string;
    wishButton: string;
    wishToast: string;
    replayButton: string;
  };
}

export const initialBirthdayConfig: BirthdayConfig = {
  recipient: {
    name: "Purvi",
    nickname: "Meri Jaan / My Baby 🌹",
    birthDate: "Today",
    location: "Uttar Pradesh, North India",
    locationFlag: "🇮🇳",
    flowerName: "Red Rose",
    flowerEmoji: "🌹"
  },
  sender: {
    name: "Rahul",
    location: "Kerala, South India",
    locationFlag: "🇮🇳"
  },
  languages: {
    primary: "en",
    secondary: "hi"
  },
  distance: {
    kilometers: 1980,
    miles: 1230,
    aerialDistance: "~1,980 km (Approx. straight-line flight)",
    railDistance: "~2,450 km (Express Rail route)",
    railDuration: "~40 - 44 hours",
    roadDistance: "~2,350 km (Highway route)",
    roadDuration: "~45+ hours",
    flightDuration: "~3.5 - 4.5 hours (connecting)",
    representativeRoute: "Central Kerala ↔ Kanpur, Uttar Pradesh (Approximated)"
  },
  media: {
    introVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    introVideoPoster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1080&q=80",
    
    // Website Song: Samjhawan (configured with local placeholder and graceful procedural acoustic fallback)
    song1: {
      title: "Samjhawan",
      artist: "Arijit Singh & Shreya Ghoshal",
      url: "/audio/samjhawan.mp3"
    },
    song2: {
      title: "Samjhawan (Acoustic Chords)",
      artist: "Rahul & Purvi's Melody",
      url: "https://cdn.freesound.org/previews/612/612613_5674468-lq.mp3"
    },
    
    // Original provided portrait photographs - preserved exactly without alterations
    photo1: {
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
      captionEn: "My girl, whose anger is cute, whose care is endless, and whose heart is my only home.",
      captionHi: "मेरी पूर्वा, जिसका गुस्सा भी प्यारा है, जिसकी डांट में भी प्यार है, और जिसकी मुस्कान मेरी दुनिया है।",
      subCaptionEn: "The smile that makes me fall in love all over again, every single day.",
      subCaptionHi: "वो मुस्कान जो हर दिन मुझे तुम्हारे प्यार में फिर से गिरफ्तार कर लेती है।"
    },
    photo2: {
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85",
      captionEn: "That pure, unfiltered laugh of yours that convinced me I never want anyone else.",
      captionHi: "तुम्हारी वो बेपरवाह हंसी जिसने मुझे यकीन दिला दिया कि मुझे ज़िंदगी में सिर्फ तुम चाहिए।",
      polaroidDate: "Forever My Girl"
    },
    photo3: {
      url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85",
      captionEn: "Graceful like your favorite red roses, fiercely protective, and breathtakingly mine.",
      captionHi: "तुम्हारे पसंदीदा लाल गुलाबों जैसी खूबसूरत, नाज़ुक पर मेरे लिए सबसे मजबूत ढाल।",
      quoteEn: "\"In a world of billions, my eyes will always search for you, my Purvi.\"",
      quoteHi: "\"इस दुनिया की भीड़ में, मेरी आंखें हमेशा सिर्फ तुम्हें तलाशेंगी, मेरी जान।\""
    },
    landscapeBannerUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80"
  },
  translations: {
    en: {
      loader: {
        status1: "Wrapping up a surprise for my favorite girl...",
        status2: "Tuning our song, Samjhawan...",
        status3: "Almost ready for my baby, Purvi..."
      },
      gateway: {
        badge: "For My Beautiful Girlfriend, Purvi 🌹",
        teaser: "Hey baby… your Rahul made something special just for you.",
        openButton: "Open Your Surprise, My Love 💗",
        subtext: "Put your earphones on for us 🎧"
      },
      video: {
        tapToPlay: "Tap anywhere to hear sound, my love 🔊",
        skipButton: "Skip to Our Story ❤️"
      },
      bloom: {
        greeting: "Happy Birthday, My Love 🎂🌹",
        sub: "You are the best thing that ever walked into my life, Purvi."
      },
      musicBar: {
        playOurSong: "Play Our Song ❤️",
        nowPlaying: "Now Playing: Samjhawan",
        switchTrack: "Switch Melody",
        volume: "Volume"
      },
      welcome: {
        greetingBadge: "Happy Birthday To My Girlfriend 🌹",
        headline: "To The Girl Who Owns My Entire Heart & Soul",
        subheadline: "Take a deep breath, stop scolding me for a minute, and scroll slowly. Your boy coded this entire corner of the internet with all his love for you, my jaan.",
        playSongCta: "Play Our Song: Samjhawan 🎵",
        scrollHint: "Scroll down, baby"
      },
      timeline: {
        title: "How You Stole My Heart",
        subtitle: "From two strangers on screen to the girl I want to spend every single tomorrow with",
        steps: [
          {
            tag: "Chapter 1",
            title: "An Innocent First Hello",
            description: "Started with a casual conversation online with zero clue that this girl would soon become the center of my universe.",
            icon: "MessageCircleHeart"
          },
          {
            tag: "Chapter 2",
            title: "Falling For Your Chaos & Voice Notes",
            description: "Hours of 4-minute voice notes, you scolding me for staying up late, and cute arguments where you'd pretend to be mad just so I'd pamper you.",
            icon: "Sparkles"
          },
          {
            tag: "Chapter 3",
            title: "My Jealous, Possessive Little Angel",
            description: "The way you adorably interrogate me if I mention someone else, and the way you check if I ate—I realized you aren't just in my life; you ARE my life.",
            icon: "ShieldCheck"
          },
          {
            tag: "Today & Forever",
            title: "Celebrating My Queen",
            description: "Today is your day, baby. Every heartbeat of mine celebrates you, your fierce love, your dramatic pouts, and your golden heart.",
            icon: "Gift"
          }
        ]
      },
      photo1Section: {
        tag: "My Beautiful Girl",
        title: "That Smile That Melts All My Stress",
        text: "People see a gorgeous girl, but I see the one who gets adorably angry at my silly jokes, the one whose eyes sparkle when she gets her way, and the girl I fall deeper in love with every day."
      },
      learned: {
        tag: "Observations & Quirks",
        title: "Things I've Learned About My Girlfriend",
        subtitle: "Tap any card to see what your boyfriend secretly notices about you 🌸",
        items: [
          {
            title: "The 'Did You Eat?' Police",
            detail: "You could be half-asleep yourself, but you will still call and interrogate me: 'Khaana khaya ya bhool gaye?'. If I say no, heaven help me from your anger!",
            tag: "Caring & Scolding"
          },
          {
            title: "The Adorable Jealous Queen",
            detail: "God forbid I mention another girl or take 5 minutes to reply. You pretend you don't care, but that cute possessive frown tells me you want to be my only favorite person forever.",
            tag: "Possessive"
          },
          {
            title: "The Angry Pout & Fake Drama",
            detail: "Getting mad when I tease you, threatening 'ab baat mat karo', and then waiting for me to call back in 10 seconds to pamper you. I love every single second of it.",
            tag: "Playful Anger"
          },
          {
            title: "My Secret Softie",
            detail: "As fierce and angry as you act on the outside, you have the softest heart that worries about me, gets emotional over little things, and loves so deeply.",
            tag: "Emotional Heart"
          },
          {
            title: "My 2 AM Midnight Anchor",
            detail: "When life gets overwhelming, your voice is the only thing that calms my racing mind. You believe in me even when I forget to believe in myself.",
            tag: "My Strength"
          },
          {
            title: "The Rose of My Life",
            detail: "You love red roses, but honestly, no rose in this world could ever match your grace, your fire, and the warmth you bring into my life, baby.",
            tag: "Pure Romance"
          }
        ]
      },
      appreciation: {
        tag: "From My Heart",
        title: "Things That Make Me Love You More",
        subtitle: "Qualities that make you the only girl I will ever want",
        qualities: [
          {
            title: "Your Fierce Loyalty",
            detail: "You protect our bond with everything you have. When you love, you love with your whole soul, and I am the luckiest guy alive."
          },
          {
            title: "Your Genuine Care",
            detail: "Remembering my timings, checking on my health, and caring for me more than I care for myself."
          },
          {
            title: "Your Cute Anger",
            detail: "Because I know you only get angry at the person you care about the most. Your anger is just love disguised in fire."
          },
          {
            title: "Your Rose-like Warmth",
            detail: "The way you hold my heart and make me feel like I can conquer the whole world as long as you're by my side."
          }
        ]
      },
      distanceSection: {
        tag: "Kerala to Uttar Pradesh",
        title: "Miles Between Our Hands, Zero Between Our Hearts",
        subtitle: "Bridging Rahul in Kerala and Purvi in Uttar Pradesh across 1,980+ km",
        caption: "I'm in Kerala, you're in Uttar Pradesh, and there's so much distance between us. But baby, one day there won't be a screen between us. I'll hold your hand, look into your eyes, and finally be right there with you. ❤️",
        senderLabel: "Rahul ❤️ Kerala",
        senderRegion: "South India (Central Kerala)",
        recipientLabel: "Purvi ❤️ Uttar Pradesh",
        recipientRegion: "North India (Kanpur / UP)",
        approxNote: "Approximate representative distances & travel times calculated between Central Kerala and Kanpur, Uttar Pradesh.",
        dreamNote: "We may live far apart, but every single heartbeat is dreaming of our future together.",
        reflection: "Map navigation might measure ~1,980 km straight-line across India between Kerala and Uttar Pradesh, but whenever you scold me to eat on time, get adorably jealous, or whisper 'I love you', you feel closer to me than my own heartbeat. Soon, baby, this distance will be just a sweet chapter we smile about.",
        stats: {
          aerial: "~1,980 km (Approx. straight-line)",
          rail: "~2,450 km (~40 - 44 hrs Express)",
          road: "~2,350 km (~45+ hrs Highway)",
          flight: "~3.5 - 4.5 hrs (Connecting air route)",
          bond: "Forever Mine"
        }
      },
      futureDreams: {
        tag: "Our Tomorrows",
        title: "Our Future Together ❤️",
        subtitle: "Every dream I have for us, written straight from my heart",
        dreams: [
          {
            badge: "Dream 1",
            title: "Watching the Taj Mahal Together",
            quote: "I want to stand beside you in front of the Taj Mahal, holding your hand and watching you smile. I don't just want to see this beautiful place. I want to create a memory with the girl who makes my life beautiful.",
            icon: "Landmark"
          },
          {
            badge: "Dream 2",
            locationTag: "Our Engagement Proposal Location 💍",
            title: "Proposing to You in Front of the Taj Mahal",
            quote: "One day, I want to stand in front of the Taj Mahal, look into your eyes, hold your hands, and ask you to be mine forever. I want that moment to become the beginning of our forever, with you as my fiancée.",
            icon: "HeartHandshake"
          },
          {
            badge: "Dream 3",
            locationTag: "Our Marriage Proposal Location 🌆",
            title: "Our Marriage Dream in New York",
            quote: "I dream of taking you to New York, standing with you in front of the beautiful city skyline, holding your hands, looking into your eyes, and asking you to marry me. I want to build a beautiful life with you, filled with love, laughter, little fights, and endless memories.",
            icon: "Sparkles"
          },
          {
            badge: "Dream 4",
            title: "Eating Pani Puri Together",
            quote: "I want us to sit together and feed each other pani puri with our own hands. I already know you'll tease me, steal my pani puri, and probably get angry if I eat yours. But honestly, those little moments with you are the ones I want the most.",
            icon: "UtensilsCrossed"
          },
          {
            badge: "Dream 5",
            title: "Our Little Everyday Moments",
            quote: "I want to share meals with you, go on long walks, watch movies while cuddling, tease you until you get angry, make up after our silly fights, hold you when you're sad, and be the person you can always count on.",
            icon: "Coffee"
          },
          {
            badge: "Dream 6",
            title: "Growing Old Together",
            quote: "My biggest dream isn't just a beautiful proposal or an expensive wedding. It's waking up beside you years from now, still teasing you, still making you laugh, still holding your hand, and still choosing you every single day.",
            icon: "Infinity"
          }
        ]
      },
      scrapbook: {
        tag: "My Favorite Memory",
        title: "The Moment I Knew You Were The One",
        subtitle: "Pinned inside my heart forever"
      },
      evenWithoutMeeting: {
        tag: "To My Soulmate",
        title: "Even Before We Held Hands",
        quote: "Real love doesn't demand being in the same room. It only demands two sincere hearts that belong to each other.",
        reflection: "People say long distance is hard, and yes, not being able to hug you when you're angry or sad breaks me. But loving you across these miles has only made my promise to you unbreakable. You are worth every single second of waiting, my girl."
      },
      photo3Section: {
        tag: "My Queen",
        title: "Elegance, Fire & Grace"
      },
      thankYou: {
        tag: "From My Heart",
        title: "Things I Probably Don't Say Enough",
        subtitle: "A few simple thank yous that my girlfriend deserves every day",
        cards: [
          {
            title: "Thank you for checking in & scolding me",
            text: "For the random 'did you eat?' texts that turned exhausting work days into peaceful evenings."
          },
          {
            title: "Thank you for your sweet jealousy",
            text: "Because seeing you protect what is ours reminds me how deeply and possessively you love me."
          },
          {
            title: "Thank you for choosing me every day",
            text: "For trusting me with your heart, your tears, your dreams, and our future."
          }
        ],
        highlightCard: "Most importantly… thank you for simply being my girlfriend, my soulmate, and my whole world, Purvi."
      },
      cake: {
        teaser: "Okay baby, stop pouting for a second... there's one essential birthday tradition missing!",
        title: "Your Birthday Cake, My Love 🎂",
        subtitle: "Follow the 3 ritual steps so your boy can unlock his secret love letters below",
        wishStepPrompt: "Step 1: Close your beautiful eyes, think of us, take a breath, and hold your deepest wish in your heart.",
        wishStepButton: "I Made My Wish With Rahul 🌟",
        wishStepDone: "✨ Your wish is locked in the stars with my love forever!",
        blowStepPrompt: "Step 2: Blow directly towards the screen or tap the button to extinguish your candles, baby.",
        blowStepButton: "Blow Out The Candles 💨",
        blowStepDone: "🕯️ Candles blown out! May every wish of yours come true, meri jaan!",
        cutStepPrompt: "Step 3: Pick up the silver knife and make the official first cut, my queen!",
        cutStepButton: "Cut The Birthday Cake 🍰💗",
        unlockedMessage: "🎉 CAKE CUT! You unlocked my personal love letter & secret keepsake below!"
      },
      letter: {
        tag: "From Your Boyfriend",
        title: "A Love Letter For My Girl, Purvi",
        salutation: "My Dearest Purvi (Meri Jaan),",
        paragraphs: [
          "Happy Birthday, my love! As you step into another chapter of life today, I wanted to take a moment away from regular texts to give you something that will stay with you forever.",
          "Meeting you on the internet has been the sweetest miracle of my life. In a world where people come and go, having a girl like you feels like finding a blooming red rose in the middle of a concrete desert.",
          "I know we have our silly fights, you get adorably jealous when someone else takes my attention, and I love teasing you until you give me that angry pout. But beneath all that chaos is the deepest, purest love I have ever felt for anyone.",
          "I promise to stand beside you in front of the Taj Mahal, to hold your hands in New York, and to choose you through every single up and down of life. You will always be my number one girl.",
          "Never doubt your worth or dim your light for anyone. The world is vastly better with your laughter in it. Happy Birthday, my baby."
        ],
        signOff: "Forever & hopelessly in love with you,"
      },
      keepsake: {
        tag: "Our Keepsake Capsule",
        title: "A Promise I Wanted To Keep",
        clickToOpen: "Tap to unseal this promise note, baby 📜",
        memoryText: "Whenever life gets overwhelming, whenever we have a silly fight, or whenever the distance feels too hard, remember this page is permanently hosted here. It stands as eternal proof that a boy named Rahul is completely, undeniably in love with you. Happy Birthday, Purvi 🌹."
      },
      secretEnvelope: {
        tag: "One Last Secret",
        title: "One Last Thing For My Girl 👀",
        tapToReveal: "Tap the wax seal to open your boyfriend's private note",
        innerNote: "P.S. You're stuck with me forever, baby. No take-backs, no escaping. Even when you're 80 and angry at me for forgetting something silly, I'll still be kissing your forehead and reminding you that you are my favorite person in the entire universe. I love you, jaan!",
        signature: "— Your Rahul ❤️"
      },
      giftPhilosophy: {
        tag: "Why Code?",
        title: "Why Your Boyfriend Coded This For You",
        text: "Store-bought gifts get lost, flowers eventually wither, but lines of dedicated code, thought, and heartfelt words live on forever. Every animation, every floating rose petal, and every letter on this screen was hand-crafted by Rahul to bring a smile to my girl's face today."
      },
      finale: {
        title: "Happy Birthday, Purvi 🌹",
        subtitle: "I love you more than words, distances, and stars could ever show.",
        wishButton: "Make Another Wish With Me ✨",
        wishToast: "A shooting star carried our wish to the universe! 🌠",
        replayButton: "Relive Our Journey 🎀"
      }
    },
    hi: {
      loader: {
        status1: "मेरी सबसे प्यारी लड़की के लिए कुछ खास तैयार हो रहा है...",
        status2: "हमारा गाना, 'समझवां' सज रहा है...",
        status3: "बस कुछ ही पलों में, मेरी जान पूर्वा..."
      },
      gateway: {
        badge: "मेरी जान, मेरी गर्लफ्रेंड पूर्वा के लिए 🌹",
        teaser: "सुनो पूर्वा… तुम्हारे राहुल ने सिर्फ और सिर्फ तुम्हारे लिए कुछ बनाया है।",
        openButton: "अपना सरप्राइज खोलो, मेरी जान 💗",
        subtext: "हेडफ़ोन पहन लो, सिर्फ मेरे लिए 🎧"
      },
      video: {
        tapToPlay: "मेरी आवाज़ सुनने के लिए कहीं भी छुओ, जान 🔊",
        skipButton: "हमारी कहानी शुरू करें 🌹"
      },
      bloom: {
        greeting: "जन्मदिन मुबारक हो, मेरी जान पूर्वा 🎂🌹",
        sub: "तुम मेरी ज़िंदगी का सबसे हसीन और अनमोल तोहफ़ा हो।"
      },
      musicBar: {
        playOurSong: "हमारा गाना सुनो ❤️",
        nowPlaying: "गीत: समझवां",
        switchTrack: "धुन बदलें",
        volume: "आवाज़"
      },
      welcome: {
        greetingBadge: "जन्मदिन मुबारक मेरी गर्लफ्रेंड 🌹",
        headline: "उसके नाम, जो मेरे पूरे दिल और रूह की मालकिन है",
        subheadline: "आराम से बैठो, दो मिनट मुझे डांटना बंद करो और धीरे-धीरे नीचे स्क्रॉल करो। तुम्हारे राहुल ने इंटरनेट का ये कोना अपने पूरे दिल और प्यार से सिर्फ तुम्हारे लिए कोड किया है।",
        playSongCta: "हमारा गाना बजाएं: समझवां 🎵",
        scrollHint: "धीरे-धीरे नीचे स्क्रॉल करो, जान"
      },
      timeline: {
        title: "तुमने मेरा दिल कैसे चुराया",
        subtitle: "स्क्रीन के दो अजनबियों से लेकर उस लड़की तक जिसके साथ मुझे अपनी पूरी ज़िंदगी बितानी है",
        steps: [
          {
            tag: "पहला अध्याय",
            title: "एक मासूम सा हैलो",
            description: "ऑनलाइन दुनिया में एक छोटी सी बातचीत से शुरुआत हुई, बिना ये जाने कि ये लड़की मेरी पूरी दुनिया बन जाएगी।",
            icon: "MessageCircleHeart"
          },
          {
            tag: "दूसरा अध्याय",
            title: "तुम्हारी बातें और लंबी डांट",
            description: "जल्द ही ये 4-4 मिनट के वॉयस नोट्स, देर रात तक जागने पर तुम्हारी डांट, और वो नखरे बन गए जिन्हें मनाने में मुझे सबसे ज्यादा मज़ा आता है।",
            icon: "Sparkles"
          },
          {
            tag: "तीसरा अध्याय",
            title: "मेरी पजेसिव और प्यारी जान",
            description: "तुम्हारा वो मासूम सा जलना जब मैं किसी और से बात करूं, और तुम्हारा वो पूछना कि 'खाना खाया?'—मुझे समझ आ गया कि तुम सिर्फ मेरी ज़िंदगी नहीं, मेरी सांस हो।",
            icon: "ShieldCheck"
          },
          {
            tag: "आज और हमेशा",
            title: "मेरी रानी का जन्मदिन",
            description: "आज का दिन सिर्फ तुम्हारा है, पूर्वा। तुम्हारी हर अदा, तुम्हारे प्यारे गुस्से और तुम्हारे मासूम दिल का जश्न।",
            icon: "Gift"
          }
        ]
      },
      photo1Section: {
        tag: "मेरी सबसे खूबसूरत लड़की",
        title: "एक मुस्कान जो मेरा सारा तनाव मिटा दे",
        text: "लोग सिर्फ एक खूबसूरत लड़की देखते हैं, पर मैं उसे देखता हूं जो मेरी बेतुकी बातों पर प्यारा सा मुंह बनाती है, जो हक से मुझपर गुस्सा करती है, और जिससे मुझे हर दिन और ज्यादा प्यार हो जाता है।"
      },
      learned: {
        tag: "मेरी गर्लफ्रेंड की खास बातें",
        title: "वो बातें जो तुम्हारा बॉयफ्रेंड सबसे ज्यादा पसंद करता है",
        subtitle: "किसी भी कार्ड पर टैप करो और देखो मैं तुम्हारे बारे में क्या नोटिस करता हूं 🌸",
        items: [
          {
            title: "मेरी 'खाना खाया?' वाली पुलिस",
            detail: "खुद चाहे कितनी भी थकी हो, पर फोन करके डांटते हुए जरूर पूछेगी: 'खाना खाया या भूल गए?'. अगर मैंने 'ना' कहा, तो भगवान ही मुझे तुम्हारी डांट से बचाए!",
            tag: "फिक्र और डांट"
          },
          {
            title: "मेरी पजेसिव और जेलस क्वीन",
            detail: "गलती से भी किसी और लड़की का ज़िक्र आ जाए या मैं 2 मिनट लेट रिप्लाई करूं—सामने से कहेगी 'मुझे क्या फर्क पड़ता है', पर वो प्यारा सा मुंह बता देता है कि तुम सिर्फ मुझे चाहती हो।",
            tag: "प्यारी जेलसी"
          },
          {
            title: "गुस्सा, नखरे और ड्रामा",
            detail: "जब मैं चिढ़ाऊं तो गुस्सा होना, 'अब बात मत करो' कहकर फोन काटना, और फिर इंतज़ार करना कि 10 सेकंड में मैं मनाऊं। तुम्हारे ये नखरे मेरी जान हैं।",
            tag: "नखरे"
          },
          {
            title: "अंदर से बेहद मासूम दिल",
            detail: "बाहर से चाहे कितनी भी सख्त और गुस्से वाली बनो, अंदर से तुम्हारा दिल इतना कोमल है कि छोटी-छोटी बातों पर रो देती हो और सबकी फिक्र करती हो।",
            tag: "मासूमियत"
          },
          {
            title: "मेरी सबसे बड़ी ताकत",
            detail: "जब भी कभी ज़िंदगी में परेशान होता हूं, तुम्हारी आवाज़ ही मेरे दिल को सुकून देती है। तुम मुझपर तब भी भरोसा करती हो जब मैं खुद भूल जाता हूं।",
            tag: "सुकून"
          },
          {
            title: "मेरी ज़िंदगी का गुलाब",
            detail: "तुम्हें लाल गुलाब पसंद हैं, पर सच कहूं तो दुनिया का कोई भी फूल तुम्हारी खूबसूरती, तुम्हारे प्यार और तुम्हारी चमक की बराबरी नहीं कर सकता।",
            tag: "सच्चा प्यार"
          }
        ]
      },
      appreciation: {
        tag: "दिल से आभार",
        title: "वो बातें जो मुझे तुमसे बेपनाह मोहब्बत करने पर मजबूर करती हैं",
        subtitle: "वो खूबियां जो तुम्हें दुनिया की सबसे खास गर्लफ्रेंड बनाती हैं",
        qualities: [
          {
            title: "तुम्हारा सच्चा वफादार दिल",
            detail: "तुम हमारे रिश्ते को अपनी जान से भी ज्यादा संभालकर रखती हो। तुम्हारा ये समर्पण मुझे दुनिया का सबसे खुशनसीब इंसान बनाता है।"
          },
          {
            title: "मां जैसी फिक्र",
            detail: "मेरी दवाइयों का ख्याल रखना, मुझे पानी पीने की याद दिलाना, और मेरा मुझसे ज्यादा ख्याल रखना।"
          },
          {
            title: "तुम्हारा प्यारा गुस्सा",
            detail: "क्योंकि मुझे पता है कि तुम सिर्फ उसी पर गुस्सा होती हो जिससे सबसे ज्यादा प्यार करती हो। तुम्हारा गुस्सा सिर्फ प्यार का दूसरा रूप है।"
          },
          {
            title: "गुलाबों जैसी महक",
            detail: "जब तुम मेरे साथ होती हो, तो ऐसा लगता है जैसे मैं पूरी दुनिया जीत सकता हूं।"
          }
        ]
      },
      distanceSection: {
        tag: "केरल से उत्तर प्रदेश",
        title: "हाथों में दूरियां, पर दिलों में सिर्फ तुम",
        subtitle: "केरल में राहुल और उत्तर प्रदेश में पूर्वा का प्यार (1,980+ किमी)",
        caption: "मैं केरल में हूँ, तुम उत्तर प्रदेश में हो, और हमारे बीच इतनी लंबी दूरी है। लेकिन मेरी जान, एक दिन हमारे बीच कोई स्क्रीन नहीं होगी। मैं तुम्हारा हाथ थामूँगा, तुम्हारी आँखों में देखूँगा, और आखिरकार तुम्हारे पास रहूँगा। ❤️",
        senderLabel: "राहुल ❤️ केरल",
        senderRegion: "दक्षिण भारत (मध्य केरल)",
        recipientLabel: "पूर्वा ❤️ उत्तर प्रदेश",
        recipientRegion: "उत्तर भारत (कानपुर, उ.प्र.)",
        approxNote: "अनुमानित दूरियां और यात्रा समय मध्य केरल और कानपुर (उत्तर प्रदेश) के प्रतिनिधि केंद्रों के आधार पर गणना की गई हैं।",
        dreamNote: "हम भले ही हज़ारों मील दूर रहते हों, पर हमारा हर सपना एक साथ आने वाले कल के लिए है।",
        reflection: "गूगल मैप चाहे केरल और उत्तर प्रदेश के बीच लगभग 1,980 किमी हवाई और 2,450 किमी रेल दूरी दिखाए, पर जब भी तुम फोन पर हंसती हो या हक से डांटती हो, तुम मेरी धड़कन से भी ज्यादा करीब होती हो। बहुत जल्द ये दूरियां हमेशा के लिए खत्म हो जाएंगी, मेरी जान।",
        stats: {
          aerial: "~1,980 किमी (हवाई सीधी दूरी)",
          rail: "~2,450 किमी (~40-44 घंटे एक्सप्रेस रेल)",
          road: "~2,350 किमी (~45+ घंटे सड़क मार्ग)",
          flight: "~3.5 - 4.5 घंटे (कनेक्टिंग फ्लाइट)",
          bond: "हमेशा के लिए मेरी"
        }
      },
      futureDreams: {
        tag: "हमारा आने वाला कल",
        title: "हमारा आने वाला कल ❤️",
        subtitle: "वो सारे सपने जो मैंने तुम्हारे साथ अपनी ज़िंदगी के लिए सजाए हैं",
        dreams: [
          {
            badge: "सपना 1",
            title: "ताजमहल के सामने तुम्हारा हाथ थामना",
            quote: "I want to stand beside you in front of the Taj Mahal, holding your hand and watching you smile. I don't just want to see this beautiful place. I want to create a memory with the girl who makes my life beautiful.",
            icon: "Landmark"
          },
          {
            badge: "सपना 2",
            locationTag: "हमारी सगाई का सपना 💍",
            title: "ताजमहल के सामने तुम्हें प्रपोज करना",
            quote: "One day, I want to stand in front of the Taj Mahal, look into your eyes, hold your hands, and ask you to be mine forever. I want that moment to become the beginning of our forever, with you as my fiancée.",
            icon: "HeartHandshake"
          },
          {
            badge: "सपना 3",
            locationTag: "हमारी शादी का सपना (न्यूयॉर्क) 🌆",
            title: "न्यूयॉर्क में शादी का प्रपोजल",
            quote: "I dream of taking you to New York, standing with you in front of the beautiful city skyline, holding your hands, looking into your eyes, and asking you to marry me. I want to build a beautiful life with you, filled with love, laughter, little fights, and endless memories.",
            icon: "Sparkles"
          },
          {
            badge: "सपना 4",
            title: "साथ में पानी पूरी खाना",
            quote: "I want us to sit together and feed each other pani puri with our own hands. I already know you'll tease me, steal my pani puri, and probably get angry if I eat yours. But honestly, those little moments with you are the ones I want the most.",
            icon: "UtensilsCrossed"
          },
          {
            badge: "सपना 5",
            title: "रोज़मर्रा के छोटे-छोटे खूबसूरत पल",
            quote: "I want to share meals with you, go on long walks, watch movies while cuddling, tease you until you get angry, make up after our silly fights, hold you when you're sad, and be the person you can always count on.",
            icon: "Coffee"
          },
          {
            badge: "सपना 6",
            title: "साथ में बूढ़े होना",
            quote: "My biggest dream isn't just a beautiful proposal or an expensive wedding. It's waking up beside you years from now, still teasing you, still making you laugh, still holding your hand, and still choosing you every single day.",
            icon: "Infinity"
          }
        ]
      },
      scrapbook: {
        tag: "यादों का पन्ना",
        title: "वो पल जब मुझे तुमसे प्यार हो गया",
        subtitle: "मेरे दिल की डायरी में हमेशा के लिए महफूज़"
      },
      evenWithoutMeeting: {
        tag: "मेरी रूह के नाम",
        title: "हाथ थामने से पहले भी तुम मेरी थीं",
        quote: "सच्चे प्यार को एक ही कमरे में होना जरूरी नहीं होता, बस दो रूहों का एक-दूसरे के लिए धड़कना काफी है।",
        reflection: "लोग कहते हैं कि लॉन्ग डिस्टेंस मुश्किल होता है, और सच में जब तुम उदास होती हो और मैं तुम्हें गले नहीं लगा पाता, तो दिल दुखता है। पर इस दूरी ने तुम्हारे लिए मेरे वादे को और मजबूत बनाया है। तुम हर एक सेकंड के इंतज़ार के काबिल हो, पूर्वा।"
      },
      photo3Section: {
        tag: "मेरी रानी",
        title: "नज़ाकत और खूबसूरती"
      },
      thankYou: {
        tag: "दिल की बात",
        title: "वो बातें जो शायद मैं रोज़ नहीं कह पाता",
        subtitle: "कुछ दिल से निकले शुक्रिया जो मेरी गर्लफ्रेंड की हर सांस के हकदार हैं",
        cards: [
          {
            title: "मेरी फिक्र करने और डांटने के लिए शुक्रिया",
            text: "थका देने वाले दिनों में अचानक 'खाना खाया?' पूछकर मेरी सारी थकान मिटा देने के लिए।"
          },
          {
            title: "तुम्हारी उस प्यारी जेलसी के लिए शुक्रिया",
            text: "क्योंकि तुम्हारा वो हक जताना मुझे याद दिलाता है कि तुम मुझसे कितना बेपनाह प्यार करती हो।"
          },
          {
            title: "हर रोज़ मुझे चुनने के लिए शुक्रिया",
            text: "मुझपर भरोसा करने, अपने सपने बांटने और अपनी ज़िंदगी का हिस्सा बनाने के लिए।"
          }
        ],
        highlightCard: "सबसे बढ़कर… शुक्रिया मेरी जान, मेरी गर्लफ्रेंड और मेरी पूरी दुनिया बनने के लिए, पूर्वा।"
      },
      cake: {
        teaser: "चलो अब बहुत इमोशनल बातें हो गईं... अब जन्मदिन की सबसे ज़रूरी रस्म बाकी है!",
        title: "तुम्हारा जन्मदिन का केक, मेरी जान 🎂",
        subtitle: "केक की 3 रस्में पूरी करो ताकि तुम्हारा राहुल अपने खास खत खोल सके",
        wishStepPrompt: "स्टेप 1: अपनी खूबसूरत आंखें बंद करो, हमारे बारे में सोचो और दिल से अपनी सबसे प्यारी दुआ मांगो।",
        wishStepButton: "मैंने राहुल के साथ विश मांग ली 🌟",
        wishStepDone: "✨ तुम्हारी दुआ हमेशा के लिए मेरे प्यार के साथ कुबूल हो गई!",
        blowStepPrompt: "स्टेप 2: स्क्रीन की तरफ फूंक मारो या बटन दबाकर मोमबत्तियां बुझाओ, मेरी जान।",
        blowStepButton: "मोमबत्तियां बुझाएं 💨",
        blowStepDone: "🕯️ मोमबत्तियां बुझ गईं! तुम्हारी हर एक दुआ पूरी हो, मेरी जान!",
        cutStepPrompt: "स्टेप 3: चांदी का चाकू उठाओ और अपनी रानी होने के हक से पहला टुकड़ा काटो!",
        cutStepButton: "केक काटें, मेरी जान 🍰💗",
        unlockedMessage: "🎉 केक कट गया! तुम्हारे राहुल के खास खत और यादों का कैप्सूल नीचे खुल गया है!"
      },
      letter: {
        tag: "तुम्हारे बॉयफ्रेंड की तरफ से",
        title: "मेरी पूर्वा के नाम एक प्रेम पत्र",
        salutation: "मेरी सबसे प्यारी पूर्वा (मेरी जान),",
        paragraphs: [
          "जन्मदिन की ढेर सारी शुभकामनाएं, मेरी जान! आज जब तुम अपनी ज़िंदगी के एक नए साल में कदम रख रही हो, तो मैं रोज़मर्रा के मैसेजेस से अलग तुम्हें कुछ हमेशा के लिए देना चाहता था।",
          "इंटरनेट पर तुमसे मिलना मेरी ज़िंदगी का सबसे खूबसूरत चमत्कार रहा है। इस भागती-दौड़ती दुनिया में तुम्हारे जैसी सच्ची, प्यारी और फिक्र करने वाली लड़की पाना, कंक्रीट के रेगिस्तान में खिलते हुए लाल गुलाब को पाने जैसा है।",
          "मुझे पता है कि हमारे बीच छोटी-छोटी नोक-झोंक होती है, तुम छोटी बातों पर प्यारा सा मुंह फुला लेती हो, और मैं तुम्हें तब तक चिढ़ाता हूं जब तक तुम गुस्सा ना हो जाओ। पर उस सारी नोक-झोंक के नीचे वो सच्चा और गहरा प्यार है जो मैंने आज तक किसी के लिए महसूस नहीं किया।",
          "मैं वादा करता हूं कि तुम्हारे साथ ताजमहल के सामने खड़ा रहूंगा, न्यूयॉर्क में तुम्हारा हाथ थामूंगा, और ज़िंदगी के हर मोड़ पर सिर्फ और सिर्फ तुम्हें चुनूंगा। तुम हमेशा मेरी नंबर वन रहोगी।",
          "कभी भी किसी के लिए अपनी चमक मत कम करना। ये दुनिया तुम्हारी हंसी से बहुत खूबसूरत है। जन्मदिन मुबारक हो, मेरी बच्ची।"
        ],
        signOff: "हमेशा सिर्फ और सिर्फ तुम्हारा राहुल,",
      },
      keepsake: {
        tag: "हमारा यादों का कैप्सूल",
        title: "एक वादा जो हमेशा ज़िंदा रहेगा",
        clickToOpen: "इस वादे को खोलने के लिए टैप करो, जान 📜",
        memoryText: "जब भी कभी ज़िंदगी में उदासी महसूस हो, जब भी हमारे बीच कोई बहस हो, या जब भी दूरी भारी लगे—याद रखना ये वेब पेज हमेशा रहेगा। ये इस बात का गवाह है कि केरल में बैठा तुम्हारा राहुल, तुमसे बेइंतहा मोहब्बत करता है। तुम मेरा घर और मेरी पूरी दुनिया हो, पूर्वा 🌹।"
      },
      secretEnvelope: {
        tag: "एक आखिरी राज़",
        title: "मेरी जान के लिए एक आखिरी बात 👀",
        tapToReveal: "मोहर पर टैप करके अपने बॉयफ्रेंड का खत खोलो",
        innerNote: "P.S. तुम हमेशा के लिए मेरे साथ फंस चुकी हो, जान। कोई रिटर्न पॉलिसी नहीं है! जब तुम 80 साल की भी हो जाओगी और मुझपर किसी बात पर गुस्सा करोगी, तब भी मैं तुम्हारा माथा चूमकर यही कहूंगा कि तुम दुनिया की सबसे खूबसूरत लड़की हो। आई लव यू, पूर्वा!",
        signature: "— तुम्हारा राहुल ❤️"
      },
      giftPhilosophy: {
        tag: "कोड क्यों?",
        title: "तुम्हारे बॉयफ्रेंड ने ये कोड क्यों किया",
        text: "बाज़ार के तोहफे कुछ दिनों में पुराने हो जाते हैं, फूल मुरझा जाते हैं, पर दिल से लिखी गई ये कोड की पंक्तियां हमेशा ज़िंदा रहती हैं। हर एनीमेशन, हर तैरता हुआ गुलाब और हर लफ़्ज़ राहुल ने सिर्फ अपनी गर्लफ्रेंड के चेहरे पर मुस्कान लाने के लिए बनाया है।"
      },
      finale: {
        title: "जन्मदिन मुबारक हो, मेरी पूर्वा 🌹",
        subtitle: "मैं तुमसे लफ़्ज़ों, दूरियों और सितारों से भी ज्यादा प्यार करता हूं।",
        wishButton: "मेरे साथ एक और दुआ मांगो ✨",
        wishToast: "एक टूटते तारे ने हमारी दुआ आसमान तक पहुंचा दी! 🌠",
        replayButton: "हमारी कहानी फिर से देखें 🎀"
      }
    }
  }
};
