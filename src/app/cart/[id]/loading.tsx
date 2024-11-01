export default function Loading() {
    return (
        <div className="min-h-screen p-8 max-w-4xl mx-auto">
            <div className="animate-pulse">
                <div className="h-4 w-24 bg-gray-200 rounded mb-8" />

                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
                            <div className="h-4 w-32 bg-gray-200 rounded" />
                        </div>
                        <div className="h-6 w-20 bg-gray-200 rounded-full" />
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-24 bg-gray-100 rounded-lg" />
                        ))}
                    </div>

                    <div className="mt-6 pt-6 border-t">
                        <div className="flex justify-between items-center">
                            <div className="h-6 w-16 bg-gray-200 rounded" />
                            <div className="h-6 w-24 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 