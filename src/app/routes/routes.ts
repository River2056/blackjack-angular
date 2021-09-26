import { BoardComponent } from '../page/main-game/board/board.component';
import { GreetingPageComponent } from '../page/greeting-page/greeting-page.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: '', component: GreetingPageComponent },
    { path: 'game', component: BoardComponent }
];