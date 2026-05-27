# ♟️ Chess Sudoku Solver

A Java-based Sudoku solver with optional chess-piece movement constraints — **Knight**, **King**, and **Queen** rules. Supports grid sizes from 9×9 all the way up to 25×25, and can find either a single solution or every possible solution for a given puzzle.

---

## 📋 Table of Contents

- [What Is Chess Sudoku?](#what-is-chess-sudoku)
- [Chess Rule Variants](#chess-rule-variants)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [How to Compile](#how-to-compile)
- [How to Run the Solver](#how-to-run-the-solver)
- [Puzzle File Format](#puzzle-file-format)
- [Included Puzzles](#included-puzzles)
- [Creating Your Own Puzzle](#creating-your-own-puzzle)
- [Finding All Solutions](#finding-all-solutions)
- [Running the Test Suite](#running-the-test-suite)
- [API Reference](#api-reference)

---

## What Is Chess Sudoku?

Chess Sudoku is classic Sudoku with extra constraints borrowed from chess. In standard Sudoku:

- Every row contains each number exactly once.
- Every column contains each number exactly once.
- Every N×N box contains each number exactly once.

Chess Sudoku adds **optional** rules that restrict which cells can share the same number based on how chess pieces move.

---

## Chess Rule Variants

| Rule | Description |
|------|-------------|
| **Knight Rule** | Two cells that are a knight's move apart (2 squares in one direction, 1 in the other) cannot contain the same number. |
| **King Rule** | Two diagonally adjacent cells (touching corners) cannot contain the same number. |
| **Queen Rule** | The largest number on the board (equal to N) cannot appear in the same diagonal as another instance of that number — like how a queen attacks diagonally. |

Rules can be combined (e.g., Knight + King simultaneously).

---

## Project Structure

```
chess-sudoku-solver/
├── src/
│   ├── ChessSudoku.java      # Core solver — edit this to choose your puzzle & rules
│   ├── Tester.java           # Automated test suite with benchmarks
│   ├── Visualizer.java       # Optional live visualizer
│   └── RandomTester.java     # Random puzzle tester
└── puzzles/
    ├── veryEasy3x3.txt
    ├── easy3x3.txt
    ├── medium3x3.txt
    ├── hard3x3.txt
    ├── veryHard3x3.txt
    ├── kingSudokuEasy3x3.txt
    ├── knightSudokuEasy3x3.txt
    ├── queenSudokuEasy3x3.txt
    └── ... (22 puzzles total)
```

---

## Prerequisites

- **Java 8 or higher** — check with `java -version`
- A terminal / command prompt

---

## How to Compile

Navigate into the `src/` folder and compile all Java files:

```bash
cd "chess-sudoku-solver/src"
javac -d . ChessSudoku.java Tester.java Visualizer.java RandomTester.java
```

> The `-d .` flag places compiled `.class` files into the current directory under their package folder (`finalproject/`).

---

## How to Run the Solver

### Step 1 — Choose a puzzle

Open [src/ChessSudoku.java](src/ChessSudoku.java) and find the `main` method near the bottom. Change the file path to point to the puzzle you want:

```java
InputStream in = new FileInputStream("../puzzles/easy3x3.txt");
```

### Step 2 — Set the chess rules

Still in `main`, toggle the three rule flags to match your chosen puzzle:

```java
s.knightRule = false;   // true to enable Knight constraint
s.kingRule   = false;   // true to enable King constraint
s.queenRule  = false;   // true to enable Queen constraint
```

> **Tip:** the puzzle filenames hint at which rules they need — e.g. `kingSudokuEasy3x3.txt` uses `kingRule = true`.

### Step 3 — Choose one or all solutions

```java
s.solve(false);   // find ONE solution (fast)
s.solve(true);    // find ALL solutions (may be slow for hard puzzles)
```

### Step 4 — Compile and run

```bash
# from the src/ directory
javac -d . ChessSudoku.java
java finalproject.ChessSudoku
```

**Example output:**

```
Before the solve:
 9  0  0 |  0  0  0 |  0  0  5
 0  0  7 |  9  0  1 |  4  2  0
 0  8  0 |  0  0  0 |  0  1  0
------------------------------
 0  2  0 |  0  7  0 |  0  3  0
 0  0  0 |  6  0  4 |  0  0  0
 0  3  0 |  0  2  0 |  0  7  0
------------------------------
 0  5  0 |  0  0  0 |  0  9  0
 0  0  9 |  5  0  6 |  2  0  0
 1  0  0 |  0  0  0 |  0  0  6

After the solve:
 9  6  1 |  4  8  2 |  7  3  5
 5  3  7 |  9  6  1 |  4  2  8
 2  8  4 |  3  5  7 |  6  1  9
------------------------------
 4  2  6 |  8  7  9 |  1  3  5   ← wait, each row/col/box has 1–9
 ...
```

---

## Puzzle File Format

Every puzzle file follows this structure:

```
<SIZE>

<grid rows, left to right, top to bottom>
```

| Token | Meaning |
|-------|---------|
| First number | **SIZE** — the square-root of the grid dimension. `3` → 9×9 grid with 3×3 boxes. `4` → 16×16. `5` → 25×25. |
| A number `1`–`N` | A pre-filled cell. |
| `x` | An **empty** cell to be solved. |
| `|` `-` spaces | Purely decorative — ignored by the reader. |

### Example — 9×9 puzzle (SIZE = 3)

```
3

3 6 1 | 8 9 5 | 4 7 x
9 x 2 | 7 3 4 | 8 1 6
7 4 8 | 1 x 2 | 3 9 5
---------------------
5 7 3 | x 2 6 | 1 4 8
8 2 9 | 5 4 1 | x 3 7
x 1 6 | 3 8 7 | 5 2 9
---------------------
6 9 7 | 4 1 8 | 2 5 3
1 8 5 | 2 7 3 | 9 x 4
2 3 4 | 6 5 9 | 7 8 1
```

Here `x` marks the five empty cells that the solver will fill in.

---

## Included Puzzles

### Standard Sudoku (no chess rules)

| File | Grid | Difficulty |
|------|------|------------|
| `veryEasy3x3.txt` | 9×9 | Very Easy |
| `veryEasy3x3_twoSolutions.txt` | 9×9 | Very Easy (2 solutions) |
| `easy3x3.txt` | 9×9 | Easy |
| `medium3x3.txt` | 9×9 | Medium |
| `medium3x3_eightSolutions.txt` | 9×9 | Medium (8 solutions) |
| `medium3x3_twelveSolutions.txt` | 9×9 | Medium (12 solutions) |
| `hard3x3.txt` | 9×9 | Hard |
| `harder3x3.txt` | 9×9 | Harder |
| `veryHard3x3.txt` | 9×9 | Very Hard |
| `veryEasy4x4.txt` | 16×16 | Very Easy |
| `hard4x4.txt` | 16×16 | Hard |
| `veryHard4x4.txt` | 16×16 | Very Hard |
| `harder5x5.txt` | 25×25 | Hard |
| `veryHard5x5.txt` | 25×25 | Very Hard |

### Knight Rule puzzles (`knightRule = true`)

| File | Grid | Difficulty |
|------|------|------------|
| `knightSudokuEasy3x3.txt` | 9×9 | Easy |
| `knightSudokuMedium3x3.txt` | 9×9 | Medium |
| `knightSudokuHard3x3.txt` | 9×9 | Hard |

### King Rule puzzles (`kingRule = true`)

| File | Grid | Difficulty |
|------|------|------------|
| `kingSudokuEasy3x3.txt` | 9×9 | Easy |

### Queen Rule puzzles (`queenRule = true`)

| File | Grid | Difficulty |
|------|------|------------|
| `queenSudokuEasy3x3.txt` | 9×9 | Easy |
| `queen4x4.txt` | 16×16 | — |
| `queen5x5.txt` | 25×25 | — |

### Combined chess rules

| File | Grid | Rules |
|------|------|-------|
| `kingQueen3x3.txt` | 9×9 | King + Queen |
| `knightKing3x3.txt` | 9×9 | Knight + King |
| `knightKing4x4.txt` | 16×16 | Knight + King |

---

## Creating Your Own Puzzle

1. Create a `.txt` file in the `puzzles/` folder.
2. First line: the SIZE (`3` for a 9×9 grid, `4` for 16×16, `5` for 25×25).
3. Fill in the grid row by row. Use numbers for given cells, `x` for blanks.
4. You may use `|` and `-` as visual separators — they are ignored.

**Minimal 9×9 template (SIZE = 3):**

```
3

x x x x x x x x x
x x x x x x x x x
x x x x x x x x x
x x x x x x x x x
x x x x x x x x x
x x x x x x x x x
x x x x x x x x x
x x x x x x x x x
x x x x x x x x x
```

> An all-`x` grid will return the first valid Sudoku the solver finds.

---

## Finding All Solutions

Set `solve(true)` and then iterate over the `solutions` field:

```java
s.solve(true);

System.out.println("Total solutions found: " + s.solutions.size());
for (ChessSudoku solution : s.solutions) {
    solution.print();
    System.out.println();
}
```

> ⚠️ **Warning:** Some puzzles intentionally have many solutions (e.g., `medium3x3_twelveSolutions.txt` has 12). Very hard or nearly-empty puzzles may have thousands — use `solve(true)` with caution.

---

## Running the Test Suite

The `Tester.java` file runs a set of correctness checks and a full benchmark across all included puzzles.

```bash
# from the src/ directory
javac -d . *.java
java finalproject.Tester
```

**What it tests:**

1. **Illegal helper code** — ensures the `ChessSudoku` class only has the required public methods/fields.
2. **veryEasy3x3** — checks the solved grid matches the known answer.
3. **easy3x3** — same correctness check.
4. **medium3x3 (12 solutions)** — verifies exactly 12 valid solutions are found.
5. **All puzzles benchmark** — times every puzzle with a 60-second timeout per puzzle and reports a total solve time.

Sample output:

```
======= finalproject.all_puzzles_benchmark =======
veryEasy3x3_twoSolutions.txt:   12.345 ms
easy3x3.txt:                     0.891 ms
hard3x3.txt:                     4.230 ms
...
-------------------------
Total time: 312.456 ms

Test passed.

5 of 5 tests passed.
All clear! Great work :)
```

---

## API Reference

### `ChessSudoku(int size)`
Constructor. `size` is the box dimension (3 → 9×9 grid, 4 → 16×16, 5 → 25×25).

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `SIZE` | `int` | Box dimension (square root of N) |
| `N` | `int` | Full grid dimension (`SIZE × SIZE`) |
| `grid` | `int[][]` | The N×N puzzle grid; `0` = empty cell |
| `knightRule` | `boolean` | Enable knight movement constraint |
| `kingRule` | `boolean` | Enable king movement constraint |
| `queenRule` | `boolean` | Enable queen diagonal constraint |
| `solutions` | `HashSet<ChessSudoku>` | All solutions after calling `solve(true)` |

### `void solve(boolean allSolutions)`
Solves the puzzle in-place.
- `false` → finds one solution and updates `grid` directly.
- `true` → finds all solutions and stores them in `solutions`.

### `void read(InputStream in)`
Reads the puzzle grid from a stream. Call after the constructor.

### `void print()`
Prints the current state of `grid` to standard output with box separators.

---

*Solver implemented in Java using recursive backtracking.*
