"use client"

import React, { useState } from "react";
import { DateRangePicker, DateRangePickerValue, SelectBox, SelectBoxItem } from "@tremor/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { buildUrl, cleanDate, startOfMonth } from "@/lib/utils";

const Control = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(searchParams!.get('from') || startOfMonth()),
        new Date(searchParams!.get('to') || new Date()),
    ]);

    const [category, setCategory] = useState<string>(searchParams!.get('category') || "1")

    const handleSearch = () => {
        const url = buildUrl(pathname!, { category, from: cleanDate(value[0]), to: cleanDate(value[1]) })
        router.push(url);
    }

    return (
        <div className="flex gap-2 py-4 items-center">
            <DateRangePicker
                className="max-w-md mx-auto"
                value={value}
                onValueChange={setValue}
            />
            <div className="max-w-sm mx-auto space-y-6">
                <SelectBox
                    onValueChange={setCategory}
                    defaultValue={category}
                >
                    <SelectBoxItem value="1" text="Kilometers" />
                    <SelectBoxItem value="2" text="Meters" />
                    <SelectBoxItem value="3" text="Miles" />
                    <SelectBoxItem value="4" text="Nautical Miles" />
                </SelectBox>
            </div>
            <div className="flex-1 flex">
                <button className="ml-auto btn btn-primary min-h-[2.5rem] h-[2.5rem]" onClick={handleSearch}>Search</button>
            </div>
        </div>
    )
}

export default Control