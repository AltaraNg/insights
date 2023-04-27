'use client'

import React, {useState} from 'react';
import { AreaChart, Card, Text, Title, Metric, Flex, ProgressBar } from "@tremor/react";
import { DateRangePicker, DateRangePickerValue } from "@tremor/react";

const chartdata = [
    {
        date: "Dec 11",
        Facebook: "11",
        DSA: "133",
        Website: 49,
        "Mobile App": 0,
        Radio: 0,
        "Walk-in": 0,
    },
    {
        date: "Dec 18",
        Facebook: 6,
        DSA: 126,
        Website: 38,
        "Mobile App": 0,
        Radio: 0,
        "Walk-in": 0,
    },
    {
        date: "Dec 25",
        Facebook: 3,
        DSA: 66,
        Website: 29,
        "Mobile App": 0,
        Radio: 0,
        "Walk-in": 0,
    },
];

const dataFormatter = (number: any) => {
    return number;
};

const Reports = () => {
    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(2022, 1, 1),
        new Date(),
    ]);
    return (
        <div>
            <div>Reports</div>
            <DateRangePicker
                className="max-w-md mx-auto"
                value={value}
                onValueChange={setValue}
                dropdownPlaceholder="Select"
            />
            <Card className="max-w-xs mx-auto">
                <Text>Sales</Text>
                <Metric>$ 71,465</Metric>
                <Flex className="mt-4">
                    <Text>32% of annual target</Text>
                    <Text>$ 225,000</Text>
                </Flex>
                <ProgressBar percentageValue={32} className="mt-2" />
            </Card>
            <Card>
                <Title>Newsletter revenue over time (USD)</Title>
                <AreaChart
                    className="h-72 mt-4"
                    data={chartdata}
                    index="date"
                    categories={["Facebook", "The Pragmatic Engineer", "Website", "Mobile App", "Radio", "Walk-in"]}
                    colors={["blue", "cyan", "indigo", "yellow", "green", "purple"]}
                    valueFormatter={dataFormatter}
                />
            </Card>
        </div>
    )
}

export default Reports