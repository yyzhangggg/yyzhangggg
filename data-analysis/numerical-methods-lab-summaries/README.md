# Numerical Methods — Lab Summaries (Lab 1–3)

This folder contains concise summaries of three numerical computing lab notebooks located in the parent `data-analysis/` directory. The labs progress from elementary function approximation → power series & root finding → polynomial interpolation.

---

## Lab 1 — Floating-Point Arithmetic & Elementary Function Approximation

**File:** [lab1.ipynb](../lab1.ipynb)

### Core Theme
Implements and evaluates hand-rolled approximations for `log`, `exp`, `sin`, `cos`, and `arctan` — comparing them against Python's built-in `math` library to measure floating-point error.

### Key Topics

#### 1. Logarithm — `naivelog` vs `mylog`
| Algorithm | Approach | Error behaviour |
|-----------|----------|-----------------|
| `naivelog(x)` | Take `n` successive square roots of `x`, scale result by `2ⁿ` | Error grows with `x`; improves as `n` increases |
| `mylog(x)` | Use `z / (1 + √(1+z))` reduction `n` times, then scale by `2ⁿ` | More numerically stable; consistently lower error |

**Step-size experiment** — `n` tested at 15, 20, 25, 30, 35:
- Both methods converge as `n` increases
- `mylog` shows faster convergence due to the better approximation formula
- At `n = 30`, `naivelog` starts showing floating-point noise (catastrophic cancellation), while `mylog` at `n = 35` reaches errors ≈ 10⁻¹¹

#### 2. Exponential Function
- Formula: `exp(x) ≈ (1 + x/2ᵏ)^(2ᵏ)` with `k = 50`
- Achieves error ≈ 10⁻¹⁵ for `exp(1)`, excellent machine-precision accuracy

#### 3. Sine & Cosine via Argument Halving
- `sine(x)`: halves angle `k = 50` times, applies double-angle formula `sin(2θ) = 2sinθ√(1−sin²θ)`
- `cosine(x)`: uses `k = 20` with half-angle and double-angle recursion
- Sine reaches error ≈ 10⁻¹⁶ (near machine precision); cosine shows larger error (~10⁻⁵) at some values due to fewer iterations

#### 4. Arctangent & CORDIC-style Trigonometry
- `arctan(x)`: Taylor series with `k = 5` terms
- `tangent`, `sine`, `cosine`: implemented via a CORDIC-like rotation algorithm — rotates a unit vector in `k = 40` steps using `arctan(2⁻ⁱ)` as pre-computed angles

---

## Lab 2 — Power Series Convergence & Root-Finding Methods

**File:** [lab2.ipynb](../lab2.ipynb)

### Core Theme
Studies how quickly numerical approximations converge (and how input size matters), then compares root-finding algorithms for their speed and self-correction properties.

### Part 1 — Convergence of Series Approximations

#### Q1 — Sine Taylor Series (no argument reduction)
- `sin(x) = x − x³/3! + x⁵/5! − …` up to `n` terms
- Observations plotted: log₁₀(error) vs number of terms `n` for `x = 0.1, 1.0, 10.0`
- Large `x` (e.g. 10.0) converges very slowly without argument reduction

#### Q2 — Sine Taylor Series (with argument reduction)
- Pre-reduces `x` to `[0, 2π]` via `y = x mod 2π`
- Dramatic improvement for `x = 10.0` — convergence now similar to small `x`
- Demonstrates why argument reduction is essential in practical implementations

#### Q3 — Natural Log Approximation (two methods)
| Method | Formula | Notes |
|--------|---------|-------|
| `compute_ln_taylor(x, n)` | `2 · Σ y^(2i+1)/(2i+1)`, where `y = (x−1)/(x+1)` | Taylor series around 1; slower for large x |
| `alternative_ln(x, n)` | Repeated square root until `x < 2`, then argument-halving log | More stable across a wider input range |

#### Q4 — Timing Comparison
- Compares wall-clock time: `math.log` vs Taylor series vs alternative log at `n = 51`
- `math.log` is fastest (compiled C); both custom methods are slower but demonstrate the trade-off between algorithmic elegance and performance

### Part 2 — Numerical Methods for Square Roots & Root Finding

#### Q1 — Square Root: Goldschmidt's vs Heron's Method
| Method | Formula | Self-correcting? |
|--------|---------|-----------------|
| Heron (Newton) | `A_{n+1} = ½(A_n + x/A_n)` | **Yes** — errors in `A_n` are automatically dampened |
| Goldschmidt | `y = ½(A + x/A)`, `A = A · (y/A)` | **No** — errors propagate; converges only with a good initial guess |

#### Q2 — Linear vs Quadratic Convergence
- **Linear (fixed-point):** `x_{n+1} = ln(sin(x_n))` — converges slowly, sensitive to initial guess
- **Quadratic (Newton's method):** `x_{n+1} = x_n − f(x)/f'(x)` for `f(x) = sin(x) − eˣ`
- Newton's method converges in far fewer iterations for most starting points

#### Q3 — Cubic Equation Solver for cos(20°)
- Uses Newton's method on `4y³ − 3y − cos(60°) = 0` (triple-angle formula)
- Converges in very few iterations from `initial_guess = 1.2`
- Validates result using `sin(20°) = √(1 − cos²(20°))` and compares with Taylor sine

---

## Lab 3 — Polynomial Interpolation

**File:** [lab3.ipynb](../lab3.ipynb)

### Core Theme
Implements Lagrange interpolation from scratch, explores error behaviour as polynomial degree grows, exposes the Runge phenomenon, and compares global vs piecewise interpolation strategies.

### Questions Covered

#### Q1 — Lagrange Interpolation (basic)
- Implements `lagrange_basis(x, xi, i)` and `interpolate_lagrange(x, xi, yi)`
- Tested on data `xi = [0,1,2,3,4]`, `yi = [0,1,8,27,64]` (i.e. x³ at integer points)
- Plots show the interpolating polynomial perfectly reconstructing the cubic

#### Q2 — Maximum Interpolation Error on [a, b]
- Sweeps `x` over 1000 equally spaced points in `[a, b]`
- Computes `max |f(x) − Lₙf(x)|`
- For a polynomial test function `f(x) = 2x² + 3x + 1`: error ≈ 10⁻¹⁶ (machine epsilon — exact polynomial recovery)

#### Q3 — Error vs Degree for "Nice" Functions
- Tests `sin(x)` and `exp(cos(x))` on `[0, 2π]`
- Plots `log(max error)` vs polynomial degree `n` (1 to 20)
- **Key finding:** error decreases rapidly at first, then plateaus — increasing degree beyond a point yields diminishing returns, and eventually numerical instability sets in

#### Q4 — Runge Phenomenon
- Function: `f(x) = 1 / (1 + 25x²)` on `[−1, 1]`
- With equally spaced nodes, max error *increases* as degree grows beyond ~10
- Graph shows characteristic blow-up near interval endpoints — the **Runge phenomenon**

#### Q5 — Chebyshev Nodes (mitigation)
- Replaces equally spaced nodes with: `xᵢ = cos((2i+1)π / 2n)`
- Result: max error decreases stably with degree — no Runge blow-up
- **Conclusion:** node placement is as important as polynomial degree for interpolation quality

#### Q6 — Piecewise Linear Interpolation
- Connects adjacent nodes with straight line segments
- Avoids Runge phenomenon entirely by never forming high-degree globals
- Error decreases as `O(h²)` where `h = node spacing`

#### Q7 — Piecewise Quadratic Interpolation
- Each local piece fitted with a degree-2 polynomial over 3 adjacent nodes
- Better local accuracy than linear; error decreases as `O(h³)`

#### Q8 — Comparison: Linear vs Quadratic (Piecewise)
- Experiments on both `sin(x)` and `1/(1+25x²)`
- Piecewise quadratic consistently achieves lower log(error) for the same number of nodes
- Neither method suffers the Runge blow-up, confirming piecewise methods are robust for non-smooth or rational functions

---

## Summary Table

| Lab | Main Topics | Key Algorithms | Primary Tool |
|-----|-------------|----------------|--------------|
| **Lab 1** | Elementary function approximation | Argument halving, CORDIC-style rotation | `math`, manual loops |
| **Lab 2** | Series convergence, root finding | Taylor series, Newton's method, Heron/Goldschmidt | `math`, `matplotlib`, `numpy` |
| **Lab 3** | Polynomial interpolation | Lagrange, Chebyshev nodes, piecewise linear/quadratic | `numpy`, `matplotlib` |

---

## Overall Takeaways
1. **Argument reduction** is crucial — computing directly on large inputs causes slow convergence or precision loss.
2. **Newton's method** (quadratic convergence) dramatically outperforms linear fixed-point iteration.
3. **Heron's method** is self-correcting; Goldschmidt's is not — important for hardware reliability.
4. **Lagrange interpolation with equally spaced nodes** is dangerous for high degrees (Runge phenomenon).
5. **Chebyshev nodes** and **piecewise methods** are the practical solutions to Runge — they trade global polynomial elegance for stability and robustness.
