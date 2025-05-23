import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
    {
  path: 'system-settings',
  loadChildren: () =>
    import('./system-settings/system-settings.module').then(m => m.SystemSettingsPageModule)
 }, {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'terms-of-service',
    loadChildren: () => import('./terms-of-service/terms-of-service.module').then( m => m.TermsOfServicePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'law-dashboard',
    loadChildren: () => import('./law-dashboard/law-dashboard.module').then(m => m.LawDashboardPageModule)
  },
  {
    path: 'security-personnel',
    loadChildren: () => import('./security-personnel/security-personnel.module').then(m => m.SecurityPersonnelPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
   
  {
    path: 'manage-users',
    loadChildren: () => import('./manage-users/manage-users.module').then(m => m.ManageUsersPageModule)
  },
  {
    path: 'live-feeds',
    loadChildren: () => import('./live-feeds/live-feeds.module').then( m => m.LiveFeedsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }