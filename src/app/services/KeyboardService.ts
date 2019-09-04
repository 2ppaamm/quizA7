import { Injectable } from '@angular/core';

@Injectable()
export class KeyboardService {
    public isEnter(event: KeyboardEvent): boolean {
        return event.which == 13 ||
            event.keyCode == 13 ||
            event.code == 'Enter' ||
            event.charCode == 13;
    }
}