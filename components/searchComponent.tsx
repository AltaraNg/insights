"use client";

import React, { useState } from "react";
import { DateRangePicker, DateRangePickerValue, SelectBox, SelectBoxItem } from "@tremor/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { buildUrl, cleanDate, startOfMonth } from "@/lib/utils";

const SearchComponent = ({ branches = [] }: { branches?: Array<any> }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(searchParams!.get("from") || startOfMonth()),
        new Date(searchParams!.get("to") || new Date()),
    ]);

    const [branch, setBranch] = useState<string>(searchParams!.get("branch") || "");

    const handleSearch = () => {
        const url = buildUrl(pathname!, { branch, from: cleanDate(value[0]), to: cleanDate(value[1]) });
        router.push(url);
    };
    const handleClear = () => {
        router.push(pathname!);
    };

    return (
        <div className="flex gap-2 py-4 items-center">
            <DateRangePicker className="max-w-md mx-auto" value={value} onValueChange={setValue} />
            <div className="max-w-sm mx-auto space-y-6">
                {branches.length > 0 && (
                    <SelectBox onValueChange={setBranch} defaultValue={branch}>
                        {branches.map((item: any) => (
                            <SelectBoxItem key={item.id} value={item.id.toString()} text={item.name} />
                        ))}
                    </SelectBox>
                )}
            </div>
            <div className="flex-1 flex flex-row-reverse gap-2">
                <button className="btn btn-primary min-h-[2.5rem] h-[2.5rem]" onClick={handleSearch}>
                    Search
                </button>
                <button className="btn btn-error min-h-[2.5rem] h-[2.5rem]" onClick={handleClear}>
                    Clear
                </button>
            </div>
        </div>
    );
};

export default SearchComponent;
