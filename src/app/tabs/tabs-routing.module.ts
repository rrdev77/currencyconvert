import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'rates',
        loadChildren: () => import('../rates/rates.module').then(m => m.RatesPageModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('../charts/charts.module').then(m => m.ChartsPageModule)
      },
      {
        path: '',
        redirectTo: '/tab/rates',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/rates',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
