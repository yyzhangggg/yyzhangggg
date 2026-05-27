# Numerical Methods — Labs 1–3

Labs covering floating-point function approximation, power series convergence, root-finding, and polynomial interpolation. Each lab is a Python Jupyter notebook with hand-implemented algorithms compared against Python's `math`/`numpy` built-ins.

---

## Lab 1 — Floating-Point Arithmetic & Elementary Function Approximation

**File:** [lab1.ipynb](lab1.ipynb)

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
- Achieves error ≈ 10⁻¹⁵ for `exp(1)` — excellent machine-precision accuracy

#### 3. Sine & Cosine via Argument Halving
- `sine(x)`: halves angle `k = 50` times, applies double-angle formula `sin(2θ) = 2sinθ√(1−sin²θ)`
- `cosine(x)`: uses `k = 20` with half-angle and double-angle recursion
- Sine reaches error ≈ 10⁻¹⁶ (near machine precision); cosine shows larger error (~10⁻⁵) at some values due to fewer iterations

#### 4. Arctangent & CORDIC-style Trigonometry
- `arctan(x)`: Taylor series with `k = 5` terms
- `tangent`, `sine`, `cosine`: CORDIC-like rotation algorithm — rotates a unit vector in `k = 40` steps using pre-computed `arctan(2⁻ⁱ)` angles

---

## Lab 2 — Power Series Convergence & Root-Finding Methods

**File:** [lab2.ipynb](lab2.ipynb)

### Core Theme
Studies how quickly numerical approximations converge (and how input size matters), then compares root-finding algorithms for their speed and self-correction properties.

### Part 1 — Convergence of Series Approximations

#### Q1 — Sine Taylor Series (no argument reduction)
- `sin(x) = x − x³/3! + x⁵/5! − …` up to `n` terms
- Plotted: log₁₀(error) vs number of terms for `x = 0.1, 1.0, 10.0`
- Large `x` (e.g. 10.0) converges very slowly without argument reduction

#### Q2 — Sine Taylor Series (with argument reduction)
- Pre-reduces `x` to `[0, 2π]` via `y = x mod 2π`
- Dramatic improvement for `x = 10.0` — convergence now matches small `x`
- Demonstrates why argument reduction is essential in practical implementations

#### Q3 — Natural Log Approximation (two methods)
| Method | Formula | Notes |
|--------|---------|-------|
| `compute_ln_taylor(x, n)` | `2 · Σ y^(2i+1)/(2i+1)`, where `y = (x−1)/(x+1)` | Taylor series around 1; slower for large x |
| `alternative_ln(x, n)` | Repeated square root until `x < 2`, then argument-halving log | More stable across a wider input range |

#### Q4 — Timing Comparison
- Wall-clock time: `math.log` vs Taylor series ln vs alternative ln at `n = 51`
- `math.log` is fastest (compiled C); both custom methods are slower but illustrate the elegance vs performance trade-off

### Part 2 — Square Root & Root-Finding

#### Q1 — Goldschmidt's vs Heron's Method
| Method | Formula | Self-correcting? |
|--------|---------|-----------------|
| Heron (Newton) | `A_{n+1} = ½(A_n + x/A_n)` | **Yes** — errors in `A_n` are automatically dampened |
| Goldschmidt | `y = ½(A + x/A)`, `A = A · (y/A)` | **No** — errors propagate; requires a good initial guess |

#### Q2 — Linear vs Quadratic Convergence
- **Linear (fixed-point):** `x_{n+1} = ln(sin(x_n))` — slow, sensitive to initial guess
- **Quadratic (Newton's method):** `x_{n+1} = x_n − f(x)/f'(x)` for `f(x) = sin(x) − eˣ`
- Newton's method converges in far fewer iterations for most starting points

#### Q3 — Cubic Equation Solver for cos(20°)
- Newton's method on `4y³ − 3y − cos(60°) = 0` (triple-angle formula)
- Converges in very few iterations from `initial_guess = 1.2`
- Validates result via `sin(20°) = √(1 − cos²(20°))`

---

## Lab 3 — Polynomial Interpolation

**File:** [lab3.ipynb](lab3.ipynb)

### Core Theme
Implements Lagrange interpolation from scratch, explores error behaviour as polynomial degree grows, exposes the Runge phenomenon, and compares global vs piecewise interpolation strategies.

### Questions Covered

#### Q1 — Lagrange Interpolation (basic)
- Implements `lagrange_basis(x, xi, i)` and `interpolate_lagrange(x, xi, yi)`
- Tested on `xi = [0,1,2,3,4]`, `yi = [0,1,8,27,64]` (i.e. x³ at integer points)
- Polynomial perfectly reconstructs the cubic

#### Q2 — Maximum Interpolation Error on [a, b]
- Sweeps `x` over 1000 equally spaced points; computes `max |f(x) − Lₙf(x)|`
- For polynomial test function `f(x) = 2x² + 3x + 1`: error ≈ 10⁻¹⁶ (machine epsilon — exact recovery)

#### Q3 — Error vs Degree for Smooth Functions
- Tests `sin(x)` and `exp(cos(x))` on `[0, 2π]`; plots log(max error) vs degree `n = 1…20`
- Error drops rapidly at first, then plateaus — higher degree yields diminishing returns and eventual instability

#### Q4 — Runge Phenomenon
- `f(x) = 1 / (1 + 25x²)` on `[−1, 1]` with equally spaced nodes
- Max error *increases* as degree grows past ~10 — characteristic blow-up near interval edges

#### Q5 — Chebyshev Nodes (mitigation)
- Nodes: `xᵢ = cos((2i+1)π / 2n)`
- Max error decreases stably with degree — no Runge blow-up
- **Conclusion:** node placement matters as much as polynomial degree

#### Q6 — Piecewise Linear Interpolation
- Connects adjacent nodes with straight-line segments; avoids global high-degree polynomials
- Error decreases as `O(h²)` where `h = node spacing`

#### Q7 — Piecewise Quadratic Interpolation
- Degree-2 polynomial fitted over each group of 3 adjacent nodes
- Better local accuracy than linear; error decreases as `O(h³)`

#### Q8 — Comparison: Piecewise Linear vs Quadratic
- Tested on `sin(x)` and `1/(1+25x²)`
- Quadratic achieves lower log(error) for the same node count; neither suffers Runge blow-up

---

## Summary

| Lab | Main Topics | Key Algorithms |
|-----|-------------|----------------|
| **Lab 1** | Elementary function approximation | Argument halving, CORDIC-style rotation |
| **Lab 2** | Series convergence, root finding | Taylor series, Newton's method, Heron / Goldschmidt |
| **Lab 3** | Polynomial interpolation | Lagrange, Chebyshev nodes, piecewise linear / quadratic |

## Key Takeaways
1. **Argument reduction** is essential — large inputs cause slow convergence or catastrophic cancellation.
2. **Newton's method** (quadratic convergence) far outperforms linear fixed-point iteration.
3. **Heron's method** is self-correcting; Goldschmidt's is not.
4. **Equally spaced Lagrange nodes** become unstable at high degree (Runge phenomenon).
5. **Chebyshev nodes** and **piecewise methods** solve Runge — stability over elegance.
