import { Component, OnInit } from '@angular/core';
import {Album} from '../albums/album';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favoriteTags: Album[];
  constructor() { }

  ngOnInit(): void {
    this.favoriteTags = JSON.parse(window.localStorage.getItem('favorites') || '[]' );
  }

}
