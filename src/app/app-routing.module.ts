import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'generator',
    loadChildren: () => import('./generator/generator.module').then(m => m.GeneratorModule),
    /* canActivate: [AuthGuard] */
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule),
    /* canActivate: [AuthGuard] */
  },
  {
    path: '**', redirectTo: 'generator'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
