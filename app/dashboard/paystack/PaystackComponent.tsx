'use client'

import React from 'react';
import { Card, Text, Title, Flex, Divider, BarList, Bold } from "@tremor/react";

const PaystackComponent = ({ ddIssues = [], totalOrders = 0, totalIssues = 0 }: { ddIssues?: Array<any>, totalOrders?: number | string, totalIssues?: number }) => {

    return (
        <div className="mt-4">
            <Divider />
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
    )
}

export default PaystackComponent