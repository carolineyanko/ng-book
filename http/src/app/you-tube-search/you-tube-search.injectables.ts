import {
  YouTubeSearchService,
  YT_API_URL,
  YT_API_KEY
} from './you-tube-search.service';

export const youTubeSearchInjectables: Array<any> = [
  {provide: YouTubeSearchService, useClass: YouTubeSearchService},
  {provide: YT_API_URL, useValue: YT_API_URL},
  {provide: YT_API_KEY, useValue: YT_API_KEY}
];
