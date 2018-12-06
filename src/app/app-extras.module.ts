import { NgModule } from '@angular/core';
import { BeeService } from './services/bee.service';
import { BeeEditComponent } from './bees/bee-edit/bee-edit.component';

// Specify entry components, module-level providers, etc. here.
@NgModule({
  providers: [
    BeeService
  ],
  entryComponents: [BeeEditComponent]
})
export class AppExtrasModule { }
