import { useRef, useState } from 'react';

type Snackbar = { type: 'success'; message: string } | { type: 'error'; message: string };

export const useSnackbar = (timeoutMs = 2500) => {
  const [snackbar, setSnackbar] = useState<Snackbar | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const show = (snackbar: Snackbar) => {
    clear();
    setSnackbar(snackbar);

    timeoutRef.current = window.setTimeout(() => {
      setSnackbar(null);
      timeoutRef.current = null;
    }, timeoutMs);
  };

  return {
    snackbar,
    showSuccess: (message: string) => show({ type: 'success', message }),
    showError: (message: string) => show({ type: 'error', message }),
  };
};
