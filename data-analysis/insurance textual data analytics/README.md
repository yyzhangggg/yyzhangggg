NOTE: This is a project using R, SQL and Python language to process data and prediction for the up coming years, based on a real life insurance company who provided their data collects.

Credit to all members of Mcgill Data Squad.

Additional Note that `70000data_with_na_no_str.csv` and  `data_with_na_no_str.csv` are preprocessed dataset files generated from given csv files using `data_squad.R`.

=======================================================================================================================================================Creative Approach:

Rather just simply drop the missing data (this would only work when there's large sample set and large amount of input data and small portion of the missing data, otherwise it could cause low prediction rate)

We use an approach tha inspired by AI and algorithm, that we use KNN imputation + logistic regression to generate and fill the missing data, so that we do not need to drop great amount of data since the other entries could also have valuable information. And by not simply eliminate the sample but fill the missing slots, we increase the training and sample set, and increase the prediction and determination rate.

Why logistic regression?
A: this is a non continues problem and over all we are doing logistic determination on a single point or making a judgement on a problem, so lOGISTIC REGRESSION would be at the best fit.