export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <p className="text-center text-sm text-gray-500">
                        Take-Home Exercise
                    </p>
                    <p className="text-center text-sm text-gray-400 mt-1">
                        © {currentYear}Take-Home Exercise
                        . All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
} 