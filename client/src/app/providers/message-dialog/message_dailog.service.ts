import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription, } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';

@Injectable()
export class MessageDialogService {
    private opnMsgDailog: BehaviorSubject<any>;

    constructor(public dialog: MatDialog) {
        this.opnMsgDailog = new BehaviorSubject({
            title: '',
            msg: '',
            btnLst: []
        });
    }

    openDialog(dailg_styls, dailg_data, calbk) {
        this.opnMsgDailog.next(dailg_data);
        const dialogRef = this.dialog.open(MessageDialogComponent, {
            width: dailg_styls.width,
            height: dailg_styls.height,
            data: this.opnMsgDailog.value
        });
        dialogRef.afterClosed().subscribe(result => {
            calbk(result);
        });
    }

}