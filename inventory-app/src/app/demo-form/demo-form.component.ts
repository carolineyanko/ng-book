import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.css']
})
export class DemoFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: any): void {
    console.log('Submitted value: ', form);
  }
}
