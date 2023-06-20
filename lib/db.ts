const { QueryTypes } = require("sequelize");
import { sequelize } from "@/lib/sequelize";


const getBranches = async () => {
    const result: Array<any> = await sequelize.query(`
            SELECT name, id  FROM branches WHERE name != 'Ikoyi'
            ORDER BY name
        `,
        {
            type: QueryTypes.SELECT
        });

    return result;
    
}

const getOrders = async (from: string, to: string): Promise<Array<any>> => {
    const result: Array<any> = await sequelize.query(`
            SELECT id, order_number, order_date
            FROM new_orders
            WHERE order_date >= :from AND order_date <= :to
        `,
        {
            replacements: { from, to },
            type: QueryTypes.SELECT
        });

    return result;
    
}

const salesMetrics = async (from: string, to: string, branch: string): Promise<Array<any>> => {
    const addQuery = branch ? 'AND branch_id = :branch' : ''
    const result: Array<any> = await sequelize.query(`
            SELECT SQL_CALC_FOUND_ROWS id, order_number, order_date as date, COUNT(id) as sales, SUM(product_price) as revenue, AVG(product_price) as avg_revenue
            FROM new_orders
            WHERE order_date >= :from AND order_date <= :to ${addQuery}
            GROUP BY date
        `,
        {
            replacements: { from, to, branch },
            type: QueryTypes.SELECT
        });

    return result;
    
}

const showroomSales = async (from: string, to: string): Promise<Array<any>> => {
    const result: Array<any> = await sequelize.query(`
            SELECT SQL_CALC_FOUND_ROWS new_orders.id, branches.name, COUNT(new_orders.id) as sales, SUM(product_price) as revenue, AVG(product_price) as avg_revenue
            FROM new_orders
            JOIN branches ON branches.id = new_orders.branch_id 
            WHERE order_date >= :from AND order_date <= :to
            GROUP BY branches.name
            ORDER BY sales DESC
        `,
        {
            replacements: { from, to },
            type: QueryTypes.SELECT
        });

    return result;
}

const orderTypesQuery = async (from: string, to: string, branch: string): Promise<Array<any>> => {
    const branchQuery = branch ? 'AND branch_id = :branch' : ''
    const result: Array<any> = await sequelize.query(`
            SELECT SQL_CALC_FOUND_ROWS order_types.name, order_date as date, COUNT(new_orders.id) as sales
            FROM new_orders
            JOIN order_types ON order_types.id = new_orders.order_type_id
            WHERE order_date >= :from AND order_date <= :to ${branchQuery}
            GROUP BY date, order_type_id
        `,
        {
            replacements: { from, to, branch },
            type: QueryTypes.SELECT
        });

    return result;
    
}

const salesDurationQuery = async (from: string, to: string, branch: string): Promise<Array<any>> => {
    const branchQuery = branch ? 'AND branch_id = :branch' : ''
    const result: Array<any> = await sequelize.query(`
            SELECT CONCAT(rp.name, '-', dp.percent) AS name, order_date as date, COUNT(new_orders.id) as sales
            FROM new_orders
            JOIN repayment_durations AS rp ON rp.id = new_orders.repayment_duration_id
            JOIN down_payment_rates AS dp ON dp.id = new_orders.down_payment_rate_id
            WHERE order_date >= :from AND order_date <= :to ${branchQuery}
            GROUP BY date, repayment_duration_id, down_payment_rate_id
        `,
        {
            replacements: { from, to, branch },
            type: QueryTypes.SELECT
        });

    return result;
    
}

const totalSalesDurationQuery = async (from: string, to: string, branch: string): Promise<Array<any>> => {
    const branchQuery = branch ? 'AND branch_id = :branch' : ''
    const result: Array<any> = await sequelize.query(`
            SELECT CONCAT(rp.name, '-', dp.percent) AS name, COUNT(new_orders.id) as value
            FROM new_orders
            JOIN repayment_durations AS rp ON rp.id = new_orders.repayment_duration_id
            JOIN down_payment_rates AS dp ON dp.id = new_orders.down_payment_rate_id
            WHERE order_date >= :from AND order_date <= :to ${branchQuery}
            GROUP BY repayment_duration_id, down_payment_rate_id
        `,
        {
            replacements: { from, to, branch },
            type: QueryTypes.SELECT
        });

    return result;
    
}

const salesCategoryQuery = async (from: string, to: string, branch: string): Promise<Array<any>> => {
    const branchQuery = branch ? 'AND branch_id = :branch' : ''
    const result: Array<any> = await sequelize.query(`
            SELECT order_date as date, sc.name, COUNT(new_orders.id) as sales
            FROM new_orders
            JOIN sales_categories AS sc ON sc.id = new_orders.sales_category_id
            WHERE order_date >= :from AND order_date <= :to ${branchQuery}
            GROUP BY date, sales_category_id
        `,
        {
            replacements: { from, to, branch },
            type: QueryTypes.SELECT
        });

    return result;
    
}

const totalSalesCategoryQuery = async (from: string, to: string, branch: string): Promise<Array<any>> => {
    const branchQuery = branch ? 'AND branch_id = :branch' : ''
    const result: Array<any> = await sequelize.query(`
            SELECT sc.name, COUNT(new_orders.id) as value
            FROM new_orders
            JOIN sales_categories AS sc ON sc.id = new_orders.sales_category_id
            WHERE order_date >= :from AND order_date <= :to ${branchQuery}
            GROUP BY sales_category_id
        `,
        {
            replacements: { from, to, branch },
            type: QueryTypes.SELECT
        });

    return result;
    
}

const totalBusinessTypesQuery = async (from: string, to: string, branch: string): Promise<Array<any>> => {
    const branchQuery = branch ? 'AND branch_id = :branch' : ''
    const result: Array<any> = await sequelize.query(`
            SELECT bt.name, COUNT(new_orders.id) as value
            FROM new_orders
            JOIN business_types AS bt ON bt.id = new_orders.business_type_id
            WHERE order_date >= :from AND order_date <= :to ${branchQuery}
            GROUP BY business_type_id
            ORDER BY name ASC
        `,
        {
            replacements: { from, to, branch },
            type: QueryTypes.SELECT
        });

    return result;
    
}

export { getBranches, getOrders, salesMetrics, showroomSales, orderTypesQuery, salesDurationQuery, totalSalesDurationQuery, salesCategoryQuery, totalSalesCategoryQuery, totalBusinessTypesQuery }