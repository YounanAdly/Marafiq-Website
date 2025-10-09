import { TranslateService } from '@ngx-translate/core';
import { TranslateExtension } from './formly.translate-extension';

export function formlyTranslateExtension(translate: TranslateService) {
    return {
        validationMessages: [
            {
                name: 'required',
                message() {
                    return translate.stream('GOODBYE');
                },
            },
        ],

        extensions: [{
            name: 'translate',
            extension: new TranslateExtension(translate),
        }],
    };
}

