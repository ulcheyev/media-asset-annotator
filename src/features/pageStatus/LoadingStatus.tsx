type Props = {
    title?: string;
    description?: string;
};

export const LoadingStatus = ({
                                  title = "Loading",
                                  description,
                              }: Props) => (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-xl border border-blue-200 bg-blue-50 p-8 text-center text-blue-600 shadow-sm">
            <h2 className="text-lg font-semibold">{title}</h2>

            {description && (
                <p className="mt-2 text-sm opacity-80">
                    {description}
                </p>
            )}

            <div className="mt-6 flex justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </div>
        </div>
    </div>
);
