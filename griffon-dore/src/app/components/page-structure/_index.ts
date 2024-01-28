import { BlockableUiComponent } from './blockable-ui/blockable-ui.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { TopNavComponent } from './top-nav/top-nav.component';

export * from './blockable-ui/blockable-ui.component';
export * from './page-layout/page-layout.component';
export * from './top-nav/top-nav.component';

export const PAGE_STRUCTURE_COMPONENTS = [
    BlockableUiComponent,
    PageLayoutComponent,
    TopNavComponent,
];