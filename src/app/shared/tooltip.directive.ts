import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[tooltip]'
})
export class CustomTooltipDirective {

    @Input('tooltip') tooltipTitle: string | undefined;
  
  
  tooltip: HTMLElement | undefined | null;
  offset = 10;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) { this.show(); }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) { this.hide(); }
  }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'ng-tooltip-show');
  }

  hide() {
    this.renderer.removeClass(this.tooltip, 'ng-tooltip-show');
    window.setTimeout(() => {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }, 100);
  }

  create() {
    this.tooltip = this.renderer.createElement('span');

    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle) // textNode
    );

    this.renderer.appendChild(document.body, this.tooltip);
    // this.renderer.appendChild(this.el.nativeElement, this.tooltip);

    this.renderer.addClass(this.tooltip, 'ng-tooltip');
    this.renderer.addClass(this.tooltip, `ng-tooltip-top`);
    
    this.renderer.setStyle(this.tooltip, '-webkit-transition', `opacity 100ms`);
    this.renderer.setStyle(this.tooltip, '-moz-transition', `opacity 100ms`);
    this.renderer.setStyle(this.tooltip, '-o-transition', `opacity 100ms`);
    this.renderer.setStyle(this.tooltip, 'transition', `opacity 100ms`);
  }

  setPosition() {    
    const hostPos = this.el.nativeElement.getBoundingClientRect();

    
    const tooltipPos = this.tooltip.getBoundingClientRect();
    
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left;
        
    this.renderer.setStyle(this.tooltip, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }
}