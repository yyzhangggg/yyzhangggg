# Data Analysis Projects

A collection of data science and numerical computing projects using Python, R, and SQL.

---

## 📁 Projects

### [Insurance Textual Data Analytics](insurance%20textual%20data%20analytics/)
**Stack:** R, SQL, Python  
**Scope:** Real-world insurance dataset (70,000+ rows) provided by an actual insurance company.

**Approach:**
- Rather than discarding rows with missing values (which would cause significant data loss), applied **KNN imputation** to intelligently fill missing entries by learning from similar records
- Used **Logistic Regression** for binary classification/prediction on the imputed dataset
- Compared imputation-based approach vs. simple row-dropping to demonstrate accuracy improvement

**Files:**
| File | Description |
|---|---|
| `data_squad.R` | Main R script: data loading, KNN imputation, logistic regression |
| `data.csv` | Original dataset |
| `70000data_with_na_no_str.csv` | Preprocessed 70k-row dataset (NAs retained, strings removed) |
| `data_with_na_no_str.csv` | Smaller preprocessed version |
| `drought_prediction_model.ipynb` | Jupyter notebook for drought prediction model |
| `validation.csv` | Validation set |

*Credit: McGill Data Squad collaboration project.*

---

### [Numerical Methods](numerical-method/)
**Stack:** Python (`math`, `numpy`, `matplotlib`)  
**Scope:** Three labs implementing and analysing core numerical computing algorithms from scratch.

| Lab | Topic |
|-----|-------|
| [`lab1.ipynb`](numerical-method/lab1.ipynb) | Floating-point function approximation — `log`, `exp`, `sin`, `cos`, `arctan` via argument halving & CORDIC |
| [`lab2.ipynb`](numerical-method/lab2.ipynb) | Power series convergence & root finding — Taylor series, Newton's method, Heron vs Goldschmidt |
| [`lab3.ipynb`](numerical-method/lab3.ipynb) | Polynomial interpolation — Lagrange, Runge phenomenon, Chebyshev nodes, piecewise methods |

See [`numerical-method/README.md`](numerical-method/README.md) for detailed summaries of each lab.

---

## 🛠 How to Run

**Insurance project (R):**
```bash
# Install required R packages first
# install.packages(c("VIM", "tidyverse"))
Rscript data_squad.R
```

**Jupyter notebooks:**
```bash
jupyter notebook numerical-method/lab1.ipynb
```
