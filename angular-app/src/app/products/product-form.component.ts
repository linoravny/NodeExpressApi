import {Component, OnInit, DoCheck, OnDestroy} from '@angular/core';
import { IProduct } from './IProduct';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector:'pm-add-product',
    templateUrl:"./product-form.component.html",
    providers: [ProductService]
})
export class ProductFormComponent implements OnInit, OnDestroy
{
    constructor(private productsSrv: ProductService){}

    myForm: FormGroup = new FormGroup({});
    pageTite:string = "Add Product Form";
    objsubscibe: Subscription = new Subscription();

    ngOnInit(): void {
        this.myForm = new FormGroup({
            name : new FormControl('', [Validators.required]),
            email : new FormControl('', [Validators.required, Validators.email]),
            type : new FormControl('', [Validators.required])
          });

        // this.objsubscibe = this.productsSrv.getProducts().subscribe(
        //     data=>(this.products = data),
        //     err=>console.log(err)
        // );
    }

    ngOnDestroy(){
        this.objsubscibe.unsubscribe();
    }

    onClickSubmit()  {
        //if (this.myForm.valid) {
            console.log('ProductFormComponent onClickSubmit()');
        //}
      }



}