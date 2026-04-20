import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-container" [class]="customClass()">
      <div class="card-image" *ngIf="imageSrc()">
        <img [src]="imageSrc()" [alt]="title() || 'Card Image'" />
      </div>
      <div class="card-content">
        <h3 class="card-title" *ngIf="title()">{{ title() }}</h3>
        <p class="card-subtitle" *ngIf="subtitle()">{{ subtitle() }}</p>
        <div class="card-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .card-container {
      background-color: #ffffff;
      border-radius: 16px;
      padding: 45px;
      box-shadow: 0px 1px 20px rgba(202, 231, 233, 1);
      display: flex;
      flex-direction: column;
      gap: 20px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      height: 100%;
      border: 1px solid transparent;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0px 4px 25px rgba(202, 231, 233, 0.8);
      }
    }

    .card-image {
      width: 100%;
      height: auto;
      margin-bottom: 24px;
      
      img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        object-fit: cover;
      }
    }

    .card-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .card-title {
      margin: 0;
      font-size: 2.2rem; /* Matches 'h22 regular' style in Figma approx */
      font-weight: 600;
      color: #2b2b2b; /* Matches 'Black #2b2b2b' style */
    }

    .card-subtitle {
      margin: 0;
      font-size: 1.6rem; /* Matches 'text 16 regular' style */
      color: #6c757d;
      line-height: 1.5;
    }

    .card-body {
      margin-top: 10px;
    }
  `]
})
export class CardComponent {
  title = signal<string | null>(null);
  subtitle = signal<string | null>(null);
  imageSrc = signal<string | null>(null);
  customClass = signal<string>('');

  @Input('title') set setTitle(value: string | null) { this.title.set(value); }
  @Input('subtitle') set setSubtitle(value: string | null) { this.subtitle.set(value); }
  @Input('imageSrc') set setImageSrc(value: string | null) { this.imageSrc.set(value); }
  @Input('customClass') set setCustomClass(value: string) { this.customClass.set(value || ''); }
}
