"use client"

import 'react-data-grid/lib/styles.css';
import { useMemo, useState } from 'react';
import DataGrid, { SelectColumn, textEditor } from 'react-data-grid';

type Direction = 'ltr' | 'rtl';
type SortDirection = 'ASC' | 'DESC';
interface Props {
    direction: Direction;
    rows: any[]
}

interface SortColumn {
    readonly columnKey: string;
    readonly direction: SortDirection;
}

interface SummaryRow {
    id: string;
    totalCount: number;
    yesCount: number;
}

interface Row {
    [key: string]: any;
}

function getColumns(
    direction: Direction
): readonly any[] {
    return [
        SelectColumn,
        {
            key: 'id',
            name: 'ID',
            frozen: true,
            resizable: false,
            renderSummaryCell() {
                return <strong>Total</strong>;
            }
        },
        {
            key: 'customer_id',
            name: 'Customer Id',
            frozen: true,
            width: 'max-content',
            renderEditCell: textEditor,
            renderSummaryCell({ row }: any) {
                return `${row.totalCount} records`;
            }
        },
        {
            key: 'name',
            name: 'Customer Name',
            renderEditCell: textEditor
        },
        {
            key: 'branch',
            name: 'Showroom',
        },
        {
            key: 'order_id',
            name: 'Order',
        },
        {
            key: 'amount',
            name: 'Amount (N)',
        },
        {
            key: 'statusMessage',
            name: 'Error Message',
        },
    ];
}

function rowKeyGetter(row: Row) {
    return row.id;
}

type Comparator = (a: Row, b: Row) => number;
function getComparator(sortColumn: string): Comparator {
    switch (sortColumn) {
        case 'name':
        case 'branch':
        case 'statusMessage':
        case 'order_id':
            return (a, b) => {
                return a[sortColumn].localeCompare(b[sortColumn]);
            };
        case 'id':
        case 'customer_id':
        case 'amount':
            return (a, b) => {
                return a[sortColumn] - b[sortColumn];
            };
        default:
            throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    }
}

export default function Table({ direction, rows }: Props) {
    const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
    const [selectedRows, setSelectedRows] = useState((): ReadonlySet<number> => new Set());

    const columns = useMemo(() => getColumns(direction), [direction]);

    const summaryRows = useMemo((): readonly SummaryRow[] => {
        return [
            {
                id: 'total_0',
                totalCount: rows.length,
                yesCount: rows.filter((r) => r.available).length
            }
        ];
    }, [rows]);

    const sortedRows = useMemo((): readonly Row[] => {
        if (sortColumns.length === 0) return rows;

        return [...rows].sort((a, b) => {
            for (const sort of sortColumns) {
                const comparator = getComparator(sort.columnKey);
                const compResult = comparator(a, b);
                if (compResult !== 0) {
                    return sort.direction === 'ASC' ? compResult : -compResult;
                }
            }
            return 0;
        });
    }, [rows, sortColumns]);

    return (
        <DataGrid
            rowKeyGetter={rowKeyGetter}
            columns={columns}
            rows={sortedRows}
            defaultColumnOptions={{
                sortable: true,
                resizable: true
            }}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            sortColumns={sortColumns}
            onSortColumnsChange={setSortColumns}
            topSummaryRows={summaryRows}
            bottomSummaryRows={summaryRows}
            className="fill-grid h-[700px]"
            direction={direction}
        />
    );
}
