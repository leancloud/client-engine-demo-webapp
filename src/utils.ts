import { EventEmitter } from "@leancloud/play";

export function listen<T, K extends keyof T>(
  target: EventEmitter<T>,
  resolveEvent: K,
  rejectEvent: string
) {
  return new Promise<T[K]>((resolve, reject) => {
    if (resolveEvent) {
      target.once(resolveEvent, resolve);
    }
    if (rejectEvent) {
      target.once(rejectEvent, reject);
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
