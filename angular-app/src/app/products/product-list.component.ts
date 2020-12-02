import {Component, OnInit, DoCheck, OnDestroy} from '@angular/core';
import { IProduct } from './IProduct';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';


@Component({
    selector:'pm-products',
    templateUrl:"./product-list.component.html",
    providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy
{
    constructor(private productsSrv: ProductService){}


    ngOnInit(): void {
        this.objsubscibe = this.productsSrv.getProducts().subscribe(
            data=>(this.products = data),
            err=>console.log(err)
        );
    }

    ngOnDestroy(){
        this.objsubscibe.unsubscribe();
    }

    pageTite:string = "Product List";
    products: IProduct[] = [];
    objsubscibe: Subscription = new Subscription();

}