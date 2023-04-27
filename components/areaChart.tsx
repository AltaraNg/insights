'use client'

import React from 'react';
import { AreaChart, Card, Text, Title, Metric, Flex, ProgressBar, Divider } from "@tremor/react";
import ZeroState from "@/components/zeroState";

const dataFormatter = (number: any) => {
    return number;
};

const AreaChartComponent = ({ chartData = [], chartTitle, chartSubTitle }: { chartData?: Array<any>, chartTitle: string, chartSubTitle?: string }) => {
    let categories: Array<string> = [];
    if (chartData.length > 0) {
        categories = Object.keys(chartData[0]).filter(item => item != "date")
    }

    return (
        <div className="mt-4">
            <Divider />
            {chartData.length > 0 ? (
                <>
                    <div className='flex justify-start gap-4'>
                        <Card className="max-w-xs" decoration="top" decorationColor="indigo">
                            <Text>Sales</Text>
                            <Metric>$ 71,465</Metric>
                            <Flex className="mt-4">
                                <Text>32% of annual target</Text>
                                <Text>$ 225,000</Text>
                            </Flex>
                            <ProgressBar percentageValue={32} className="mt-2" />
                        </Card>
                        <Card className="max-w-xs" decoration="top" decorationColor="cyan">
                            <Text>Sales</Text>
                            <Metric>$ 71,465</Metric>
                            <Flex className="mt-4">
                                <Text>32% of annual target</Text>
                                <Text>$ 225,000</Text>
                            </Flex>
                            <ProgressBar percentageValue={32} className="mt-2" />
                        </Card>
                    </div>
                    <Card className='mt-6'>
                        <Title>{chartTitle}</Title>
                        <Text>{chartSubTitle}</Text>
                        <AreaChart
                            className="h-72 mt-8"
                            data={chartData}
                            index="date"
                            categories={categories}
                            colors={["blue", "cyan", "indigo", "yellow", "green", "purple"]}
                            valueFormatter={dataFormatter}
                        />
                    </Card>
                </>
            ) : (
                <ZeroState />
            )}
        </div>
    )
}

export default AreaChartComponent