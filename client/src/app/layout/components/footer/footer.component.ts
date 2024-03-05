import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector   : 'footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FooterComponent
{
    crntYr = (new Date()).getFullYear();
   
    /**
     * Constructor
     */
    constructor(private router: Router)
    {
    }

    gotoChangeLog(){
        this.router.navigate(['/admin/changelog/change_log']);
    }
}
