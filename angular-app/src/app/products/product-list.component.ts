import {Component, OnInit, DoCheck, OnDestroy} from '@angular/core';
import { IProduct } from './IProduct';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
    selector:'pm-products',
    templateUrl:"./product-list.component.html",
    providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy
{
    constructor(private productsSrv: ProductService){}


    ngOnInit(): void {
        this.getAllProduct();
    }

    ngOnDestroy(){
        this.objsubscibe.unsubscribe();
        this.objsubscibeEdit.unsubscribe();
    }

    getAllProduct() {
        this.pageError = "";
        this.objsubscibe = this.productsSrv.getProducts().subscribe(
            data => {
                data.map((item, index) => {
                    this.editBtnText[index] = "Edit";
                });
                this.products = data;
            },
            err=>console.log(err)
        );
    }

    editBtnClick(item:any, index: number){
        this.pageError = "";
        if(this.enableEditIndex === -1) {
            this.editBtnText[index] = "Done";
            this.enableEditIndex = index;
        } else { // done click
            this.editBtnText[index] = "Edit";
            this.enableEditIndex = -1;

            let editObj = {
                id: item._id,
                name: item.name,
                email: item.email,
                type: item.type
            };
            //server call...
            this.objsubscibeEdit = this.productsSrv.editProducts(editObj).subscribe(
                data => {
                    console.log(data);
                    if(data) {
                        this.getAllProduct();
                    } else {
                        // handel error!
                        this.pageError = "Cannot edit row, try later!";
                    }
                },
                err=>console.log(err)
            );
        }
    }

    deleteBtnClick(item:any) {
        this.pageError = "";
        let id = item._id;
        this.objsubscibeEdit = this.productsSrv.deleteProducts(id).subscribe(
            data => {
                console.log(data);
                if(data) {
                    this.getAllProduct();
                } else {
                    // handel error!
                    this.pageError = "Cannot delete row, try later!";
                }
            },
            err=>console.log(err)
        );
    }

    pageTite:string = "Product List";
    pageError: string = "";
    products: IProduct[] = [];
    selectedTypeValues: string[] = ["Services","Goods","Experiences"];
    objsubscibe: Subscription = new Subscription();
    objsubscibeEdit: Subscription = new Subscription();
    enableEditIndex: number = -1;
    editBtnText: string[] = [];

}