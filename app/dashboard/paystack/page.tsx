import React, { Suspense } from "react";
import Loading from "@/components/loading"
import PaystackComponent from "./PaystackComponent";
import SearchComponent from "@/components/searchComponent";
import { getDDIssues, orderCount, ptIssues } from "@/lib/dd_db";
import { cleanDate, startOfMonth } from "@/lib/utils";
import { Title } from "@tremor/react";
import Table from "@/components/table";

export default async function PaystackBoard({ searchParams }: { searchParams: { from: string, to?: string } }) {
    const { from = cleanDate(startOfMonth()), to = cleanDate(new Date()) } = searchParams;

    const ddIssuesResult = await getDDIssues(from, to);
    const sum = ddIssuesResult.reduce((acc, obj) => acc + obj.count, 0);
    const ddIssues = ddIssuesResult.map(({ statusMessage, count }) => ({ name: `${statusMessage} (${((count / sum) * 100).toFixed(2)}%)`, value: count })).filter(({ name }) => !["Something went wrong", "Endpoint request timed out"].includes(name));

    const orderCountRes = await orderCount(from, to)
    const ptIssuesRes = await ptIssues(from, to)


    const createRows = () => {
        return ptIssuesRes.map((item, i) => ({ id: i + 1, ...item }))
    }

    return (
        <div>
            <div className="font-semibold">PaystackBoard</div>
            <SearchComponent />
            <div className="mt-4">
                <Suspense fallback={<Loading />}>
                    <PaystackComponent ddIssues={ddIssues} totalOrders={orderCountRes[0].orderCount} totalIssues={sum} />
                </Suspense>
            </div>
            <Title className="mt-8 mb-1 text-lg">List of customers with direct debit issue</Title>
            <Table direction={'ltr'} rows={createRows()} />
        </div>
    );
};
