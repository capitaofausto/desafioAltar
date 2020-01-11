import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorRoutingModule } from './generator-routing.module';
import { GeneratorComponent } from './generator.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [GeneratorComponent],
  imports: [
    CommonModule,
    FormsModule,
    GeneratorRoutingModule,
    NgbModule
  ]
})
export class GeneratorModule { }
