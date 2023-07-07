import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import { ChatserveService } from 'src/app/service/chatserve.service';

@Component({
  selector: 'app-grpmembers',
  templateUrl: './grpmembers.component.html',
  styleUrls: ['./grpmembers.component.scss']
})
export class GrpmembersComponent {
  participants: any;


  constructor(public dialogRef: MatDialogRef<GrpmembersComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,public apiservice:ApiserviceService,
    public chatservice:ChatserveService) {
      this.participants = data.participants
   }


   onNoClick(): void {
     this.dialogRef.close();
   }
   
 

}
