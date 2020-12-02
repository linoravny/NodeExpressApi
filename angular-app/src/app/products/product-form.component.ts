import {Component, OnInit, DoCheck, OnDestroy} from '@angular/core';
import { IProduct } from './IProduct';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';


@Component({
    selector:'pm-add-product',
    templateUrl:"./product-form.component.html",
    providers: [ProductService]
})
export class ProductFormComponent implements OnInit, OnDestroy
{
    constructor(private productsSrv: ProductService){}


    ngOnInit(): void {
        // this.objsubscibe = this.productsSrv.getProducts().subscribe(
        //     data=>(this.products = data),
        //     err=>console.log(err)
        // );
    }

    ngOnDestroy(){
        this.objsubscibe.unsubscribe();
    }

    pageTite:string = "Add Product Form";
    objsubscibe: Subscription = new Subscription();

}