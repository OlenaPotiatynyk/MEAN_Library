import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
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
}
