import SearchComponent from "@/components/searchComponent";
import DashBoard from "@/components/dashBoard";
import { getBranches, salesMetrics, showroomSales, orderTypesQuery, salesDurationQuery, totalSalesDurationQuery, salesCategoryQuery, totalSalesCategoryQuery, totalBusinessTypesQuery } from "@/lib/db";
import { cleanDate, startOfMonth, sortAreaData } from "@/lib/utils";

export default async function HomeComponent({ searchParams }: { searchParams: { branch: string, from: string, to?: string } }) {
    const branches = await getBranches();
    const { branch = "", from = cleanDate(startOfMonth()), to = cleanDate(new Date()) } = searchParams;
    const branchSales = await showroomSales(from, to);
    const results = await salesMetrics(from, to, branch);
    const orderTypesResult = await orderTypesQuery(from, to, branch);
    const salesDurationResult = await salesDurationQuery(from, to, branch);
    const salesCategoryResult = await salesCategoryQuery(from, to, branch);
    const totalSalesCategoryResult = await totalSalesCategoryQuery(from, to, branch);
    const totalSalesDurationResult = await totalSalesDurationQuery(from, to, branch);
    const totalBusinessTypesResult = await totalBusinessTypesQuery(from, to, branch);

    const data = results.map(({ date, sales }) => ({ date, 'No of sales': sales }))
    const branchData = branchSales.map(({ name, sales }) => ({ name, 'No of sales': sales }))
    const orderTypes = sortAreaData(orderTypesResult.map(({ name, date, sales }) => ({ date, category: name, count: sales })))
    const salesDuration = sortAreaData(salesDurationResult.map(({ name, date, sales }) => ({ date, category: name, count: sales })))
    const salesCategories = sortAreaData(salesCategoryResult.map(({ name, date, sales }) => ({ date, category: name, count: sales })))

    return (
        <>
            <SearchComponent branches={branches} />
            <DashBoard chartData={data} results={results} branchData={branchData} orderTypes={orderTypes} salesDuration={salesDuration} totalSalesDuration={totalSalesDurationResult} salesCategories={salesCategories} totalSalesCategory={totalSalesCategoryResult} branchCount={branches.length} totalBusinessTypes={totalBusinessTypesResult} />
        </>
    );
}
