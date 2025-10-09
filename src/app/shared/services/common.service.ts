import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CommonService {
    private platformId = inject(PLATFORM_ID);

    //Used to set item in local
    setLocalStorage(key: string, value: any): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, value);
        }
    }

    //Used to get item from local storage using key
    getLocalStorage(key: string): any {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(key);
        }
    }

    SetCookie(key: string): void {

    }

    getCookie(key: string): any {
        if (isPlatformBrowser(this.platformId)) {
            const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
            if (match) {
                return match[2];
            }
            return null;
        }
    }

}