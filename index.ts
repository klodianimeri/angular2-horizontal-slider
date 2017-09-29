import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';

import {
    HorizontalSliderComponent,
    HsNavLeftComponent,
    HsNavRightComponent
} from "./src/horizontal-slider/horizontal-slider.component";
import { HsSlideComponent } from "./src/horizontal-slider/hs-slide/hs-slide.component";
import { SlidesContainerComponent } from "./src/horizontal-slider/slides-container/slides-container.component";

@NgModule({
    declarations: [
        HorizontalSliderComponent,
        SlidesContainerComponent,
        HsNavLeftComponent,
        HsNavRightComponent,
        HsSlideComponent
    ],
    imports: [
        BrowserModule
    ],
    exports: [
        HorizontalSliderComponent,
        HsSlideComponent,
        HsNavLeftComponent,
        HsNavRightComponent,
    ],
    providers: [],
})
export class HorizontalSliderModule { }
