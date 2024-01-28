import { CommonModule } from '@angular/common';
import { Component, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppDeviceInfo, PRIME_COMMON } from '@app/common';
import { BlockableUiComponent, PullToRefreshComponent } from '@app/components';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AutomatedStylingService } from './services/automated-styling/automated-styling.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        BlockableUiComponent,
        CommonModule,
        PullToRefreshComponent,
        RouterOutlet,
        ...PRIME_COMMON,
    ],
    providers: [MessageService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'griffon-dore';

    constructor(
        private primengConfig: PrimeNGConfig,
        private deviceDetector: DeviceDetectorService,
        private automatedStylingService: AutomatedStylingService,
    ) {
        
        afterNextRender(() => {
            console.log(this.deviceDetector.getDeviceInfo());
            AppDeviceInfo.isDesktop = this.deviceDetector.isDesktop();
            AppDeviceInfo.isMobile = this.deviceDetector.isMobile();
            AppDeviceInfo.isTablet = this.deviceDetector.isTablet();
            
        });
    }

    ngOnInit(
    ) {
        this.primengConfig.ripple = true;


        this.primengConfig.zIndex = {
            modal: 11100,    // dialog, sidebar
            overlay: 10000,  // dropdown, overlaypanel
            menu: 11000,     // overlay menus
            tooltip: 11050  // tooltip
        };
    }

}
