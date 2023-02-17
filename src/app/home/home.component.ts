import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  trendingMovies: any = [];
  finalRes: any = [];
  theatreMovies: any;
  popularMovies: any;
  topRatedMovies: any = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getTrendingMovies();
    this.getTheatreMovies();
    this.getPopularMovies();
  }

  getTrendingMovies() {
    this.http
      .get<any>('https://imdb8.p.rapidapi.com/title/get-top-rated-tv-shows', {
        headers: {
          'X-RapidAPI-Key':
            '65b0586d8dmshcc922544407327cp10bacejsn29161eb712d1',
          'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
        },
      })
      .subscribe((movies) => {
        for (let movie of movies) {
          this.topRatedMovies.push(movie);
        }
        this.topRatedMovies = this.topRatedMovies.slice(0, 4);
        this.getMovieTitle();
      });
  }

  getMovieTitle() {
    const titles = this.topRatedMovies.map(
      (movie: { id: String; chartRating: number }) => movie.id
    );
   
    const filteredId = titles.map((title: string) => {
      return title.split('/')[2];
    });
  
    for (let title of filteredId) {
      this.http
        .get<any>(`https://imdb8.p.rapidapi.com/title/find?q=${title}`, {
          headers: {
            'X-RapidAPI-Key':
              '65b0586d8dmshcc922544407327cp10bacejsn29161eb712d1',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
          },
        })
        .subscribe((movie) => {
          this.trendingMovies.push({image: movie.results[0].image.url, title: movie.results[0].title});
        });
    }
    console.log('me',this.trendingMovies)
  }

  getTheatreMovies() {
    this.http
      .get('http://localhost:4200/assets/data/theatre-movies.json')
      .subscribe((movies) => {
        this.theatreMovies = movies;
      });
  }

  getPopularMovies() {
    this.http
      .get('http://localhost:4200/assets/data/popular-movies.json')
      .subscribe((movies) => {
        this.popularMovies = movies;
      });
  }

  goToMovie(type: string, id: string) {
    this.router.navigate(['movie', type, id]);
  }
}
