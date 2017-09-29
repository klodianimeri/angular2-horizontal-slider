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
var HsSlideComponent = (function () {
    function HsSlideComponent(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
    }
    HsSlideComponent.prototype.SetWidth = function (width) {
        this._renderer.setElementStyle(this._element.nativeElement, "width", width.toString() + "px");
    };
    HsSlideComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hs-slide, [hs-slide]',
            templateUrl: './hs-slide.component.html',
            styleUrls: ["./hs-slide.component.css"],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], HsSlideComponent);
    return HsSlideComponent;
}());
exports.HsSlideComponent = HsSlideComponent;
//# sourceMappingURL=hs-slide.component.js.map