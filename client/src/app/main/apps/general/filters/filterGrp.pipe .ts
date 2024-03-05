import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterGrp'
})

export class GrpFilterPipe implements PipeTransform {
  newarr = [];
  l_items: any[];
  transform(items: any[], searchText: string): any[] {
    this.l_items = items;
    if (searchText === undefined) { return items; }
    if (!items) { return []; }
    if (!searchText) { return items; }

    for (let i = 0; i < items.length; i++) {
      this.l_items[i].valid = false;
      for (let k = 0; k < items[i].opts.length; k++) {
        if (items[i].opts[k].opt_nm.toLowerCase().includes(searchText.toLowerCase())) {
          this.l_items[i].valid = true;
          this.newarr.push(this.l_items[i]);
          break;
        }
      }
      if (i == items.length - 1) {
        return this.l_items.filter(itmgrp => {
          return itmgrp.valid;

        });
      }
    }
  }
}
