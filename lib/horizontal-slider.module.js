"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const horizontal_slider_component_1 = require("./horizontal-slider.component");
const hs_slide_component_1 = require("./hs-slide/hs-slide.component");
const slides_container_component_1 = require("./slides-container/slides-container.component");
let HorizontalSliderModule = class HorizontalSliderModule {
};
HorizontalSliderModule = __decorate([
    core_1.NgModule({
        declarations: [
            horizontal_slider_component_1.HorizontalSliderComponent,
            slides_container_component_1.SlidesContainerComponent,
            horizontal_slider_component_1.HsNavLeftComponent,
            horizontal_slider_component_1.HsNavRightComponent,
            hs_slide_component_1.HsSlideComponent
        ],
        imports: [
            platform_browser_1.BrowserModule
        ],
        exports: [
            horizontal_slider_component_1.HorizontalSliderComponent,
            hs_slide_component_1.HsSlideComponent,
            horizontal_slider_component_1.HsNavLeftComponent,
            horizontal_slider_component_1.HsNavRightComponent,
        ],
        providers: [],
    })
], HorizontalSliderModule);
exports.HorizontalSliderModule = HorizontalSliderModule;
//# sourceMappingURL=horizontal-slider.module.js.map