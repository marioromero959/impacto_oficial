import { Component, ViewChild, ElementRef, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Productos } from 'src/app/admin/interface/product';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: [
    '../../../../../node_modules/keen-slider/keen-slider.min.css',
    './carousel.component.scss',
  ],
})
export class CarouselComponent implements OnInit ,OnChanges{
  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;

  currentSlide: number = 0;
  dotHelper: Array<Number> = [];
  slider: KeenSliderInstance = null;

  @Input('imagenes') imagenesSlider = [];
  @Input('unitsPerView') units = 0;
  @Input('autoplay') autoplay = false;
  @Input('sizing') sizing = [];
  @Input('dots') dots = false;

  constructor(private router:Router) {}

  ngOnInit(): void {}
  ngOnChanges(changes:SimpleChanges): void {
    if(!changes['units']?.firstChange){
      this.ngAfterViewInit()    
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(
        this.sliderRef.nativeElement,
        {
          slides: {
            perView: this.units,
            spacing: 15,
          },
          loop: true,
          initial: this.currentSlide,
          slideChanged: (s) => {
            this.currentSlide = s.track.details.rel;
          },
        },
        [
          (slider) => {
            let timeout;
            let mouseOver = false;
            function clearNextTimeout() {
              clearTimeout(timeout);
            }
            function nextTimeout() {
              clearTimeout(timeout);
              if (mouseOver) return;
              timeout = setTimeout(() => {
                slider.next();
              }, 2000);
            }
            slider.on('created', () => {
              slider.container.addEventListener('mouseover', () => {
                mouseOver = false;
                nextTimeout();
                // clearNextTimeout();
              });
              slider.container.addEventListener('mouseout', () => {
                mouseOver = false;
                nextTimeout();
              });
              nextTimeout();
            });
            slider.on('dragStarted', clearNextTimeout);
            slider.on('animationEnded', nextTimeout);
            slider.on('updated', nextTimeout);
          },
        ]
      );
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys(),
      ];
    });
  }

  showDetails(product:Productos){
    if(product._id){
      this.router.navigate([`products/${product._id}`])
    }
 }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }
}
