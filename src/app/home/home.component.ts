import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  trendingMovies: any;
  constructor(private http: HttpClient){}

  ngOnInit(){
    this.getTrendingMovies();
  }

  getTrendingMovies(){
    this.http.get('http://localhost:4200/assets/data/trending-movies.json').subscribe((movies) => {
      console.log(movies)
      this.trendingMovies = movies;
    })
  }
}
