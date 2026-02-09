import { BaseSnackbar } from './BaseSnackbar.tsx';

export const ErrorSnackbar = ({ message }: { message: string }) => (
  <BaseSnackbar message={message} className="bg-red-600 text-white" />
);
