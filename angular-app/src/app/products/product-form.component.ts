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
    pageMsg: string = "";
    isError: boolean = false;

    ngOnInit(): void {
        this.myForm = new FormGroup({
            name : new FormControl('', [Validators.required]),
            email : new FormControl('', [Validators.required, Validators.email]),
            type : new FormControl('', [Validators.required])
          });
    }

    ngOnDestroy(){
        this.objsubscibe.unsubscribe();
    }

    onClickSubmit()  {
        console.warn(this.myForm.value);
        this.pageMsg = "";
        this.isError = false;

        if (this.myForm.valid) { 
            let addProductObj = {
                name: this.myForm.controls.name.value,
                email: this.myForm.controls.email.value,
                type: this.myForm.controls.type.value
            };
            this.objsubscibe = this.productsSrv.addProducts(addProductObj).subscribe(
                data=> {
                    console.log(data);
                    this.pageMsg = "product added successfuly";
                    this.myForm.reset();
                },
                err=> {
                    console.error(err);
                    this.isError = true;
                    this.pageMsg = "add product fail - try later";
                }
            );
        }
      }

}