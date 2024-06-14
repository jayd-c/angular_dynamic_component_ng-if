import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    standalone:true,
    selector:'[appContainer]'
})
export class ViewContainer {

    constructor(public viewContainer: ViewContainerRef) {

    }
}