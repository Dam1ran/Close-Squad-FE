import { Observable, share, Subject } from 'rxjs';

const subject = new Subject<void>();

export const TickService = {
  tick: (): void => subject.next(),
  onTick: (): Observable<void> => subject.pipe(share()),
};
