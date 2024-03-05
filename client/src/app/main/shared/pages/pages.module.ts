import { NgModule } from '@angular/core';

//import { LoginModule } from 'app/main/shared/pages/authentication/login/login.module';
// import { Login2Module } from 'app/main/shared/pages/authentication/login-2/login-2.module';
//import { RegisterModule } from 'app/main/shared/pages/authentication/register/register.module';
// import { Register2Module } from 'app/main/shared/pages/authentication/register-2/register-2.module';
//import { ForgotPasswordModule } from 'app/main/shared/pages/authentication/forgot-password/forgot-password.module';
// import { ForgotPassword2Module } from 'app/main/shared/pages/authentication/forgot-password-2/forgot-password-2.module';
//import { ResetPasswordModule } from 'app/main/shared/pages/authentication/reset-password/reset-password.module';
// import { ResetPassword2Module } from 'app/main/shared/pages/authentication/reset-password-2/reset-password-2.module';
// import { LockModule } from 'app/main/shared/pages/authentication/lock/lock.module';
// import { MailConfirmModule } from 'app/main/shared/pages/authentication/mail-confirm/mail-confirm.module';
//import { ComingSoonModule } from 'app/main/shared/pages/coming-soon/coming-soon.module';
import { Error404Module } from 'app/main/shared/pages/errors/404/error-404.module';
import { Error500Module } from 'app/main/shared/pages/errors/500/error-500.module';
//import { InvoiceModernModule } from 'app/main/shared/pages/invoices/modern/modern.module';
//import { InvoiceCompactModule } from 'app/main/shared/pages/invoices/compact/compact.module';
import { MaintenanceModule } from 'app/main/shared/pages/maintenance/maintenence.module';

import { ProfileModule } from 'app/main/shared/pages/profile/profile.module';
// import { SearchClassicModule } from 'app/main/shared/pages/search/classic/search-classic.module';
// import { SearchModernModule } from 'app/main/shared/pages/search/modern/search-modern.module';
// import { FaqModule } from 'app/main/shared/pages/faq/faq.module';
//import { KnowledgeBaseModule } from 'app/main/shared/pages/knowledge-base/knowledge-base.module';

@NgModule({
    imports: [
        // Authentication
        //LoginModule,
        //Login2Module,
        //RegisterModule,
        //Register2Module,
        //ForgotPasswordModule,
        //ForgotPassword2Module,
       // ResetPasswordModule,
        //ResetPassword2Module,
        //LockModule,
        //MailConfirmModule,

        // Coming-soon
       // ComingSoonModule,

        // Errors
        Error404Module,
        Error500Module,

        // Invoices
       // InvoiceModernModule,
       // InvoiceCompactModule,

        // Maintenance
        MaintenanceModule,

        // Profile
        ProfileModule

        // Search
       // SearchClassicModule,
        //SearchModernModule,

        // Faq
       // FaqModule,

        // Knowledge base
        //KnowledgeBaseModule
    ]
})
export class PagesModule
{

}
