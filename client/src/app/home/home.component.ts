import {Component} from '@angular/core';
import {DataService} from "../data.service";
import {DocumentCard} from "../interfaces/data-interface";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  list: DocumentCard[] = [];

  ngOnInit(): void {
    let text;
    this.route.queryParams.subscribe(res => {
      console.log(res['search']);
      text = res['search'];
    });
    // @ts-ignore
    this.getData(text);
    console.log('OnInit');
  }

  getData(text: string): void {
    if (text) {
      this.dataService.search(text).subscribe((res) => {
        this.list = res.data;
      });
    } else {
      this.dataService.getFilesList().subscribe((res) => {
        this.list = res.data;
      })
    }

  }
}
