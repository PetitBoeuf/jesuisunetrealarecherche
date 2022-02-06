#Programme qui fait la réduction du temps accumulé => critère 1 du sujet d'ordonnancement de tâches.
#Fonctionnement expliqué dans le mémoire.

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

data = sorted(data, key=operator.itemgetter(2))

data_sum=0
total_duration=0
retard_accumule=0
for row in data:
    data_sum += row[1]
    total_duration += data_sum
    if retard_accumule < data_sum - row[2]:
        retard_accumule = data_sum - row[2]

average_time = total_duration / len(data)
print(data)
#print(average_time)
print(data_sum)
print(total_duration)
print(retard_accumule)