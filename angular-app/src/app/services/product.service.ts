import {Injectable} from '@angular/core';
import {IProduct} from '../products/IProduct';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators'

@Injectable() //define class as a service, inject into components/enother service...

export class ProductService {
    _productURL:string = 'http://localhost:3000/';
    constructor(private http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this._productURL + "getProducts").pipe(
            catchError(
                (error:any)=>
                {
                    console.log(error);
                    return throwError("error!!!")
                }
            )
        );
    }

    addProducts(productToAdd: any): Observable<IProduct> {
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(productToAdd);
        console.log(body);
        return this.http.post<any>(this._productURL + "addProduct", body, {'headers':headers}).pipe(
            catchError(
                (error:any)=>
                {
                    console.log(error);
                    return throwError("error!!!")
                }
            )
        );
    }

    editProducts(productToEdit: IProduct): Observable<IProduct> {
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(productToEdit);
        console.log(body);
        return this.http.put<any>(this._productURL + "editProduct", body, {'headers':headers}).pipe(
            catchError(
                (error:any)=>
                {
                    console.log(error);
                    return throwError("error!!!")
                }
            )
        );
    }

    deleteProducts(id: string): Observable<any> {
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify({id: id});
        return this.http.post<any>(this._productURL + "deleteProduct", body, {'headers':headers}).pipe(
            catchError(
                (error:any)=>
                {
                    console.log(error);
                    return throwError("error!!!")
                }
            )
        );
    }

}