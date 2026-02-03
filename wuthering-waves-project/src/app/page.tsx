'use client';

import { useState, useEffect } from 'react';
import './globals.css';
import { 
  X,                 // for close icon
  Gamepad2,          // for gamepad icon  
  Volume2,           // for volume icon
  Scroll,            // for scroll icon
  Flame,             // for fire icon
  Heart,             // for heart icon
  Zap,               // for bolt/attack icon
  Shield,            // for shield icon
  ChevronDown,       // for chevron down
  Wind,              // for wind icon
  HeartPulse,        // alternative heart icon
  Swords,            // for skills/attacks
  Sparkles           // for effects
} from 'lucide-react';

interface Character {
  id: number;
  name: string;
  title: string;
  image: string;
  description: string;
  element: string;
  weapon: string;
  faction: string;
  region: string;
  release: string;
  grade: string;
  resonatorId: string;
  stats: { hp: number; atk: number; def: number };
  skills: Array<{ name: string; description: string }>;
  voiceLine: string;
  tags: string[];
}

const elementColors = {
  "Electro": "#a855f7",
  "Fusion": "#f97316", 
  "Glacier": "#22d3ee",
  "Spectro": "#10b981",
  "Havoc": "#dc2626",
  "Aero": "#3b82f6",
  "Glacio": "#06b6d4"
};

const wutheringCharacters: Character[] = [
  {
    id: 1,
    name: "CAMELLYA",
    title: "Sanguine Blossom",
    image: "https://i.pinimg.com/736x/7f/8c/0a/7f8c0a71600766f725e0adcf209b6b7c.jpg",
    description: "Is that you? The one always in my dreams... My seed of fate.",
    element: "Havoc",
    weapon: "Sword",
    faction: "The Black Shores",
    region: "The Black Shores",
    release: "Version 1.4",
    grade: "5-Star",
    resonatorId: "WU-CAM-104",
    stats: { hp: 10560, atk: 480, def: 412 },
    skills: [
      { name: "SWEET-SMELLING SHADOWS", description: "Performs up to 5 consecutive attacks using vine-like blade whips, dealing Havoc damage." },
      { name: "DARK NIGHT BLOSSOM", description: "Enters the 'Blossom' state, changing attack patterns and allowing for aerial combat maneuvers." },
      { name: "EPHEMERAL RED", description: "Ultimate: Unleashes a massive burst of Havoc damage through a blooming crimson flower." },
      { name: "REDOLENT THORNS", description: "Forte Circuit: Consumes 'Crimson Bud' to enhance damage and extend the Blossom state duration." }
    ],
    voiceLine: "Is that you? The one always in my dreams... My seed of fate.",
    tags: ["Havoc", "Main DPS", "5-Star", "The Black Shores"]
  },
  {
    id: 2,
    name: "SHOREKEEPER",
    title: "Euphonic Chrysalis",
    image: "https://i.pinimg.com/736x/9a/af/89/9aaf893a1edd4f727865d8afc03ea3ed.jpg",
    description: "Through silence, civilization will endure on this shore. And this shore... is a testament to my existence.",
    element: "Spectro",
    weapon: "Rectifier",
    faction: "The Black Shores",
    region: "The Black Shores",
    release: "Version 1.3",
    grade: "5-Star",
    resonatorId: "WU-SHK-103",
    stats: { hp: 15450, atk: 380, def: 420 },
    skills: [
      { name: "ORIGIN OF EVERYTHING", description: "Basic Attack: Commands butterflies to deal Spectro damage. Can be performed in mid-air." },
      { name: "CHAOS THEORY", description: "Resonance Skill: Summons Flare Butterflies to heal allies and deal damage to nearby enemies." },
      { name: "END OF ALL THINGS", description: "Ultimate: Creates a Stellar Realm domain that provides massive buffs and continuous healing based on Shorekeeper's HP." },
      { name: "PROMETHEAN FLAME", description: "Forte Circuit: Enhances the Stellar Realm, allowing it to evolve and provide Crit Rate or Crit Damage boosts." }
    ],
    voiceLine: "In the silent depths of the stars, I have always been watching over you.",
    tags: ["Spectro", "Healer", "5-Star", "Buffer"]
  },
  {
    id: 3,
    name: "PHROLOVA",
    title: "Symphony of Beyond",
    image: "https://i.pinimg.com/736x/22/d0/46/22d0467dba7c4f025cf4ccc9493a75e3.jpg",
    description: "Yet humans are but fragile flesh and bone, bound by the fleeting nature of time. Only in an eternity freed from both life and death can that boundary dissolve.",
    element: "Havoc",
    weapon: "Rectifier",
    faction: "Fractsidus",
    region: "Unknown",
    release: "Version 2.0", 
    grade: "5-Star",
    resonatorId: "WU-PHR-007",
    stats: { hp: 11200, atk: 510, def: 390 },
    skills: [
      { name: "RESONANT DISSONANCE", description: "Basic Attack: Commands her doll to perform multiple stages of Havoc attacks, weaving dark energy into the air." },
      { name: "PUPPETEER'S CHORAL", description: "Resonance Skill: Summons shadow spikes that track enemies, dealing Havoc damage and generating Dissonance energy." },
      { name: "REQUIEM OF ETERNAL NIGHT", description: "Ultimate: Creates a massive field of absolute zero, suppressing enemies and dealing massive Havoc damage over time." },
      { name: "VOID SYMPHONY", description: "Forte Circuit: When Dissonance is full, her doll enters a 'Hysteria' state, increasing attack speed and ignoring a portion of enemy defense." }
    ],
    voiceLine: "Life is a noisy, messy affair. Let me bring you the gift of silence.",
    tags: ["Havoc", "Main DPS", "5-Star", "Fractsidus"]
  },
  {
    id: 4,
    name: "LYNAE",
    title: "Radiant Spectrum",
    image: "https://i.pinimg.com/736x/48/f7/09/48f7098ee1c6cf4e1658b105e3835fbb.jpg",
    description: "Look at you now... Do you even remember who you are? It's time. The dream ends.",
    element: "Spectro",
    weapon: "Pistols",
    faction: "Startorch Academy",
    region: "Lahai-Roi",
    release: "Version 3.0",
    grade: "5-Star",
    resonatorId: "WU-LYN-105",
    stats: { hp: 11250, atk: 512, def: 395 },
    skills: [
      { name: "CHROMA DRIFT", description: "Basic Attack: Fires Spectro-infused paint rounds. While moving, she enters a skating state that increases mobility." },
      { name: "LYNAE-STYLE PALETTES", description: "Resonance Skill: Sprays vibrant pigments that deal Spectro damage and build 'Lumiflow' energy." },
      { name: "PRISMATIC OVERBLAST", description: "Ultimate: Unleashes a kaleidoscopic explosion of light, dealing massive Spectro damage and buffing team Attack." },
      { name: "CHROMATICITY MODELING", description: "Forte Circuit: Consumes Lumiflow to enter the 'Kaleidoscopic Parade' state, enhancing her shots into 'Spark Collisions'." }
    ],
    voiceLine: "Look at you now... Do you even remember who you are? It's time. The dream ends.",
    tags: ["Spectro", "Sub-DPS", "5-Star", "Amplifier"]
  },
  {
    id: 5,
    name: "CHISA",
    title: "Eye of Unravelling",
    image: "https://i.pinimg.com/736x/6d/29/2a/6d292ab7e32d965c4166fc4dfe1c1d46.jpg",
    description: "Whatever mires or chasms lie ahead, I will tread upon you and wade through!",
    element: "Havoc",
    weapon: "Broadblade",
    faction: "Startorch Academy",
    region: "The Black Shores",
    release: "Version 2.8",
    grade: "5-Star",
    resonatorId: "WU-CHS-105",
    stats: { hp: 11450, atk: 510, def: 415 },
    skills: [
      { name: "REIGN OF SILENCE", description: "Basic Attack: Performs up to 4 consecutive Broadblade strikes. Hitting enemies builds 'Ring of Chainsaw' energy." },
      { name: "FRACTURED COMPOSITION", description: "Resonance Skill: Performs a heavy slash. If energy is full, she enters 'Chainsaw Mode,' replacing attacks with high-frequency saw strikes." },
      { name: "MOMENT OF NIHILITY", description: "Ultimate: Unleashes a devastating vertical cleave that ignores a portion of the enemy's defense and deals massive Havoc damage." },
      { name: "SIGHT OF UNRAVELING", description: "Forte Circuit: While in Chainsaw Mode, she applies 'Unseen Snare' to enemies, causing them to take additional Havoc damage over time." }
    ],
    voiceLine: "I can break down any problem into its smallest parts. Let's see how you hold together.",
    tags: ["Havoc", "Hybrid Support", "5-Star", "Chainsaw Mode"]
  },
  {
    id: 6,
    name: "CARTETHIYA",
    title: "Feathered Tempest",
    image: "https://i.pinimg.com/1200x/44/6d/94/446d94d8a99d3044cc267fab4974f0a7.jpg",
    description: "Though the night may be long, the dawn always follows.",
    element: "Aero",
    weapon: "Sword",
    faction: "Ragunna",
    region: "Rinascita",
    release: "Version 2.4",
    grade: "5-Star",
    resonatorId: "WU-CRT-106",
    stats: { hp: 11567, atk: 545, def: 410 },
    skills: [
      { 
        name: "SWORD TO CARVE MY FORMS", 
        description: "Basic Attack: Performs up to 5 rapid Sword strikes. In mid-air, consumes Stamina to perform a Plunging Attack." 
      },
      { 
        name: "SWORD TO BEAR THEIR NAMES", 
        description: "Resonance Skill: Dashes forward with a gale-force thrust. If 'Tempest' is active, this skill transforms into an aerial flurry." 
      },
      { 
        name: "A KNIGHT'S HEARTFELT PRAYERS", 
        description: "Resonance Liberation: Unleashes the power of the Threnodian Leviathan, dealing massive Aero DMG and pulling nearby enemies into a vortex." 
      },
      { 
        name: "TEMPEST", 
        description: "Forte Circuit: Accumulate 'Gale' through attacks. When full, Heavy Attacks consume Gale to enter the Tempest state, granting flight and enhanced Aero Erosion." 
      }
    ],
    voiceLine: "Whether the future is bright or dim, I will hold the blade firmly and confront all that comes her way.",
    tags: ["Aero", "Main DPS", "5-Star", "Traction", "Aero Erosion"]
  },
  {
    id: 7,
    name: "CARLOTTA",
    title: "Crystal Remorph",
    image: "https://i.pinimg.com/736x/a5/da/e4/a5dae41430e6ccb6f66ab6989598909d.jpg",
    description: "No need to rush... The ball has only just begun.",
    element: "Glacio",
    weapon: "Pistols",
    faction: "Montelli Family",
    region: "Rinascita",
    release: "Version 2.0",
    grade: "5-Star",
    resonatorId: "WU-CRL-007",
    stats: { hp: 10850, atk: 520, def: 380 },
    skills: [
      { name: "NECESSARY MEASURES", description: "Basic Attack: Fires high-precision Glacio shots. Can perform unique Mid-air Attacks while immune to interruption." },
      { name: "CHROMATIC SPLENDOR", description: "Resonance Skill: Fires crystal shards that mark enemies with 'Deconstruction,' dealing Glacio DMG and generating 'Substance'." },
      { name: "FATAL FINALE", description: "Resonance Liberation: Fires her musket in a wide arc, dealing massive AoE Glacio DMG and entering the 'Twilight Tango' state." },
      { name: "IMMINENT OBLIVION", description: "Forte Circuit: Consumes all 'Substance' and 'Moldable Crystals' to unleash a high-damage Heavy Attack that resets her Skill cooldown." }
    ],
    voiceLine: "Life is like a gem—beautiful before it fades. But I decide when the light goes out.",
    tags: ["Glacio", "Main DPS", "5-Star", "Pistols"]
  },
  {
    id: 8,
    name: "AEMEATH",
    title: "Guiding Starlance",
    image: "https://i.pinimg.com/736x/11/2c/3c/112c3c768f93c40ccec510a5a2c1b528.jpg",
    description: "Time to give your future some thought. What will you do with your lives?",
    element: "Fusion",
    weapon: "Sword",
    faction: "N/A",
    region: "N/A",
    release: "Soon",
    grade: "5-Star",
    resonatorId: "WU-AEM-008",
    stats: { hp: 13120, atk: 502, def: 295 },
    skills: [
      { name: "Unknown", description: "Unknown." },
      { name: "Unknown", description: "Unknown." },
      { name: "Unknown", description: "Unknown." }
    ],
    voiceLine: "I. MEANT. EVERY. WORD!",
    tags: ["Fusion", "Main DPS", "5-Star", "Unknown"]
  },
  {
    id: 9,
    name: "IUNO",
    title: "Stasis, Cycle, Renewal",
    image: "https://i.pinimg.com/736x/f2/52/a0/f252a0a0442ea2ee66df7d891f68114c.jpg",
    description: "If the moon refuses to shine on the darkness ahead, then it's up to me— To draw fate's bow and release it where I choose!",
    element: "Aero",
    weapon: "Rectifier",
    faction: "Tetragon Temple",
    region: "Septimont",
    release: "September 17, 2025 (Version 2.6)",
    grade: "5-Star",
    resonatorId: "WU-IUN-109",
    stats: { hp: 10450, atk: 525, def: 385 },
    skills: [
      { 
        name: "MOON STEPS", 
        description: "Basic Attack: Commands Aero energy to strike enemies, mirroring the phases of the moon." 
      },
      { 
        name: "FORESIGHT FUGUE", 
        description: "Resonance Skill: Unleashes a predictive pulse that deals Aero DMG and grants Iuno 'Prophetic Insight'." 
      },
      { 
        name: "BENEATH LUNAR TIDES", 
        description: "Resonance Liberation: Rewrites the battlefield's fate, dealing massive AoE Aero DMG and increasing the team's Energy Regen." 
      },
      { 
        name: "EBB AND FLOW", 
        description: "Forte Circuit: Consumes Prophetic Insight to enter the 'Fate Defier' state, allowing for rapid-fire Aero projectiles that track enemies." 
      }
    ],
    voiceLine: "If the moon refuses to shine on the darkness ahead, then it's up to me— To draw fate's bow and release it where I choose!",
    tags: ["Aero", "Sub-DPS", "5-Star", "Buffer"]
  },
  
  {
    id: 10,
    name: "GALBRENA",
    title: "Fiend of Ever-Burning Flame",
    image: "https://i.pinimg.com/736x/1f/c0/9d/1fc09dd440aaab6449faa6d246e15070.jpg",
    description: "Who's my next prey? Once, they called me Angel. Now, I am the flame that consumes the Abyss.",
    element: "Fusion",
    weapon: "Pistols",
    faction: "The Black Shores",
    region: "Septimont (Formerly) / Solaris-3",
    release: "Version 2.7",
    grade: "5-Star",
    resonatorId: "WU-GAL-110",
    stats: { hp: 10120, atk: 560, def: 365 },
    skills: [
      { 
        name: "SLAYER'S TRIGGER", 
        description: "Basic Attack: Fires rounds infused with condensed Fusion energy. Successful hits build 'Chimera Resonance'." 
      },
      { 
        name: "EDGE TRANSCENDED", 
        description: "Resonance Skill: Galbrena enters a high-speed hunting state, dashing through targets and dealing Fusion DMG based on consumed frequencies." 
      },
      { 
        name: "HELLFIRE ABSOLUTION", 
        description: "Resonance Liberation: Unleashes a devastating burst of Ever-Burning Flame, incinerating all nearby Tacet Discords and resetting Skill cooldowns." 
      },
      { 
        name: "BEYOND THRESHOLD", 
        description: "Forte Circuit: When Fusion Energy reaches the threshold, Galbrena transforms into her 'Fiend' form, greatly enhancing ATK and applying 'Ashen Burn'." 
      }
    ],
    voiceLine: "The forest may speak, but I only listen to the sound of frequencies shattering.",
    tags: ["Fusion", "Main DPS", "5-Star", "Shield-Breaker"]
},
  {
    id: 11,
    name: "BRANT",
    title: "Flamebound Compass",
    image: "https://i.pinimg.com/736x/38/51/80/38518049882031edadc8a34566610ec8.jpg",
    description: "The curtains pull back and I'm here to hunt for every laugh! A pleasure to make your acquaintance.",
    element: "Fusion",
    weapon: "Sword",
    faction: "Troupe of Fools",
    region: "Rinascita",
    release: "Version 2.1",
    grade: "5-Star",
    resonatorId: "WU-BRN-111",
    stats: { hp: 15200, atk: 380, def: 445 }, 
    skills: [
      { 
        name: "CAPTAIN'S RHAPSODY", 
        description: "Basic Attack: A theatrical 4-stage sword combo that inflicts Fusion DMG and builds 'Appreciation' stacks." 
      },
      { 
        name: "ANCHORS AWEIGH!", 
        description: "Resonance Skill: Brant strikes with a flaming anchor-echo, dealing Fusion DMG and healing nearby allies based on his Max HP." 
      },
      { 
        name: "TO THE HORIZON", 
        description: "Resonance Liberation: Creates a 'Grand Stage' domain that provides massive Fusion DMG Amplification and continuous healing." 
      },
      { 
        name: "OCEAN ODYSSEY", 
        description: "Forte Circuit: Consuming Appreciation stacks allows Brant to execute a 'Carnevale' attack, significantly boosting the team's Resonance Skill DMG." 
      }
    ],
    voiceLine: "All the world's an actor's stage, and I'm the captain of this carnevale!",
    tags: ["Fusion", "Support", "Healer", "5-Star", "Amplification"]
},
  {
    id: 12,
    name: "QIUYUAN",
    title: "Bambooscape",
    image: "https://i.pinimg.com/736x/01/d2/eb/01d2eb3408c110badab88463367af3d6.jpg",
    description: "Name the target. I'll take care of the rest. Former agent or wandering traveler—the blade remains the same.",
    element: "Aero",
    weapon: "Sword",
    faction: "Mingting (Formerly) / Independent",
    region: "Chongzhou, Huanglong",
    release: "Version 2.7",
    grade: "5-Star",
    resonatorId: "WU-QYU-112",
    stats: { hp: 11200, atk: 515, def: 410 },
    skills: [
      { 
        name: "INKWASH", 
        description: "Basic Attack: Performs up to 5 sword strikes. Heavy Attack consumption is reduced while in the 'Quietude' state." 
      },
      { 
        name: "THROUGH THE GROVES", 
        description: "Resonance Skill: A rapid series of dashes and slashes that deal Aero DMG and provide a massive boost to Concerto Energy." 
      },
      { 
        name: "SUNDERING STRIKE", 
        description: "Resonance Liberation: A singular, powerful unsheathing strike that deals massive Aero DMG and buffs the Echo Skill DMG of the next character." 
      },
      { 
        name: "EBBS AND FLOWS", 
        description: "Forte Circuit: Accumulate 'Bamboo Spirit' through Basic Attacks. When full, Heavy Attacks deal 50% more DMG and trigger an additional Aero shockwave." 
      }
    ],
    voiceLine: "Sword sheathed, mind unclouded. Mastery isn't found in fame, but in the silence of the woods.",
    tags: ["Aero", "Sub-DPS", "5-Star", "Concerto Support", "Heavy Attack"]
},
  {
    id: 13,
    name: "CHANGLI",
    title: "Eternal Blaze",
    image: "https://i.pinimg.com/1200x/14/e8/71/14e871068fbe5bc171b2dcdc54e548a0.jpg",
    description: "Eons of time on this vast land, all encapsulated in a humble game... I am fortunate to have you as my opponent.",
    element: "Fusion",
    weapon: "Sword",
    faction: "Jinzhou",
    region: "Huanglong",
    release: "Version 1.1",
    grade: "5-Star",
    resonatorId: "WU-CHL-113",
    stats: { hp: 10750, atk: 528, def: 392 },
    skills: [
      { 
        name: "BLAZING ENLIGHTENMENT", 
        description: "Basic Attack: Unleashes up to 4 sword strikes. Following a Resonance Skill, she can perform a mid-air attack that builds 'Envisage' stacks." 
      },
      { 
        name: "TRIPARTITE FLAMES", 
        description: "Resonance Skill: Dashes and strikes with high-speed Fusion slashes. Can be used twice, or transformed into an aerial plunge." 
      },
      { 
        name: "RADIANCE OF FEALTY", 
        description: "Resonance Liberation: Deals massive AoE Fusion DMG and instantly grants 4 stacks of Envisage." 
      },
      { 
        name: "FLAMING SACRIFICE", 
        description: "Forte Circuit: Consumes 4 Envisage stacks to perform a massive Heavy Attack that ignores a portion of enemy defense." 
      }
    ],
    voiceLine: "Calculating every move, in a race against time and chaos.",
    tags: ["Fusion", "Main DPS", "5-Star", "Resonance Skill DMG", "Buffer"]
},
  {
    id: 14,
    name: "PHOEBE",
    title: "Graceful Luminescence",
    image: "https://i.pinimg.com/736x/45/64/e8/4564e8580cb569dbbb00c4e34170a263.jpg",
    description: "Praise the Sentinel. May They guide you to compassion and enlightenment.",
    element: "Spectro",
    weapon: "Rectifier",
    faction: "Order of the Deep (Ragunna)",
    region: "Rinascita",
    release: "Version 2.1",
    grade: "5-Star",
    resonatorId: "WU-PHB-114",
    stats: { hp: 10800, atk: 530, def: 390 },
    skills: [
      { 
        name: "O COME DIVINE LIGHT", 
        description: "Basic Attack: Fires Spectro projectiles. While in mid-air, she can perform a specialized floating attack." 
      },
      { 
        name: "TO WHERE LIGHT SHINES", 
        description: "Resonance Skill: Summons a pillar of light that deals Spectro DMG and applies 'Spectro Frazzle' to enemies." 
      },
      { 
        name: "DAWN OF ENLIGHTENMENT", 
        description: "Resonance Liberation: Unleashes a massive wave of Spectro energy that heals the party and deals significant DMG based on Concerto Energy." 
      },
      { 
        name: "RADIANT INVOCATION", 
        description: "Forte Circuit: Accumulate 'Divine Favor' stacks. When full, her Heavy Attack triggers an explosion of golden light that restores stamina to allies." 
      }
    ],
    voiceLine: "Beneath her composed exterior burns a vibrant spirit, alight with heartfelt joy for all she holds dear.",
    tags: ["Spectro", "Main DPS", "5-Star", "Concerto Efficiency", "Frazzle"]
},
  {
    id: 15,
    name: "AUGUSTA",
    title: "Magnetism Before Light",
    image: "https://i.pinimg.com/1200x/92/b3/80/92b3804b2b01becee41861b55032ecfe.jpg",
    description: "With the blazing sun as witness... Glory, bow before us.",
    element: "Electro",
    weapon: "Broadblade",
    faction: "Ephor's Palace",
    region: "Septimont",
    release: "Version 2.6",
    grade: "5-Star",
    resonatorId: "WU-AUG-115",
    stats: { hp: 10900, atk: 542, def: 420 },
    skills: [
      { 
        name: "HUNTER'S PATH", 
        description: "Basic Attack: Performs up to 4 heavy Broadblade strikes. Holding Basic Attack during the 4th hit triggers a 'Gladiator's Sweep'." 
      },
      { 
        name: "WARRIOR'S BLADE", 
        description: "Resonance Skill: Unleashes an Electro shockwave. If cast after a Heavy Attack, it consumes 'Magnetic Charge' to perform an empowered overhead slam." 
      },
      { 
        name: "SUNWARD CONQUEST", 
        description: "Resonance Liberation: Augusta leaps into the air and strikes the ground with the force of a falling star, dealing massive AoE Electro DMG and entering the 'Radiant Light' state." 
      },
      { 
        name: "CALL ME BY THE SUN", 
        description: "Forte Circuit: While in the Radiant Light state, Basic Attacks are converted into Heavy Attack DMG and gain increased ignore-DEF properties." 
      }
    ],
    voiceLine: "I am a mere mortal, but my blade speaks with the authority of the sun.",
    tags: ["Electro", "Main DPS", "5-Star", "Heavy Attack DMG", "DMG Amplification"]
}
];

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  // Close modal when clicking outside content
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCharacter) {
        closeModal();
      }
    };

    if (selectedCharacter) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [selectedCharacter]);

  return (
    <>
      <div className="wuwa-pattern"></div>
      <div className="element-waves">
        <div className="wave purple"></div>
        <div className="wave cyan"></div>
        <div className="wave pink"></div>
      </div>

      <div className="container">
        <header className="header">
          <div className="wuwa-logo">WUTHERING WAVES</div>
          <div className="patch-badge">RESONANT TIDES • 1.2</div>
          <p className="subtitle">Character Archives Database</p>
          <div className="resonance-status">
            <span className="resonance-text">RESONANCE STATUS:</span>
            <span className="resonance-level">ACTIVE</span>
          </div>
        </header>

        <main className="gallery-container">
          <div className="database-id">DATABASE ID: WU-CHAR-ARCHIVE-001 • {wutheringCharacters.length} RESONATORS LOADED</div>
          
          <div className="character-grid">
            {wutheringCharacters.map((character) => {
              const elementColor = elementColors[character.element as keyof typeof elementColors] || '#94a3b8';
              
              return (
                <div 
                  key={character.id} 
                  className="character-card"
                  onClick={() => setSelectedCharacter(character)}
                >
                  <img src={character.image} alt={character.name} className="character-image" />
                  <div className="character-info">
                    <div className="character-header">
                      <h3 className="character-name">{character.name}</h3>
                      <span 
                        className="element-badge" 
                        style={{ 
                          backgroundColor: `${elementColor}20`,
                          border: `1px solid ${elementColor}`,
                          color: elementColor
                        }}
                      >
                        {character.element}
                      </span>
                    </div>
                    <div className="character-title">{character.title}</div>
                    <p className="character-short-desc">{character.description}</p>
                    <div className="character-tags">
                      <span className="tag">{character.grade}</span>
                      <span className="tag">{character.weapon}</span>
                      {character.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="terminal-output">
            <div className="terminal-line">
              <span className="prompt">&gt;</span>
              <span>SYSTEM: {wutheringCharacters.length} Resonators loaded into database...</span>
            </div>
            <div className="terminal-line">
              <span className="prompt">&gt;</span>
              <span>STATUS: Ready for resonance synchronization...</span>
            </div>
            <div className="terminal-line">
              <span className="prompt">&gt;</span>
              <span>CONNECTION: Secure link established with Kuro Games</span>
            </div>
            <div className="terminal-line">
              <span className="prompt">&gt;</span>
              <span>UPDATE: Soon...</span>
            </div>
          </div>
        </main>

        {/* Expanded Character Modal */}
        <div className={`modal ${selectedCharacter ? 'active' : ''}`} onClick={handleModalClick}>
          {selectedCharacter && (
            <>
              <button className="close-modal">
                <X className="icon" /> {/* X is the close/delete icon */}
                <span>CLOSE</span>
              </button>

              <div className="modal-content">
                <div className="modal-body">
                  {/* Left Column - Character Showcase */}
                  <div className="character-showcase">
                    <div className="character-art">
                      <img src={selectedCharacter.image} alt={selectedCharacter.name} />
                      <div 
                        className="element-glow" 
                        style={{ color: elementColors[selectedCharacter.element as keyof typeof elementColors] }}
                      ></div>
                    </div>
                    
                    <div className="character-meta">
                      <div className="meta-item">
                        <span className="meta-label">Element</span>
                        <span className="meta-value">{selectedCharacter.element}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Weapon</span>
                        <span className="meta-value">{selectedCharacter.weapon}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Rarity</span>
                        <span className="meta-value">{selectedCharacter.grade}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Character Details */}
                  <div className="character-details">
                    <div className="detail-header">
                      <div className="character-id">
                        <span className="id-label">RESONATOR ID:</span>
                        <span className="id-value">{selectedCharacter.resonatorId}</span>
                      </div>
                      <h2>{selectedCharacter.name}</h2>
                      <div className="detail-subtitle">{selectedCharacter.title}</div>
                    </div>

                    {/* Stats */}
                    <div className="stats-grid">
                      <div className="stat-card">
                        <Heart className="stat-icon" />
                        <span className="stat-label">Base HP</span>
                        <span className="stat-value">{selectedCharacter.stats.hp.toLocaleString()}</span>
                      </div>
                      <div className="stat-card">
                        <Zap className="stat-icon" />
                        <span className="stat-label">Base ATK</span>
                        <span className="stat-value">{selectedCharacter.stats.atk}</span>
                      </div>
                      <div className="stat-card">
                        <Shield className="stat-icon" />
                        <span className="stat-label">Base DEF</span>
                        <span className="stat-value">{selectedCharacter.stats.def}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="detail-section">
                      <div className="section-header">
                        <i className="fas fa-scroll"></i>
                        <h3 className="section-title">CHARACTER PROFILE</h3>
                      </div>
                      <p>{selectedCharacter.description}</p>
                    </div>

                    {/* Skills */}
                    <div className="detail-section">
                      <div className="section-header">
                        <i className="fas fa-fire"></i>
                        <h3 className="section-title">RESONANCE ABILITIES</h3>
                      </div>
                      <div className="skills-grid">
                        {selectedCharacter.skills.map((skill, index) => (
                          <div key={index} className="skill-card">
                            <div className="skill-name">{skill.name}</div>
                            <p className="skill-desc">{skill.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Voice Line */}
                    <div className="voice-card">
                      <div className="voice-content">
                        <i className="fas fa-volume-up voice-icon"></i>
                        <p className="voice-text">"{selectedCharacter.voiceLine}"</p>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="lore-grid">
                      <div className="lore-item">
                        <span className="lore-label">Faction</span>
                        <span className="lore-value">{selectedCharacter.faction}</span>
                      </div>
                      <div className="lore-item">
                        <span className="lore-label">Region</span>
                        <span className="lore-value">{selectedCharacter.region}</span>
                      </div>
                      <div className="lore-item">
                        <span className="lore-label">Release</span>
                        <span className="lore-value">{selectedCharacter.release}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <footer className="footer">
          <div className="copyright">
            © KURO GAMES • WUTHERING WAVES
          </div>
          <div className="studio-info">
            <i className="fas fa-gamepad"></i>
            <span className="studio-name">KURO GAME STUDIO</span>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">DATABASE ARCHIVE</a>
            <a href="#" className="footer-link">RESONANCE SYSTEM</a>
            <a href="#" className="footer-link">CHARACTER LORE</a>
            <a href="#" className="footer-link">GAME UPDATES</a>
          </div>
          <div className="version-info">
            AARON VILLEJO
          </div>
        </footer>
      </div>
    </>
  );
}