import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gdo-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {

}
