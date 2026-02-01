'use client';

import { useState } from 'react';
import './globals.css';

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
  "Havoc": "#dc2626"
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
    resonatorId: "WU-CAM-104", // Adjusted to follow standard naming
    stats: { hp: 10560, atk: 480, def: 412 }, // Representative base stats
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
    stats: { hp: 15450, atk: 380, def: 420 }, // Focused on high HP for healing scaling
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
    title: "Symphony of Beyondr",
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
    stats: { hp: 11250, atk: 512, def: 395 }, // Base stats at high level
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
    voiceLine: "I can break down any problem into its smallest parts. Let’s see how you hold together.",
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
      { name: "Unknown", description: "Uknown." },
      { name: "Unknown", description: "Uknown." },
      { name: "Unknown", description: "Uknown." }
    ],
    voiceLine: "I. MEANT. EVERY. WORD!",
    tags: ["Fusion", "Main DPS", "5-Rank", "Uknown"]
  },
  {
    id: 9,
    name: "IUNO",
    title: "Stasis, Cycle, Renewal",
    image: "https://i.pinimg.com/736x/f2/52/a0/f252a0a0442ea2ee66df7d891f68114c.jpg",
    description: "If the moon refuses to shine on the darkness ahead, then it's up to me— To draw fate's bow and release it where I choose!",
    element: "Aero",
    weapon: "Rectifier", // Priestess archetype usually fits the Rectifier class
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
}
];

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <>
      <div className="wuwa-pattern"></div>
      <div className="element-bursts">
        <div className="burst electro"></div>
        <div className="burst fusion"></div>
        <div className="burst glacier"></div>
        <div className="burst spectro"></div>
      </div>

      <div className="container">
        <header className="header">
          <div className="game-title">
            <span className="element-badge electro">ELECTRO</span>
            <h1><i className="fas fa-wind"></i> WUTHERING WAVES</h1>
            <span className="element-badge glacier">GLACIER</span>
          </div>
          <div className="patch-label">PATCH 1.2</div>
          <p className="subtitle">Tides of Resonance - Echo Character Archives</p>
          <div className="resonance-indicator">RESONANCE <span className="resonance-level">MAX</span></div>
        </header>

        <main className="gallery-container">
          <div className="database-id">DATABASE ID: WU-CHAR-001</div>
          
          <div className="character-grid">
            {wutheringCharacters.map((character) => {
              const elementColor = elementColors[character.element as keyof typeof elementColors] || '#94a3b8';
              const gradeColor = character.grade.includes('S') ? '#f97316' : '#22d3ee';
              
              return (
                <div 
                  key={character.id} 
                  className="character-card"
                  onClick={() => setSelectedCharacter(character)}
                >
                  <img src={character.image} alt={character.name} className="character-image" />
                  <div className="character-info">
                    <h3 className="character-name">{character.name}</h3>
                    <div className="character-title">{character.title}</div>
                    <p className="character-short-desc">{character.description.substring(0, 120)}...</p>
                    <div className="character-tags">
                      <span className="tag" style={{ borderColor: elementColor, color: elementColor }}>
                        {character.element}
                      </span>
                      <span className="tag" style={{ borderColor: gradeColor, color: gradeColor }}>
                        {character.grade}
                      </span>
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
            <div className="terminal-line">&gt; SYSTEM: All Resonators Loaded</div>
            <div className="terminal-line">&gt; STATUS: Ready for Deployment</div>
          </div>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="copyright-info">
              <div className="copyright-line"></div>
              <p>© KURO GAMES - WUTHERING WAVES</p>
              <div className="copyright-line"></div>
            </div>
            <div className="footer-info">
              <div className="studio-info">
                <i className="fas fa-gamepad"></i>
                <span>KURO GAME STUDIO</span>
              </div>
              <div className="footer-links">
                <a href="#" className="footer-link"><i className="fas fa-database"></i> CHARACTER DATABASE</a>
                <a href="#" className="footer-link"><i className="fas fa-wave-square"></i> RESONANCE SYSTEM</a>
                <a href="#" className="footer-link"><i className="fas fa-map"></i> TIDES OF HUAXU</a>
              </div>
            </div>
            <div className="version-info">
              VERSION 1.2 "ECHOES OF THE PAST" • CONNECTION ESTABLISHED
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}