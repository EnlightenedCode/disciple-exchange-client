import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { TopHeaderLogoComponent } from './topHeaderLogo/topHeaderLogo.component';
import { LoginFormComponent } from './loginForm/loginForm.component';
import { LoaderComponent } from './loader/loader.component';
import { NoAccessComponent } from './noAccess/noAccess.component';
import { RegisterFormComponent } from './registerForm/registerForm.component';
import { ContainerShellComponent } from './containerShell/containerShell.component';
import { ErrorModalComponent } from './errorModal/error-modal.component';
import { ErrorComponent } from './errorModal/error-modal.component';
import { LoginWorkflow } from '../providers/workflows/loginWorkflow';
import { FirebaseService } from '../providers/services/firebaseService';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        TopHeaderLogoComponent,
        LoginFormComponent,
        LoaderComponent,
        ErrorModalComponent,
        ErrorComponent,
        ContainerShellComponent,
        NoAccessComponent,
        RegisterFormComponent
    ],
    declarations: [
        TopHeaderLogoComponent,
        LoginFormComponent,
        LoaderComponent,
        ErrorModalComponent,
        ErrorComponent,
        ContainerShellComponent,
        NoAccessComponent,
        RegisterFormComponent
    ],
    providers: [FirebaseService, LoginWorkflow]
})

export class CommonComponentsModule { }
