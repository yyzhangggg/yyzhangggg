/**
 * Creative writings data.
 * Add more entries to the array to show more pieces on the site.
 * Each entry:
 *   title      – display title
 *   genre      – short tag string shown as a badge
 *   setting    – place / mood shown under title
 *   excerpt    – short hook shown on the preview card (keep under ~200 chars)
 *   parts      – array of { heading, body } objects for the full-text modal
 *   docxPath   – optional path to the downloadable .docx (relative to site root)
 */
const writings = [
  {
    title: 'Character Study: Kento Saku',
    genre: 'Slice of Life · Fiction',
    setting: 'Kansai, Kyoto — an izakaya after a fashion show',
    excerpt:
      'A quiet outfit designer who smiles a lot but controlled — a man who cannot find his position in the gap of work and private life in the 21st century.',
    docxPath: 'writings/creative-writing.docx',
    parts: [
      {
        heading: 'Part 1 — Character Sketch',
        body: `Kento Saku — male, age around 25–27 (soon will be late 20s, which implies that he needs a spouse and marriage). Black hair, looked quiet, repressed, little in words, giving a sense of reliability. Plain, tidy, clean. Works as an outfit designer with most colleagues being female.

Wears dark blue metal glasses, really old cell phone and no Wi-Fi at home. Loves reading, writes some poetry, insists on reading the newspaper in the morning. Smiles a lot but controlled — thin mouth.

There are clues that he tidies himself up in the morning: not dressed like a model, but it is clear he did pay attention to how he looks — or we may say, he cares about how others will look at him. Clean, tidy short hair with a small stream of long hair tied in a ponytail. Wears a snake ring and sapphire earrings.

Pale skin, weak in physical strength, responsible, patient. Does really good work with strong contrast color and kind of weird — or you may say improper types of elements used in a specific case (rebelling). Conflict between ideal self and actual self; therefore sometimes he gets really cold when dealing with private topics. A man who cannot find his position in the gap between work and private life in the 21st century.`,
      },
      {
        heading: 'Part 2 — Cortex',
        body: `In Kansai, Kyoto, Friday. After finishing a big stage fashion show, the group where our protagonist works holds a night party at a nearby izakaya with great sake served.

It is rare that males do clothing design work, but luckily he is not the only one in his group — there is another male, and that guy is an outgoing one. He is kind of famous in the designer community. With his sunny face and sweet words, that guy (Fukano Haruki) is always requested by customers who have heard of him.

—

Clearing up the messy working station, Saku bent down to get his bag underneath the table when someone patted his shoulder:

"Good afternoon, Kento san."

Saku raised his head: it was Fukano, giving his trademark smile.

"What's wrong?" He looked down at the hand that had taken back from the bag.

The silent gesture of rejection made the topic hard to continue. Fukano sensed the awkward situation and tried to finish it short: "Look, we already worked under that lethal pressure for a week and now it's finally done — we're planning a party for relaxation. Would you like to join us?" He scratched his head and added: "Everyone will be there."

Saku's mouth opened and closed. He sighed and finally wore his official mask and replied: "Yeah, sure, I'll absolutely be there."

He wanted to say "It is very kind of you guys to think of me" — but he felt that might be too old-fashioned. So he looked into Fukano's eyes, digging for clues of responses to decide how he would react next.`,
      },
    ],
  },
]

export default writings
