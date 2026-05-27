# Data Analysis Projects

A collection of data science projects using Python, R, and SQL.

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

### Lab Notebooks

Short exploratory data analysis exercises:

| File | Description |
|---|---|
| [`lab1.ipynb`](lab1.ipynb) | Data exploration and visualization |
| [`lab2.ipynb`](lab2.ipynb) | Statistical analysis and feature engineering |
| [`lab3.ipynb`](lab3.ipynb) | Predictive modeling |

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
jupyter notebook lab1.ipynb
```
