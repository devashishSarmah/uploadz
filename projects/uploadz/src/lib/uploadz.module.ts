import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UploadzComponent } from './uploadz.component';

@NgModule({
  declarations: [UploadzComponent],
  imports: [HttpClientModule],
  exports: [UploadzComponent],
})
export class UploadzModule {}
