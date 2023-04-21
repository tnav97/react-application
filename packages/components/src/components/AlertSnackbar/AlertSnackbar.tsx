import { Snackbar, SnackbarProps } from '@material-ui/core';
import React from 'react';
import Alert, { AlertSeverity } from '../Alert';
import { SnackbarCloseReason } from '@material-ui/core/Snackbar';

export interface AlertSnackbarProps extends SnackbarProps {
  message: string;
  severity: AlertSeverity;
  onClose?: (event?: any, reason?: SnackbarCloseReason) => void;
}

export default function AlertSnackbar({
  message,
  severity,
  onClose,
  ...props
}: AlertSnackbarProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={onClose}
      {...props}
    >
      <Alert message={message} severity={severity} onClose={onClose} />
    </Snackbar>
  );
}
