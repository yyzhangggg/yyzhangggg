
library(stringr)
library(tidyverse)
data
data <- read.csv("data.csv")


# turn different types of diet in string into numerical representations


data$diet[data1$diet== 'Carnivore']<- 0 #replace all "carnivore" with numerical value 0
ata$diet[data1$diet == 'Frugivore']<- 1
data$diet[data1$diet == 'Omnivore']<- 2
data$diet[data1$diet== 'Pescatarian']<- 3
data$diet[data1$diet== 'Vegan']<- 4
data$diet[data1$diet== 'Vegetarian']<- 4


data %>% group_by(MachineryVar1) %>% summarize()
data$MachineryVar1[data$MachineryVar1 == "A"] <- 0
data$MachineryVar1[data$MachineryVar1 == "B"] <- 1
data$MachineryVar1[data$MachineryVar1 == "C"] <- 2
data$MachineryVar1[data$MachineryVar1 == "D"] <- 3
data$MachineryVar1[data$MachineryVar1 == "E"] <- 4
data$MachineryVar1[data$MachineryVar1 == "F"] <- 5
data$MachineryVar1[data$MachineryVar1 == "G"] <- 6
data$MachineryVar1[data$MachineryVar1 == "H"] <- 7
data$MachineryVar1[data$MachineryVar1 == "I"] <- 8
data$MachineryVar1[data$MachineryVar1 == "J"] <- 9




data %>% group_by(MachineryVar2) %>% summarize()
data$MachineryVar2[data$MachineryVar2 == "A"] <- 0
data$MachineryVar2[data$MachineryVar2 == "B"] <- 1
data$MachineryVar2[data$MachineryVar2 == "C"] <- 2
data$MachineryVar2[data$MachineryVar2 == "D"] <- 3
data$MachineryVar2[data$MachineryVar2 == "E"] <- 4
data$MachineryVar2[data$MachineryVar2 == "F"] <- 5
data$MachineryVar2[data$MachineryVar2 == "G"] <- 6
data$MachineryVar2[data$MachineryVar2 == "H"] <- 7
data$MachineryVar2[data$MachineryVar2 == "I"] <- 8
data$MachineryVar2[data$MachineryVar2 == "J"] <- 9




data %>% group_by(MachineryVar3) %>% summarize()
data$MachineryVar3[data$MachineryVar3 == "A"] <- 0
data$MachineryVar3[data$MachineryVar3 == "B"] <- 1
data$MachineryVar3[data$MachineryVar3 == "C"] <- 2
data$MachineryVar3[data$MachineryVar3 == "D"] <- 3

data %>% group_by(MachineryVar4) %>% summarize()
data$MachineryVar4[data$MachineryVar4 == "A"] <- 0
data$MachineryVar4[data$MachineryVar4 == "B"] <- 1
data$MachineryVar4[data$MachineryVar4 == "C"] <- 2


data=as.data.frame(lapply(data,as.numeric))
data %>% mutate(diet)
write.csv(data,file="70000data_with_na_no_str.csv",quote=F,row.names = F) # this is the data (training data) with all string variables represented in integer









data1 <- read.csv("validation.csv")
data1 %>% group_by(diet) %>% summarize()
data1
data1$diet[data1$diet== 'Carnivore']<- 0 
data1$diet[data1$diet == 'Frugivore']<- integer(1) 
data1$diet[data1$diet == 'Omnivore']<- 2
data1$diet[data1$diet== 'Pescatarian']<- 3
data1$diet[data1$diet== 'Vegan']<- 4
data1$diet[data1$diet== 'Vegetarian']<- 4
data1

data1 %>% group_by(MachineryVar1) %>% summarize()
data1$MachineryVar1[data1$MachineryVar1 == "A"] <- 0
data1$MachineryVar1[data1$MachineryVar1 == "B"] <- 1
data1$MachineryVar1[data1$MachineryVar1 == "C"] <- 2
data1$MachineryVar1[data1$MachineryVar1 == "D"] <- 3
data1$MachineryVar1[data1$MachineryVar1 == "E"] <- 4
data1$MachineryVar1[data1$MachineryVar1 == "F"] <- 5
data1$MachineryVar1[data1$MachineryVar1 == "G"] <- 6
data1$MachineryVar1[data1$MachineryVar1 == "H"] <- 7
data1$MachineryVar1[data1$MachineryVar1 == "I"] <- 8
data1$MachineryVar1[data1$MachineryVar1 == "J"] <- 9



data1 %>% group_by(MachineryVar2) %>% summarize()
data1$MachineryVar2[data1$MachineryVar2 == "A"] <- 0
data1$MachineryVar2[data1$MachineryVar2 == "B"] <- 1
data1$MachineryVar2[data1$MachineryVar2 == "C"] <- 2
data1$MachineryVar2[data1$MachineryVar2 == "D"] <- 3
data1$MachineryVar2[data1$MachineryVar2 == "E"] <- 4
data1$MachineryVar2[data1$MachineryVar2 == "F"] <- 5
data1$MachineryVar2[data1$MachineryVar2 == "G"] <- 6
data1$MachineryVar2[data1$MachineryVar2 == "H"] <- 7
data1$MachineryVar2[data1$MachineryVar2 == "I"] <- 8
data1$MachineryVar2[data1$MachineryVar2 == "J"] <- 9




data1 %>% group_by(MachineryVar3) %>% summarize()
data1$MachineryVar3[data1$MachineryVar3 == "A"] <- 0
data1$MachineryVar3[data1$MachineryVar3 == "B"] <- 1
data1$MachineryVar3[data1$MachineryVar3 == "C"] <- 2
data1$MachineryVar3[data1$MachineryVar3 == "D"] <- 3

data1 %>% group_by(MachineryVar4) %>% summarize()
data1$MachineryVar4[data1$MachineryVar4 == "A"] <- 0
data1$MachineryVar4[data1$MachineryVar4 == "B"] <- 1
data1$MachineryVar4[data1$MachineryVar4 == "C"] <- 2

data1=as.data.frame(lapply(data1,as.numeric))
data1 %>% mutate(diet)
write.csv(data1,file="test_data_with_na_no_str.csv",quote=F,row.names = F) # this is the data (testing data set) with all string variables represented in integer




# this part generates the final csv required for submission
data <- read.csv("out.csv")
data$unique_id = as.integer(data$unique_id)
write.csv(data,file="data_squad.csv",quote=F,row.names = F)
