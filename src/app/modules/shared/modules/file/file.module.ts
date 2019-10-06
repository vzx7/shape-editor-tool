import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { FileService } from './services/file.service';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [FileUploaderComponent],
  imports: [
    CommonModule,
    InlineSVGModule
  ],
  exports: [
    FileUploaderComponent
  ],
  providers: [
    FileService
  ]
})
export class FileModule { }
