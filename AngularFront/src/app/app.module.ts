import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AddRecipeComponent} from "./components/add-recipe/add-recipe.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeRecipeComponent} from "./components/home-recipe/home-recipe.component";
import {BannerRecipeComponent} from "./components/banner-recipe/banner-recipe.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {RecipesComponent} from "./components/recipes/recipes.component";
import {CommonModule} from "@angular/common";
import {HomeIngredientComponent} from "./components/home-ingredient/home-ingredient.component";
import {IngredientsComponent} from "./components/ingredients/ingredients.component";
import {NgSelectModule} from '@ng-select/ng-select';
import {UserService} from "../services/UserService";
import {RecipeService} from "../services/RecipeService";
import {IngredientService} from "../services/IngredientService";
import {IngredientCategoryService} from "../services/IngredientCategoryService";
import {RecipeComponent} from "./components/recipe/recipe.component";
import {LeftMenuComponent} from "./components/left-menu/left-menu.component";
import {SelectRecipeComponent} from "./components/select-recipe/select-recipe.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    NgSelectModule
  ],
  declarations: [
    AppComponent,
    AddRecipeComponent,
    LoginComponent,
    RegisterComponent,
    HomeRecipeComponent,
    BannerRecipeComponent,
    CategoriesComponent,
    RecipesComponent,
    HomeIngredientComponent,
    IngredientsComponent,
    RecipeComponent,
    LeftMenuComponent,
  ],
  providers: [
    UserService,
    RecipeService,
    IngredientService,
    IngredientCategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
