import { sleep } from "@/lib/utils";

export default async function PostComponent() {
    await sleep(4000);
    return <div>Post goes here</div>;
}
