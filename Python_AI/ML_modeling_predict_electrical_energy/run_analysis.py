import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')          # non-interactive backend — saves PNG, no GUI needed
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

# ── Load data ──────────────────────────────────────────────────────────────────
df = pd.read_csv('CCPP_data.csv')
print(f"Dataset loaded: {df.shape[0]} rows x {df.shape[1]} columns")
print(df.describe().round(2))

# ── Features / target ──────────────────────────────────────────────────────────
X = df[['AT', 'AP', 'RH', 'V']]
y = df['PE']

# ── Train / Test split (80/20) ─────────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"\nTrain: {len(X_train)}  Test: {len(X_test)}")

# ── Feature Scaling ────────────────────────────────────────────────────────────
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)

# ── Model A: Linear Regression ─────────────────────────────────────────────────
lr = LinearRegression()
lr.fit(X_train_scaled, y_train)

# ── Visualization: LR Coefficients (horizontal bar chart) ─────────────────────────
features = ['T', 'AP', 'RH', 'V']
coefs    = lr.coef_

colors = ['#d62728' if c < 0 else '#2ca02c' for c in coefs]   # red = negative, green = positive

fig, ax = plt.subplots(figsize=(8, 4))
bars = ax.barh(features, coefs, color=colors, edgecolor='black', height=0.5)

# value labels on each bar
for bar, val in zip(bars, coefs):
    offset = -0.6 if val < 0 else 0.2
    ax.text(val + offset, bar.get_y() + bar.get_height() / 2,
            f'{val:+.2f} MW', va='center', fontsize=10, fontweight='bold')

ax.axvline(0, color='black', linewidth=0.8, linestyle='--')
ax.set_xlabel('Coefficient (MW per 1-std change in feature)', fontsize=11)
ax.set_title('Linear Regression — Feature Coefficients\n'
             '(after StandardScaler: each feature shifted to mean=0, std=1)',
             fontsize=12, pad=12)

red_patch   = mpatches.Patch(color='#d62728', label='Negative effect on PE')
green_patch = mpatches.Patch(color='#2ca02c', label='Positive effect on PE')
ax.legend(handles=[green_patch, red_patch], loc='lower right', fontsize=9)

ax.set_xlim(min(coefs) * 1.3, max(coefs) * 1.3)
plt.tight_layout()
plt.savefig('lr_coefficients.png', dpi=150)
plt.close()
print("\nSaved: lr_coefficients.png")

# also print to terminal
print("\n=== Linear Regression Coefficients ===")
for feat, coef in zip(features, coefs):
    print(f"  {feat:4s}  {coef:+.4f}  MW per 1-std change")
print(f"  bias  {lr.intercept_:+.4f}")

# ── Model B: Random Forest ─────────────────────────────────────────────────────
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train_scaled, y_train)

# ── Visualise: RF Feature Importance ──────────────────────────────────────────
importances = rf.feature_importances_
sorted_idx  = np.argsort(importances)[::-1]
sorted_feats = [features[i] for i in sorted_idx]
sorted_imps  = importances[sorted_idx]

fig, ax = plt.subplots(figsize=(7, 4))
ax.barh(sorted_feats[::-1], sorted_imps[::-1],
        color='#1f77b4', edgecolor='black', height=0.5)

for i, (feat, imp) in enumerate(zip(sorted_feats[::-1], sorted_imps[::-1])):
    ax.text(imp + 0.005, i, f'{imp:.3f}', va='center', fontsize=10)

ax.set_xlabel('Feature Importance (fraction of variance explained)', fontsize=11)
ax.set_title('Random Forest — Feature Importance', fontsize=12, pad=12)
ax.set_xlim(0, 1.05)
plt.tight_layout()
plt.savefig('rf_feature_importance.png', dpi=150)
plt.close()
print("Saved: rf_feature_importance.png")

print("\n=== Random Forest Feature Importance ===")
for feat, imp in zip(sorted_feats, sorted_imps):
    bar = '#' * int(imp * 40)
    print(f"  {feat:4s}  {imp:.4f}  {bar}")

# ── Evaluate both models ───────────────────────────────────────────────────────
def evaluate(name, model, X_t, y_t):
    y_pred = model.predict(X_t)
    rmse = np.sqrt(mean_squared_error(y_t, y_pred))
    mae  = mean_absolute_error(y_t, y_pred)
    r2   = r2_score(y_t, y_pred)
    print(f"\n{'='*40}\n  {name}\n{'='*40}")
    print(f"  RMSE : {rmse:.4f} MW")
    print(f"  MAE  : {mae:.4f} MW")
    print(f"  R2   : {r2:.4f}")
    return rmse, mae, r2

lr_scores = evaluate("Linear Regression", lr, X_test_scaled, y_test)
rf_scores = evaluate("Random Forest",     rf, X_test_scaled, y_test)

# ── Visualise: Model Comparison bar chart ─────────────────────────────────────
metrics      = ['RMSE (MW)', 'MAE (MW)', 'R2']
lr_vals      = list(lr_scores)
rf_vals      = list(rf_scores)

x   = np.arange(len(metrics))
w   = 0.3

fig, ax = plt.subplots(figsize=(8, 5))
ax.bar(x - w/2, lr_vals, width=w, label='Linear Regression',
       color='#ff7f0e', edgecolor='black')
ax.bar(x + w/2, rf_vals, width=w, label='Random Forest',
       color='#1f77b4', edgecolor='black')

for i, (lv, rv) in enumerate(zip(lr_vals, rf_vals)):
    ax.text(i - w/2, lv + 0.01, f'{lv:.3f}', ha='center', fontsize=9)
    ax.text(i + w/2, rv + 0.01, f'{rv:.3f}', ha='center', fontsize=9)

ax.set_xticks(x)
ax.set_xticklabels(metrics, fontsize=11)
ax.set_title('Model Comparison — Linear Regression vs Random Forest', fontsize=12)
ax.legend(fontsize=10)
ax.set_ylim(0, max(lr_vals + rf_vals) * 1.25)
plt.tight_layout()
plt.savefig('model_comparison.png', dpi=150)
plt.close()
print("\nSaved: model_comparison.png")

# ── Cross-Validation ───────────────────────────────────────────────────────────
print("\n=== 5-Fold Cross-Validation R2 ===")
for name, model in [("Linear Regression", lr), ("Random Forest", rf)]:
    scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='r2')
    print(f"  {name:20s}  mean={scores.mean():.4f}  std={scores.std():.4f}")

print("\nDone. Open lr_coefficients.png, rf_feature_importance.png, model_comparison.png")
