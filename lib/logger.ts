export class Logger {
  isEnabled: boolean;

  constructor(isEnabled: boolean = true) {
    this.isEnabled = isEnabled;
  }

  info(message?: any, ...optionalParams: any[]) {
    if (this.isEnabled) {
      console.info(message, ...optionalParams);
    }
  }

  warn(message?: any, ...optionalParams: any[]) {
    if (this.isEnabled) {
      console.warn(message, ...optionalParams);
    }
  }

  error(message?: any, ...optionalParams: any[]) {
    if (this.isEnabled) {
      console.error(message, ...optionalParams);
    }
  }
}
