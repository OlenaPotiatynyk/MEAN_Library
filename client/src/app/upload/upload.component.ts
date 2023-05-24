import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";

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
  upload = new FormGroup({
    file: new FormControl('', [Validators.required, requiredFileType('pdf')]),
    description: new FormControl('', Validators.required),
    fileSource: new FormControl('', [Validators.required])
  });

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    this.file = event && event.item(0);
  }

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private dataService: DataService,
    private http: HttpClient) {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.upload.patchValue({
        fileSource: file
      });
    }
  }

  submit() {
    if (!this.upload.valid) return;

    const formData = new FormData();
    formData.append('file', this.upload.value.fileSource ? this.upload.value.fileSource : new Blob());
    formData.append('description', this.upload.value.description ? this.upload.value.description : '');

    this.http.post('http://localhost:3000/files', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');

        this.upload.reset();
      })
  }
}
