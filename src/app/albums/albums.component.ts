import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TagsService} from '../services/tags.service';
import {Album} from './album';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  name: string;
  albums: Album[];
  albumsToDisplay: Album[];
  tagName = new FormControl('');
  favorites: Album[] = [];

  constructor(private route: ActivatedRoute,
              private tagService: TagsService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.favorites = this.getFavorites();
    this.name = this.route.snapshot.paramMap.get('name');

    this.tagService.getAlbums(this.name).subscribe((res) => {
      this.albums = res.albums.album;
      this.setUpLikesFromStorage();
      this.albumsToDisplay = [...this.albums];
    });

    this.tagName.valueChanges.pipe(
      debounceTime(500)
    ).subscribe((value) => {
        if (!value) {
          this.albumsToDisplay = [...this.albums];
        }
        this.albumsToDisplay = this.albums.filter((album) => {
          return album.name.toLowerCase().includes(value.toLowerCase());
        });
      }
    );
  }

  setUpLikesFromStorage(): any {
    this.albums = this.albums.map((item) => {
      return {
        ...item,
        liked: this.favorites.some(fav => fav.mbid === item.mbid),
      };
    });
  }

  addToFavorite(album: Album): any {
    const index = this.favorites.findIndex((item) => item.mbid === album.mbid);
    if (index === -1) {
      this.favorites.push(album);
      console.log(album);
    } else {
      this.favorites.splice(index, 1);
    }
    this.saveFavorites();
  }

  saveFavorites(): void {
    window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  getFavorites(): any {
    return JSON.parse(window.localStorage.getItem('favorites'));
  }

  toggleImg(album): void {
    const action = 'Liked it';
    album.liked = !album.liked;

    if (album.liked) {
      this.snackBar.open(album.name, action, {
        duration: 3000,
      });
    }
  }

}
