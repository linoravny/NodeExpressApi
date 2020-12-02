import {Injectable} from '@angular/core';
import {IProduct} from '../products/IProduct';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators'

@Injectable()//while service call service

export class ProductService {
    _productURL:string = 'http://localhost:3000/getProducts';
    constructor(private http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this._productURL).pipe(
            catchError(
                (error:any)=>
                {
                    console.log(error);
                    return throwError("error!!!")
                }
            )
        );
    }

    // getProductById(id:number): Observable<IProduct> {
    //     return this.getProducts1().pipe(
    //         map(result =>
    //           result.find(result => result.productId === id)
    //         )
    //       );
    // }
}