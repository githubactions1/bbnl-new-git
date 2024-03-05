import { DsNavigation } from '@glits/types';
export const navigation: DsNavigation[] = localStorage.getItem('mnuDtls') ? JSON.parse(localStorage.getItem('mnuDtls')) : [];



// export const navigation: DsNavigation[] =
//  [
//     {
//         id       : 'applications',
//         title    : 'Applications',
//         translate: 'NAV.APPLICATIONS',
//         type     : 'group',
//         children : [
//             {
//                 id       : 'dashboard',
//                 title    : 'Dashboard',
//                 translate: 'NAV.DASHBOARD_APP',
//                 type     : 'item',
//                 icon     : 'dashboard',
//                 url      : '/baseproject/dashboard'
//             },
//             // {
//             //     id       : 'attendance',
//             //     title    : 'Attendance',
//             //     translate: 'NAV.ATTENDANCE_APP',
//             //     type     : 'item',
//             //     icon     : 'alarm_add',
//             //     url      : '/apps/attendance'
//             // },
//             // {
//             //     id       : 'payroll',
//             //     title    : 'Payroll',
//             //     translate: 'NAV.PAYROLL_APP',
//             //     type     : 'item',
//             //     icon     : 'class',
//             //     url      : '/apps/payroll'
//             // }, 
          
//             {
//                 id       : 'reports',
//                 title    : 'Reports',
//                 translate: 'NAV.REPORTS_APP',
//                 type     : 'item',
//                 icon     : 'assessment',
//                 url      : '/baseproject/reports'
//             },
//             {
//                 id       : 'tiketingsystem',
//                 title    : 'Ticketing system',
//                 translate: 'NAV.TKT_SYSTM',
//                 type     : 'item',
//                 icon     : 'class',
//                 url      : '/baseproject/tiketingsystem'
//             },
//             {
//                 id       : 'Profile',
//                 title    : 'Profile',
//                 translate: 'NAV.PRFL_SYSTM',
//                 type     : 'item',
//                 icon     : 'class',
//                 url      : '/baseproject/profile'
//             },
//             {
//                 id       : 'notifications',
//                 title    : 'Notifications',
//                 translate: 'NAV.NTFCTIONS',
//                 type     : 'item',
//                 icon     : 'class',
//                 url      : '/baseproject/notifications'
//             },
           
//             {
//                 id       : 'setup',
//                 title    : 'Setup',
//                 translate: 'NAV.SETUP_APP',
//                 type     : 'item',
//                 icon     : 'settings_applications',
//                 url      : '/baseproject/setup'
//             }

//         ]
//      }
// ];
