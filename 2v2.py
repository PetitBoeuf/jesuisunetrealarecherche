import csv
import operator
from types import ClassMethodDescriptorType

data = []; indata = []

with open('newdata.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    next(spamreader)
    for row in spamreader:
        indata = [] 
        indata.append(row[0])
        for index in range(1,3):
            indata.append(int(row[index]))
        data.append(indata)

#print(data)

new_order = []
calc_list = []
jourActuel=0
for i in range(len(data)): 
    meillDet = 999999;
    meillEl = [];
    print(i)
    print(data)
    print(new_order)
    for row in data:
        #temp_tab = [i, data[i][1] - data[i][2] - jourActuel]
        tr = data[i][2] - jourActuel
        elDet = data[i][1] - tr
        if abs(elDet) < meillDet:
            meillEl = data[i]
            meillDet = elDet
    data.pop(i)
    new_order.append(meillEl)
    jourActuel = jourActuel + meillEl[2]

print(new_order)




"""
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
print(average_time)
print(data_sum)
print(total_duration)
print(retard_accumule)
"""