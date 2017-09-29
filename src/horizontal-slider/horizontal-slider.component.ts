import {
    Component,
    ViewEncapsulation,
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
    template: "<ng-content></ng-content>",
})
export class HsNavLeftComponent {
    constructor(private _renderer: Renderer, public _element: ElementRef) { }
};

@Component({
    selector: 'hs-nav-right',
    template: "<ng-content></ng-content>",
})
export class HsNavRightComponent {
    constructor(private _renderer: Renderer, public _element: ElementRef) { }
};


@Component({
    selector: "horizontal-slider, [horizontal-slider]",
    template: `<div class="horizontal-slider">
    <div class="horizontal-slider-wrapper">
        <slides-container>
            <div class="slides">
                <ng-content select="hs-slide"></ng-content>
            </div>
        </slides-container>
    </div>

    <div class="nav nav-left" (click)="onNavigateLeft()" *ngIf="!HideNav" [class.disabled]="IsAtStart">
        <ng-content select="hs-nav-left"></ng-content>
    </div>
    <div class="nav nav-right" (click)="onNavigateRight()" *ngIf="!HideNav" [class.disabled]="IsAtEnd">
        <ng-content select="hs-nav-right"></ng-content>
    </div>
</div>`,
    styles: ["[horizontal-slider],horizontal-slider{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:100%}[horizontal-slider].hs-navigation,horizontal-slider.hs-navigation{margin-left:34px;margin-right:34px}[horizontal-slider] .horizontal-slider,horizontal-slider .horizontal-slider{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:1;flex:1}[horizontal-slider] .horizontal-slider .horizontal-slider-wrapper,horizontal-slider .horizontal-slider .horizontal-slider-wrapper{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:1;flex:1;overflow:hidden}[horizontal-slider] .horizontal-slider .nav,horizontal-slider .horizontal-slider .nav{position:absolute;top:50%;transform:translateY(-50%);font-size:2.3rem;padding:7px;cursor:pointer;transition:left .31s ease,right .31s ease}[horizontal-slider] .horizontal-slider .nav:active,horizontal-slider .horizontal-slider .nav:active{color:rgba(0,0,0,.57)}[horizontal-slider] .horizontal-slider .nav.disabled,horizontal-slider .horizontal-slider .nav.disabled{color:rgba(0,0,0,.17)}[horizontal-slider] .horizontal-slider .nav.disabled.nav-left:hover,horizontal-slider .horizontal-slider .nav.disabled.nav-left:hover{left:-30px}[horizontal-slider] .horizontal-slider .nav.disabled.nav-right:hover,horizontal-slider .horizontal-slider .nav.disabled.nav-right:hover{right:-30px}[horizontal-slider] .horizontal-slider .nav.nav-left,horizontal-slider .horizontal-slider .nav.nav-left{left:-30px}[horizontal-slider] .horizontal-slider .nav.nav-left:hover,horizontal-slider .horizontal-slider .nav.nav-left:hover{left:-34px}[horizontal-slider] .horizontal-slider .nav.nav-right,horizontal-slider .horizontal-slider .nav.nav-right{right:-30px}[horizontal-slider] .horizontal-slider .nav.nav-right:hover,horizontal-slider .horizontal-slider .nav.nav-right:hover{right:-34px}"],
    encapsulation: ViewEncapsulation.None,
})
export class HorizontalSliderComponent implements OnInit, OnDestroy, AfterContentInit {
    private _onResizeListenerHandler: any;
    private _slideWidth: number;

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