import {
    Component,
    Input,
    Renderer,
    ElementRef,
    AfterViewInit,
    AfterContentInit,
    ViewChild,
    ContentChildren,
    QueryList,
    OnDestroy,
    OnInit
} from '@angular/core';

import {
    NgClass,
    NgIf
} from "@angular/common";

import { HsSlideComponent } from './hs-slide/hs-slide.component';
import { SlidesContainerComponent } from "./slides-container/slides-container.component";

@Component({
    selector: 'hs-nav-left',
    template: '<ng-content></ng-content>',
})
export class HsNavLeftComponent {
    constructor(private _renderer: Renderer, public _element: ElementRef) { }
};

@Component({
    selector: 'hs-nav-right',
    template: '<ng-content></ng-content>',
})
export class HsNavRightComponent {
    constructor(private _renderer: Renderer, public _element: ElementRef) { }
};

@Component({
    selector: 'horizontal-slider, [horizontal-slider]',
    templateUrl: './horizontal-slider.component.html',
    styleUrls: ['./horizontal-slider.component.css'],
})
export class HorizontalSliderComponent implements OnInit, OnDestroy, AfterContentInit {
    private _onResizeListenerHandler: any;
    private _slideWidth: number;
    public _isContentInit: boolean = false;

    @Input("hide-nav") HideNav: boolean;
    @ContentChildren(HsSlideComponent) HsSlideComponents: QueryList<HsSlideComponent>;
    @ViewChild(SlidesContainerComponent) SlidesContainer: SlidesContainerComponent;

    constructor(private _renderer: Renderer, private _element: ElementRef) {
        this.HideNav = false;

        this.XsVisibleSlides = 1;
        this.SmVisibleSlides = 2;
        this.MdVisibleSlides = 3;
        this.LgVisibleSlides = 4;
    }

    @Input("xs-visible-slides") XsVisibleSlides: number;

    @Input("sm-visible-slides") SmVisibleSlides: number;

    @Input("md-visible-slides") MdVisibleSlides: number;

    @Input("lg-visible-slides") LgVisibleSlides: number;


    ngAfterViewInit() {
        if (!this.HideNav) {
            this._renderer.setElementClass(this._element.nativeElement, "hs-navigation", true);
        }

        this.CalulateEngine();
    }

    ngAfterContentInit() {
        this.HsSlideComponents.notifyOnChanges();
        this.HsSlideComponents.changes.subscribe((e) => {
            this._isContentInit = true;
            this.CalulateEngine();
        });
    }

    onNavigateLeft() {
        this.SlidesContainer.onNavigateLeft();
    }


    onNavigateRight() {
        this.SlidesContainer.onNavigateRight();
    }


    ngOnInit() {

        this._onResizeListenerHandler = window.addEventListener("resize", () => {
            this.CalulateEngine();
        })
    }

    ngOnDestroy() {
        window.removeEventListener("resize", this._onResizeListenerHandler);
    }

    get IsAtStart(): boolean {
        return this.SlidesContainer.IsAtStart;
    }

    get IsAtEnd(): boolean {
        return this.SlidesContainer.IsAtEnd;
    }

    private CalulateEngine() {
        let WindowWidth = window.innerWidth;

        if (WindowWidth > 0 && WindowWidth <= 600) {
            this.SetSizes(this.XsVisibleSlides);
        } else if (WindowWidth > 600 && WindowWidth < 960) {
            this.SetSizes(this.SmVisibleSlides);
        } else if (WindowWidth > 960 && WindowWidth < 1280) {
            this.SetSizes(this.MdVisibleSlides);
        } else if (WindowWidth > 1280) {
            this.SetSizes(this.LgVisibleSlides);
        }
    }

    private SetSizes(visibleSlides: number) {

        this._slideWidth = this._element.nativeElement.clientWidth / visibleSlides;

        this.SlidesContainer.SetSlideWidth(this._slideWidth);
        this.SlidesContainer.SetWidth(this._slideWidth * this.HsSlideComponents.length);

        this.HsSlideComponents.toArray().forEach(element => {
            element.SetWidth(this._slideWidth);
        });

        this.SlidesContainer.SetVisibleSlides(visibleSlides);

    }

}

export const HORIZONTAL_SLIDER_DIRECTIVES = [HorizontalSliderComponent, HsSlideComponent, HsNavLeftComponent, HsNavRightComponent];