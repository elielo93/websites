// Single source of truth for all business content.
// Used by build.mjs (static site) and exported to the WordPress theme as content.json.

export const business = {
  name: "Ocean1Gutters",
  legalName: "Ocean1Gutters LLC",
  tagline: "Seamless Gutters Built for South Florida Rain",
  phone: "(561) 767-6528",
  phoneRaw: "+15617676528",
  whatsapp: "15617676528",
  email: "info@ocean1gutters.com", // CONFIRM with client
  street: "2505 NW 24th St",
  city: "Boynton Beach",
  state: "FL",
  zip: "33436", // CONFIRM with client
  county: "Palm Beach County",
  geo: { lat: 26.5485, lng: -80.0973 },
  founded: "2020",
  url: "https://www.ocean1gutters.com",
  hours: [
    { days: "Monday – Friday", open: "7:00 AM", close: "6:00 PM" },
    { days: "Saturday", open: "8:00 AM", close: "4:00 PM" },
    { days: "Sunday", open: "Emergency calls only", close: "" },
  ],
  openingHoursSchema: ["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"],
  rating: { value: "4.9", count: "200" }, // CONFIRM: Google Business Profile count
  social: {
    facebook: "https://www.facebook.com/ocean1gutters", // CONFIRM
    instagram: "https://www.instagram.com/ocean1gutters", // CONFIRM
    yelp: "https://www.yelp.com/biz/ocean1gutters-boynton-beach-4",
    google: "https://g.page/r/ocean1gutters/review", // CONFIRM: replace with real Google review link
  },
  license: "Licensed & Insured in the State of Florida",
  warranty: "Lifetime workmanship warranty on all new seamless gutter installations",
};

export const stats = [
  { value: 1200, suffix: "+", label: "Homes Protected" },
  { value: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
  { value: 24, suffix: "h", label: "Quote Turnaround" },
  { value: 100, suffix: "%", label: "Seamless, No Leaks" },
];

export const services = [
  {
    slug: "seamless-gutter-installation",
    name: "Seamless Gutter Installation",
    short: "Seamless Gutters",
    icon: "install",
    blurb:
      "Custom 6\" and 7\" seamless aluminum gutters, roll-formed on site to fit your roofline with zero seams and zero leaks.",
    title: "Seamless Gutter Installation Palm Beach County | 6\" & 7\" Gutters",
    description:
      "Seamless aluminum gutter installation in Boynton Beach, Delray Beach, Boca Raton & all of Palm Beach County. Custom 6-inch and 7-inch gutters, 30+ colors, lifetime workmanship warranty. Free estimates.",
    h1: "Seamless Gutter Installation in Palm Beach County",
    intro:
      "Florida's wet season dumps over 60 inches of rain a year on your roof. Sectional gutters from the big-box store leak at every joint. Ocean1Gutters roll-forms seamless aluminum gutters right in your driveway, measured to the inch, so water goes exactly where it should: away from your foundation, fascia and landscaping.",
    benefits: [
      { h: "6\" and 7\" oversized gutters", p: "Standard 5\" gutters overflow in a South Florida downpour. We size every run for your roof pitch and square footage." },
      { h: "Heavy-gauge .032 aluminum", p: "Thicker than the builder-grade .027 most companies use. Holds up to ladders, hurricanes and salt air." },
      { h: "Hidden hangers every 24\"", p: "Screwed into rafter tails, not nailed into fascia. Your gutters stay straight and sagging never becomes your problem." },
      { h: "30+ baked-enamel colors", p: "Match your trim, roof or stucco. Color never chalks, peels or fades." },
      { h: "Oversized 3\"x4\" downspouts", p: "Double the capacity of standard downspouts so debris flushes through instead of clogging." },
      { h: "Lifetime workmanship warranty", p: "If a seam, hanger or miter we installed ever fails, we fix it. No arguing, no fine print." },
    ],
    process: [
      "Free on-site measurement and a written quote within 24 hours",
      "We remove and haul away your old gutters",
      "Gutters are roll-formed on site to the exact length of each run",
      "Hangers, miters and downspouts are installed and sealed",
      "Full water test and clean-up before we leave",
    ],
    faqs: [
      { q: "How much do seamless gutters cost in Palm Beach County?", a: "Most homes fall between $9 and $16 per linear foot installed for 6\" aluminum, depending on stories, roof complexity and downspout count. A typical single-story 150 ft home lands around $1,500 to $2,400. Use our instant estimator or request a free written quote." },
      { q: "How long does installation take?", a: "Most residential installs are completed in a single day. Two-story or complex roofs may take two." },
      { q: "Do I need 6-inch or 7-inch gutters?", a: "6\" handles most homes. We recommend 7\" for steep tile roofs, large roof planes, or homes with a history of overflow." },
      { q: "Are the gutters hurricane-rated?", a: "We use screw-in hidden hangers at 24\" spacing which exceeds the Florida Building Code requirement and performs far better than spike-and-ferrule in high winds." },
    ],
  },
  {
    slug: "gutter-repair",
    name: "Gutter Repair",
    short: "Repairs",
    icon: "repair",
    blurb:
      "Leaks, sagging, pulled hangers, loose downspouts and storm damage fixed fast, usually same week.",
    title: "Gutter Repair Boynton Beach, Delray & Boca | Same-Week Service",
    description:
      "Fast gutter repair across Palm Beach County: leaking seams, sagging runs, detached downspouts, storm damage. Honest diagnosis, same-week scheduling, free estimates. Call (561) 767-6528.",
    h1: "Gutter Repair in Palm Beach County",
    intro:
      "A small leak at a corner miter turns into rotted fascia, stained stucco and water in your foundation. We diagnose the real cause, not just the symptom, and tell you honestly whether a repair or a replacement is the smarter spend.",
    benefits: [
      { h: "Leaking seams & miters", p: "Re-sealed with commercial-grade sealant, or re-fabricated if the joint has failed." },
      { h: "Sagging & pulling away", p: "We replace rusted spikes with screw-in hidden hangers and reset the pitch so water flows." },
      { h: "Downspout & elbow repair", p: "Re-attach, re-route or upsize downspouts that clog or discharge in the wrong place." },
      { h: "Storm & hurricane damage", p: "Bent, crushed or missing sections replaced to match your existing gutters." },
      { h: "Fascia & drip edge", p: "We can replace rotted fascia board before re-hanging gutters so the problem doesn't return." },
      { h: "Honest recommendations", p: "If repairing costs more than half of replacing, we'll tell you. No upselling." },
    ],
    process: [
      "Call or text photos of the problem for a quick phone estimate",
      "On-site inspection of the full gutter system, not just the leak",
      "Written quote with repair vs. replace options",
      "Repair completed, usually in one visit",
      "Water-tested and guaranteed",
    ],
    faqs: [
      { q: "How much does gutter repair cost?", a: "Minor repairs (re-sealing a seam, re-hanging a section) typically run $150 to $400. Larger repairs with new sections are quoted per foot." },
      { q: "Can you repair gutters another company installed?", a: "Yes. We repair all aluminum, galvanized and copper gutter systems regardless of who installed them." },
      { q: "Do you offer emergency gutter repair?", a: "We prioritize storm damage and active leaks, and can usually be out within 24 to 48 hours." },
    ],
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    short: "Cleaning",
    icon: "clean",
    blurb:
      "Full hand clean-out, downspout flush and a free inspection. Maintenance plans available.",
    title: "Gutter Cleaning Palm Beach County | Flat-Rate Pricing",
    description:
      "Professional gutter cleaning in Boynton Beach, Delray Beach, Boca Raton, Lake Worth & West Palm Beach. Hand clean-out, downspout flush, free inspection, photos of the finished job. Book online.",
    h1: "Gutter Cleaning in Palm Beach County",
    intro:
      "Palm fronds, oak leaves, pine needles and roof grit fill Florida gutters fast. Clogged gutters overflow at the fascia, rot the soffit and invite mosquitoes. We clean every foot by hand, flush every downspout, and send you photos before and after.",
    benefits: [
      { h: "Hand-cleaned, not blown", p: "Debris is scooped and bagged, not blasted onto your roof, pool or landscaping." },
      { h: "Downspouts flushed", p: "Every downspout is flushed and checked for clogs at elbows and underground drains." },
      { h: "Free 12-point inspection", p: "We check hangers, pitch, seams and fascia while we're up there and report what we find." },
      { h: "Before & after photos", p: "You see exactly what came out and what it looks like now, without climbing a ladder." },
      { h: "Flat-rate pricing", p: "Priced by home size and stories. No surprises when the invoice arrives." },
      { h: "Twice-a-year plans", p: "Pre-wet-season and post-hurricane-season cleanings on autopilot, at a discount." },
    ],
    process: [
      "Book online or by phone with your address and number of stories",
      "We arrive on schedule, in uniform, with our own ladders and equipment",
      "Gutters cleaned by hand, downspouts flushed, debris bagged",
      "Inspection report and photos texted to you",
      "Optional: enroll in a maintenance plan and never think about it again",
    ],
    faqs: [
      { q: "How often should gutters be cleaned in Florida?", a: "At least twice a year: once before the rainy season (May) and once after hurricane season (November). Homes under oaks or pines may need quarterly service." },
      { q: "How much is gutter cleaning?", a: "Single-story homes typically start around $150, two-story around $250. Maintenance plan members save 15%." },
      { q: "Do I need to be home?", a: "No. As long as we have access to the exterior and gates are unlocked, we'll text you photos when we're done." },
    ],
  },
  {
    slug: "gutter-guards",
    name: "Gutter Guards & Leaf Protection",
    short: "Gutter Guards",
    icon: "guard",
    blurb:
      "Micro-mesh and aluminum leaf guards that keep palm fronds and pine needles out for good.",
    title: "Gutter Guards & Leaf Guards Palm Beach County | Clog-Free Gutters",
    description:
      "Gutter guard installation in Palm Beach County. Micro-mesh and aluminum leaf guards that stop palm fronds, pine needles and roof grit. Fits new or existing gutters. Free estimates.",
    h1: "Gutter Guards & Leaf Protection",
    intro:
      "Stop paying to clean your gutters twice a year. Our stainless micro-mesh guards let water through and keep everything else out, including the tiny shingle grit and pine needles that defeat cheap plastic screens.",
    benefits: [
      { h: "Stainless micro-mesh", p: "Blocks debris as small as roof sand while handling the heaviest Florida downpours." },
      { h: "Fits existing gutters", p: "We can retrofit guards onto sound 5\", 6\" or 7\" gutters, or install them with a new system." },
      { h: "No roof penetration", p: "Guards attach to the gutter and under the drip edge. Your roof warranty stays intact." },
      { h: "Low profile", p: "Nearly invisible from the ground. No bulky hoods or reverse-curve gimmicks." },
      { h: "Pest & mosquito barrier", p: "Keeps standing water and nesting debris out, which keeps mosquitoes and wasps out." },
      { h: "Transferable warranty", p: "Manufacturer-backed warranty that transfers to the next owner, a selling point for your home." },
    ],
    process: [
      "Free inspection to confirm your gutters are sound enough for guards",
      "Gutters cleaned and re-pitched if needed",
      "Guards cut and fitted to each run, secured with stainless screws",
      "Water test to confirm flow at every section",
      "Walk-through and warranty registration",
    ],
    faqs: [
      { q: "Do gutter guards really work in Florida?", a: "Quality micro-mesh guards do. Cheap foam and plastic screens fail against palm fronds and pine needles. We only install products we've seen hold up through hurricane seasons." },
      { q: "Will I never have to clean my gutters again?", a: "You'll go from twice a year to a quick visual check every few years. Debris that lands on the mesh dries and blows off." },
      { q: "How much do gutter guards cost?", a: "Typically $8 to $14 per linear foot installed, depending on product and gutter size. Bundle with new gutters and save." },
    ],
  },
  {
    slug: "copper-and-specialty-gutters",
    name: "Copper & Specialty Gutters",
    short: "Copper Gutters",
    icon: "copper",
    blurb:
      "Half-round copper, box gutters and commercial runs for estates, HOAs and light commercial.",
    title: "Copper Gutters & Commercial Gutters Palm Beach County",
    description:
      "Copper half-round gutters, box gutters, galvanized and commercial gutter systems in Palm Beach County. Estate homes, HOAs, light commercial. Licensed, insured, free estimates.",
    h1: "Copper, Half-Round & Commercial Gutters",
    intro:
      "For estate homes in Boca Raton and Delray Beach, nothing matches the look of copper half-round gutters with round downspouts. For HOAs and commercial properties, we fabricate box gutters and high-capacity systems sized for flat and low-slope roofs.",
    benefits: [
      { h: "Copper half-round", p: "16 oz copper, soldered joints, aged patina or sealed bright finish." },
      { h: "Box & commercial gutters", p: "High-capacity systems for flat roofs, warehouses, plazas and multi-family buildings." },
      { h: "Galvanized & Galvalume", p: "Durable, cost-effective options for metal roofs and agricultural buildings." },
      { h: "Custom fabrication", p: "Matching existing historic or architectural profiles on renovation projects." },
      { h: "HOA & property managers", p: "Multi-unit pricing, scheduled maintenance and a single point of contact." },
      { h: "Licensed & insured", p: "Fully insured for commercial work, with certificates available on request." },
    ],
    process: [
      "Site visit and consultation on profile, material and finish",
      "Detailed proposal with drawings for architectural projects",
      "Fabrication and installation by our senior crew",
      "Soldered or sealed, water-tested and photographed",
      "Maintenance plan options for commercial accounts",
    ],
    faqs: [
      { q: "How long do copper gutters last?", a: "60 to 100 years. Copper never rusts and develops a protective patina over time." },
      { q: "Do you work with HOAs and property managers?", a: "Yes. We serve multiple communities across Palm Beach County with scheduled cleanings, repairs and replacements." },
    ],
  },
];

export const cities = [
  { slug: "boynton-beach", name: "Boynton Beach", zip: "33435", lat: 26.5254, lng: -80.0664, hq: true,
    neighborhoods: ["Canyon Lakes", "Valencia Reserve", "Hunters Run", "Aberdeen", "Quail Ridge", "Leisureville", "Ocean Ridge", "Hypoluxo"],
    note: "Our home base. Ocean1Gutters is headquartered right here on NW 24th Street, so Boynton Beach homeowners get the fastest scheduling in our service area." },
  { slug: "delray-beach", name: "Delray Beach", zip: "33444", lat: 26.4615, lng: -80.0728,
    neighborhoods: ["Lake Ida", "Delray Lakes", "Seagate", "Tropic Isle", "Pineapple Grove", "Kings Point", "Addison Reserve", "Mizner Country Club"],
    note: "From historic cottages near Atlantic Avenue to new construction out west, we match gutter profiles and colors to Delray's wide range of architecture." },
  { slug: "boca-raton", name: "Boca Raton", zip: "33432", lat: 26.3587, lng: -80.0831,
    neighborhoods: ["Royal Palm Yacht & Country Club", "Boca West", "Woodfield", "Broken Sound", "Old Floresta", "Boca Pointe", "Mizner Park", "Boca Isles"],
    note: "Copper half-round, oversized 7\" seamless and HOA-compliant colors for Boca's estate homes and gated communities." },
  { slug: "lake-worth-beach", name: "Lake Worth Beach", zip: "33460", lat: 26.6168, lng: -80.0684,
    neighborhoods: ["Parrot Cove", "College Park", "Bryant Park", "Lake Osborne", "Tropical Ridge", "Lantana", "Greenacres", "Palm Springs"],
    note: "Older Lake Worth homes often have original fascia that needs attention before new gutters go up. We handle both in one visit." },
  { slug: "west-palm-beach", name: "West Palm Beach", zip: "33401", lat: 26.7153, lng: -80.0534,
    neighborhoods: ["El Cid", "Flamingo Park", "SoSo", "Northwood", "Ibis", "Andros Isle", "Baywinds", "Riverwalk"],
    note: "From downtown historic districts to western gated communities, West Palm Beach is one of our busiest service zones." },
  { slug: "wellington", name: "Wellington", zip: "33414", lat: 26.6618, lng: -80.2684,
    neighborhoods: ["Olympia", "Versailles", "Palm Beach Polo", "Grand Isles", "Black Diamond", "Binks Forest", "Royal Palm Beach", "Loxahatchee"],
    note: "Large roof planes and barns mean high water volume. We size 7\" gutters and 3x4 downspouts for Wellington's equestrian estates." },
  { slug: "palm-beach-gardens", name: "Palm Beach Gardens", zip: "33410", lat: 26.8234, lng: -80.1387,
    neighborhoods: ["PGA National", "Mirasol", "Frenchman's Reserve", "Evergrene", "Ballenisles", "Eastpointe", "Alton", "Old Palm"],
    note: "HOA color approvals handled for you. We carry the exact color charts most Gardens communities require." },
  { slug: "jupiter", name: "Jupiter", zip: "33458", lat: 26.9342, lng: -80.0942,
    neighborhoods: ["Abacoa", "Jupiter Farms", "Admirals Cove", "Jonathan's Landing", "Tequesta", "Juno Beach", "Jupiter Inlet Colony", "Egret Landing"],
    note: "Salt air near the inlet is brutal on fasteners. We use stainless screws and heavy-gauge aluminum on every Jupiter install." },
  { slug: "royal-palm-beach", name: "Royal Palm Beach", zip: "33411", lat: 26.7084, lng: -80.2306,
    neighborhoods: ["Madison Green", "Saratoga", "Counterpoint Estates", "La Mancha", "Crestwood", "Willows", "Village Walk", "Acreage"],
    note: "Fast scheduling for Royal Palm Beach and The Acreage, including larger lots and detached garages." },
  { slug: "lantana", name: "Lantana", zip: "33462", lat: 26.5868, lng: -80.0520,
    neighborhoods: ["Hypoluxo Island", "Lantana Heights", "Seminole Manor", "Atlantis", "Manalapan", "South Palm Beach", "Water Tower Commons", "Sea Pines"],
    note: "Minutes from our shop. Lantana and Hypoluxo homeowners can often get same-week installation." },
];

export const reviews = [
  { name: "Maria G.", city: "Boynton Beach", stars: 5, text: "They came out the next day, measured everything, and had our new 6-inch gutters installed before the weekend storms. Not a single drip since. Price was exactly what was quoted." },
  { name: "David R.", city: "Delray Beach", stars: 5, text: "Had two other companies tell me I needed full replacement. Ocean1 showed me it was just three bad hangers and a miter. Fixed it for a fraction of the price. Honest people." },
  { name: "Jennifer L.", city: "Boca Raton", stars: 5, text: "The copper half-rounds on our house are stunning. Crew was professional, cleaned up perfectly, and handled our HOA paperwork. Highly recommend." },
  { name: "Carlos M.", city: "Lake Worth", stars: 5, text: "Twice-a-year cleaning plan is the best money I spend on the house. They text me photos of the finished gutters every time." },
  { name: "Susan K.", city: "Wellington", stars: 5, text: "Micro-mesh guards have been through two hurricane seasons with zero clogs. Should have done this years ago." },
  { name: "Robert T.", city: "West Palm Beach", stars: 5, text: "Responsive, on time, fair pricing, beautiful work. The gutters match our trim color exactly. Five stars isn't enough." },
];

export const homeFaqs = [
  { q: "Do I really need gutters in Florida?", a: "Yes. Florida gets 60+ inches of rain a year, often in short, intense bursts. Without gutters, water pounds the soil at your foundation, splashes stucco, rots fascia and soffits, and floods walkways. Gutters move that water to where it drains safely." },
  { q: "What's the difference between seamless and regular gutters?", a: "Sectional gutters come in 10-foot pieces joined with seams that eventually leak. Seamless gutters are roll-formed on site in one continuous piece per run. The only joints are at corners and downspouts, which we seal with commercial sealant." },
  { q: "How much do new gutters cost?", a: "Most Palm Beach County homes fall between $1,500 and $4,000 for a full seamless aluminum system. Use the instant estimator on this page for a ballpark, then request a free written quote." },
  { q: "Are you licensed and insured?", a: "Yes. Ocean1Gutters LLC is a registered Florida business, fully insured for residential and commercial work. Certificates are available on request." },
  { q: "How fast can you come out?", a: "Free estimates are usually scheduled within 24 to 48 hours. Most installations are completed within a week of approval, often sooner." },
  { q: "Do you offer financing?", a: "Ask about our flexible payment options when you request your quote. We accept all major credit cards, Zelle and checks." },
];

export const colors = [
  { name: "White", hex: "#f3f3f0" }, { name: "Bone", hex: "#e8e2d3" }, { name: "Almond", hex: "#d9c9ad" },
  { name: "Wicker", hex: "#c4b08a" }, { name: "Sandstone", hex: "#b5a68c" }, { name: "Clay", hex: "#9b8572" },
  { name: "Musket Brown", hex: "#4a3a2c" }, { name: "Royal Brown", hex: "#5d4335" }, { name: "Terratone", hex: "#6f5a45" },
  { name: "Dark Bronze", hex: "#3e3832" }, { name: "Black", hex: "#1a1a1a" }, { name: "Charcoal", hex: "#4b4f54" },
  { name: "Pearl Gray", hex: "#b9bcbd" }, { name: "Dove Gray", hex: "#8e9295" }, { name: "Slate Blue", hex: "#5e6f85" },
  { name: "Wedgewood Blue", hex: "#6b8ba4" }, { name: "Forest Green", hex: "#2f4a3b" }, { name: "Cranberry", hex: "#7a2a2e" },
];

export const posts = [
  {
    slug: "how-much-do-seamless-gutters-cost-palm-beach-county",
    title: "How Much Do Seamless Gutters Cost in Palm Beach County? (2026 Pricing Guide)",
    description: "Real 2026 pricing for seamless aluminum gutters in Boynton Beach, Delray Beach and Boca Raton, what drives the cost up or down, and how to compare quotes.",
    date: "2026-09-15",
    readTime: "6 min",
    excerpt: "Most homeowners in Palm Beach County pay between $9 and $16 per linear foot for 6-inch seamless aluminum gutters. Here is what moves the number and how to compare quotes.",
    body: `
<p>If you've started collecting gutter quotes, you've probably noticed they're all over the map. One company quotes $1,400, another $3,800 for what sounds like the same job. Here's how seamless gutter pricing actually works in Palm Beach County in 2026, so you can compare apples to apples.</p>
<h2>The short answer</h2>
<p>For 6-inch seamless aluminum gutters, expect <strong>$9 to $16 per linear foot installed</strong>, including downspouts, hangers, miters and removal of your old gutters. A typical single-story home with 150 linear feet of gutter lands between <strong>$1,500 and $2,400</strong>. Two-story homes with 200+ feet usually run <strong>$2,800 to $4,500</strong>.</p>
<h2>What pushes the price up</h2>
<ul>
<li><strong>Stories.</strong> Second-story work takes longer and requires more equipment and safety setup.</li>
<li><strong>Roof complexity.</strong> Every inside or outside corner needs a miter. A simple rectangle has four; a Mediterranean-style roof can have twenty.</li>
<li><strong>Gutter size.</strong> 7-inch gutters cost roughly 20% more than 6-inch but move far more water on tile roofs.</li>
<li><strong>Downspouts.</strong> Oversized 3x4 downspouts cost a bit more than 2x3 but almost never clog.</li>
<li><strong>Fascia repair.</strong> Rotted fascia must be replaced before new gutters go up, or the hangers won't hold.</li>
<li><strong>Gutter guards.</strong> Adding micro-mesh protection runs $8 to $14 per foot but eliminates cleaning.</li>
</ul>
<h2>What a cheap quote usually hides</h2>
<p>If a quote is far below everyone else, ask these questions: What gauge aluminum (.027 is builder-grade, .032 is what we use)? Are hangers screwed or nailed? How far apart? Is old gutter removal and disposal included? Is there a written workmanship warranty?</p>
<h2>Get an instant ballpark</h2>
<p>Use the <a href="/#estimate">instant estimator on our homepage</a> to get a range for your home in 30 seconds, then <a href="/contact/">request a free written quote</a>. We'll measure on site and the number we give you is the number you pay.</p>`,
  },
  {
    slug: "signs-your-gutters-need-replacing-florida",
    title: "7 Signs Your Gutters Need Replacing Before Hurricane Season",
    description: "Sagging, separating seams, peeling paint, pooling water: the warning signs Florida homeowners should check before the rainy season starts.",
    date: "2026-05-02",
    readTime: "5 min",
    excerpt: "Walk around your house after the next rain and look for these seven signs. If you see three or more, it is time to call before the June storms arrive.",
    body: `
<p>Gutters fail quietly. By the time you notice water in the garage or a stain running down the stucco, the damage has been building for months. Walk the perimeter of your home after the next rain and look for these signs.</p>
<h2>1. Sagging or pulling away from the fascia</h2><p>Spike-and-ferrule hangers rust and loosen. Once the gutter tilts, water pools and the weight makes it worse.</p>
<h2>2. Separating seams and corners</h2><p>Sectional gutters leak at joints first. If you see drips at a corner during rain, the sealant has failed.</p>
<h2>3. Peeling paint or rust streaks</h2><p>On aluminum, peeling or chalking paint means the coating is gone. On steel, orange streaks mean rust has started from the inside.</p>
<h2>4. Water marks or mildew under the gutter</h2><p>Dark streaks on fascia or soffit below the gutter line mean water has been running behind the gutter.</p>
<h2>5. Pooling water or erosion at the foundation</h2><p>Trenches in the mulch or soil directly under the roofline mean water is overshooting or leaking through.</p>
<h2>6. Cracks or splits</h2><p>Small cracks become big ones after one hurricane season. Vinyl gutters are especially prone to this in Florida heat.</p>
<h2>7. Gutters that overflow in every heavy rain</h2><p>If you've cleaned them and they still overflow, they're undersized for your roof. Most Florida homes need 6-inch, not 5-inch.</p>
<h2>What to do next</h2><p>Three or more signs means replacement is usually cheaper than chasing repairs. <a href="/contact/">Request a free inspection</a> and we'll give you an honest repair-vs-replace recommendation.</p>`,
  },
  {
    slug: "gutter-guards-worth-it-florida",
    title: "Are Gutter Guards Worth It in South Florida? An Honest Answer",
    description: "Which gutter guards actually work against palm fronds, pine needles and roof grit in Florida, which ones fail, and when they are worth the money.",
    date: "2026-03-10",
    readTime: "4 min",
    excerpt: "Some guards work beautifully in Florida. Some are a waste of money. The difference comes down to the mesh, the pitch and what trees are over your roof.",
    body: `
<p>Every homeowner asks us the same question: are gutter guards worth it? The honest answer is: it depends entirely on which guard, and what's growing over your roof.</p>
<h2>Guards that fail in Florida</h2>
<ul>
<li><strong>Foam inserts.</strong> They hold moisture, grow mold and clog with roof grit within a year.</li>
<li><strong>Plastic screens.</strong> Large holes let pine needles through; the plastic goes brittle in the sun.</li>
<li><strong>Reverse-curve hoods.</strong> In heavy Florida downpours, water overshoots the curve and pours over the edge.</li>
</ul>
<h2>Guards that work</h2>
<p><strong>Stainless-steel micro-mesh</strong> on an aluminum frame is the only category we've seen hold up through multiple hurricane seasons. The mesh is fine enough to stop shingle grit and pine needles, and surface tension pulls water through even during a 3-inch-per-hour storm.</p>
<h2>When guards are worth it</h2>
<ul>
<li>You have oaks, pines or palms over the roof</li>
<li>You're paying for cleaning twice a year or more</li>
<li>Your home is two stories and you'd never clean them yourself</li>
<li>You're installing new gutters anyway (bundled pricing is much lower)</li>
</ul>
<h2>When to skip them</h2>
<p>If you have no trees near the house and your gutters stay clean year-round, save your money. We'll tell you that on the estimate visit.</p>
<p><a href="/services/gutter-guards/">Learn more about our gutter guard options</a> or <a href="/contact/">request a free estimate</a>.</p>`,
  },
];

export const nav = [
  { label: "Services", href: "/services/", children: services.map((s) => ({ label: s.name, href: `/services/${s.slug}/` })) },
  { label: "Service Areas", href: "/service-areas/", children: cities.map((c) => ({ label: c.name, href: `/gutters-${c.slug}-fl/` })) },
  { label: "Why Us", href: "/about/" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];
