import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PRIME_COMMON } from '@app/common';
import { PageLayoutComponent } from '@app/components';

@Component({
    selector: 'gdo-home-page',
    standalone: true,
    imports: [
        PageLayoutComponent,
        ...PRIME_COMMON,
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {

}
