#Premier ordonnancement considéré comme dans les critères du sujet d'ordonnancement des tâches.

import csv
import operator

data = []; indata = []

with open('data.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    next(spamreader)
    for row in spamreader:
        indata = [] 
        indata.append(row[0])
        for index in range(1,3):
            indata.append(int(row[index]))
        data.append(indata)

data = sorted(data, key=operator.itemgetter(1))

data_sum=0
total_duration=0
for row in data:
    data_sum = row[1] + data_sum
    total_duration = total_duration + data_sum

average_time = total_duration / len(data)

print(data)
print(average_time)
print(data_sum)