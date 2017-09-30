
# Angular 2 Horizontal Slider

A very minimalistic fully responsive angular 2 horizontal slider.

## Import this module to your angular app

```js
import { HorizontalSliderModule } from "angular2-horizontal-slider";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HorizontalSliderModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

## Angular 2 Horizontal Slider

You can configure your slider to show different nummber of slides in different screen sizes. There are supported 4 screesizes xs, sm, md, lg. The default number of slides for these screensizes are:

```js
this.XsVisibleSlides = 1;
this.SmVisibleSlides = 2;
this.MdVisibleSlides = 3;
this.LgVisibleSlides = 4;
```

These screen sizes media queries are the same as bootstrap 3.
To configure different number slides just add these inputs to *horizontal-slider* element.

```html
<horizontal-slider xs-visible-slides="1" sm-visible-slides="2" md-visible-slides="3" lg-visible-slides="3">
</horizontal-slider>
```

The navigation icons or text should be wrapped up inside *hs-nav-left* and *hs-nav-right* elements.

```html
<horizontal-slider lg-visible-slides="3">
    <hs-nav-left>left</hs-nav-left>
    <hs-nav-right>right</hs-nav-right>
</horizontal-slider>
```

Full example:

```html
<horizontal-slider lg-visible-slides="3">
    <hs-slide>
        slide 1
    </hs-slide>
    <hs-slide>
        slide 2
    </hs-slide>
        ...
    <hs-nav-left>left</hs-nav-left>
    <hs-nav-right>right</hs-nav-right>
</horizontal-slider>
```