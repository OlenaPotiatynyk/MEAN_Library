import {Component} from '@angular/core';
import {DataService} from "../data.service";

interface FileListResponse {
  name: string,
  description: string,
  owner: string,
  id: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor(private dataService: DataService) { }

  list: FileListResponse[] = [];

  ngOnInit() {
    this.getData();
    console.log('OnInit');
  }

  getData() {
    this.dataService.getFilesList().subscribe((res) => {
      this.list = res.data;
    })
  }

  downloadFile(id: string, name: string) {
    this.dataService.downloadFile(id, name);
  }
}
