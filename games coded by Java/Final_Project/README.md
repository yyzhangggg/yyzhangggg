# Chess Sudoku Solver

A multi-constraint puzzle solver that combines classic Sudoku with chess piece movement rules.

---

## 🎯 What It Does

Solves Sudoku-style grid puzzles (3×3, 4×4, and 5×5) where **chess piece constraints** replace the traditional number rules:

- **Knight** — cells reachable by a Knight's L-shaped move cannot share the same value
- **Queen** — cells on the same row, column, or diagonal cannot share the same value
- **King** — all 8 adjacent cells cannot share the same value

The solver uses a backtracking algorithm with constraint propagation to find valid solutions across multiple difficulty levels.

---

## ✨ Features

- Multiple grid sizes: **3×3**, **4×4**, **5×5**
- Three chess piece constraint types: Knight, Queen, King
- GUI visualizer to display the puzzle and solution step-by-step
- Pre-loaded test puzzles for each difficulty/size combination
- Extensible constraint architecture

---

## 🚀 How to Run

**Prerequisites:** Java JDK 8+, an IDE such as IntelliJ IDEA or Eclipse.

1. Clone or download this repository
2. Open the project in IntelliJ IDEA (or your preferred IDE)
3. Navigate to the main entry point and run it
4. Select a puzzle configuration from the GUI menu

*Not familiar with Git? [This tutorial by TA Sasha](https://www.youtube.com/playlist?list=PLFvevpoGcNCvjyTjOfPhzqjgb-L_WdX8r) covers cloning and setup.*

---

## 📁 Project Structure

```
Final_Project/
├── src/
│   ├── puzzle/        — Grid and constraint logic
│   ├── solver/        — Backtracking + constraint propagation
│   └── visualizer/    — GUI display component
└── test-puzzles/      — Pre-built puzzles (3x3, 4x4, 5x5 × each piece type)
```

---

## 🛠 Tech Stack

- **Language:** Java
- **GUI:** Java Swing
- **Algorithm:** Backtracking with constraint propagation
