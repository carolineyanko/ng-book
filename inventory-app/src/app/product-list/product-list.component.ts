import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() productList: Product[];

  @Output() onProductSelected: EventEmitter<Product>;

  private currentProduct: Product;

  constructor() {
    this.onProductSelected = new EventEmitter();
  }

  ngOnInit() {
  }

  clicked(product: Product) {
    console.log('Clicked: ', product);
    this.currentProduct = product;
    this.onProductSelected.emit(product);
  }

  isSelected(product): boolean {
    if (!product || !this.currentProduct) {
      return false;
    }
    return this.currentProduct.sku === product.sku;
  }
}
