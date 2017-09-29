"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const hs_slide_component_1 = require("./hs-slide/hs-slide.component");
const slides_container_component_1 = require("./slides-container/slides-container.component");
let HsNavLeftComponent = class HsNavLeftComponent {
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
};
HsNavLeftComponent = __decorate([
    core_1.Component({
        selector: 'hs-nav-left',
        template: "<ng-content></ng-content>",
    }),
    __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
], HsNavLeftComponent);
exports.HsNavLeftComponent = HsNavLeftComponent;
;
let HsNavRightComponent = class HsNavRightComponent {
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
};
HsNavRightComponent = __decorate([
    core_1.Component({
        selector: 'hs-nav-right',
        template: "<ng-content></ng-content>",
    }),
    __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
], HsNavRightComponent);
exports.HsNavRightComponent = HsNavRightComponent;
;
let HorizontalSliderComponent = class HorizontalSliderComponent {
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.HideNav = false;
        this.XsVisibleSlides = 1;
        this.SmVisibleSlides = 2;
        this.MdVisibleSlides = 3;
        this.LgVisibleSlides = 4;
    }
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
        });
    }
    ngOnDestroy() {
        window.removeEventListener("resize", this._onResizeListenerHandler);
    }
    get IsAtStart() {
        return this.SlidesContainer.IsAtStart;
    }
    get IsAtEnd() {
        return this.SlidesContainer.IsAtEnd;
    }
    CalulateEngine() {
        let WindowWidth = window.innerWidth;
        if (WindowWidth > 0 && WindowWidth <= 600) {
            this.SetSizes(this.XsVisibleSlides);
        }
        else if (WindowWidth > 600 && WindowWidth < 960) {
            this.SetSizes(this.SmVisibleSlides);
        }
        else if (WindowWidth > 960 && WindowWidth < 1280) {
            this.SetSizes(this.MdVisibleSlides);
        }
        else if (WindowWidth > 1280) {
            this.SetSizes(this.LgVisibleSlides);
        }
    }
    SetSizes(visibleSlides) {
        this._slideWidth = this._element.nativeElement.clientWidth / visibleSlides;
        this.SlidesContainer.SetSlideWidth(this._slideWidth);
        this.SlidesContainer.SetWidth(this._slideWidth * this.HsSlideComponents.length);
        this.HsSlideComponents.toArray().forEach(element => {
            element.SetWidth(this._slideWidth);
        });
        this.SlidesContainer.SetVisibleSlides(visibleSlides);
    }
};
__decorate([
    core_1.Input("hide-nav"),
    __metadata("design:type", Boolean)
], HorizontalSliderComponent.prototype, "HideNav", void 0);
__decorate([
    core_1.ContentChildren(hs_slide_component_1.HsSlideComponent),
    __metadata("design:type", core_1.QueryList)
], HorizontalSliderComponent.prototype, "HsSlideComponents", void 0);
__decorate([
    core_1.ViewChild(slides_container_component_1.SlidesContainerComponent),
    __metadata("design:type", slides_container_component_1.SlidesContainerComponent)
], HorizontalSliderComponent.prototype, "SlidesContainer", void 0);
__decorate([
    core_1.Input("xs-visible-slides"),
    __metadata("design:type", Number)
], HorizontalSliderComponent.prototype, "XsVisibleSlides", void 0);
__decorate([
    core_1.Input("sm-visible-slides"),
    __metadata("design:type", Number)
], HorizontalSliderComponent.prototype, "SmVisibleSlides", void 0);
__decorate([
    core_1.Input("md-visible-slides"),
    __metadata("design:type", Number)
], HorizontalSliderComponent.prototype, "MdVisibleSlides", void 0);
__decorate([
    core_1.Input("lg-visible-slides"),
    __metadata("design:type", Number)
], HorizontalSliderComponent.prototype, "LgVisibleSlides", void 0);
HorizontalSliderComponent = __decorate([
    core_1.Component({
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
        encapsulation: core_1.ViewEncapsulation.None,
    }),
    __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
], HorizontalSliderComponent);
exports.HorizontalSliderComponent = HorizontalSliderComponent;
exports.HORIZONTAL_SLIDER_DIRECTIVES = [HorizontalSliderComponent, hs_slide_component_1.HsSlideComponent, HsNavLeftComponent, HsNavRightComponent];
//# sourceMappingURL=horizontal-slider.component.js.map