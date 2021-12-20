import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {AddRecipeComponent} from "./components/add-recipe/add-recipe.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeRecipeComponent} from "./components/home-recipe/home-recipe.component";
import {BannerRecipeComponent} from "./components/banner-recipe/banner-recipe.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {RecipesComponent} from "./components/recipes/recipes.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    LoginComponent,
    RegisterComponent,
    HomeRecipeComponent,
    BannerRecipeComponent,
    CategoriesComponent,
    RecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
