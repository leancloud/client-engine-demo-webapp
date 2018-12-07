import { EventEmitter as PlayEventEmitter, PlayEvent } from "@leancloud/play";

export function listen<
  T extends PlayEvent,
  K extends keyof T,
  L extends keyof T
>(target: PlayEventEmitter<T>, resolveEvent: K, rejectEvent?: L) {
  return new Promise<T[K]>((resolve, reject) => {
    let rejectCallback: (error: T[L]) => any;
    const resolveCallback = (payload: T[K]) => {
      if (rejectEvent) {
        target.off(rejectEvent, rejectCallback);
      }
      resolve(payload);
    };
    target.once(resolveEvent, resolveCallback);
    if (rejectEvent) {
      rejectCallback = error => {
        target.off(resolveEvent, resolveCallback);
        if (error instanceof Error) {
          reject(error);
        } else {
          reject(new Error((error as any).detail || JSON.stringify(error)));
        }
      };
      target.once(rejectEvent, rejectCallback);
    }
  });
}

interface ErrorEvent {
  code: number;
  detail: string;
}

export const errorHandler = (error: ErrorEvent) => {
  // eslint-disable-next-line
  console.error(`${error.code}: ${error.detail}`);
};
