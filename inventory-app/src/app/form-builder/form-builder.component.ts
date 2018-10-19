import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  reactiveFrom: FormGroup;
  sku: AbstractControl;

  constructor(fb: FormBuilder) {
    this.reactiveFrom = fb.group({
      sku: ['', Validators.required]
    });

    this.sku = this.reactiveFrom.controls['sku'];
  }

  ngOnInit() {
  }

  onSubmit(value: string): void {
    console.log('Form Builder Value: ', value);
  }
}
