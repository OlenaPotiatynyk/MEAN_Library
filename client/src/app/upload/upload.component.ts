import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

function requiredFileType(type: string) {
  return function (control: FormControl) {
    const file = control.value;
    if (file) {
      const extension = file.split('.')[1].toLowerCase();
      if (type.toLowerCase() !== extension.toLowerCase()) {
        return {
          requiredFileType: true
        };
      }
      return null;
    }
    return null;
  };
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @Input() progress: any;

  file: File | null = null;
  signup = new FormGroup({
    file: new FormControl(null, [Validators.required, requiredFileType('pdf')]),
    description: new FormControl(null, Validators.required)
  });

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    this.file = event && event.item(0);
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  submit() {

  }
}
