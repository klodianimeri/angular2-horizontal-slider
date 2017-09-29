"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var SlidesContainerComponent = (function () {
    function SlidesContainerComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this._containerOffsetLeft = 0;
    }
    SlidesContainerComponent.prototype.ngAfterContentInit = function () {
    };
    SlidesContainerComponent.prototype.SetVisibleSlides = function (visibleSlides) {
        this.VisibleSlides = visibleSlides;
        this.CheckEdges();
    };
    SlidesContainerComponent.prototype.SetWidth = function (width) {
        this._containerWidth = width;
        this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");
    };
    SlidesContainerComponent.prototype.SetSlideWidth = function (slideWidth) {
        this._slideWidth = slideWidth;
    };
    SlidesContainerComponent.prototype.SetLeft = function (left) {
        this._renderer.setElementStyle(this._element.nativeElement, "left", left.toString() + "px");
    };
    SlidesContainerComponent.prototype.onNavigateLeft = function () {
        var SlideContainerLeft = this._element.nativeElement.offsetLeft;
        if (SlideContainerLeft >= 0) {
            this.NavigateLeft(0);
        }
        else if (SlideContainerLeft <= -(this._slideWidth * this.VisibleSlides)) {
            this.NavigateLeft(SlideContainerLeft + (this._slideWidth * this.VisibleSlides));
        }
        else if (SlideContainerLeft > (-(this._slideWidth * this.VisibleSlides)) && SlideContainerLeft < 0) {
            this.NavigateLeft(0);
        }
    };
    SlidesContainerComponent.prototype.onNavigateRight = function () {
        var SlideContainerLeft = this._element.nativeElement.offsetLeft;
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
    SlidesContainerComponent.prototype.NavigateLeft = function (left) {
        this._containerOffsetLeft = left;
        this.SetLeft(left);
    };
    SlidesContainerComponent.prototype.CheckEdges = function () {
        var SlideContainerLeft = this._element.nativeElement.offsetLeft;
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
    Object.defineProperty(SlidesContainerComponent.prototype, "IsAtStart", {
        get: function () {
            return Math.abs(this._containerOffsetLeft) == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlidesContainerComponent.prototype, "IsAtEnd", {
        get: function () {
            var isLastSlide = Math.abs(Math.trunc(this._containerOffsetLeft)) == Math.trunc((this._containerWidth - (this._slideWidth * this.VisibleSlides)));
            var smallContainer = this._containerWidth < (this._slideWidth * this.VisibleSlides);
            return isLastSlide || smallContainer;
        },
        enumerable: true,
        configurable: true
    });
    return SlidesContainerComponent;
}());
SlidesContainerComponent = __decorate([
    core_1.Component({
        selector: 'slides-container',
        template: "<ng-content></ng-content>",
        styles: [":host{display:block;height:100%;position:relative;left:0;transition:left .4s ease-out}:host>>>.slides{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;height:100%}"]
    })
], SlidesContainerComponent);
exports.SlidesContainerComponent = SlidesContainerComponent;
;
