The purpose of this project meant to showes basic ability of data analytics skills using numpy and AI models.

1. Acquire, preprocess, and analyze the data from： 
    Source of data :
        Dataset 1: ENB2012 data.xlsx (Energy efficiency dataset):
           https://archive.ics.uci.edu/ml/datasets/Energy+efficiency
        Dataset 2: Qualitative Bankruptcy (250 instances).rar (Qualitative Bankruptcy dataset):
           https://archive.ics.uci.edu/ml/datasets/Qualitative_Bankruptcy

2. Load the datasets into NumPy and Pandas objects in Python and clean the data, and analysis teh data using the following AI model:
   (1)Implement analytical linear regression solution for Dataset 
   (2)Implement logistic regression with gradient descent for Dataset
   (3)Implement mini-batch stochastic gradient descent for both linear and logistic regression.
   by defining a fit function X and a predict function Y.

3. There is also a pdf report using LaTex for reporting the training results,including but not limited to be the following:
   ---performance of linear regression and fully batched logistic regression. For both datasets use a 80/20
train/test split and report the performance on both training set and test set.
   ---the weights of each of features in your trained models and discuss how each feature could affect the
performance of the models.
   ---Sample growing subsets of the training data (20%,30%,...80%). Observe and explain how does size of training
data affects the performance for both models. Plot two curves as a function of training size, one for performance
in train and one for test.
   ---For both linear and logistic regression, try out growing minibatch sizes, e.g., 8, 16, 32, 64, and 128. Compare
the convergence speed and final performance of different batch sizes to the fully batched baseline.
   ---Present in graphs about the performance of both linear and logistic regression with at least three different learning rates.
