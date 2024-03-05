import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule, MatCardModule, MatGridListModule, MatRadioModule, MatSidenavModule, MatButtonToggleModule, MatInputModule, MatOptionModule, MatCheckboxModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule, MatSlideToggleModule, MatTooltipModule, MatDialog } from '@angular/material';
import { LmsRoutingModule } from './lms-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyTrainingComponent } from './personal/my-training/my-training.component';
import { TrainingStatusComponent } from './reports/training-status/training-status.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { TrainersComponent } from './master/trainers/trainers.component';
import { TrainingLocationsComponent } from './master/training-locations/training-locations.component';
import { MyTestsComponent } from './personal/my-tests/my-tests.component';
import { TestStatusComponent } from './reports/test-status/test-status.component';
import { TestsComponent } from './tests/tests.component';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { TestDtlComponent } from './tests/test-dtl/test-dtl.component';
import { TestAssignmentComponent } from './tests/test-assignment/test-assignment.component';
import { TestScheduleComponent } from './tests/test-schedule/test-schedule.component';
import { TutorialDtlComponent } from './tutorial/tutorial-dtl/tutorial-dtl.component';
import { TutorialAssignmentComponent } from './tutorial/tutorial-assignment/tutorial-assignment.component';
import { TutorialScheduleComponent } from './tutorial/tutorial-schedule/tutorial-schedule.component';
import { TutorialBatchComponent } from './tutorial/tutorial-batch/tutorial-batch.component';
import { TestBatchComponent } from './tests/test-batch/test-batch.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarDtlComponent } from './calendar/calendar-dtl/calendar-dtl.component';
import { TutorialBatchDtlComponent } from './tutorial/tutorial-batch/tutorial-batch-dtl/tutorial-batch-dtl.component';
import { TestBatchDtlComponent } from './tests/test-batch-dtl/test-batch-dtl.component';
import { TestBatchEdtComponent } from './tests/test-batch-edt/test-batch-edt.component';
import { TutorialBatchEdtComponent } from './tutorial/tutorial-batch/tutorial-batch-edt/tutorial-batch-edt.component';
import { TestEdtComponent } from './tests/test-edt/test-edt.component';
import { TutorialEdtComponent } from './tutorial/tutorial-edt/tutorial-edt.component';
import { TrainerDtlComponent } from './master/trainers/trainer-dtl/trainer-dtl.component';
import { TrainerEdtComponent } from './master/trainers/trainer-edt/trainer-edt.component';
import { TrainingLctnsDtlComponent } from './master/training-locations/training-lctns-dtl/training-lctns-dtl.component';
import { TrainingLctnsEdtComponent } from './master/training-locations/training-lctns-edt/training-lctns-edt.component';
// import { MaterialModuleList } from '../material.module';
import { DsProgressBarModule, DsSidebarModule, DsConfirmDialogModule, DsNavigationModule } from '@glits/components';
import { DsSharedModule } from '@glits/shared.module';
import { DsWidgetModule } from '@glits/components';
//import { FltrHeaderSrvc } from 'app/providers/filterheader/fltrheader.service';
import { SharedModule } from '../../shared/shared.module'
import { MaterialModuleList } from '../material.module';
import { TrainingStatusdilogComponent } from './reports/training-status/training-statusdilog/training-statusdilog.component';
import { CalendarService } from './calendar/calendar.service';
import { ScheduleFormComponent } from './calendar/schedule-form/schedule-form.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ColorPickerModule } from 'ngx-color-picker';
import { EmbedVideo } from 'ngx-embed-video';
import { NgxGalleryModule } from 'ngx-gallery';
import { VideoService } from './tutorial/video-service'
import { BarRatingModule } from "ngx-bar-rating";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TutorialDtlDlgComponent } from './tutorial/tutorial-dtl-dlg/tutorial-dtl-dlg.component';
import { TutorialVenueFormComponent } from './tutorial/tutorial-venue-form/tutorial-venue-form.component';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { TrnersubmtnformComponent } from './calendar/trnersubmtnform/trnersubmtnform.component';
import { FilterPipe } from 'app/main/shared/utils/filter.pipe';
import { TutorialAssignmentDtlComponent } from './tutorial/tutorial-assignment/tutorial-assignment-dtl/tutorial-assignment-dtl.component';
import { TrainerSubFormComponent } from './personal/my-training/trainer-sub-form/trainer-sub-form.component';
import { HttpClientModule } from '@angular/common/http';

// import { DsProgressBarModule, DsSidebarModule, DsThemeOptionsModule } from '@glits/components';
// import { DsSharedModule } from '@glits/shared.module';
@NgModule({
  declarations: [DashboardComponent, MyTrainingComponent, TrainingStatusComponent, TutorialComponent, TrainersComponent, TrainingLocationsComponent, MyTestsComponent, TestStatusComponent, TestsComponent, TestDtlComponent, TestAssignmentComponent, TestScheduleComponent, TutorialDtlComponent, TutorialAssignmentComponent, TutorialScheduleComponent, TutorialBatchComponent, TestBatchComponent, CalendarComponent, CalendarDtlComponent, TutorialBatchDtlComponent, TestBatchDtlComponent, TestBatchEdtComponent, TutorialBatchEdtComponent, TestEdtComponent, TutorialEdtComponent, TrainerDtlComponent, TrainerEdtComponent, TrainingLctnsDtlComponent, TrainingLctnsEdtComponent, TrainingStatusdilogComponent, CalendarComponent,

    ScheduleFormComponent, TutorialVenueFormComponent,

    TutorialDtlDlgComponent,

    TrnersubmtnformComponent, FilterPipe, TutorialAssignmentDtlComponent, TrainerSubFormComponent],
  imports: [
    
    HttpClientModule,
    MaterialModuleList,
    AngularCalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ColorPickerModule,
    EmbedVideo.forRoot(),
    DsSharedModule,
    DsConfirmDialogModule,
    NgxGalleryModule,
    InfiniteScrollModule,
    CommonModule,
    LmsRoutingModule,
    DsProgressBarModule,
    BarRatingModule,

    DsSidebarModule,
    //DsThemeOptionsModule,
    SharedModule,
    MaterialModuleList,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    DsNavigationModule,
    DsWidgetModule,
    MatCardModule, MatGridListModule, MatRadioModule, MatSidenavModule, MatButtonToggleModule,
    MatInputModule, MatOptionModule, MatCheckboxModule, MatProgressSpinnerModule,
    MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatDialogModule, MatPaginatorModule, MatToolbarModule, MatListModule, MatSnackBarModule

  ],
  exports: [DashboardComponent, MyTrainingComponent, TrainingStatusComponent, TutorialComponent, TrainersComponent, TrainingLocationsComponent, MyTestsComponent, TestStatusComponent, TestsComponent],
  entryComponents: [
    TrainingStatusdilogComponent, ScheduleFormComponent, TutorialEdtComponent, TutorialDtlDlgComponent,TrainerDtlComponent
  ],
  providers: [
    CalendarService, TransfereService, VideoService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LmsModule { }
