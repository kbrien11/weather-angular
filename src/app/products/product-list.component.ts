import { templateJitUrl } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector:'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService){

  }
    pageTitle: String = 'Product List';
    imageWidh: Number = 50;
    imageMargin: Number= 2;
    showImage: boolean = false;
    errorMessage: string = ""

    private _listFilter: string = "";
    get listFilter(): string {
      return this._listFilter
    }
    set listFilter(value:string){
      this._listFilter = value
      console.log('in setter:', value)
      this.filteredProducts = this.performFilter(value);
    }
    filteredProducts: IProduct[] = [];
    products: IProduct[]  = []
     

      toggleImage(): void {
          this.showImage = !this.showImage
      }

      ngOnInit(): void {
        this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error: err => this.errorMessage = err
        });
      }
    
         

      performFilter(filterBy:string) :IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product:IProduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy));
        }

        onRatingClicked(message:string) : void{
          this.pageTitle = 'productList:' + " " + message;
        }
}