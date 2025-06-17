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
    path: 'law-comms',
    loadChildren: () => import('./law-comms/law-comms.module').then(m => m.LawCommsPageModule)
  },
  {
    path: 'received-reports',
    loadChildren: () => import('./received-reports/received-reports.module').then(m => m.ReceivedReportsPageModule)
  },
  {
    path: 'threats-detected',
    loadChildren: () => import('./threats-detected/threats-detected.module').then(m => m.ThreatsDetectedPageModule)
  },
  {
    path: 'generate-reports',
    loadChildren: () => import('./generate-reports/generate-reports.module').then(m => m.GenerateReportsPageModule)
  },
  {
    path: 'drone-detection',
    loadChildren: () => import('./drone-detection/drone-detection.module').then( m => m.DroneDetectionPageModule)
  },
  {
    path: 'security-chat',
    loadChildren: () => import('./security-chat/security-chat.module').then( m => m.SecurityChatPageModule)
  },
  {
    path: 'driverdashboard',
    loadChildren: () => import('./driverdashboard/driverdashboard.module').then( m => m.DriverdashboardPageModule)
  },
  {
    path: 'live-feed',
    loadChildren: () => import('./live-feed/live-feed.module').then( m => m.LiveFeedPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'assigned-trip',
    loadChildren: () => import('./assigned-trip/assigned-trip.module').then( m => m.AssignedTripPageModule)
  },
  {
    path: 'trip-scheduling',
    loadChildren: () => import('./trip-scheduling/trip-scheduling.module').then( m => m.TripSchedulingPageModule)
  },
  {
    path: 'vehicle-reg',
    loadChildren: () => import('./vehicle-reg/vehicle-reg.module').then( m => m.VehicleRegPageModule)
  },
 
  {
    path: 'assign-trip',
    loadChildren: () => import('./assign-trip/assign-trip.module').then( m => m.AssignTripPageModule)
  },


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
