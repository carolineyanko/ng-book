import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results: Object;
  query: string;

  constructor(
    public spotifyService: SpotifyService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.query = '';
    this.route
      .queryParams
      .subscribe(params => { this.query = params['query'] || ''; });
  }

  ngOnInit() {
    this.search();
  }

  submit(query: string): void {
    this.router.navigate(['search'], {queryParams: {query: query}})
      .then(_ => this.search());
    this.search();
  }

  search(): void {
    console.log('this.query', this.query);
    if (!this.query) {
      return;
    }

    this.spotifyService
      .searchTrack(this.query)
      .subscribe((res: any) => this.renderResults(res));
  }

  renderResults(res: any): void {
    this.results = res;
  }

}
