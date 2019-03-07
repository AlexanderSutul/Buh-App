import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDatePipe'
})
export class CustomDatePipe implements PipeTransform {
    transform(date: Date, arg: any) {
        const customDate = new Date(date);
        return `${customDate.getDate()}.${customDate.getMonth() + 1}.${customDate.getFullYear()}`;
    }
}
