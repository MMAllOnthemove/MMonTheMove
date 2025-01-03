1. Warranty Status Analysis

```js
const warrantyAnalysis = (data: any[]) => {
    const warrantyStatus = data.map((item) => item.warranty);
    const warrantyCount = warrantyStatus.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    return warrantyCount;
};

// Output: { OOW: 1, IW: 1 }
```

2. Fault Category Analysis

```js
const faultAnalysis = (data: any[]) => {
    const faultCategories = data.map((item) => item.fault);
    const faultCount = faultCategories.reduce((acc, curr) => {
        const category = curr.split(" ").shift();
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});
    return faultCount;
};

// Output: { NOT: 1, ROMEO: 1 }
```

3. Engineer Workload Analysis

```js
const engineerWorkload = (data: any[]) => {
    const engineerWorkload = data.map((item) => item.engineer);
    const workloadCount = engineerWorkload.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    return workloadCount;
};

// Output: { Benjamin Harris: 1, Charlotte Davis: 1 }
```

4. Unit Status Analysis

```js
const unitStatusAnalysis = (data: any[]) => {
    const unitStatus = data.map((item) => item.unit_status);
    const unitStatusCount = unitStatus.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    return unitStatusCount;
};

// Output: { Parts issued: 1, Parts to be ordered: 1 }
```

5. Store Performance Analysis

```js
const storePerformance = (data: any[]) => {
    const storeData = data.map((item) => item.stores);
    const storeCount = storeData.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    return storeCount;
};

// Output: { Haven Home Decor: 2 }
```

6. Model-wise Fault Analysis

```js
const modelFaultAnalysis = (data: any[]) => {
    const modelFaultData = data.map((item) => ({
        model: item.model,
        fault: item.fault,
    }));
    const modelFaultCount = modelFaultData.reduce((acc, curr) => {
        acc[curr.model] = acc[curr.model] || [];
        acc[curr.model].push(curr.fault);
        return acc;
    }, {});
    return modelFaultCount;
};

// Output: { GT-P5200MKEXFA: ["NOT CHARGING"], SM-R7320ZKAXFA: ["ROMEO STOPPED WORKING CHARGING BUT NO DISPLAY"] }
```

7. Engineer-wise Completion Rate Analysis

```js
const engineerCompletionRate = (data: any[]) => {
    const engineerData = data.map((item) => ({
        engineer: item.engineer,
        completed_date: item.completed_date,
    }));
    const engineerCompletionCount = engineerData.reduce((acc, curr) => {
        acc[curr.engineer] = acc[curr.engineer] || { completed: 0, total: 0 };
        if (curr.completed_date) {
            acc[curr.engineer].completed++;
        }
        acc[curr.engineer].total++;
        return acc;
    }, {});
    return engineerCompletionCount;
};

// Output: { Benjamin Harris: { completed: 0, total: 1 }, Charlotte Davis: { completed: 0, total: 1 } }
```

8. Department-wise Task Analysis

```js
const departmentTaskAnalysis = (data: any[]) => {
    const departmentData = data.map((item) => item.department);
    const departmentCount = departmentData.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    return departmentCount;
};

// Output: { HHP: 2 }
```

9. Time-to-Complete Analysis

```js
const timeToComplete = (data: any[]) => {
    const completionData = data.map((item) => ({
        engineer: item.engineer,
        completionTime:
            Date.parse(item.completed_date) - Date.parse(item.date_booked),
    }));
    const avgCompletionTime = completionData.reduce(
        (acc, curr) => {
            acc.total += curr.completionTime;
            acc.count++;
            return acc;
        },
        { total: 0, count: 0 }
    );
    return avgCompletionTime.total / avgCompletionTime.count;
};

// Output: average time to complete in milliseconds
```

10. Parts Usage Analysis

```js
const partsUsage = (data: any[]) => {
    const partsData = data.map((item) => item.parts_list);
    const partsCount = partsData.reduce((acc, curr) => {
        curr.forEach((part) => {
            acc[part] = (acc[part] || 0) + 1;
        });
        return acc;
    }, {});
    return partsCount;
};

// Output: { part1: 2, part2: 1, ... }
```

11. Reassign Engineer Analysis

```js
const reassignEngineer = (data: any[]) => {
    const reassignData = data.map((item) => item.reassign_engineer);
    const reassignCount = reassignData.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    return reassignCount;
};

// Output: { engineer1: 1, engineer2: 2, ... }
```

12. Reassign Engineer Analysis

```js
const repeatRepair = (data: any[]) => {
    const repeatData = data.map((item) => item.repeat_repair);
    const repeatCount = repeatData.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    return repeatCount;
};

// Output: { Yes: 1, No: 2, ... }
```

13. Engineer Efficiency Analysis

```js
const engineerEfficiency = (data: any[]) => {
    const engineerData = data.map((item) => ({
        engineer: item.engineer,
        efficiency: item.completed_date ? 1 : 0,
    }));
    const engineerEfficiencyScore = engineerData.reduce((acc, curr) => {
        acc[curr.engineer] = acc[curr.engineer] || 0;
        acc[curr.engineer] += curr.efficiency;
        return acc;
    }, {});
    return engineerEfficiencyScore;
};

// Output: { engineer1: 0.8, engineer2: 0.6, ... }
```

14. Store-wise Engineer Analysis

```js
const storeEngineerAnalysis = (data: any[]) => {
    const storeData = data.map((item) => ({
        store: item.stores,
        engineer: item.engineer,
    }));
    const storeEngineerCount = storeData.reduce((acc, curr) => {
        acc[curr.store] = acc[curr.store] || {};
        acc[curr.store][curr.engineer] =
            (acc[curr.store][curr.engineer] || 0) + 1;
        return acc;
    }, {});
    return storeEngineerCount;
};

// Output: { store1: { engineer1: 2, engineer2: 1 }, store2: { engineer3: 1, engineer4: 2 } }
```

15. Fault Category Trend Analysis

```js
const faultCategoryTrend = (data: any[]) => {
    const faultData = data.map((item) => ({
        fault: item.fault,
        date: item.date_booked,
    }));
    const faultCategoryCount = faultData.reduce((acc, curr) => {
        acc[curr.fault] = acc[curr.fault] || [];
        acc[curr.fault].push(curr.date);
        return acc;
    }, {});
    return faultCategoryCount;
};

// Output: { fault1: ["2022-01-01", "2022-01-15"], fault2: ["2022-02-01", "2022-03-01"] }
```

16. Average Time to Complete

```js
const averageTimeToComplete = (data: any[]) => {
    const completionTimes = data.map(
        (item) => Date.parse(item.completed_date) - Date.parse(item.date_booked)
    );
    const averageTime =
        completionTimes.reduce((acc, curr) => acc + curr, 0) /
        completionTimes.length;
    return averageTime / (60 * 60 * 24); // convert to days
};
```

17. Engineer Efficiency

```js
const engineerEfficiency = (data: any[]) => {
    const engineerData = data.map((item) => ({
        engineer: item.engineer,
        efficiency: item.completed_date ? 1 : 0,
    }));
    const engineerEfficiencyScores = engineerData.reduce((acc, curr) => {
        acc[curr.engineer] = acc[curr.engineer] || 0;
        acc[curr.engineer] += curr.efficiency;
        return acc;
    }, {});
    return engineerEfficiencyScores;
};
```

18. Store-wise Fault Analysis

```js
const storeWiseFaultAnalysis = (data: any[]) => {
    const storeData = data.map((item) => ({
        store: item.stores,
        fault: item.fault,
    }));
    const storeFaultCount = storeData.reduce((acc, curr) => {
        acc[curr.store] = acc[curr.store] || {};
        acc[curr.store][curr.fault] = (acc[curr.store][curr.fault] || 0) + 1;
        return acc;
    }, {});
    return storeFaultCount;
};
```

19. Engineer Workload

```js
const engineerWorkload = (data: any[]) => {
    const engineerData = data.map((item) => item.engineer);
    const engineerWorkloadCount = engineerData.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    return engineerWorkloadCount;
};
```

20. Engineer Efficiency by Store

```js
const engineerEfficiencyByStore = (data: any[]) => {
    const engineerData = data.map((item) => ({
        engineer: item.engineer,
        store: item.stores,
        efficiency: item.completed_date ? 1 : 0,
    }));
    const engineerEfficiencyScores = engineerData.reduce((acc, curr) => {
        acc[curr.engineer] = acc[curr.engineer] || {};
        acc[curr.engineer][curr.store] =
            (acc[curr.engineer][curr.store] || 0) + curr.efficiency;
        return acc;
    }, {});
    return engineerEfficiencyScores;
};
```

21. Average Time to Complete by Engineer

```js
const averageTimeToCompleteByEngineer = (data: any[]) => {
    const engineerData = data.map((item) => ({
        engineer: item.engineer,
        completionTime:
            Date.parse(item.completed_date) - Date.parse(item.date_booked),
    }));
    const averageTimeToComplete = engineerData.reduce((acc, curr) => {
        acc[curr.engineer] = (acc[curr.engineer] || 0) + curr.completionTime;
        return acc;
    }, {});
    return averageTimeToComplete;
};
```
