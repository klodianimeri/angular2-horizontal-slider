"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var HsSlideComponent = (function () {
    function HsSlideComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    HsSlideComponent.prototype.SetWidth = function (width) {
        this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");
    };
    return HsSlideComponent;
}());
HsSlideComponent = __decorate([
    core_1.Component({
        selector: 'hs-slide, [hs-slide]',
        template: '<ng-content></ng-content>',
        styles: ["[hs-slide],hs-slide{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-align:stretch;align-items:stretch;overflow:hidden}"],
        encapsulation: core_1.ViewEncapsulation.None
    })
], HsSlideComponent);
exports.HsSlideComponent = HsSlideComponent;
