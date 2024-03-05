import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyTrainingComponent } from './personal/my-training/my-training.component';
import { TrainingStatusComponent } from './reports/training-status/training-status.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { TrainersComponent } from './master/trainers/trainers.component';
import { TrainingLocationsComponent } from './master/training-locations/training-locations.component';
import { MyTestsComponent } from './personal/my-tests/my-tests.component';
import { TestStatusComponent } from './reports/test-status/test-status.component';
import { TestsComponent } from './tests/tests.component';
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
import { TrainingLctnsEdtComponent } from './master/training-locations/training-lctns-edt/training-lctns-edt.component'
import { CalendarService } from './calendar/calendar.service';
import { ScheduleFormComponent } from './calendar/schedule-form/schedule-form.component';
import { TutorialDtlDlgComponent } from './tutorial/tutorial-dtl-dlg/tutorial-dtl-dlg.component';
import { TutorialVenueFormComponent } from './tutorial/tutorial-venue-form/tutorial-venue-form.component';
import { TrnersubmtnformComponent } from './calendar/trnersubmtnform/trnersubmtnform.component';
import { TutorialAssignmentDtlComponent } from './tutorial/tutorial-assignment/tutorial-assignment-dtl/tutorial-assignment-dtl.component';
import { TrainerSubFormComponent } from './personal/my-training/trainer-sub-form/trainer-sub-form.component';

const routes: Routes = [ 
  { path     : 'dashboard', component: DashboardComponent}, 
  { path     : 'calendar', component: CalendarComponent,resolve  : {
    schedules: CalendarService
}},
  { path     : 'personal/mytraining', component: MyTrainingComponent},
  { path     : 'personal/mytraining/sub-form', component: TrainerSubFormComponent},
  { path     : 'scheduleTraining', component: TutorialAssignmentDtlComponent},
  { path     : 'calendar/form', component: ScheduleFormComponent},
  { path     : 'schedule', component: ScheduleFormComponent},
  { path     : 'dashboard/tutorial', component: TutorialDtlComponent}, 
  { path     : 'personal/mytests', component: MyTestsComponent},
  { path     : 'master/trainers', component: TrainersComponent},
  { path     : 'master/test', component: TestsComponent},
  { path     : 'master/tutorial', component: TutorialComponent},
  { path     : 'master/training-locations', component: TrainingLocationsComponent}, 
  { path     : 'reports/training-status', component: TrainingStatusComponent},  
  { path     : 'reports/test-status', component: TestStatusComponent},  
  { path     : 'training/new-training', component: TutorialEdtComponent},
  { path     : 'training',component: TutorialComponent },
  { path     : 'training/course',component: TutorialDtlComponent },
  { path     : 'training/crs-dtl',component: TutorialDtlDlgComponent },
  { path     : 'training/test',component: TestsComponent },
  { path     : 'training/assign-training',component: TutorialAssignmentComponent },
  
  { path     : 'venueform',component: TrainingLctnsEdtComponent },
  { path     : 'trainer/addTrainer',component: TrainerEdtComponent },
  { path     : '**',component: DashboardComponent }];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LmsRoutingModule { }
