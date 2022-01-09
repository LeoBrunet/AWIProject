import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from "./components/add-recipe/add-recipe.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeRecipeComponent} from "./components/home-recipe/home-recipe.component";
import {HomeIngredientComponent} from "./components/home-ingredient/home-ingredient.component";
import {RecipeComponent} from "./components/recipe/recipe.component";
import {SalesComponent} from "./components/sales/sales.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'add-recipe', component: AddRecipeComponent},
  { path: 'home-recipe', component: HomeRecipeComponent},
  { path: 'home-ingredient', component: HomeIngredientComponent},
  { path: 'recipe/:id', component: RecipeComponent},
  { path: 'sales', component: SalesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
