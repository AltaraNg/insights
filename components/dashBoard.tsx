'use client'

import React from 'react';
import { AreaChart, BadgeDelta, BarList, Bold, Card, Text, Title, Metric, Flex, ProgressBar, Divider, BarChart, LineChart, Subtitle, CategoryBar } from "@tremor/react";
import ZeroState from "@/components/zeroState";
import { currency } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { startOfMonth, endOfMonth } from "@/lib/utils";

const dataFormatter = (number: any) => {
    return number;
};

function totalSum(data: any[], key: string): number {
    return data.reduce((acc, curr) => acc + curr[key], 0);
}


const DashBoard = ({ chartData = [], branchData = [], results = [], orderTypes = [], salesDuration = [], totalSalesDuration = [], salesCategories = [], totalSalesCategory = [], totalBusinessTypes = [], branchCount = 1 }: { chartData?: Array<any>, branchData?: Array<any>, orderTypes?: Array<any>, salesDuration: any[], totalSalesDuration?: any[], salesCategories?: any[], totalSalesCategory?: any[], totalBusinessTypes?: any[], results?: any, branchCount: number }) => {
    const searchParams = useSearchParams();
    const branch: string | null = searchParams!.get('branch');
    const from: string | null = searchParams!.get('from');
    const to: string | null = searchParams!.get('to');

    let categories: Array<string> = [];
    if (chartData.length > 0) {
        categories = Object.keys(chartData[0]).filter(item => item != "date")
    }

    const fromDate = new Date(from || startOfMonth());
    const toDate = new Date(to || endOfMonth());
    // const toDate = to ? new Date(to) : new Date();

    const timeDiff = toDate.getTime() - fromDate.getTime(); // get the difference in milliseconds
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1; // convert to days and round down

    const totalSales: number = totalSum(results, "sales");
    const totalRevenue: number = totalSum(results, "revenue");

    const targetPerDay = 2.5;
    const bCount = branch ? 1 : branchCount;
    const targetSales: number = (targetPerDay * daysDiff) * bCount;
    // const targetSales: number = branch ? (90) : (90 * 21);
    const percentage: number = (totalSales / targetSales) * 100;

    let salesDurationCategories: Array<string> = [];
    if (salesDuration.length > 0) {
        salesDurationCategories = Object.keys(salesDuration[0]).filter(item => item != "date")
    }




    return (
        <div className="mt-4">
            <Divider />
            {chartData.length > 0 ? (
                <>
                    <div className='flex justify-start gap-6'>
                        <Card className="max-w-xs" decoration="top" decorationColor="indigo">
                            <Flex alignItems="start">
                                <div>
                                    <Text>Sales</Text>
                                    <Metric className='flex items-baseline'>{totalSales}<Text>/{Math.round(targetSales)}</Text></Metric>
                                </div>
                                <BadgeDelta deltaType="moderateIncrease">{percentage.toFixed(0)}%</BadgeDelta>
                            </Flex>
                            {/* <Flex className="mt-4">
                                <Text>{percentage.toFixed(0)}% of target</Text>
                                <Text>{Math.round(targetSales)}</Text>
                            </Flex> */}
                            {/* <ProgressBar percentageValue={percentage} className="mt-4" /> */}
                            <CategoryBar
                                categoryPercentageValues={[40, 30, 30]}
                                colors={["rose", "yellow", "emerald"]}
                                percentageValue={percentage}
                                className="mt-4"
                            />
                        </Card>
                        <Card className="max-w-xs" decoration="top" decorationColor="purple">
                            <div>
                                <Text>Revenue</Text>
                                <Metric>{currency(totalRevenue)}</Metric>
                            </div>
                        </Card>
                    </div>
                    <Card className="mt-6" decoration="top" decorationColor="cyan">
                        <div className="card-bg" />
                        <Flex className="mt-4">
                            <Text>
                                <Bold>Sales Type</Bold>
                            </Text>
                            <Text>
                                <Bold>No of Sales</Bold>
                            </Text>
                        </Flex>
                        <BarList data={totalSalesCategory} className="mt-2" />
                    </Card>
                    <Card className="mt-6" decoration="top" decorationColor="amber">
                        <Flex className="mt-4">
                            <Text>
                                <Bold>Sales Plan</Bold>
                            </Text>
                            <Text>
                                <Bold>No of Sales</Bold>
                            </Text>
                        </Flex>
                        <BarList data={totalSalesDuration} className="mt-2" />
                    </Card>
                    <Card className="mt-6" decoration="top" decorationColor="red">
                        <Flex className="mt-4">
                            <Text>
                                <Bold>Business type Plan</Bold>
                            </Text>
                            <Text>
                                <Bold>No of Sales</Bold>
                            </Text>
                        </Flex>
                        <BarList data={totalBusinessTypes} className="mt-2" />
                    </Card>
                    <Card className='mt-6 bg-gray-50'>
                        <div className="card-bg" />
                        <Title>Sales Performance</Title>
                        <LineChart
                            className="mt-6"
                            data={chartData}
                            index="date"
                            categories={["No of sales"]}
                            colors={["blue"]}
                            valueFormatter={dataFormatter}
                            yAxisWidth={40}
                            showLegend={true}
                        />
                    </Card>
                    <Card className="mt-6">
                        <Title>Showrooms Performance Snapshot</Title>
                        <Subtitle>
                            Analyzing Sales Performance across Company showrooms
                        </Subtitle>
                        <BarChart
                            className="mt-6"
                            data={branchData}
                            index="name"
                            categories={["No of sales"]}
                            colors={["pink"]}
                            valueFormatter={dataFormatter}
                            yAxisWidth={48}
                        />
                    </Card>
                    <Card className="mt-6 bg-gray-50">
                        <div className="card-bg" />
                        <Title>Sales Plan</Title>
                        <AreaChart
                            className="mt-6"
                            data={salesDuration}
                            index="date"
                            categories={["three_months-20", "three_months-40", "six_months-20", "six_months-40", "six_months-60", "six_months-100"]}
                            colors={["orange", "indigo", "pink", "cyan", "blue", "rose"]}
                            valueFormatter={dataFormatter}
                            yAxisWidth={40}
                            showLegend={true}
                        />
                    </Card>
                    <Card className='mt-6'>
                        <div className="card-bg" />
                        <Title>Sales Types</Title>
                        <BarChart
                            className="mt-6"
                            data={orderTypes}
                            index="date"
                            categories={["Altara Credit", "Altara Pay", "Cash n Carry"]}
                            colors={["cyan", "indigo", "red"]}
                            valueFormatter={dataFormatter}
                            yAxisWidth={40}
                            showLegend={true}
                        />
                    </Card>
                    <Card className="mt-6 bg-gray-50">
                        <div className="card-bg" />
                        <Title>Sales Categories</Title>
                        <AreaChart
                            className="mt-6"
                            data={salesCategories}
                            index="date"
                            categories={["new sales", "renewal(DSA)", "Staff Purchase", "Staff Referral", "Repossesion Sale", "Referral Sales", "Cash n Carry", "No BS"]}
                            colors={["orange", "indigo", "pink", "cyan", "blue", "rose", "red", "green"]}
                            valueFormatter={dataFormatter}
                            yAxisWidth={40}
                            showLegend={true}
                        />
                    </Card>
                </>
            ) : (
                <ZeroState />
            )}
        </div>
    )
}

export default DashBoard