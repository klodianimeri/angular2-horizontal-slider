import {
    Component,
    ViewEncapsulation,
    Renderer,
    ElementRef
} from '@angular/core';

@Component({
    selector: 'hs-slide, [hs-slide]',
    template: '<ng-content></ng-content>',
    styles: ["[hs-slide],hs-slide{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-align:stretch;align-items:stretch;overflow:hidden}"],
    encapsulation: ViewEncapsulation.None
})
export class HsSlideComponent {

    constructor(private _renderer: Renderer, private _element: ElementRef) { }

    SetWidth(width: number) {

        this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");
    }
}