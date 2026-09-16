/* ==========================================================================
   The Giggling Cult — demo data
   --------------------------------------------------------------------------
   Everything on the site renders from this file. Swap it for an API/CMS later.

   NOTES FOR THE CLIENT
   - Comedian bios are short placeholders. Social handles are best-effort and
     MUST be verified before launch.
   - Entries marked `upcoming: true` are placeholder "rising" comics — replace
     them with the real roster.
   - Event dates are generated relative to *today* so the demo always shows a
     live calendar. Replace `day(n)` with real ISO dates when wiring up a CMS.
   ========================================================================== */

window.TGC = (() => {
  const TODAY = new Date();
  TODAY.setHours(0, 0, 0, 0);

  const day = (offset) => {
    const d = new Date(TODAY);
    d.setDate(d.getDate() + offset);
    return d;
  };

  /* ---------- Provinces (only the three currently served) ---------- */
  const PROVINCES = {
    gp:  { id: 'gp',  short: 'GP',  name: 'Gauteng',       city: 'Johannesburg', color: 'var(--gp)'  },
    wc:  { id: 'wc',  short: 'WC',  name: 'Western Cape',  city: 'Cape Town',    color: 'var(--wc)'  },
    kzn: { id: 'kzn', short: 'KZN', name: 'KwaZulu-Natal', city: 'Durban',       color: 'var(--kzn)' },
  };

  /* ---------- Venues ---------- */
  const VENUES = {
    goliath:   { id: 'goliath',   name: 'Goliath Comedy Club',       area: 'Melrose Arch, Johannesburg', province: 'gp'  },
    parkers:   { id: 'parkers',   name: "Parker's Comedy & Jive",    area: 'Montecasino, Fourways',      province: 'gp'  },
    teatro:    { id: 'teatro',    name: 'Teatro at Montecasino',     area: 'Fourways, Johannesburg',     province: 'gp'  },
    lyric:     { id: 'lyric',     name: 'The Lyric Theatre',         area: 'Gold Reef City, Johannesburg', province: 'gp' },
    atterbury: { id: 'atterbury', name: 'Atterbury Theatre',         area: 'Lynnwood, Pretoria',         province: 'gp'  },
    ctcc:      { id: 'ctcc',      name: 'Cape Town Comedy Club',     area: 'V&A Waterfront, Cape Town',  province: 'wc'  },
    joumase:   { id: 'joumase',   name: 'Jou Ma Se Comedy Club',     area: 'Cape Town CBD',              province: 'wc'  },
    baxter:    { id: 'baxter',    name: 'Baxter Theatre',            area: 'Rondebosch, Cape Town',      province: 'wc'  },
    bay:       { id: 'bay',       name: 'Theatre on the Bay',        area: 'Camps Bay, Cape Town',       province: 'wc'  },
    grandwest: { id: 'grandwest', name: 'Grand Arena, GrandWest',    area: 'Goodwood, Cape Town',        province: 'wc'  },
    catalina:  { id: 'catalina',  name: 'Catalina Theatre',          area: "Wilson's Wharf, Durban",     province: 'kzn' },
    playhouse: { id: 'playhouse', name: 'The Playhouse',             area: 'Durban CBD',                 province: 'kzn' },
    rhumbelow: { id: 'rhumbelow', name: 'Rhumbelow Theatre',         area: 'Umbilo, Durban',             province: 'kzn' },
    sneddon:   { id: 'sneddon',   name: 'Elizabeth Sneddon Theatre', area: 'Glenwood, Durban',           province: 'kzn' },
    icc:       { id: 'icc',       name: 'Durban ICC',                area: 'Durban CBD',                 province: 'kzn' },
  };

  /* ---------- Comedians (alphabetical by first name) ---------- */
  const COMEDIANS = [
    { slug: 'alfred-adriaan',   name: 'Alfred Adriaan',   province: 'wc',  style: 'Storytelling · Observational',
      bio: 'Cape Town regular with a warm, laid-back delivery and a knack for turning suburban Cape Flats life into gold.',
      socials: { instagram: 'alfredadriaan', facebook: 'alfredadriaancomedy' } },
    { slug: 'angel-campey',     name: 'Angel Campey',     province: 'wc',  style: 'Dark · Deadpan',
      bio: 'Cape Town-based comic known for bone-dry timing and fearless, occasionally unhinged material.',
      socials: { instagram: 'angelcampey', x: 'angelcampey' } },
    { slug: 'bongi-mthethwa',   name: 'Bongi Mthethwa',   province: 'kzn', style: 'Observational', upcoming: true,
      bio: 'Pinetown open-mic graduate now working rooms across Durban. Loud, fast and very online.',
      socials: { instagram: 'bongi.laughs', tiktok: 'bongi.laughs' } },
    { slug: 'carvin-goldstone', name: 'Carvin Goldstone', province: 'kzn', style: 'Clean · Storytelling',
      bio: 'Durban stalwart and one of KZN\'s most-booked headliners, doing clean comedy with a sharp edge.',
      socials: { instagram: 'carvingoldstone', facebook: 'carvingoldstonecomedy', youtube: '@carvingoldstone' } },
    { slug: 'celeste-ntuli',    name: 'Celeste Ntuli',    province: 'kzn', style: 'Character · Storytelling',
      bio: 'Empangeni-born powerhouse. Award-winning stand-up, actor and one of the most recognisable voices in SA comedy.',
      socials: { instagram: 'celestentuli', x: 'celestentuli' } },
    { slug: 'chris-forrest',    name: 'Chris Forrest',    province: 'gp',  style: 'Observational · Deadpan',
      bio: 'Joburg veteran and comedy-scene mentor with a slow-burn, deadpan style honed over two decades on stage.',
      socials: { instagram: 'chrisforrestcomedy', x: 'chrisforrest' } },
    { slug: 'conrad-koch',      name: 'Conrad Koch',      province: 'wc',  style: 'Ventriloquism · Political',
      bio: 'Ventriloquist and satirist behind Chester Missing, South Africa\'s most politically informed puppet.',
      socials: { instagram: 'conradkoch', x: 'chestermissing' } },
    { slug: 'dalin-oliver',     name: 'Dalin Oliver',     province: 'wc',  style: 'Storytelling · Sport',
      bio: 'Former teacher turned Cape Town headliner. Big on school stories, sport and Cape accents.',
      socials: { instagram: 'dalinoliver', x: 'dalinoliver' } },
    { slug: 'dillan-oliphant',  name: 'Dillan Oliphant',  province: 'gp',  style: 'Observational · Absurd',
      bio: 'Joburg-based comic with a soft-spoken, off-kilter take on growing up in Eldorado Park.',
      socials: { instagram: 'dillanoliphant', x: 'dillanoliphant' } },
    { slug: 'donovan-goliath',  name: 'Donovan Goliath',  province: 'gp',  style: 'Energetic · Observational',
      bio: 'High-energy Joburg headliner and TV host with a background in design and a reputation for crowd-work.',
      socials: { instagram: 'donovangoliath', x: 'donovangoliath' } },
    { slug: 'dusty-rich',       name: 'Dusty Rich',       province: 'gp',  style: 'Alternative · Absurd',
      bio: 'Alternative Joburg comic who mixes philosophy, nonsense and long-form bits into something entirely his own.',
      socials: { instagram: 'dustyrich', youtube: '@dustyrich' } },
    { slug: 'ebenhaezer-dibakwane', name: 'Ebenhaezer Dibakwane', province: 'gp', style: 'Absurd · Storytelling',
      bio: 'Comedian, actor and writer with a surreal, big-hearted style. A festival favourite from Pretoria.',
      socials: { instagram: 'ebenhaezerdibakwane', x: 'ebenhaezer_d' } },
    { slug: 'eugene-khoza',     name: 'Eugene Khoza',     province: 'gp',  style: 'Observational · Social',
      bio: 'Sharp-tongued Joburg comic known for observational material about township life and city living.',
      socials: { instagram: 'eugenekhoza', x: 'eugenekhoza' } },
    { slug: 'fikile-nkosi',     name: 'Fikile Nkosi',     province: 'gp',  style: 'Storytelling', upcoming: true,
      bio: 'Soweto-based newcomer with a calm stage presence and killer family stories. Currently featuring at Goliath.',
      socials: { instagram: 'fikile.nkosi.comedy' } },
    { slug: 'glen-bo',          name: 'Glen Bo',          province: 'kzn', style: 'Impressions · Energetic',
      bio: 'Durban entertainer and MC with rapid-fire impressions and a stage energy that fills any room.',
      socials: { instagram: 'glenbocomedy', facebook: 'glenbocomedy' } },
    { slug: 'hlengiwe-zondo',   name: 'Hlengiwe Zondo',   province: 'kzn', style: 'Observational · Dark', upcoming: true,
      bio: 'One of Durban\'s most talked-about new voices: dry, dark and deliberate.',
      socials: { instagram: 'hlengiwe.zondo', tiktok: 'hlengiwezondo' } },
    { slug: 'imraan-davids',    name: 'Imraan Davids',    province: 'wc',  style: 'Character · Improv', upcoming: true,
      bio: 'Improv-trained Cape Town comic starting to break out of the open-mic circuit with character-driven sets.',
      socials: { instagram: 'imraandavids' } },
    { slug: 'jason-goliath',    name: 'Jason Goliath',    province: 'gp',  style: 'Energetic · Physical',
      bio: 'Big personality, big laughs. Joburg headliner, actor and co-founder of the Goliath comedy empire.',
      socials: { instagram: 'jasongoliath', x: 'jasongoliath' } },
    { slug: 'joey-rasdien',     name: 'Joey Rasdien',     province: 'gp',  style: 'Storytelling · Clean',
      bio: 'Veteran of SA stand-up with a gentle, philosophical style and decades of festival and TV credits.',
      socials: { instagram: 'joeyrasdien', x: 'joeyrasdien' } },
    { slug: 'kagiso-lediga',    name: 'Kagiso Lediga',    province: 'gp',  style: 'Satire · Storytelling',
      bio: 'Comedian, writer and director. A founding figure of the modern Joburg scene and force behind multiple TV shows.',
      socials: { instagram: 'kagisolediga', x: 'kagisolediga' } },
    { slug: 'kate-pinchuck',    name: 'Kate Pinchuck',    province: 'wc',  style: 'Dark · Absurd',
      bio: 'Cape Town comic and writer whose sets swing from delightfully weird to bracingly dark in one breath.',
      socials: { instagram: 'katepinchuck', x: 'katepinchuck' } },
    { slug: 'kg-mokgadi',       name: 'KG Mokgadi',       province: 'gp',  style: 'Observational · Storytelling',
      bio: 'Pretoria-raised, Joburg-based storyteller with a warm, measured delivery and hugely relatable material.',
      socials: { instagram: 'kgmokgadi', x: 'kgmokgadi' } },
    { slug: 'kurt-schoonraad',  name: 'Kurt Schoonraad',  province: 'wc',  style: 'Observational · Cape Flats',
      bio: 'Cape Town headliner and founder of the Cape Town Comedy Club. Mitchells Plain stories, big-room polish.',
      socials: { instagram: 'kurtschoonraad', x: 'kurtschoonraad' } },
    { slug: 'lasizwe-dambuza',  name: 'Lasizwe Dambuza',  province: 'gp',  style: 'Character · Digital',
      bio: 'Digital-native comedian and TV personality who built a massive following on characters and skits.',
      socials: { instagram: 'lasizwe', x: 'lasizwe', youtube: '@lasizwe' } },
    { slug: 'lindy-johnson',    name: 'Lindy Johnson',    province: 'gp',  style: 'Observational · Social',
      bio: 'Joburg comic and writer, unafraid of the awkward subject and expert at making a room lean in.',
      socials: { instagram: 'lindyjohnsoncomedy', x: 'lindyjohnson' } },
    { slug: 'loyiso-gola',      name: 'Loyiso Gola',      province: 'gp',  style: 'Political · Observational',
      bio: 'Gugulethu-born, Emmy-nominated satirist. Netflix special, world tours, still funniest about home.',
      socials: { instagram: 'loyisogola', x: 'loyisogola' } },
    { slug: 'loyiso-madinga',   name: 'Loyiso Madinga',   province: 'gp',  style: 'Storytelling · Political',
      bio: 'Comedy Central and Daily Show correspondent with a relaxed, thoughtful style and razor timing.',
      socials: { instagram: 'loyisomadinga', x: 'loyisomadinga' } },
    { slug: 'marc-lottering',   name: 'Marc Lottering',   province: 'wc',  style: 'Character · Cape Town',
      bio: 'Cape Town institution. Creator of Aunty Merle and a household name for over two decades.',
      socials: { instagram: 'marclottering', x: 'marclottering' } },
    { slug: 'masood-boomgaard', name: 'Masood Boomgaard', province: 'kzn', style: 'Deadpan · Character',
      bio: 'Durban comic behind the viral "Self-Help Singh" character. Deadpan, precise, globally shared.',
      socials: { instagram: 'masoodboomgaard', youtube: '@masoodboomgaard', tiktok: 'masoodboomgaard' } },
    { slug: 'mel-jones',        name: 'Mel Jones',        province: 'wc',  style: 'Observational · Absurd',
      bio: 'Cape Town comic with a sideways view of everything and a reputation for fearless crowd-work.',
      socials: { instagram: 'meljonescomedy', x: 'meljonescomedy' } },
    { slug: 'mojak-lehoko',     name: 'Mojak Lehoko',     province: 'gp',  style: 'Storytelling · Absurd',
      bio: 'Joburg headliner, writer and podcast host. Deceptively gentle delivery, sharp as anything underneath.',
      socials: { instagram: 'mojaklehoko', x: 'mojaklehoko' } },
    { slug: 'mpho-popps',       name: 'Mpho Popps',       province: 'gp',  style: 'Energetic · Physical',
      bio: 'One of Joburg\'s biggest draws. Big-room energy, physical comedy and sold-out one-man shows.',
      socials: { instagram: 'mphopopps', x: 'mphopopps' } },
    { slug: 'ndumiso-lindi',    name: 'Ndumiso Lindi',    province: 'gp',  style: 'Storytelling · Clean',
      bio: 'Mthatha-born storyteller with a booming voice and a gift for tales about rural life meeting the big city.',
      socials: { instagram: 'ndumisolindi', x: 'ndumisolindi' } },
    { slug: 'neil-green',       name: 'Neil Green',       province: 'kzn', style: 'Observational · Sport',
      bio: 'Durban regular and MC who works the KZN circuit hard: sport, surf and everything Durban.',
      socials: { instagram: 'neilgreencomedy', facebook: 'neilgreencomedy' } },
    { slug: 'nik-rabinowitz',   name: 'Nik Rabinowitz',   province: 'wc',  style: 'Satire · Multilingual',
      bio: 'Cape Town satirist, radio voice and Xhosa-speaking storyteller with a long run of hit one-man shows.',
      socials: { instagram: 'nikrabinowitz', x: 'nikrabinowitz' } },
    { slug: 'nina-hastie',      name: 'Nina Hastie',      province: 'gp',  style: 'Storytelling · Social',
      bio: 'Joburg comedian, actor and presenter with a candid, energetic style and a big presenting résumé.',
      socials: { instagram: 'ninahastie', x: 'ninahastie' } },
    { slug: 'ollie-van-der-berg', name: 'Ollie van der Berg', province: 'wc', style: 'Musical · Absurd', upcoming: true,
      bio: 'Guitar-in-hand musical comic making a name at Jou Ma Se open mics. Very silly, very catchy.',
      socials: { instagram: 'ollievdb', tiktok: 'ollievdb' } },
    { slug: 'phil-de-lange',    name: 'Phil de Lange',    province: 'wc',  style: 'Deadpan · Observational',
      bio: 'Cape Town comic with a bone-dry delivery, weekly club spots and a growing list of festival credits.',
      socials: { instagram: 'phildelange', x: 'phildelange' } },
    { slug: 'prev-reddy',       name: 'Prev Reddy',       province: 'kzn', style: 'Observational · Durban',
      bio: 'Chatsworth-born Durban headliner whose material on family, food and Durban traffic travels everywhere.',
      socials: { instagram: 'prevreddy', facebook: 'prevreddycomedy' } },
    { slug: 'riaad-moosa',      name: 'Riaad Moosa',      province: 'wc',  style: 'Clean · Storytelling',
      bio: 'The Comedy Doctor. Qualified medical doctor, award-winning stand-up and actor, and one of SA\'s cleanest acts.',
      socials: { instagram: 'riaadmoosa', x: 'riaadmoosa' } },
    { slug: 'rob-van-vuuren',   name: 'Rob van Vuuren',   province: 'wc',  style: 'Physical · Absurd',
      bio: 'Cape Town actor-comedian and physical performer. Twakkie to some, a theatre-award winner to others.',
      socials: { instagram: 'robvanvuuren', x: 'robvanvuuren' } },
    { slug: 'robby-collins',    name: 'Robby Collins',    province: 'gp',  style: 'Storytelling · Observational',
      bio: 'Durban-raised, Joburg-based. Comedy Central Presents alumnus with an easy, conversational style.',
      socials: { instagram: 'robbycollinsza', x: 'robbycollinsza' } },
    { slug: 'rory-petzer',      name: 'Rory Petzer',      province: 'gp',  style: 'Observational · Dark',
      bio: 'Joburg comedian and radio personality with a self-deprecating streak and a knack for clean, dark twists.',
      socials: { instagram: 'rorypetzer', x: 'rorypetzer' } },
    { slug: 'schalk-bezuidenhout', name: 'Schalk Bezuidenhout', province: 'wc', style: 'Absurd · Afrikaans',
      bio: 'Kempton Park kid turned national headliner. Moustache, mullets and manic energy. Now based in Cape Town.',
      socials: { instagram: 'schalkie', x: 'schalkiebez', youtube: '@schalkbezuidenhout' } },
    { slug: 'sifiso-nene',      name: 'Sifiso Nene',      province: 'kzn', style: 'Storytelling · Zulu',
      bio: 'Durban headliner performing in isiZulu and English, with huge township followings and sold-out theatre runs.',
      socials: { instagram: 'sifisonene', facebook: 'sifisonenecomedy' } },
    { slug: 'simmi-areff',      name: 'Simmi Areff',      province: 'gp',  style: 'Observational · Storytelling',
      bio: 'Comedian and radio host with a laid-back Joburg style and a deep back catalogue of club-tested bits.',
      socials: { instagram: 'simmiareff', x: 'simmiareff' } },
    { slug: 'skhumba-hlophe',   name: 'Skhumba Hlophe',   province: 'gp',  style: 'Storytelling · Township',
      bio: 'Tembisa\'s finest. Radio host, actor and one of the most bankable names in Gauteng comedy.',
      socials: { instagram: 'skhumbahlophe', x: 'skhumba' } },
    { slug: 'sne-mbatha',       name: 'Sne Mbatha',       province: 'kzn', style: 'Observational · Social',
      bio: 'Durban-based comic and writer with a fresh take on dating, family and city life on the East Coast.',
      socials: { instagram: 'snembatha' } },
    { slug: 'stuart-taylor',    name: 'Stuart Taylor',    province: 'wc',  style: 'Clean · Musical',
      bio: 'Cape Town veteran. Clean, musical, family-friendly and one of the most-touring acts in the country.',
      socials: { instagram: 'stuarttaylorcomedy', x: 'stuarttaylor' } },
    { slug: 'tats-nkonzo',      name: 'Tats Nkonzo',      province: 'gp',  style: 'Musical · Observational',
      bio: 'Comedian, musician and TV host known for guitar-driven sets and a smooth, playful stage presence.',
      socials: { instagram: 'tatsnkonzo', x: 'tatsnkonzo' } },
    { slug: 'thenjiwe-moseley', name: 'Thenjiwe Moseley', province: 'kzn', style: 'Observational · Social',
      bio: 'Durban comic with an international touring CV and a fearless take on culture, class and womanhood.',
      socials: { instagram: 'thenjiwecomedy', x: 'thenjiwecomedy' } },
    { slug: 'tony-miyambo',     name: 'Tony Miyambo',     province: 'gp',  style: 'Theatre · Storytelling',
      bio: 'Award-winning actor and comedian whose one-man theatre shows blur the line between stand-up and drama.',
      socials: { instagram: 'tonymiyambo', x: 'tonymiyambo' } },
    { slug: 'trevor-noah',      name: 'Trevor Noah',      province: 'gp',  style: 'Storytelling · Political',
      bio: 'Soweto-born, Emmy-winning former host of The Daily Show. Rare home shows; when they happen, they sell out in minutes.',
      socials: { instagram: 'trevornoah', x: 'trevornoah', youtube: '@trevornoah' } },
    { slug: 'tsitsi-chiumya',   name: 'Tsitsi Chiumya',   province: 'gp',  style: 'Absurd · Observational',
      bio: 'Comics\' Choice-winning Joburg comic with a laid-back, sideways style and a Netflix special under his belt.',
      socials: { instagram: 'tsitsichiumya', x: 'tsitsichiumya' } },
    { slug: 'tumi-morake',      name: 'Tumi Morake',      province: 'gp',  style: 'Storytelling · Social',
      bio: 'Trailblazing comedian, actor, writer and host. One of the first women to headline big rooms in SA.',
      socials: { instagram: 'tumi_morake', x: 'tumi_morake' } },
    { slug: 'ursula-pillay',    name: 'Ursula Pillay',    province: 'kzn', style: 'Storytelling', upcoming: true,
      bio: 'Phoenix-raised newcomer working the Durban open-mic circuit with sharp family stories and zero filter.',
      socials: { instagram: 'ursula.pillay.comedy' } },
    { slug: 'virgil-prins',     name: 'Virgil Prins',     province: 'wc',  style: 'Observational · Cape Flats',
      bio: 'Cape Town club favourite with an easy charm and a loyal following built on years of weekly spots.',
      socials: { instagram: 'virgilprins', facebook: 'virgilprinscomedy' } },
    { slug: 'vittorio-leonardi', name: 'Vittorio Leonardi', province: 'gp', style: 'Observational · Storytelling',
      bio: 'Joburg headliner and radio voice with a warm, wandering style and an eye for the small absurdities of SA life.',
      socials: { instagram: 'vittorioleonardi', x: 'vittorioleonardi' } },
    { slug: 'wandile-sibiya',   name: 'Wandile Sibiya',   province: 'gp',  style: 'Energetic · Township', upcoming: true,
      bio: 'Katlehong newcomer with relentless energy. Regular on the Parker\'s new-faces bill.',
      socials: { instagram: 'wandile.sibiya', tiktok: 'wandilesibiya' } },
    { slug: 'yaaseen-barnes',   name: 'Yaaseen Barnes',   province: 'wc',  style: 'Observational · Cape Town',
      bio: 'Cape Town comic and writer with a relaxed, conversational style and a huge local following.',
      socials: { instagram: 'yaaseenbarnes', x: 'yaaseenbarnes' } },
    { slug: 'zanele-mokoena',   name: 'Zanele Mokoena',   province: 'gp',  style: 'Deadpan · Social', upcoming: true,
      bio: 'Pretoria open-mic standout with a deadpan delivery that belies the chaos of her material.',
      socials: { instagram: 'zanele.mokoena.comedy' } },
  ];

  /* ---------- Events ----------
     type: headline | showcase | openmic | special | festival | tour  */
  const E = (offset, time, title, venue, lineup, opts = {}) => ({
    date: day(offset), time, title, venue, lineup,
    type: opts.type || 'showcase',
    price: opts.price ?? 150,
    blurb: opts.blurb || '',
    soldOut: !!opts.soldOut,
  });

  const EVENTS = [
    /* earlier this week */
    E(-2, '20:00', 'Goliath Tuesday Showcase', 'goliath', ['dillan-oliphant', 'lindy-johnson', 'fikile-nkosi', 'kg-mokgadi'], { price: 120 }),
    E(-1, '19:30', 'Open Mic Wednesday', 'joumase', ['ollie-van-der-berg', 'imraan-davids', 'phil-de-lange'], { type: 'openmic', price: 60 }),
    E(-1, '20:00', 'Midweek Laughs', 'catalina', ['neil-green', 'bongi-mthethwa', 'glen-bo'], { price: 100 }),
    /* today + rest of the week */
    E(0, '20:00', 'Loyiso Gola: Pop Culture', 'lyric', ['loyiso-gola'], { type: 'headline', price: 320, blurb: 'One night only at the Lyric before the European leg.' }),
    E(0, '20:30', 'Cape Town Comedy Club Thursday', 'ctcc', ['kurt-schoonraad', 'angel-campey', 'yaaseen-barnes', 'dalin-oliver'], { price: 170 }),
    E(1, '19:00', 'Friday Funnies', 'parkers', ['mpho-popps', 'skhumba-hlophe', 'wandile-sibiya', 'rory-petzer'], { price: 200 }),
    E(1, '20:00', 'Durban Comedy Night', 'playhouse', ['carvin-goldstone', 'prev-reddy', 'thenjiwe-moseley', 'hlengiwe-zondo'], { price: 180 }),
    E(1, '21:00', 'Late Show at Jou Ma Se', 'joumase', ['mel-jones', 'kate-pinchuck', 'virgil-prins'], { price: 120 }),
    E(2, '15:00', 'Schalk Bezuidenhout: Kaalvoet', 'bay', ['schalk-bezuidenhout'], { type: 'headline', price: 280, blurb: 'Matinee. The new hour, road-tested and slightly less sweaty.' }),
    E(2, '20:00', 'Schalk Bezuidenhout: Kaalvoet', 'bay', ['schalk-bezuidenhout'], { type: 'headline', price: 280, soldOut: true }),
    E(2, '20:00', 'Saturday Night Live at Goliath', 'goliath', ['donovan-goliath', 'jason-goliath', 'tsitsi-chiumya', 'nina-hastie'], { price: 220 }),
    E(2, '19:30', 'Masood Boomgaard: Self-Help Singh Live', 'sneddon', ['masood-boomgaard'], { type: 'headline', price: 250 }),
    E(3, '18:00', 'Sunday Session', 'ctcc', ['stuart-taylor', 'alfred-adriaan', 'phil-de-lange'], { price: 140 }),
    E(3, '18:00', 'New Faces Sunday', 'rhumbelow', ['ursula-pillay', 'bongi-mthethwa', 'sne-mbatha', 'neil-green'], { type: 'showcase', price: 90, blurb: 'Rising KZN comics, four-act bill.' }),
    /* next week */
    E(5, '20:00', 'Goliath Tuesday Showcase', 'goliath', ['mojak-lehoko', 'eugene-khoza', 'zanele-mokoena', 'simmi-areff'], { price: 120 }),
    E(6, '19:30', 'Open Mic Wednesday', 'joumase', ['imraan-davids', 'ollie-van-der-berg'], { type: 'openmic', price: 60 }),
    E(7, '20:00', 'Celeste Ntuli: Long Story Short', 'icc', ['celeste-ntuli'], { type: 'headline', price: 350, blurb: 'Homecoming show. Support from Sifiso Nene.' }),
    E(7, '20:30', 'Cape Town Comedy Club Thursday', 'ctcc', ['nik-rabinowitz', 'dalin-oliver', 'mel-jones'], { price: 170 }),
    E(8, '20:00', 'Friday Funnies', 'parkers', ['robby-collins', 'vittorio-leonardi', 'lindy-johnson', 'fikile-nkosi'], { price: 200 }),
    E(8, '20:00', 'Conrad Koch & Chester Missing: Puppet Nation', 'baxter', ['conrad-koch'], { type: 'headline', price: 240 }),
    E(9, '20:00', 'Mpho Popps: Popps Culture', 'teatro', ['mpho-popps'], { type: 'headline', price: 380, blurb: 'The big one. 1,800 seats, one Popps.' }),
    E(9, '20:00', 'Sifiso Nene: Umlando', 'playhouse', ['sifiso-nene'], { type: 'headline', price: 220 }),
    E(9, '20:00', 'Saturday Night Live at Goliath', 'goliath', ['tats-nkonzo', 'kagiso-lediga', 'dusty-rich', 'wandile-sibiya'], { price: 220 }),
    E(10, '18:00', 'Sunday Session', 'ctcc', ['riaad-moosa', 'yaaseen-barnes'], { price: 160 }),
    /* later this month */
    E(12, '20:00', 'Goliath Tuesday Showcase', 'goliath', ['dillan-oliphant', 'tony-miyambo', 'rory-petzer', 'ebenhaezer-dibakwane'], { price: 120 }),
    E(13, '19:30', 'Open Mic Wednesday', 'joumase', ['ollie-van-der-berg', 'kate-pinchuck'], { type: 'openmic', price: 60 }),
    E(14, '20:00', 'Durban Comedy Night', 'catalina', ['glen-bo', 'prev-reddy', 'hlengiwe-zondo'], { price: 150 }),
    E(15, '20:00', 'Tumi Morake: And Then What?', 'atterbury', ['tumi-morake'], { type: 'headline', price: 300 }),
    E(15, '20:00', 'Friday Funnies', 'parkers', ['skhumba-hlophe', 'ndumiso-lindi', 'zanele-mokoena', 'simmi-areff'], { price: 200 }),
    E(16, '20:00', 'Marc Lottering: Hopefully', 'grandwest', ['marc-lottering'], { type: 'headline', price: 320 }),
    E(16, '20:00', 'Carvin Goldstone: Clean Sweep', 'sneddon', ['carvin-goldstone'], { type: 'headline', price: 200 }),
    E(16, '20:00', 'Saturday Night Live at Goliath', 'goliath', ['jason-goliath', 'mojak-lehoko', 'loyiso-madinga', 'nina-hastie'], { price: 220 }),
    E(17, '18:00', 'Sunday Session', 'ctcc', ['rob-van-vuuren', 'virgil-prins', 'alfred-adriaan'], { price: 140 }),
    E(19, '20:00', 'Goliath Tuesday Showcase', 'goliath', ['eugene-khoza', 'lasizwe-dambuza', 'fikile-nkosi'], { price: 120 }),
    E(21, '20:00', 'Riaad Moosa: Doctor\'s Orders', 'baxter', ['riaad-moosa'], { type: 'headline', price: 260 }),
    E(22, '19:00', 'KZN Comedy Festival — Opening Night', 'icc', ['celeste-ntuli', 'carvin-goldstone', 'masood-boomgaard', 'thenjiwe-moseley', 'sne-mbatha'], { type: 'festival', price: 280, blurb: 'Three nights, twenty comics, one city.' }),
    E(23, '19:00', 'KZN Comedy Festival — Night Two', 'icc', ['sifiso-nene', 'prev-reddy', 'glen-bo', 'neil-green', 'ursula-pillay'], { type: 'festival', price: 280 }),
    E(23, '20:00', 'Kagiso Lediga: Late Bloomer', 'lyric', ['kagiso-lediga'], { type: 'headline', price: 300 }),
    E(24, '18:00', 'KZN Comedy Festival — Closing Night', 'icc', ['loyiso-gola', 'celeste-ntuli', 'bongi-mthethwa', 'hlengiwe-zondo'], { type: 'festival', price: 320 }),
    /* next month */
    E(29, '20:00', 'Friday Funnies', 'parkers', ['donovan-goliath', 'chris-forrest', 'kg-mokgadi', 'wandile-sibiya'], { price: 200 }),
    E(30, '20:00', 'Nik Rabinowitz: Ja Well No Fine', 'bay', ['nik-rabinowitz'], { type: 'headline', price: 280 }),
    E(30, '20:00', 'Tsitsi Chiumya: Zero Chill', 'teatro', ['tsitsi-chiumya'], { type: 'headline', price: 300 }),
    E(33, '20:00', 'Goliath Tuesday Showcase', 'goliath', ['rory-petzer', 'dusty-rich', 'zanele-mokoena'], { price: 120 }),
    E(36, '20:00', 'Skhumba Hlophe: Ekasi Lami', 'lyric', ['skhumba-hlophe'], { type: 'headline', price: 320 }),
    E(37, '20:00', 'Stuart Taylor: Learner Husband', 'grandwest', ['stuart-taylor'], { type: 'headline', price: 260 }),
    E(37, '20:00', 'Durban Comedy Night', 'playhouse', ['masood-boomgaard', 'thenjiwe-moseley', 'sne-mbatha', 'ursula-pillay'], { price: 180 }),
    E(43, '20:00', 'Friday Funnies', 'parkers', ['tats-nkonzo', 'joey-rasdien', 'vittorio-leonardi'], { price: 200 }),
    E(44, '20:00', 'Trevor Noah: Off The Record (Homecoming)', 'teatro', ['trevor-noah'], { type: 'tour', price: 850, soldOut: true, blurb: 'Two nights. Both gone in eleven minutes.' }),
    E(45, '20:00', 'Trevor Noah: Off The Record (Homecoming)', 'teatro', ['trevor-noah'], { type: 'tour', price: 850, soldOut: true }),
    E(51, '20:00', 'Cape Town Comedy Club Thursday', 'ctcc', ['kurt-schoonraad', 'phil-de-lange', 'imraan-davids', 'angel-campey'], { price: 170 }),
    E(52, '20:00', 'Joey Rasdien: Immortal', 'atterbury', ['joey-rasdien'], { type: 'headline', price: 260 }),
    E(58, '20:00', 'Tony Miyambo: The Cenotaph of Dan wa Moriri', 'baxter', ['tony-miyambo'], { type: 'headline', price: 220 }),
  ].sort((a, b) => a.date - b.date || a.time.localeCompare(b.time));

  EVENTS.forEach((e, i) => { e.id = `ev-${i + 1}`; });

  /* ---------- News (demo editorial content) ---------- */
  const NEWS = [
    { slug: 'kzn-comedy-festival-lineup', date: day(-1), category: 'Festival', readTime: 3,
      title: 'KZN Comedy Festival drops its full three-night line-up',
      excerpt: 'Twenty comics, the Durban ICC and a closing night headlined by Loyiso Gola and Celeste Ntuli. Tickets are moving fast.',
      body: 'The second KZN Comedy Festival has confirmed its full bill. Opening night leans on Durban royalty, night two is a KZN-only card, and the closer brings in Gauteng heavyweights. Festival passes are available, and the organisers say a fourth night is "not off the table" if the first three sell through.' },
    { slug: 'popps-teatro-sellout', date: day(-2), category: 'Tickets', readTime: 2,
      title: 'Mpho Popps adds a second Teatro date after first night sells out',
      excerpt: 'The 1,800-seat room went in under a day. A Sunday matinee has been added for the overflow.',
      body: 'Popps Culture is now a two-show run at Teatro Montecasino. The Saturday night is gone; the added Sunday afternoon show goes on sale Friday at 09:00. Expect the same hour, slightly less shouting.' },
    { slug: 'open-mic-guide', date: day(-3), category: 'Guide', readTime: 6,
      title: 'Where to get your first five minutes: every open mic in GP, WC and KZN',
      excerpt: 'We mapped every weekly open mic across the three provinces, including sign-up rules, slot lengths and who runs the door.',
      body: 'Getting stage time is the whole game for a new comic. We spoke to the people running each room about how to get booked, what not to do on your first night, and which mics are best for working new material versus building tape. Bookmark this — we update it monthly.' },
    { slug: 'jou-ma-se-renovation', date: day(-5), category: 'Venues', readTime: 2,
      title: 'Jou Ma Se Comedy Club reopens with a bigger room and a proper green room',
      excerpt: 'Cape Town\'s scrappiest club got a refit. Capacity is up, sightlines are better, and the comics finally have somewhere to sit.',
      body: 'After a six-week closure, Jou Ma Se is back with a reconfigured stage, a new bar and roughly forty extra seats. The Wednesday open mic returns immediately; the weekend showcases pick up the following week.' },
    { slug: 'rising-comics-spring', date: day(-7), category: 'Spotlight', readTime: 5,
      title: 'Six rising comics to watch this spring',
      excerpt: 'From Pinetown to Pretoria, the new-faces bills are unusually strong right now. Here\'s who keeps turning up on them.',
      body: 'Every few months a wave of open-mic graduates starts showing up on paid showcases. This season the names bookers keep mentioning are Bongi Mthethwa, Fikile Nkosi, Hlengiwe Zondo, Imraan Davids, Wandile Sibiya and Zanele Mokoena. All six are on The Giggling Cult\'s "Rising" list with upcoming shows you can book now.' },
    { slug: 'goliath-tuesday-format', date: day(-9), category: 'Venues', readTime: 3,
      title: 'Goliath Comedy Club changes its Tuesday format to a four-act showcase',
      excerpt: 'The Melrose Arch room is trading the long line-up for tighter, longer sets: four comics, fifteen minutes each.',
      body: 'Goliath says the change is about giving mid-career comics room to stretch. The Tuesday ticket stays at R120 and the bill will always include at least one comic from the Rising list.' },
    { slug: 'giggling-cult-launch', date: day(-14), category: 'Announcements', readTime: 2,
      title: 'Welcome to The Giggling Cult',
      excerpt: 'One place for every stand-up show in South Africa. Starting with Gauteng, the Western Cape and KwaZulu-Natal.',
      body: 'We built this because finding a comedy show in South Africa meant checking six Instagram accounts and a WhatsApp group. Now it\'s one calendar. Comedians: join to claim your profile and list your shows. Audiences: join for the weekly line-up straight to your inbox. More provinces are coming as soon as we can cover them properly.' },
  ];

  /* ---------- Weekly summary (editorial blurb; numbers are computed live) ---------- */
  const WEEK_SUMMARY = {
    headline: 'A big Gauteng weekend, a Durban homecoming and Cape Town does what it always does.',
    body: 'Loyiso Gola\'s Lyric one-off leads the midweek. Schalk\'s evening show at Theatre on the Bay is gone but the matinee still has seats. Sunday belongs to the newcomers: Rhumbelow\'s New Faces bill is the best R90 you\'ll spend this week.',
    picks: ['ev-4', 'ev-9', 'ev-14'],
  };

  /* ---------- Helpers ---------- */
  const bySlug = Object.fromEntries(COMEDIANS.map((c) => [c.slug, c]));

  const startOfWeek = (d = TODAY) => {
    const s = new Date(d);
    const dow = (s.getDay() + 6) % 7; // Monday = 0
    s.setDate(s.getDate() - dow);
    return s;
  };
  const endOfWeek = (d = TODAY) => {
    const e = startOfWeek(d);
    e.setDate(e.getDate() + 6);
    e.setHours(23, 59, 59, 999);
    return e;
  };
  const endOfMonth = (d = TODAY) => new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);

  const eventsBetween = (from, to, province) =>
    EVENTS.filter((e) => e.date >= from && e.date <= to && (!province || VENUES[e.venue].province === province));

  const upcomingFor = (slug) => EVENTS.filter((e) => e.date >= TODAY && e.lineup.includes(slug));

  const eventProvince = (e) => VENUES[e.venue].province;

  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  return {
    TODAY, PROVINCES, VENUES, COMEDIANS, EVENTS, NEWS, WEEK_SUMMARY,
    bySlug, startOfWeek, endOfWeek, endOfMonth, eventsBetween, upcomingFor, eventProvince, sameDay,
  };
})();
