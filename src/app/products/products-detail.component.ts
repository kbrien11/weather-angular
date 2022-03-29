import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {
   pageTitle: string = "Product Detail"
   errorMessage = '';
  product: IProduct | undefined;
  constructor(private route:ActivatedRoute,private productService: ProductService,private router:Router) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id:number){
    this.productService.getProduct(id).subscribe({
      next:product=> this.product = product,
      error: err=> this.errorMessage = err
    })
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
