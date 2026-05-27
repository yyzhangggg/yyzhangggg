import { asset } from '../utils/assetPath'

/**
 * One friend card.
 * imgPath – relative path under images/friends/, e.g. 'images/friends/01.jpg'
 * name    – friend's name
 * tag     – short relationship label e.g. 'Best Friend'
 * note    – a short personal blurb
 */
function FriendCard({ imgPath, name, tag, note, placeholder = false }) {
  return (
    <div className={`friend-card${placeholder ? ' add-slot' : ''}`}>
      <div className="friend-photo">
        {imgPath ? (
          <img
            src={asset(imgPath)}
            alt={name}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          className="friend-photo-placeholder"
          style={{ display: imgPath ? 'none' : 'flex' }}
        >
          {placeholder ? '＋' : '📷'}
        </div>
      </div>
      <h3>{name}</h3>
      <span className="friend-tag">{tag}</span>
      <p className="friend-note">{note}</p>
    </div>
  )
}

// ─── Edit your friends here ───────────────────────────────────────────────────
// Drop photos into  docs/images/friends/  then set imgPath accordingly.
// Duplicate a <FriendCard /> entry to add more people.
const friends = [
  {
    imgPath: 'images/friends/01.jpg',
    name: 'Name',
    tag: 'Best Friend',
    note: 'A little note about this wonderful person and what makes your friendship special.',
  },
  {
    imgPath: 'images/friends/02.jpg',
    name: 'Name',
    tag: 'College Friend',
    note: 'A little note about this wonderful person and what makes your friendship special.',
  },
  {
    imgPath: 'images/friends/03.jpg',
    name: 'Name',
    tag: 'Childhood Friend',
    note: 'A little note about this wonderful person and what makes your friendship special.',
  },
  {
    imgPath: 'images/friends/04.jpg',
    name: 'Name',
    tag: 'Art Buddy',
    note: 'A little note about this wonderful person and what makes your friendship special.',
  },
  {
    imgPath: 'images/friends/05.jpg',
    name: 'Name',
    tag: 'Close Friend',
    note: 'A little note about this wonderful person and what makes your friendship special.',
  },
  {
    imgPath: 'images/friends/06.jpg',
    name: 'Name',
    tag: 'Friend',
    note: 'A little note about this wonderful person and what makes your friendship special.',
  },
]
// ─────────────────────────────────────────────────────────────────────────────

export default function Friends() {
  return (
    <section className="wrapper style1 align-center" id="friends">
      {/* Inline styles for the friends section */}
      <style>{`
        #friends .inner { margin-bottom: 1em; }
        .friends-row {
          display: flex; flex-direction: row; flex-wrap: nowrap;
          overflow-x: auto; gap: 1.8em; padding: 1em 3em 2.5em;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,.2) transparent;
        }
        .friends-row::-webkit-scrollbar { height: 6px; }
        .friends-row::-webkit-scrollbar-thumb { background: rgba(255,255,255,.2); border-radius: 3px; }
        .friend-card {
          flex: 0 0 180px; text-align: center;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 1.2em; padding: 1.8em 1.2em 1.5em;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .friend-card:hover { transform: translateY(-6px); box-shadow: 0 10px 28px rgba(0,0,0,.15); }
        .friend-photo {
          width: 110px; height: 110px; border-radius: 50%;
          margin: 0 auto 1.1em; overflow: hidden;
          border: 3px solid rgba(255,255,255,.18);
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg,#e8e8e8,#d0d0d0);
        }
        .friend-photo img { width:100%; height:100%; object-fit:cover; display:block; }
        .friend-photo-placeholder { font-size: 2.4em; color: #aaa; line-height: 1; user-select: none; }
        .friend-card h3 { margin: 0 0 .35em; font-size: 1em; font-weight: 600; }
        .friend-tag {
          display: inline-block; font-size: .68em; padding: .22em .75em;
          border-radius: 2em; background: rgba(255,255,255,.14);
          margin-bottom: .75em; letter-spacing: .06em; text-transform: uppercase;
        }
        .friend-card p.friend-note { font-size: .82em; opacity: .7; margin: 0; line-height: 1.55; }
        .friend-card.add-slot { border-style: dashed; opacity: .45; }
        .friend-card.add-slot .friend-photo { background: transparent; border-style: dashed; }
      `}</style>

      <div className="inner">
        <h2>My People 💛</h2>
        <p>
          The beautiful souls who colour my world — friends who&apos;ve walked
          alongside me through every season of life.
          <br />
          <em style={{ fontSize: '0.85em', opacity: 0.65 }}>
            Drop photos into <code>docs/images/friends/</code> and update the
            name / tag / note in{' '}
            <code>src/components/Friends.jsx</code>.
          </em>
        </p>
      </div>

      <div className="friends-row">
        {friends.map((f, i) => (
          <FriendCard key={i} {...f} />
        ))}
        {/* "Add more" placeholder slot */}
        <FriendCard
          imgPath={null}
          name="Add Friend"
          tag="Your pick"
          note="Duplicate a friends entry in Friends.jsx to add more people."
          placeholder
        />
      </div>
    </section>
  )
}
