import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[dsWidgetToggle]'
})
export class DsWidgetToggleDirective
{
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     */
    constructor(
        public elementRef: ElementRef
    )
    {
    }
}
