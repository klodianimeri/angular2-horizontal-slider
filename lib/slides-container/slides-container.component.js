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
let SlidesContainerComponent = class SlidesContainerComponent {
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this._containerOffsetLeft = 0;
    }
    ngAfterContentInit() {
    }
    SetVisibleSlides(visibleSlides) {
        this.VisibleSlides = visibleSlides;
        this.CheckEdges();
    }
    SetWidth(width) {
        this._containerWidth = width;
        this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");
    }
    SetSlideWidth(slideWidth) {
        this._slideWidth = slideWidth;
    }
    SetLeft(left) {
        this._renderer.setElementStyle(this._element.nativeElement, "left", left.toString() + "px");
    }
    onNavigateLeft() {
        let SlideContainerLeft = this._element.nativeElement.offsetLeft;
        if (SlideContainerLeft >= 0) {
            this.NavigateLeft(0);
        }
        else if (SlideContainerLeft <= -(this._slideWidth * this.VisibleSlides)) {
            this.NavigateLeft(SlideContainerLeft + (this._slideWidth * this.VisibleSlides));
        }
        else if (SlideContainerLeft > (-(this._slideWidth * this.VisibleSlides)) && SlideContainerLeft < 0) {
            this.NavigateLeft(0);
        }
    }
    onNavigateRight() {
        let SlideContainerLeft = this._element.nativeElement.offsetLeft;
        if (SlideContainerLeft !== 0 && SlideContainerLeft <= -(this._containerWidth - (this._slideWidth * this.VisibleSlides))) {
            this.NavigateLeft(-(this._containerWidth - (this._slideWidth * this.VisibleSlides)));
        }
        else if (this._containerWidth + SlideContainerLeft >= 2 * (this._slideWidth * this.VisibleSlides)) {
            this.NavigateLeft(SlideContainerLeft + (-this._slideWidth * this.VisibleSlides));
        }
        else if (this._containerWidth + SlideContainerLeft >= (this._slideWidth * this.VisibleSlides)
            && this._containerWidth + SlideContainerLeft < 2 * (this._slideWidth * this.VisibleSlides)) {
            let toleft = ((this._containerWidth - this._slideWidth * this.VisibleSlides) + SlideContainerLeft);
            this.NavigateLeft(SlideContainerLeft + (-toleft));
        }
    }
    NavigateLeft(left) {
        this._containerOffsetLeft = left;
        this.SetLeft(left);
    }
    CheckEdges() {
        let SlideContainerLeft = this._element.nativeElement.offsetLeft;
        if (SlideContainerLeft >= 0) {
            this.NavigateLeft(0);
            return;
        }
        if (SlideContainerLeft < -(this._containerWidth - (this._slideWidth * this.VisibleSlides))) {
            this.NavigateLeft(-(this._containerWidth - (this._slideWidth * this.VisibleSlides)));
            return;
        }
        if (SlideContainerLeft % (this._slideWidth * this.VisibleSlides) != 0) {
            let remainder = SlideContainerLeft % this._slideWidth;
            if (Math.abs(remainder) >= (this._slideWidth / 2)) {
                this.NavigateLeft(SlideContainerLeft + -(this._slideWidth + remainder));
            }
            else {
                this.NavigateLeft(SlideContainerLeft + (-remainder));
            }
        }
    }
    get IsAtStart() {
        return Math.abs(this._containerOffsetLeft) == 0;
    }
    get IsAtEnd() {
        let isLastSlide = Math.abs(Math.trunc(this._containerOffsetLeft)) == Math.trunc((this._containerWidth - (this._slideWidth * this.VisibleSlides)));
        let smallContainer = this._containerWidth < (this._slideWidth * this.VisibleSlides);
        return isLastSlide || smallContainer;
    }
};
SlidesContainerComponent = __decorate([
    core_1.Component({
        selector: 'slides-container',
        template: "<ng-content></ng-content>",
        styles: [":host{display:block;height:100%;position:relative;left:0;transition:left .4s ease-out}:host>>>.slides{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;height:100%}"]
    }),
    __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
], SlidesContainerComponent);
exports.SlidesContainerComponent = SlidesContainerComponent;
;
//# sourceMappingURL=slides-container.component.js.map