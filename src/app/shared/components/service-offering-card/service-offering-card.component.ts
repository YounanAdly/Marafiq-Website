import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-service-offering-card',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './service-offering-card.component.html',
  styleUrl: './service-offering-card.component.scss',
})
export class ServiceOfferingCardComponent {
  @Input() titleKey = '';
  @Input() descriptionKey = '';
  @Input() imageSrc = '';
  @Input() imageAltKey = '';
  @Input() actionLabelKey = 'home.services.applyNow';

  @Output() apply = new EventEmitter<void>();

  onApply(): void {
    this.apply.emit();
  }
}
