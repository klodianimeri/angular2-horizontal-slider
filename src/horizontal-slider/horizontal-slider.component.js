"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var hs_slide_component_1 = require("./hs-slide/hs-slide.component");
var slides_container_component_1 = require("./slides-container/slides-container.component");
var HsNavLeftComponent = (function () {
    function HsNavLeftComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    return HsNavLeftComponent;
}());
HsNavLeftComponent = __decorate([
    core_1.Component({
        selector: 'hs-nav-left',
        template: "<ng-content></ng-content>"
    })
], HsNavLeftComponent);
exports.HsNavLeftComponent = HsNavLeftComponent;
;
var HsNavRightComponent = (function () {
    function HsNavRightComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    return HsNavRightComponent;
}());
HsNavRightComponent = __decorate([
    core_1.Component({
        selector: 'hs-nav-right',
        template: "<ng-content></ng-content>"
    })
], HsNavRightComponent);
exports.HsNavRightComponent = HsNavRightComponent;
;
var HorizontalSliderComponent = (function () {
    function HorizontalSliderComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.HideNav = false;
        this.XsVisibleSlides = 1;
        this.SmVisibleSlides = 2;
        this.MdVisibleSlides = 3;
        this.LgVisibleSlides = 4;
    }
    HorizontalSliderComponent.prototype.ngAfterViewInit = function () {
        if (!this.HideNav) {
            this._renderer.setElementClass(this._element.nativeElement, "hs-navigation", true);
        }
        this.CalulateEngine();
    };
    HorizontalSliderComponent.prototype.ngAfterContentInit = function () {
    };
    HorizontalSliderComponent.prototype.onNavigateLeft = function () {
        this.SlidesContainer.onNavigateLeft();
    };
    HorizontalSliderComponent.prototype.onNavigateRight = function () {
        this.SlidesContainer.onNavigateRight();
    };
    HorizontalSliderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._onResizeListenerHandler = window.addEventListener("resize", function () {
            _this.CalulateEngine();
        });
    };
    HorizontalSliderComponent.prototype.ngOnDestroy = function () {
        window.removeEventListener("resize", this._onResizeListenerHandler);
    };
    Object.defineProperty(HorizontalSliderComponent.prototype, "IsAtStart", {
        get: function () {
            return this.SlidesContainer.IsAtStart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalSliderComponent.prototype, "IsAtEnd", {
        get: function () {
            return this.SlidesContainer.IsAtEnd;
        },
        enumerable: true,
        configurable: true
    });
    HorizontalSliderComponent.prototype.CalulateEngine = function () {
        var WindowWidth = window.innerWidth;
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
    };
    HorizontalSliderComponent.prototype.SetSizes = function (visibleSlides) {
        var _this = this;
        this._slideWidth = this._element.nativeElement.clientWidth / visibleSlides;
        this.SlidesContainer.SetSlideWidth(this._slideWidth);
        this.SlidesContainer.SetWidth(this._slideWidth * this.HsSlideComponents.length);
        this.HsSlideComponents.toArray().forEach(function (element) {
            element.SetWidth(_this._slideWidth);
        });
        this.SlidesContainer.SetVisibleSlides(visibleSlides);
    };
    return HorizontalSliderComponent;
}());
__decorate([
    core_1.Input("hide-nav")
], HorizontalSliderComponent.prototype, "HideNav");
__decorate([
    core_1.ContentChildren(hs_slide_component_1.HsSlideComponent)
], HorizontalSliderComponent.prototype, "HsSlideComponents");
__decorate([
    core_1.ViewChild(slides_container_component_1.SlidesContainerComponent)
], HorizontalSliderComponent.prototype, "SlidesContainer");
__decorate([
    core_1.Input("xs-visible-slides")
], HorizontalSliderComponent.prototype, "XsVisibleSlides");
__decorate([
    core_1.Input("sm-visible-slides")
], HorizontalSliderComponent.prototype, "SmVisibleSlides");
__decorate([
    core_1.Input("md-visible-slides")
], HorizontalSliderComponent.prototype, "MdVisibleSlides");
__decorate([
    core_1.Input("lg-visible-slides")
], HorizontalSliderComponent.prototype, "LgVisibleSlides");
HorizontalSliderComponent = __decorate([
    core_1.Component({
        selector: "horizontal-slider, [horizontal-slider]",
        template: "<div class=\"horizontal-slider\">\n    <div class=\"horizontal-slider-wrapper\">\n        <slides-container>\n            <div class=\"slides\">\n                <ng-content select=\"hs-slide\"></ng-content>\n            </div>\n        </slides-container>\n    </div>\n\n    <div class=\"nav nav-left\" (click)=\"onNavigateLeft()\" *ngIf=\"!HideNav\" [class.disabled]=\"IsAtStart\">\n        <ng-content select=\"hs-nav-left\"></ng-content>\n    </div>\n    <div class=\"nav nav-right\" (click)=\"onNavigateRight()\" *ngIf=\"!HideNav\" [class.disabled]=\"IsAtEnd\">\n        <ng-content select=\"hs-nav-right\"></ng-content>\n    </div>\n</div>",
        styles: ["[horizontal-slider],horizontal-slider{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:100%}[horizontal-slider].hs-navigation,horizontal-slider.hs-navigation{margin-left:34px;margin-right:34px}[horizontal-slider] .horizontal-slider,horizontal-slider .horizontal-slider{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:1;flex:1}[horizontal-slider] .horizontal-slider .horizontal-slider-wrapper,horizontal-slider .horizontal-slider .horizontal-slider-wrapper{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex:1;flex:1;overflow:hidden}[horizontal-slider] .horizontal-slider .nav,horizontal-slider .horizontal-slider .nav{position:absolute;top:50%;transform:translateY(-50%);font-size:2.3rem;padding:7px;cursor:pointer;transition:left .31s ease,right .31s ease}[horizontal-slider] .horizontal-slider .nav:active,horizontal-slider .horizontal-slider .nav:active{color:rgba(0,0,0,.57)}[horizontal-slider] .horizontal-slider .nav.disabled,horizontal-slider .horizontal-slider .nav.disabled{color:rgba(0,0,0,.17)}[horizontal-slider] .horizontal-slider .nav.disabled.nav-left:hover,horizontal-slider .horizontal-slider .nav.disabled.nav-left:hover{left:-30px}[horizontal-slider] .horizontal-slider .nav.disabled.nav-right:hover,horizontal-slider .horizontal-slider .nav.disabled.nav-right:hover{right:-30px}[horizontal-slider] .horizontal-slider .nav.nav-left,horizontal-slider .horizontal-slider .nav.nav-left{left:-30px}[horizontal-slider] .horizontal-slider .nav.nav-left:hover,horizontal-slider .horizontal-slider .nav.nav-left:hover{left:-34px}[horizontal-slider] .horizontal-slider .nav.nav-right,horizontal-slider .horizontal-slider .nav.nav-right{right:-30px}[horizontal-slider] .horizontal-slider .nav.nav-right:hover,horizontal-slider .horizontal-slider .nav.nav-right:hover{right:-34px}"],
        encapsulation: core_1.ViewEncapsulation.None
    })
], HorizontalSliderComponent);
exports.HorizontalSliderComponent = HorizontalSliderComponent;
exports.HORIZONTAL_SLIDER_DIRECTIVES = [HorizontalSliderComponent, hs_slide_component_1.HsSlideComponent, HsNavLeftComponent, HsNavRightComponent];
