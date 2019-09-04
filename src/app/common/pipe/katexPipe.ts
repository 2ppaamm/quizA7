import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'katex'
})
export class KatexPipe implements PipeTransform {
    transform(value: string): string {
        let valueString = value.toString();
        if (valueString) {
            let processedIndex = 0;
            while (this.hasKatexEquation(valueString, processedIndex)) {

                const startIndex = valueString.indexOf('$$', processedIndex);
                if (startIndex >= 0) {
                    const startKatexExpIndex = startIndex + 2;
                    const endKatexExpIndex = valueString.indexOf('$$', startKatexExpIndex);
                    const endIndex = endKatexExpIndex + 2;
                    const katexExpLength = endKatexExpIndex - startKatexExpIndex;

                    if (endIndex >= 0) {
                        const katexExp = valueString.substr(startKatexExpIndex, katexExpLength);
                        const katexRender = (<any>window).katex.renderToString(katexExp, { throwOnError: false });

                        processedIndex = startIndex + katexRender.length;

                        valueString = valueString.substr(0, startIndex) + katexRender + valueString.substr(endIndex);
                    }
                }
            }
        }
        return valueString;
    }

    private hasKatexEquation(text: string, fromIndex: number) {
        let hasKatexEquation: boolean = false;

        if (fromIndex >= 0) {
            const startIndex = text.indexOf('$$', fromIndex);
            if (startIndex >= 0) {
                const endKatexExpIndex = text.indexOf('$$', startIndex + 2);
                hasKatexEquation = endKatexExpIndex >= 0;
            }
        }

        return hasKatexEquation;
    }
}