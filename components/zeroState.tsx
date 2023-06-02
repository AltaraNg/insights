import Image from "next/image";

export default function ZeroState() {
    return (
        <div className="bg-white">
            <main className="mx-auto w-full mt-8">
                <Image
                    className="mx-auto h-28 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Zero Icon"
                    width={0}
                    height={0}
                />
                <div className="mx-auto mt-4 max-w-2xl text-center">
                    <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-700">No activity to display</h1>
                    <p className="mt-2 text-base leading-7 text-gray-600 sm:leading-8">Check back later or try a new search</p>
                </div>
            </main>
        </div>
    );
}
