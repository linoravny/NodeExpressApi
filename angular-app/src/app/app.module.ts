import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ProductFormComponent } from './products/product-form.component';

import { ProductService } from './services/product.service';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'AddProduct', component: ProductFormComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full'}
];

@NgModule({
  declarations: [ //components
    AppComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [ //modules that export classes nedded
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [], //services global
  bootstrap: [AppComponent]
})
export class AppModule { }
