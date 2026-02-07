type BaseSnackbarProps = {
    message: string;
    className: string;
};

export const BaseSnackbar = ({ message, className }: BaseSnackbarProps) => (

    <div
        className={`
      absolute bottom-4 left-4 right-4
      rounded-md px-4 py-2 text-sm shadow-lg
      ${className}
    `}
>
{message}
</div>
);
