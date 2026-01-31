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
    title: "The Crimson Weaver",
    image: "https://i.pinimg.com/736x/7f/8c/0a/7f8c0a71600766f725e0adcf209b6b7c.jpg",
    description: "A mysterious resonator who commands the power of threads and fate. Camellya weaves reality itself, manipulating threads of destiny to control the battlefield. Her abilities focus on crowd control and strategic positioning. She is known for her elegant yet deadly combat style, using threads that can cut through even the toughest materials.",
    element: "Fusion",
    weapon: "Scythe",
    faction: "Independent",
    region: "Forgotten Realms",
    release: "Version 1.1",
    grade: "S-Rank",
    resonatorId: "WU-CAM-001",
    stats: { hp: 14567, atk: 423, def: 289 },
    skills: [
      { name: "FATE'S THREAD", description: "Weaves threads that ensnare enemies, dealing Fusion damage and applying entanglement status." },
      { name: "CRIMSON WEAVE", description: "Unleashes a web of crimson threads that slash through multiple enemies." },
      { name: "DESTINY'S EMBRACE", description: "Ultimate ability that creates a domain where Camellya controls all threads of fate." },
      { name: "WEAVER'S DANCE", description: "Passive skill that increases thread damage when enemies are entangled." }
    ],
    voiceLine: "The threads of fate are mine to weave. Will you be caught in my tapestry?",
    tags: ["Fusion", "Crowd Control", "S-Rank", "Strategic"]
  },
  {
    id: 2,
    name: "SHOREKEEPER",
    title: "Guardian of Tides",
    image: "https://i.pinimg.com/736x/9a/af/89/9aaf893a1edd4f727865d8afc03ea3ed.jpg",
    description: "A stoic guardian who commands the power of oceans and tides. Shorekeeper's abilities revolve around water manipulation and defensive capabilities, making him an excellent tank and support character. He carries the weight of protecting coastal settlements from threats both above and below the waves.",
    element: "Glacier",
    weapon: "Greatsword",
    faction: "Coastal Sentinels",
    region: "Azure Coast",
    release: "Launch",
    grade: "A-Rank",
    resonatorId: "WU-SHK-002",
    stats: { hp: 17890, atk: 345, def: 456 },
    skills: [
      { name: "TIDAL BARRIER", description: "Summons a wall of water that blocks incoming attacks and heals allies." },
      { name: "ABYSSAL CRASH", description: "Smashes the ground with water-infused force, creating shockwaves." },
      { name: "OCEAN'S WRATH", description: "Ultimate that calls forth a massive tidal wave to engulf enemies." },
      { name: "MARINE FORTITUDE", description: "Passive that increases defense when near bodies of water." }
    ],
    voiceLine: "The tides obey my will. Stand firm, and let the ocean shield you.",
    tags: ["Glacier", "Tank", "A-Rank", "Defensive"]
  },
  {
    id: 3,
    name: "PHROLOVA",
    title: "Flame Dancer",
    image: "https://i.pinimg.com/736x/22/d0/46/22d0467dba7c4f025cf4ccc9493a75e3.jpg",
    description: "A fiery performer who dances with flames, using them as extensions of her emotions. Phrolova's combat style combines graceful movements with explosive fire attacks that intensify with her passion.",
    element: "Fusion",
    weapon: "Chakrams",
    faction: "Traveling Troupe",
    region: "Scorching Steppes",
    release: "Version 1.3",
    grade: "A-Rank",
    resonatorId: "WU-PHR-003",
    stats: { hp: 12980, atk: 467, def: 278 },
    skills: [
      { name: "FLAME SPIRAL", description: "Creates a swirling vortex of fire that damages and pulls in enemies." },
      { name: "BLAZING PIRANETTE", description: "Performs a fiery dance that leaves burning trails on the ground." },
      { name: "INFERNO WALTZ", description: "Ultimate that summons pillars of fire that erupt in sequence." }
    ],
    voiceLine: "My heart burns with passion! Let the flames guide our dance!",
    tags: ["Fusion", "DPS", "A-Rank", "Mobile"]
  },
  {
    id: 4,
    name: "LYNAE",
    title: "Forest Warden",
    image: "https://i.pinimg.com/736x/48/f7/09/48f7098ee1c6cf4e1658b105e3835fbb.jpg",
    description: "A guardian of ancient forests who commands nature itself. Lynae can manipulate plants and wildlife, using them both for offense and defense. Her connection to nature allows her to heal allies and control the battlefield.",
    element: "Spectro",
    weapon: "Bow",
    faction: "Emerald Covenant",
    region: "Whispering Woods",
    release: "Launch",
    grade: "A-Rank",
    resonatorId: "WU-LYN-004",
    stats: { hp: 14234, atk: 412, def: 321 },
    skills: [
      { name: "VINE GRASP", description: "Summons vines to immobilize enemies and drain their vitality." },
      { name: "NATURE'S BLESSING", description: "Heals allies and creates a protective barrier of leaves." },
      { name: "ANCIENT AWAKENING", description: "Ultimate that awakens the forest spirits to overwhelm enemies." }
    ],
    voiceLine: "The forest whispers ancient secrets. Listen closely, and you may hear them too.",
    tags: ["Spectro", "Support", "A-Rank", "Healer"]
  },
  {
    id: 5,
    name: "CHISA",
    title: "Blossom Dancer",
    image: "https://i.pinimg.com/736x/6d/29/2a/6d292ab7e32d965c4166fc4dfe1c1d46.jpg",
    description: "An elegant warrior who dances with cherry blossoms, using them as both weapon and shield. Chisa's graceful movements conceal deadly precision, making her a versatile fighter on the battlefield.",
    element: "Spectro",
    weapon: "Dual Blades",
    faction: "Sakura Guild",
    region: "Hanamura",
    release: "Version 1.0",
    grade: "S-Rank",
    resonatorId: "WU-CHS-005",
    stats: { hp: 12678, atk: 489, def: 234 },
    skills: [
      { name: "PETAL STORM", description: "Creates a vortex of razor-sharp cherry blossoms that damages enemies." },
      { name: "BLOSSOM STEP", description: "Dashes through enemies leaving a trail of explosive petals." },
      { name: "SAKURA NOVEMBER", description: "Ultimate that creates a massive cherry blossom explosion." }
    ],
    voiceLine: "Every petal tells a story. Let me show you the dance of the falling sakura.",
    tags: ["Spectro", "DPS", "S-Rank", "Mobile"]
  },
  {
    id: 6,
    name: "CARTETHIYA",
    title: "Shadow Weaver",
    image: "https://i.pinimg.com/1200x/44/6d/94/446d94d8a99d3044cc267fab4974f0a7.jpg",
    description: "A master of shadow manipulation who moves unseen through darkness. Cartethiya specializes in stealth and assassination, using shadows to disorient enemies and strike from unexpected angles.",
    element: "Havoc",
    weapon: "Daggers",
    faction: "Shadow Syndicate",
    region: "Umbra Depths",
    release: "Version 1.0",
    grade: "A-Rank",
    resonatorId: "WU-CRT-006",
    stats: { hp: 11567, atk: 467, def: 245 },
    skills: [
      { name: "SHADOW STEP", description: "Becomes invisible and moves through shadows to reposition." },
      { name: "DARK EMBRACE", description: "Creates shadow clones that attack enemies simultaneously." },
      { name: "NIGHTFALL", description: "Ultimate that plunges the area into darkness, amplifying all shadow damage." }
    ],
    voiceLine: "In darkness, all secrets are revealed. Your shadow betrays you.",
    tags: ["Havoc", "Assassin", "A-Rank", "Stealth"]
  },
  {
    id: 7,
    name: "CARLOTTA",
    title: "Iron Maiden",
    image: "https://i.pinimg.com/736x/a5/da/e4/a5dae41430e6ccb6f66ab6989598909d.jpg",
    description: "A heavy armor specialist who wields massive mechanical weaponry. Carlotta excels at breaking enemy defenses and controlling the battlefield with her overwhelming firepower and durability.",
    element: "Fusion",
    weapon: "Heavy Cannon",
    faction: "Iron Legion",
    region: "Foundry City",
    release: "Version 1.2",
    grade: "A-Rank",
    resonatorId: "WU-CRL-007",
    stats: { hp: 16543, atk: 378, def: 512 },
    skills: [
      { name: "ARTILLERY BARRAGE", description: "Unleashes a barrage of explosive rounds that pierce through enemies." },
      { name: "IRON FORTRESS", description: "Deploys a stationary shield that blocks all frontal attacks." },
      { name: "APOCALYPSE CANNON", description: "Ultimate that charges a massive energy cannon to obliterate everything in its path." }
    ],
    voiceLine: "My cannon speaks louder than words. Let its roar be the last thing you hear!",
    tags: ["Fusion", "Tank", "A-Rank", "Artillery"]
  },
  {
    id: 8,
    name: "AEMEATH",
    title: "Sky Sovereign",
    image: "https://i.pinimg.com/736x/11/2c/3c/112c3c768f93c40ccec510a5a2c1b528.jpg",
    description: "A noble ruler who commands the winds and skies. Aemeath floats above the battlefield, summoning tornadoes and controlling air currents to dominate her opponents with aerial supremacy.",
    element: "Electro",
    weapon: "Glaive",
    faction: "Sky Kingdom",
    region: "Floating Isles",
    release: "Version 1.4",
    grade: "S-Rank",
    resonatorId: "WU-AEM-008",
    stats: { hp: 13120, atk: 502, def: 295 },
    skills: [
      { name: "GALE SLASH", description: "Creates razor-sharp wind blades that cut through multiple enemies." },
      { name: "CYCLONE DOMAIN", description: "Summons a localized tornado that pulls in and damages enemies." },
      { name: "TYPHOON MONARCH", description: "Ultimate that creates a massive storm that devastates the battlefield." }
    ],
    voiceLine: "The winds heed my call. Feel the fury of the storm!",
    tags: ["Electro", "AOE", "S-Rank", "Crowd Control"]
  },
  {
    id: 9,
    name: "IUNO",
    title: "Star Weaver",
    image: "https://i.pinimg.com/736x/f2/52/a0/f252a0a0442ea2ee66df7d891f68114c.jpg",
    description: "A celestial being who commands the power of stars and constellations. Iuno can manipulate cosmic energy, creating gravitational fields and summoning meteor showers to control the flow of battle.",
    element: "Spectro",
    weapon: "Orb",
    faction: "Celestial Observers",
    region: "Starlight Spire",
    release: "Version 1.3",
    grade: "S-Rank",
    resonatorId: "WU-IUN-009",
    stats: { hp: 13456, atk: 523, def: 289 },
    skills: [
      { name: "STARFALL", description: "Summons a rain of falling stars that damages enemies in an area." },
      { name: "COSMIC PULL", description: "Creates a gravitational anomaly that pulls enemies together." },
      { name: "GALACTIC COLLAPSE", description: "Ultimate that creates a temporary black hole that devastates the battlefield." }
    ],
    voiceLine: "The stars align at my command. Witness the birth and death of galaxies!",
    tags: ["Spectro", "Crowd Control", "S-Rank", "Cosmic"]
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