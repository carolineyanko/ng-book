import { Component } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: Product[];

  constructor() {
    this.products = [
      new Product(
        'sku1',
        'Nice Hat',
        'https://dummyimage.com/100',
        ['Men', 'Clothes', 'Skirts'],
        19.99
      ),
      new Product(
        'sku2',
        'Nice Fat',
        'https://dummyimage.com/100',
        ['Women', 'Clothes', 'Shirts'],
        9.99
      ),
      new Product(
        'sku3',
        'Nice Cat',
        'https://dummyimage.com/100',
        ['Men', 'Accessories', 'Hats'],
        29.99
      )
    ];
  }

  productWasSelected(product: Product): void {
    console.log('Product clicked: ', product);
  }
}
