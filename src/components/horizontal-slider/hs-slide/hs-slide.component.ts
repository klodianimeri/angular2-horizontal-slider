import {
    Component,
    Renderer,
    ElementRef
} from '@angular/core';

@Component({
    selector: 'hs-slide, [hs-slide]',
    templateUrl: './hs-slide.component.html',
    styleUrls: ['./hs-slide.component.css'],
})
export class HsSlideComponent {

    constructor(private _renderer: Renderer, private _element: ElementRef) { }

    SetWidth(width: number) {

        this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");
    }
}