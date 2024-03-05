import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string,type?:string): any[] {
    if(!items) return [];
    if(type == 'district'){
        if(!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter( it => {
              return it.dstrt_nm.toLowerCase().includes(searchText);
            });
            
    }
    else if(type == 'department'){
        if(!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter( it => {
              return it.dprt_nm.toLowerCase().includes(searchText);
            });
    }else if(type=='ulb'){
        if(!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter( it => {
              it.ulbs = it.ulbs.filter((u)=>{
               return u.mndl_nm.toLowerCase().includes(searchText);
              })
           
                return it;
              
             
            });
    }else if(type == 'trainingList'){
      if(!searchText) return items;
      searchText = searchText.toLowerCase();
            return items.filter( it => {
            return it.trng_nm.toLowerCase().includes(searchText);
          });
    }
    
    
   }
}