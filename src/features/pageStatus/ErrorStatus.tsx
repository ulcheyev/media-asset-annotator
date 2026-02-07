type Props = {
    title: string;
    description?: string;
};

export const ErrorStatus = ({ title, description }: Props) => (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-600 shadow-sm">
            <h2 className="text-lg font-semibold">{title}</h2>

            {description && (
                <p className="mt-2 text-sm opacity-80">
                    {description}
                </p>
            )}
        </div>
    </div>
);
