const { QueryTypes } = require("sequelize");
import { sequelize } from "@/lib/sequelize";

const getDDIssues = async (from: string = "2023-01-01", to: string = "2030-01-01"): Promise<Array<any>> => {
    const result: Array<any> = await sequelize.query(
        `
            SELECT SQL_CALC_FOUND_ROWS statusMessage, COUNT(DISTINCT order_id) as count
            FROM dd_responses
            WHERE statusMessage NOT LIKE '%Charge attempt%' AND statusMessage != 'Approved' AND order_date >= :from AND order_date <= :to
            GROUP BY statusMessage
            ORDER BY count DESC
        `,
        {
            replacements: { from, to },
            type: QueryTypes.SELECT,
        }
    );

    return result;
};

const orderCount = async (from: string, to: string): Promise<Array<any>> => {
    const result: Array<any> = await sequelize.query(
        `
            SELECT COUNT(order_number) as orderCount
            FROM new_orders
            WHERE payment_gateway_id = 1 AND order_date >= :from AND order_date <= :to
        `,
        {
            replacements: { from, to },
            type: QueryTypes.SELECT,
        }
    );

    return result;
};

const ptIssues = async (from: string, to: string): Promise<Array<any>> => {
    const result: Array<any> = await sequelize.query(
        `
            SELECT customer_id, customer_name as name, branch, order_id, amount, statusMessage
            FROM dd_responses
            WHERE statusMessage NOT IN ('Insufficient funds', 'Not sufficient funds', 'Approved') AND statusMessage NOT LIKE '%Charge attempt%'
            GROUP BY order_id
            ORDER BY order_date DESC
        `,
        {
            replacements: { from, to },
            type: QueryTypes.SELECT,
        }
    );

    return result;
};

export { getDDIssues, orderCount, ptIssues };
