import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from "./components/add-recipe.component";

const routes: Routes = [
  { path: '', redirectTo: 'add-recipe', pathMatch: 'full' },
  { path: 'add-recipe', component: AddRecipeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
