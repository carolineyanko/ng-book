import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpotifyAPIKey } from './spotifyApiKey';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  static API_URL = 'http://localhost:3000';
  static BASE_URL = 'https://api.spotify.com/v1/search?';

  constructor(public http: HttpClient) {}

  query(URL: string, params?: string[]): Observable<any> {
    let queryUrl = `${SpotifyService.API_URL}${URL}`;
    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;
    }

    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${SpotifyAPIKey}`
      })
    };

    return this.http
      .get(queryUrl, options)
      .pipe(tap((res) => console.log(`${URL}`, res)));
  }

  search(query: string, type: string): Observable<any[]> {
    return this.query(`/search`, [
      `q=${query}`,
      `type=${type}`
    ]);
  }

  searchTrack(query: string): Observable<any[]> {
    return this.search(query, 'track');
  }

  getTrack(id: string): Observable<any[]> {
    return this.query(`/tracks/${id}`);
  }

  getArtist(id: string): Observable<any[]> {
    return this.query(`/artists/${id}`);
  }

  getAlbum(id: string): Observable<any[]> {
    return this.query(`/albums/${id}`);
  }
}
