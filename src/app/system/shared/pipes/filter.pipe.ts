import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';

@Pipe({
    name: 'appFilter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any, value: string, field: string): any {
        if (items.length === null || !value) {
            return items;
        }

        return items.filter(i => {
            const temp = Object.assign({}, i);
            if (field === 'type') {
                temp[field] = temp[field] === 'income' ? 'Доход' : 'Расход';
            }
            if (field === 'category') {
                temp[field] = temp.catName;
            }
            return String(temp[field]).toLowerCase().includes(value.toLowerCase());
        });
    }
}
