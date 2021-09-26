import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BoardComponent } from './page/main-game/board/board.component';
import { HeaderComponent } from './components/header/header.component';
import { HandComponent } from './components/hand/hand.component';
import { CardComponent } from './components/card/card.component';
import { ScoreBoardComponent } from './page/main-game/score-board/score-board.component';
import { ActionsComponent } from './page/main-game/actions/actions.component';
import { ButtonComponent } from './components/button/button.component';
import { MainGameComponent } from './page/main-game/main-game.component';
import { GreetingPageComponent } from './page/greeting-page/greeting-page.component';
import { appRoutes } from './routes/routes';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    HeaderComponent,
    HandComponent,
    CardComponent,
    ScoreBoardComponent,
    ActionsComponent,
    ButtonComponent,
    MainGameComponent,
    GreetingPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
