import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class FlimServiceService {
  private apiUrl ='http://starlord.hackerearth.com/gamesext';
  
  constructor(private http:Http) { 
    console.log('From Flim Service..')
  }
  
  getGamesData(){
    return this.http.get(this.apiUrl).map((res :Response) => res.json());
  }
  getFlimtitleCount(){
    return this.http.get('http://starlord.hackerearth.com/gamesext').map((res:Response)=>res.json());
  }
  loadEachTitle(url){
    return this.http.get(url).map((res:Response)=>res.json());
  }
}

