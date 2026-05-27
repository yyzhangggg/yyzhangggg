# 🃏 Solitaire Cipher

A Java implementation of Bruce Schneier's **Solitaire cryptographic algorithm** — a pen-and-paper cipher that uses a shuffled deck of playing cards as its secret key. Originally designed for field agents who couldn't carry electronic devices.

---

## 📋 Table of Contents

- [What Is the Solitaire Cipher?](#what-is-the-solitaire-cipher)
- [How It Works](#how-it-works)
- [Data Structure: Circular Doubly-Linked List](#data-structure-circular-doubly-linked-list)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [How to Compile](#how-to-compile)
- [How to Use](#how-to-use)
- [API Reference](#api-reference)
- [Running the Test Suite](#running-the-test-suite)
- [Algorithm Details](#algorithm-details)
- [Key Concepts for Recruiters](#key-concepts-for-recruiters)

---

## What Is the Solitaire Cipher?

The Solitaire cipher was described by cryptographer **Bruce Schneier** in Neal Stephenson's novel *Cryptonomicon*. It is a **stream cipher** that generates a pseudorandom keystream from a standard 54-card deck (52 playing cards + 2 jokers). The deck order acts as the shared secret between two parties.

A message encrypted with Solitaire cannot be decrypted without knowledge of the original deck order — making it suitable as an information-theoretically secure cipher for manual use.

---

## How It Works

```
Plaintext:   HELLO
Keystream: + 10 2 18 5 9
           = RGNQX   (ciphertext)
```

The algorithm:
1. **Key generation** — derive a keystream of integers from the deck.
2. **Encode** — strip punctuation and spaces, uppercase, then shift each letter by its keystream value (wrapping A–Z).
3. **Decode** — shift each ciphertext letter *back* by its keystream value.

---

## Data Structure: Circular Doubly-Linked List

The entire deck is stored as a **circular doubly-linked list**, where `head.prev` points to the last card and the last card's `next` points back to `head`. Every operation — move, cut, shuffle — runs by relinking nodes, not copying arrays.

```
  ┌──────────────────────────────────────┐
  │                                      │
  ▼                                      │
[AC] ⇄ [2C] ⇄ [3C] ⇄ ... ⇄ [RJ] ⇄ [BJ]
  ▲                                      │
  └──────────────────────────────────────┘
```

| Operation | Time Complexity |
|-----------|----------------|
| `addCard` | O(1) |
| `moveCard(c, p)` | O(p) |
| `tripleCut` | O(1) |
| `countCut` | O(n) |
| `locateJoker` | O(n) |
| `lookUpCard` | O(n) |
| `shuffle` (Fisher-Yates) | O(n) |
| `Deck(Deck d)` deep copy | O(n) |

---

## Project Structure

```
solitaire-cipher/
├── src/
│   └── assignment2/
│       ├── Deck.java                   # Core data structure + cipher operations
│       ├── SolitaireCipher.java        # encode() and decode() using a Deck as key
│       └── A2_Minitester_Updated3.java # 24 automated unit tests
└── out/                                # Compiled class files (auto-generated)
```

---

## Prerequisites

- **Java 8 or higher** — check with `java -version`
- A terminal / command prompt

---

## How to Compile

```bash
cd "solitaire-cipher"
javac -d out src/assignment2/Deck.java src/assignment2/SolitaireCipher.java src/assignment2/A2_Minitester_Updated3.java
```

---

## How to Use

### Encrypt a message

```java
import assignment2.*;

// 1. Build a deck (13 cards per suit, 4 suits = 52 playing cards + 2 jokers)
Deck key = new Deck(13, 4);

// 2. (Optional) shuffle to get a random starting key
key.shuffle();

// 3. Create the cipher with this deck as the secret key
SolitaireCipher cipher = new SolitaireCipher(key);

// 4. Encrypt
String ciphertext = cipher.encode("Hello, World!");
System.out.println(ciphertext);  // e.g. "RFYZEQWUIKC"
```

### Decrypt a message

```java
// Use a fresh cipher with the SAME initial deck order
SolitaireCipher cipher2 = new SolitaireCipher(key);  // same key as above
String plaintext = cipher2.decode(ciphertext);
System.out.println(plaintext);   // → "HELLOWORLD"
```

> ⚠️ **Important:** Both parties must start with the same deck order. Each `encode`/`decode` call advances the deck state, so re-create the cipher from the original `key` each time.

### Custom deck sizes

```java
// 5 cards per suit, 2 suits = 10 playing cards + 2 jokers (12 total)
Deck smallKey = new Deck(5, 2);
```

| Parameter | Valid Range | Description |
|-----------|------------|-------------|
| `numOfCardsPerSuit` | 1 – 13 | Card ranks per suit |
| `numOfSuits` | 1 – 4 | Number of suits (clubs, diamonds, hearts, spades) |

---

## API Reference

### `Deck`

```java
Deck(int numOfCardsPerSuit, int numOfSuits)  // Build a standard ordered deck
Deck(Deck d)                                 // Deep copy of an existing deck
Deck()                                       // Empty deck (for manual card insertion)

void   addCard(Card c)                       // Append card to bottom — O(1)
void   shuffle()                             // Fisher-Yates in-place shuffle — O(n)
Joker  locateJoker(String color)             // "red" or "black" — O(n)
void   moveCard(Card c, int p)               // Move c exactly p positions down — O(p)
void   tripleCut(Card first, Card second)    // Solitaire triple-cut step — O(1)
void   countCut()                            // Solitaire count-cut step — O(n)
Card   lookUpCard()                          // Solitaire look-up step — O(n)
int    generateNextKeystreamValue()          // Full Solitaire round → 1 keystream value
```

#### Inner classes

| Class | Extends | Description |
|-------|---------|-------------|
| `Card` | — (abstract) | Base node of the linked list |
| `PlayingCard` | `Card` | Has `suit` (String) and `rank` (int) |
| `Joker` | `Card` | Has `redOrBlack` color; value = `numOfCards − 1` |

### `SolitaireCipher`

```java
SolitaireCipher(Deck key)          // Constructor — takes a deep copy of the key deck
int[]  getKeystream(int size)      // Raw keystream values (A=1, B=2, … Z=26)
String encode(String msg)          // Strips punctuation/spaces, uppercases, encrypts
String decode(String msg)          // Decrypts a Solitaire ciphertext
```

---

## Running the Test Suite

The minitester runs **24 unit tests** that cover every method in `Deck` with multiple edge cases.

```bash
java -cp out assignment2.A2_Minitester_Updated3
```

**Test categories:**

| Category | Tests | What it checks |
|----------|-------|----------------|
| `AddCard` | 5 | Circular prev/next refs, head preservation, size count |
| `DeepCopy` | 3 | Object identity (new instances), `.next` chain, `.prev` chain |
| `LocateJoker` | 3 | Red/black joker found, joker at head, no false matches |
| `LookUpCard` | 3 | Correct card returned, returns `null` for Joker result |
| `MoveCard` | 4 | `.next` chain after move, `.prev` chain after move |
| `Shuffle` | 6 | Empty deck, single card, 3 cards (3 passes), 12 cards, 54 cards, no duplicates |

Expected output:
```
======= assignment2.AddCard_AllRef =======
Test passed.
...
24 of 24 tests passed.
```

---

## Algorithm Details

### Keystream Generation (one round)

```
1. Locate the Red Joker.  Move it 1 position down the deck (2 if it's last).
2. Locate the Black Joker. Move it 2 positions down (3 if it's last).
3. Triple Cut: split the deck at both jokers; swap the top and bottom sections.
4. Count Cut: look at the bottom card's value V; cut V cards from top to just above the bottom card.
5. Look Up: count down from the top by the top card's value; return that card's value.
   If it is a Joker, discard and repeat from step 1.
```

### Encoding (one character)

```
shifted = (plainChar - 'A' + keyValue) mod 26 + 'A'
```

### Decoding (one character)

```
plain = (cipherChar - 'A' - keyValue + 26) mod 26 + 'A'
```

---

## Key Concepts for Recruiters

| Concept | Where it appears |
|---------|-----------------|
| **Circular doubly-linked list** | `Deck` — all 8+ operations manipulate prev/next pointers directly |
| **Deep copy / copy constructor** | `Deck(Deck d)` — O(n) node-by-node duplication |
| **In-place Fisher-Yates shuffle** | `Deck.shuffle()` — O(n) randomization with correct pointer rebuild |
| **Stream cipher fundamentals** | `SolitaireCipher` — keystream XOR-like letter shifting |
| **Inner classes & polymorphism** | `Card`, `PlayingCard`, `Joker` hierarchy inside `Deck` |
| **Unit testing** | 24 tests covering correctness, edge cases, and pointer integrity |

---

*Cipher design by Bruce Schneier (1999). Java implementation from scratch.*
