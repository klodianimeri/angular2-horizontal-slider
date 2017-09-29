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
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var hs_slide_component_1 = require('./hs-slide/hs-slide.component');
var SlidesContainerComponent = (function () {
    function SlidesContainerComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    SlidesContainerComponent.prototype.SetWidth = function (width) {
        this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");
    };
    SlidesContainerComponent.prototype.SetLeft = function (left) {
        this._renderer.setElementStyle(this._element.nativeElement, "left", left.toString() + "px");
    };
    SlidesContainerComponent.prototype.OnTransitionEndCallback = function (callback) {
        this._renderer.listen(this._element.nativeElement, "transitionend", callback);
    };
    SlidesContainerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'slides-container',
            template: "<ng-content></ng-content>",
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], SlidesContainerComponent);
    return SlidesContainerComponent;
}());
;
var HsNavLeftComponent = (function () {
    function HsNavLeftComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    HsNavLeftComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'nav-left-icon',
            template: "<ng-content></ng-content>",
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], HsNavLeftComponent);
    return HsNavLeftComponent;
}());
;
var HsNavRightComponent = (function () {
    function HsNavRightComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    HsNavRightComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'nav-right-icon',
            template: "<ng-content></ng-content>",
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], HsNavRightComponent);
    return HsNavRightComponent;
}());
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
        this._containerOffsetLeft = 0;
    }
    HorizontalSliderComponent.prototype.ngAfterViewInit = function () {
        if (!this.HideNav) {
            this._renderer.setElementClass(this._element.nativeElement, "hs-navigation", true);
        }
        this.CalulateEngine();
    };
    HorizontalSliderComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.SlidesContainer.OnTransitionEndCallback(function () {
            _this.CheckEdges();
        });
    };
    HorizontalSliderComponent.prototype.onNavigateLeft = function () {
        var SlideContainerLeft = this.SlidesContainer._element.nativeElement.offsetLeft;
        if (SlideContainerLeft >= 0) {
            this.NavigateLeft(0);
        }
        else if (SlideContainerLeft <= -(this._slideWidth * this.VisibleSlides)) {
            this.NavigateLeft(SlideContainerLeft + (this._slideWidth * this.VisibleSlides));
        }
        else if (SlideContainerLeft > -(this._slideWidth * this.VisibleSlides) && SlideContainerLeft < 0) {
            this.NavigateLeft(0);
        }
    };
    HorizontalSliderComponent.prototype.onNavigateRight = function () {
        var SlideContainerLeft = this.SlidesContainer._element.nativeElement.offsetLeft;
        if (SlideContainerLeft !== 0 && SlideContainerLeft <= -(this._containerWidth - (this._slideWidth * this.VisibleSlides))) {
            this.NavigateLeft(-(this._containerWidth - (this._slideWidth * this.VisibleSlides)));
        }
        else if (this._containerWidth + SlideContainerLeft >= 2 * (this._slideWidth * this.VisibleSlides)) {
            this.NavigateLeft(SlideContainerLeft + (-this._slideWidth * this.VisibleSlides));
        }
        else if (this._containerWidth + SlideContainerLeft >= (this._slideWidth * this.VisibleSlides)
            && this._containerWidth + SlideContainerLeft < 2 * (this._slideWidth * this.VisibleSlides)) {
            var toleft = ((this._containerWidth - this._slideWidth * this.VisibleSlides) + SlideContainerLeft);
            this.NavigateLeft(SlideContainerLeft + (-toleft));
        }
    };
    HorizontalSliderComponent.prototype.CheckEdges = function () {
        var SlideContainerLeft = this.SlidesContainer._element.nativeElement.offsetLeft;
        if (SlideContainerLeft >= 0) {
            this.NavigateLeft(0);
            return;
        }
        if (SlideContainerLeft < -(this._containerWidth - (this._slideWidth * this.VisibleSlides))) {
            this.NavigateLeft(-(this._containerWidth - (this._slideWidth * this.VisibleSlides)));
            return;
        }
        //Prevent half sides of other slides from showing when window is resized
        if (SlideContainerLeft % (this._slideWidth * this.VisibleSlides) != 0) {
            var remainder = SlideContainerLeft % this._slideWidth;
            if (Math.abs(remainder) >= (this._slideWidth / 2)) {
                this.NavigateLeft(SlideContainerLeft + -(this._slideWidth + remainder));
            }
            else {
                this.NavigateLeft(SlideContainerLeft + (-remainder));
            }
        }
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
            return Math.abs(this._containerOffsetLeft) == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HorizontalSliderComponent.prototype, "IsAtEnd", {
        get: function () {
            var isLastSlide = Math.abs(Math.trunc(this._containerOffsetLeft)) == Math.trunc((this._containerWidth - (this._slideWidth * this.VisibleSlides)));
            var smallContainer = this._containerWidth < this._element.nativeElement.clientWidth;
            return isLastSlide || smallContainer;
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
        this._containerWidth = this._slideWidth * this.HsSlideComponents.length;
        this.SlidesContainer.SetWidth(this._containerWidth);
        this.HsSlideComponents.toArray().forEach(function (element) {
            element.SetWidth(_this._slideWidth);
        });
        this.VisibleSlides = visibleSlides;
        this.CheckEdges();
    };
    HorizontalSliderComponent.prototype.NavigateLeft = function (left) {
        this.SlidesContainer.SetLeft(left);
        this._containerOffsetLeft = left;
    };
    __decorate([
        core_1.Input("hide-nav"), 
        __metadata('design:type', Boolean)
    ], HorizontalSliderComponent.prototype, "HideNav", void 0);
    __decorate([
        core_1.ContentChildren(hs_slide_component_1.HsSlideComponent), 
        __metadata('design:type', core_1.QueryList)
    ], HorizontalSliderComponent.prototype, "HsSlideComponents", void 0);
    __decorate([
        core_1.ViewChild(SlidesContainerComponent), 
        __metadata('design:type', SlidesContainerComponent)
    ], HorizontalSliderComponent.prototype, "SlidesContainer", void 0);
    __decorate([
        core_1.Input("xs-visible-slides"), 
        __metadata('design:type', Number)
    ], HorizontalSliderComponent.prototype, "XsVisibleSlides", void 0);
    __decorate([
        core_1.Input("sm-visible-slides"), 
        __metadata('design:type', Number)
    ], HorizontalSliderComponent.prototype, "SmVisibleSlides", void 0);
    __decorate([
        core_1.Input("md-visible-slides"), 
        __metadata('design:type', Number)
    ], HorizontalSliderComponent.prototype, "MdVisibleSlides", void 0);
    __decorate([
        core_1.Input("lg-visible-slides"), 
        __metadata('design:type', Number)
    ], HorizontalSliderComponent.prototype, "LgVisibleSlides", void 0);
    HorizontalSliderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "horizontal-slider, [horizontal-slider]",
            templateUrl: "./horizontal-slider.component.html",
            styleUrls: ["./horizontal-slider.component.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            directives: [SlidesContainerComponent, common_1.NgIf, common_1.NgClass]
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], HorizontalSliderComponent);
    return HorizontalSliderComponent;
}());
exports.HorizontalSliderComponent = HorizontalSliderComponent;
exports.HORIZONTAL_SLIDER_DIRECTIVES = [HorizontalSliderComponent, hs_slide_component_1.HsSlideComponent, HsNavLeftComponent, HsNavRightComponent];
//# sourceMappingURL=horizontal-slider.component.js.map