import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  public apiKey = '22e5dcb7293a23da484afeacce80c247';

  constructor( private http: HttpClient) { }

  public getTags(): any {
    const params = {
      page: '1',
      limit: '6',
      api_key: this.apiKey,
    };
    return this.http.get(`http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&format=json`, { params });
  }

  getAlbums(tag): any {
    const params = {
      tag,
      page: '1',
      limit: '15',
      api_key: this.apiKey,
    };
    return this.http.get(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&format=json`, {params});
  }
}
