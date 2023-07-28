"use client";

import React from "react";
import { Card, Text, Title, Flex, Divider, BarList, Bold, DonutChart } from "@tremor/react";

const valueFormatter = (number: number) => `${Intl.NumberFormat("NG").format(number).toString()}`;

const PaystackComponent = ({
    ddIssues = [],
    totalOrders = 0,
    totalIssues = 0,
    groupIssuesArr = [],
}: {
    ddIssues?: Array<any>;
    totalOrders?: number | string;
    totalIssues?: number;
    groupIssuesArr: { name: string; value: number; percentage: string }[];
}) => {
    return (
        <div className="mt-4">
            <Divider />
            {/* Only show then there are issues */}
            {groupIssuesArr.length > 0 && (
                <Card className="max-w-lg relative pb-24">
                    <div className="absolute right-4 bottom-4 text-sm">
                        <ul className="list-disc">
                            {groupIssuesArr.map((i: any) => (
                                <li key={i.name}>
                                    <span>{i.name}</span>: <span className="font-semibold">{i.percentage !== "0.00" ? i.percentage : 0}%</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Title>Error Groups</Title>
                    <DonutChart
                        variant="pie"
                        className="mt-6"
                        data={groupIssuesArr}
                        category="value"
                        index="name"
                        valueFormatter={valueFormatter}
                        colors={["violet", "indigo", "rose", "cyan", "amber"]}
                    />
                </Card>
            )}
            <Card className="mt-4 max-h-[500px] overflow-auto">
                <Title>Direct Debit Issues</Title>
                <p>Total number of sales: {totalOrders}</p>
                <p>Total number of debit issues: {totalIssues}</p>
                {ddIssues.length > 0 && (
                    <>
                        <Flex className="mt-4">
                            <Text>
                                <Bold>Issue</Bold>
                            </Text>
                            <Text>
                                <Bold>Count</Bold>
                            </Text>
                        </Flex>
                        <BarList data={ddIssues} className="mt-2" />
                    </>
                )}
            </Card>
        </div>
    );
};

export default PaystackComponent;
