export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex justify-center text-center align-middle items-center h-screen w-full">
            <div className="w-5/6 h-2/3 p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="h-full grid grid-cols-3 grid-rows-4 gap-4">
                    <div className=" grow h-full w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-200 dark:text-gray-600">01</span>
                    </div>
                    <div className="grow h-full w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-200 dark:text-gray-600">02</span>
                    </div>
                    <div className="grow h-full w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-200 dark:text-gray-600">03</span>
                    </div>
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-200 dark:text-gray-600">04</span>
                    </div>
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-200 dark:text-gray-600">05</span>
                    </div>
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-200 dark:text-gray-600">06</span>
                    </div>
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-200 dark:text-gray-600">07</span>
                    </div>
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-200 dark:text-gray-600">08</span>
                    </div>
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-200 dark:text-gray-600">09</span>
                    </div>
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-200 dark:text-gray-600">10</span>
                    </div>
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-200 dark:text-gray-600">11</span>
                    </div>
                    <div className="h-full w-full bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-gray-200 dark:text-gray-600">12</span>
                    </div>

                </div>
            </div>

        </div>
    )
}