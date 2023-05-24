import {Component} from '@angular/core';
import {DataService} from "../data.service";
import {DocumentCard} from "../interfaces/data-interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor(private dataService: DataService) {
  }

  list: DocumentCard[] = [];

  ngOnInit(): void {
    this.getData();
    console.log('OnInit');
  }

  getData(): void {
    this.dataService.getFilesList().subscribe((res) => {
      this.list = res.data;
    })
  }
}
