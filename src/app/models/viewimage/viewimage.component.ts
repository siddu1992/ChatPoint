import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-viewimage',
  templateUrl: './viewimage.component.html',
  styleUrls: ['./viewimage.component.scss']
})
export class ViewimageComponent {
  imgSrc: any;

  constructor(public dialogRef: MatDialogRef<ViewimageComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.imgSrc=data.imgSrc
    console.log("image",this.imgSrc)
   }


   onNoClick(): void {
     this.dialogRef.close();
   }
   
}
