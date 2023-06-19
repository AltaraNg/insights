import React, { Suspense } from "react";
import Loading from "@/components/loading";
import PaystackComponent from "./PaystackComponent";
import SearchComponent from "@/components/searchComponent";
import { getDDIssues, orderCount, ptIssues } from "@/lib/dd_db";
import { cleanDate, startOfMonth } from "@/lib/utils";
import { Title } from "@tremor/react";
import Table from "@/components/table";

export default async function PaystackBoard({ searchParams }: { searchParams: { from: string; to?: string } }) {
    const { from = cleanDate(startOfMonth()), to = cleanDate(new Date()) } = searchParams;

    const ddIssuesResult = await getDDIssues(from, to);
    const sum = ddIssuesResult.reduce((acc, obj) => acc + obj.count, 0);
    const ddIssues = ddIssuesResult
        .map(({ statusMessage, count }) => ({ name: `${statusMessage} (${((count / sum) * 100).toFixed(2)}%)`, value: count }))
        .filter(({ name }) => !["Something went wrong", "Endpoint request timed out"].includes(name));

    const orderCountRes = await orderCount(from, to);
    const ptIssuesRes = await ptIssues(from, to);

    const createRows = () => {
        return ptIssuesRes.map((item, i) => ({ id: i + 1, ...item }));
    };

    const list = [
        {
            key: "This authorization is not reusable",
            content: "This error is generated when a recurring payment isn’t possible on a Verve card."
        },
        {
            key: "No authorization code",
            content: "Customer has no authorization code."
        },
        {
            key: "Email does not match Authorization code",
            content: "If an authorization is paired with the wrong email."
        },
        {
            key: "Do not honor",
            content: "Bank declines a transaction for reasons best known to them, or when a restriction has been placed on a customer’s account."
        },
        {
            key: "Pickup card (lost card)",
            content: "The customer's card has been reported as lost and a new card has been printed but they are yet to pick it up from their bank."
        },
        {
            key: "Expired card",
            content: "This means that the card the customer is attempting the payment with has expired."
        },
        {
            key: "Contact acquirer",
            content: "This is an error message returned by the customer's Card Acquirer (their bank) which means they are unable to process the transaction at the time."
        }
    ];

    return (
        <div>
            <div className="lg:pr-80">
                <div className="font-semibold">PaystackBoard</div>
                <SearchComponent />
                <div className="mt-4">
                    <Suspense fallback={<Loading />}>
                        <PaystackComponent ddIssues={ddIssues} totalOrders={orderCountRes[0].orderCount} totalIssues={sum} />
                    </Suspense>
                </div>
                <Title className="mt-8 mb-1 text-lg">List of customers with direct debit issue</Title>
                <Table direction={"ltr"} rows={createRows()} />
            </div>
            <div className="lg:fixed inset-y-0 right-0 hidden md:w-80 overflow-y-auto top-16 border-l border-gray-200 px-4 py-6 lg:flex lg:flex-col">
                <p className="text-lg -mb-4">Notes</p>
                {list.map((i) => (
                    <div className="flex items-start gap-x-3 mt-4" key={i.key}>
                        <div className="flex-none rounded-full p-1 text-green-400 bg-green-400/10 mt-1">
                            <div className="h-2 w-2 rounded-full bg-current" />
                        </div>
                        <p className="text-sm leading-6"><span className="font-semibold">{i.key}</span> - {i.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
