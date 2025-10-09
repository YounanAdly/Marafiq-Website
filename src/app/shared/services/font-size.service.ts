// font-size.service.ts
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({ providedIn: 'root' })
export class FontSizeService {
    private platformId = inject(PLATFORM_ID);
    private commonService = inject(CommonService);

    private defaultSize = 10;
    private minSize = 8;
    private maxSize = 12;
    fontSize = signal<number>(this.load());

    constructor() {
        this.applyFontSize();
    }

    increase() {
        if (this.fontSize() < this.maxSize) {
            this.fontSize.set(this.maxSize);
            this.applyFontSize();
        }
    }

    decrease() {
        if (this.fontSize() > this.minSize) {
            this.fontSize.set(this.minSize);
            this.applyFontSize();
        }
    }

    reset() {
        this.fontSize.set(this.defaultSize);
        this.applyFontSize();
    }

    applyFontSize() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        document.documentElement.style.fontSize = `${this.fontSize()}px`;
        this.commonService.setLocalStorage('fontSize', this.fontSize().toString());
    }

    load(): number {
        const stored = this.commonService.getLocalStorage('fontSize');
        const size = stored ? parseInt(stored, 10) : this.defaultSize;
        return Math.min(this.maxSize, Math.max(this.minSize, size));
    }
}
