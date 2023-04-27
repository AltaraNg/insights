import React from "react";
const { QueryTypes } = require("sequelize");
import { sequelize } from "@/lib/sequelize";
import AreaChartComponent from "@/components/areaChart"
import Control from "./Control";
import { cleanDate, startOfMonth } from "@/lib/utils";


function SortData(data: Array<{ date: string, category: string, count: string }>) {
    const resultMap = new Map();
    data.forEach(({ date, category, count }) => {
        if (!resultMap.has(date)) {
            resultMap.set(date, { date });
        }
        resultMap.get(date)[category] = count;
    });
    return Array.from(resultMap.values());
}



const getData = async (search_category: string, from: string, to?: string | null): Promise<Array<{ date: string, category: string, count: string }>> => {

    // Sequelize query to retrieve data from 'new_orders' and 'customers' tables
    const result: Array<any> = await sequelize.query(`
            SELECT
                DATE_ADD(DATE(DATE_SUB(new_orders.created_at, INTERVAL (DAYOFWEEK(new_orders.created_at) - 1) DAY)), INTERVAL 1 DAY) AS date,
                sales_categories.name AS category,
                COUNT(new_orders.id) AS count
            FROM new_orders
            LEFT JOIN customers ON customers.id = new_orders.customer_id
            JOIN sales_categories ON sales_categories.id = new_orders.sales_category_id
            WHERE new_orders.created_at >= :from
                AND new_orders.created_at <= :to
            GROUP BY
                date, sales_categories.name
            ORDER BY
                date, sales_categories.name;
        `,
        {
            replacements: { from, to, search_category },
            type: QueryTypes.SELECT
        });

    return result;
};

const Projects = async ({ searchParams }: { searchParams: { search_category: string, from: string, to: string | null } }) => {
    const { search_category, from = cleanDate(startOfMonth()), to = cleanDate(new Date()) } = searchParams;
    const data = await getData(search_category, from, to);

    return (
        <div>
            <div>Projects</div>
            <Control />
            <AreaChartComponent chartData={SortData(data)} chartTitle="Weekly Sales trend" />
        </div>
    );
};

export default Projects;
