import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlbumsComponent} from './albums/albums.component';
import {TagsComponent} from './tags/tags.component';
import {FavoriteComponent} from './favorite/favorite.component';

const mainRoutes: Routes = [
  {
    path: 'album/:name', component: AlbumsComponent
  },
  {
    path: 'favorite', component: FavoriteComponent
  },
  {
    path: '', component: TagsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(mainRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
