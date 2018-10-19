import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResult } from '../search-result/search-result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const YT_API_KEY = 'AIzaSyBemSjEdm5ABeGxeya0gMMnPghpnpZnvqM';
export const YT_API_URL = 'https://www.googleapis.com/youtube/v3/search';

@Injectable()
export class YouTubeSearchService {

  constructor(
    private http: HttpClient,
    @Inject(YT_API_KEY) private apiKey: string,
    @Inject(YT_API_URL) private apiUrl: string) {
  }

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');

    const queryUrl = `${this.apiUrl}?${params}`;

    return this.http.get(queryUrl)
      .pipe(
        map(response => {
          console.log('here');
          return <any>response['items'].map(item => {
            return new SearchResult({
              id: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnailUrl: item.snippet.thumbnails.medium.url
            });
          });
        })
      );
  }
}
