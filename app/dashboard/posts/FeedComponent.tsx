import { sleep } from "@/lib/utils";

export default async function FeedComponent() {
    await sleep(8000)
    return (
        <div>
            Feed Here
        </div>
    );
}