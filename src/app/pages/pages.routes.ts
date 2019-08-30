import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';

const pagesRoutes: Routes  = [
    { 
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
        { path: 'dashboard', component: DashboardComponent, data:  {titulo: 'Dashboard'}},
        { path: 'progress', component: ProgressComponent, data:  {titulo: 'Progress'} },
        { path: 'graficas1', component: Graficas1Component, data:  {titulo: 'Gráficas'} },
        { path: 'promesas', component: PromesasComponent, data:  {titulo: 'Promesas'} },
        { path: 'account-settings', component: AccountSettingComponent, data:  {titulo: 'Ajustes del tema'} },
        { path: 'perfil', component: ProfileComponent, data:  {titulo: 'Perfil de usuario'} },
        { path: 'rxjs', component: RxjsComponent, data:  {titulo: 'Rxjs'} },
        { path: '', redirectTo: '/dashboard' , pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
