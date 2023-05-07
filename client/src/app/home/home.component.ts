import {Component} from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor(private dataService: DataService) { }

  list = [
    {
      file: 'Some file name 01',
      description: 'Some loooooong description',
      owner: 'Some Good Guy'
    },
    {
      file: 'Some file name 02',
      description: 'Some loooooong description',
      owner: 'Some Good Guy'
    },
    {
      file: 'Some file name 03',
      description: 'Some loooooong description',
      owner: 'Some Good Guy'
    },
    {
      file: 'Some file name 04',
      description: 'Some loooooong description',
      owner: 'Some Good Guy'
    }
  ]

  ngOnInit() {
    this.getData();
    console.log('OnInit');
  }

  getData() {
    this.dataService.getFilesList().subscribe((res) => {
      console.log(res);
    })
  }
}
