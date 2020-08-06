import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './store/reducer/app.reducer';
import { MapComponent } from './component/map/map.component';
import { StopListComponent } from './component/stop-list/stop-list.component';
import { MapEffects } from './store/effect/map.effects';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    StopListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([MapEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
