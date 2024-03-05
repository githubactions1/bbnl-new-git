import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  // transform(items: any[], searchText: string): any[] {
  //   if (searchText === undefined) { return items; }
  //   if (!items) { return []; }
  //   if (!searchText) { return items; }
  //   // searchText = searchText.toLowerCase();
  //   return items.filter(it => {
  //     // console.log(it);
  //     // console.log(searchText);
  //     return it.opt_nm.toLowerCase().includes(searchText.toLowerCase()) || it.grp_nm.toLowerCase().includes(searchText.toLowerCase());
  //   });
  // }

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];

    if (!searchText) return items;

    return this.searchItems(items, searchText.toLowerCase());
  }

  private searchItems(items: any[], searchText): any[] {
    let results = [];
    items.forEach(it => {
      if (it.grp_nm.toLowerCase().includes(searchText)) {
        results.push(it);
      }
      else {
        let searchResults = this.searchItems(it.opts, searchText);
        if (searchResults.length > 0) {
          results.push({
            grp_nm: it.grp_nm,
            opts: searchResults
          });
        }
      }
    });
    return results;
  }
}
