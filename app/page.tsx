import SideLayout from "@/components/sideLayout";
import { Callout } from "@tremor/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function Home() {
  return (
    <SideLayout>
      <main className="flex min-h-screen flex-col p-12">
        <Callout
          className="mt-4 max-w-xl"
          title="Welcome!"
          icon={CheckCircleIcon}
          color="teal"
        >
          Get started by editing&nbsp;
          <code className="font-mono font-bold">app/page.tsx</code>
        </Callout>

        <div className="mb-8 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left mt-8 gap-4">
          <a
            href="https://adeniyi.in/"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors bg-base-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Blog <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Find in-depth information about Adeniyi</p>
          </a>

          <a
            href="https://blog.adeniyi.in/"
            className="group rounded-lg border border-transparent px-5 py-4 bg-base-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Docs <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>Learn more about web development from Insights</p>
          </a>
        </div>
      </main>
    </SideLayout>
  );
}
