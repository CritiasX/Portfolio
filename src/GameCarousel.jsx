import { useState } from 'react'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import './GameCarousel.css'

const games = [
  { id: 'valorant', name: 'Valorant', category: 'Tactical shooter', mode: 'COMPETITIVE', line: 'One more round.', description: 'Precision, teamwork, and the thrill of a close match.' },
  { id: 'dota', name: 'Dota 2', category: 'Strategy · MOBA', mode: 'COMPETITIVE', line: 'A different kind of strategy.', description: 'Big team fights, split-second decisions, and a game that always has more to learn.' },
  { id: 'resident', name: 'Resident Evil', category: 'Survival horror · Series', mode: 'STORY WORLDS', line: 'Into the unknown.', description: 'Atmosphere, suspense, and stories that keep me on the edge of my seat.' },
  { id: 'godofwar', name: 'God of War', category: 'Action adventure', mode: 'STORY WORLDS', line: 'A story worth the journey.', description: 'Mythic worlds, memorable characters, and a little time away from the everyday.' },
]

function GameArtwork({ game }) {
  return <div className={`game-art game-art-${game}`} aria-hidden="true">
    <span className="game-art-grid" />
    <svg viewBox="0 0 240 240" fill="none">
      {game === 'valorant' && <><path className="game-art-faint" d="M38 46h164v148H38zM24 120h192M120 24v192"/><path className="game-art-solid" d="m48 72 75 86H79L48 121zM192 72l-54 62h36l18-20z"/><path d="m38 184 22-22m120-104 22-22" stroke="currentColor" strokeWidth="2"/></>}
      {game === 'dota' && <><path className="game-art-faint" d="m120 25 95 95-95 95-95-95zM120 40v160M40 120h160"/><path className="game-art-solid" d="m61 58 108 124-49-22-58-62zM143 57l39 1v49zM59 140l41 42H59z"/><path d="m67 185 117-117" stroke="currentColor" strokeWidth="2"/></>}
      {game === 'resident' && <><path className="game-art-faint" d="M37 205V60l83-36 83 36v145M57 205V78l63-28 63 28v127M24 205h192"/><path className="game-art-solid" d="M83 205V94l37-17 37 17v111z"/><path d="M120 77v128M83 94l37 9 37-9" stroke="var(--game-art-bg)" strokeWidth="2"/><circle cx="132" cy="150" r="3" fill="var(--game-art-bg)"/><path d="m32 48 9-9m161 141 9-9" stroke="currentColor" strokeWidth="2"/></>}
      {game === 'godofwar' && <><circle className="game-art-faint" cx="120" cy="120" r="90"/><circle className="game-art-faint" cx="120" cy="120" r="73" strokeDasharray="2 10"/><path d="M59 178h43v-19c-21-8-34-26-34-47 0-30 22-54 52-54s52 24 52 54c0 21-13 39-34 47v19h43" stroke="currentColor" strokeWidth="14" strokeLinecap="square" strokeLinejoin="miter"/><path d="m114 30 6-10 6 10m-12 180 6 10 6-10" stroke="currentColor" strokeWidth="2"/></>}
    </svg>
    <span className="game-art-caption">A LITTLE ESCAPE.</span>
  </div>
}

export default function GameCarousel() {
  const [current, setCurrent] = useState(0)
  const game = games[current]
  const next = (step) => setCurrent((index) => (index + step + games.length) % games.length)
  const onKeyDown = (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return
    if (event.key === 'ArrowRight') { event.preventDefault(); next(1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); next(-1) }
    if (event.key === 'Home') { event.preventDefault(); setCurrent(0) }
    if (event.key === 'End') { event.preventDefault(); setCurrent(games.length - 1) }
  }
  return <section className="gaming-strip game-carousel" role="region" aria-roledescription="carousel" aria-label="Games I play" onKeyDown={onKeyDown}>
    <div className="game-carousel-intro">
      <p className="eyebrow">OFF THE CLOCK</p>
      <h3>One more<br/>{' '}<em>game?</em></h3>
      <p>Competitive lobbies.<br/>Stories worth getting lost in.</p>
      <div className="game-carousel-controls"><button type="button" onClick={() => next(-1)} aria-label="Previous game"><LuArrowLeft size={16} aria-hidden="true"/></button><span aria-hidden="true">0{current + 1}<i> / 0{games.length}</i></span><button type="button" onClick={() => next(1)} aria-label="Next game"><LuArrowRight size={16} aria-hidden="true"/></button></div>
    </div>
    <div className="game-carousel-main">
      <div className="game-carousel-stage" role="group" tabIndex={0} aria-label="Use left and right arrow keys to change games">
        <article className="game-slide" key={game.id} aria-roledescription="slide" aria-label={`${current + 1} of ${games.length}: ${game.name}`}>
          <GameArtwork game={game.id}/>
          <div className="game-slide-copy"><p className="eyebrow">{game.mode}</p><h4>{game.name}</h4><span className="game-category">{game.category}</span><p className="game-slide-line">{game.line}</p><p className="game-slide-description">{game.description}</p></div>
        </article>
      </div>
      <div className="game-selectors" role="group" aria-label="Choose a game">{games.map((item, index) => <button type="button" key={item.id} aria-pressed={current === index} onClick={() => setCurrent(index)}><span aria-hidden="true">0{index + 1}</span>{item.name}</button>)}</div>
    </div>
    <p className="game-carousel-announcement" role="status" aria-live="polite" aria-atomic="true">{game.name}, game {current + 1} of {games.length}</p>
  </section>
}
