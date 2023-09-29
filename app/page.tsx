import React, { Suspense } from "react";
import SideLayout from "@/components/sideLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getGreetingMessage } from "@/lib/utils";
import Loading from "@/components/loading";
import Calendar from "@/components/calendar";
import AnalogClock from "@/components/clock";
import HomeComponent from "./HomeComponent";

export default async function Home({ searchParams }: { searchParams: { branch: string; from: string; to?: string } }) {
    // @ts-expect-error
    const session = await getServerSession(authOptions);
    const user: string = session?.user?.name || "";

    return (
        <SideLayout>
            <main className="flex min-h-screen flex-col">
                <h2 className="text-2xl font-semibold">{getGreetingMessage(user)}</h2>
                <div className="">
                    <div className="xl:pr-80">
                        <Suspense fallback={<Loading />}>
                            {/* @ts-expect-error Server Component */}
                            <HomeComponent searchParams={searchParams} />
                        </Suspense>
                    </div>

                    <aside className="fixed inset-y-0 right-0 hidden w-80 overflow-y-auto top-16 border-l border-gray-200 px-4 py-6 xl:flex xl:flex-col items-center ">
                        <div className="p-4 rounded-md shadow-sm w-full border flex items-center justify-center mb-4">
                            <AnalogClock />
                        </div>
                        <Calendar />
                    </aside>
                </div>
            </main>
        </SideLayout>
    );
}
