import {BaseSnackbar} from "./BaseSnackbar.tsx";

export const SuccessSnackbar = ({ message }: { message: string }) => (
    <BaseSnackbar
        message={message}
        className="bg-green-600 text-white"
    />
);
