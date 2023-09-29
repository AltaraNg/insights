import "./globals.css";
import React from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Outfit } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SessionProvider } from "@/components/sessionProvider";

const inter = Outfit({ weight: ["400", "500", "600"], subsets: ["latin"] });

export const metadata = {
    title: "Altara",
    description: "Altara Dashboard",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // @ts-expect-error
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    );
}
