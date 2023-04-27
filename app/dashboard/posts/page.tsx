import React, { Suspense } from "react";
import Loading from "@/components/loading"
import PostComponent from "./PostComponent";
import FeedComponent from "./FeedComponent";


const Posts = async () => {

    return (
        <div>
            <div className="font-semibold">Posts</div>
            <p>How to independently load page data for better User experience</p>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="col-span-2">
                    <Suspense fallback={<Loading />}>
                        {/* @ts-expect-error Server Component */}
                        <PostComponent />
                    </Suspense>
                </div>
                <div className="">
                    <Suspense fallback={<Loading />}>
                        {/* @ts-expect-error Server Component */}
                        <FeedComponent />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default Posts;
