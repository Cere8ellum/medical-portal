import { AlertColor } from '@mui/material';
import { makeAutoObservable } from 'mobx';

interface Content {
  severity: AlertColor;
  message: string;
}

export default class SnackbarStore {
  private content: Content;

  private open = false;

  constructor() {
    this.content = {
      severity: 'success',
      message: 'empty message, fill it',
    };

    makeAutoObservable(this, {}, { autoBind: true });
  }

  public getContent = (): Content => this.content;

  public setContent = (content: Content): void => {
    this.content = content;
  };

  public isOpen = (): boolean => this.open;

  public handleOpen = (): void => {
    this.open = true;
  };

  public handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    this.open = false;
  };
}
