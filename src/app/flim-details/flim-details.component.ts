import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { FlimServiceService } from '../service/flim-service.service'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import * as alasql from 'alasql';


@Component({
  selector: 'app-flim-details',
  templateUrl: './flim-details.component.html',
  styleUrls: ['./flim-details.component.css']
})
export class FlimDetailsComponent implements OnInit {
  private orderOptionList: SelectItem[];
  private platformOptionList: SelectItem[];
  gameDetailsArray:Array<object>=[];
  tempgameDetailsArray:Array<object>=[];
  flimTitleCount:number;
  displayFlimDetails:any;
  loadSaveSpinner:boolean=true;
  gamesSearch:string;
  gamesArray:any;
  currentPage: Number;
  searchResultsPerPage: Number;
  searchText:string;

  constructor(private flimServices:FlimServiceService) {
    this.displayFlimDetails=[];
    this.tempgameDetailsArray=[];
    this.orderOptionList=[];
    this.platformOptionList=[];
    this.gamesArray=[];
    this.currentPage = 1;
    this.searchResultsPerPage = 15;
   }

  ngOnInit() {
    this.loadFlimdata();
  }

  loadFlimdata() {
    this.flimServices.getGamesData().subscribe(data => {
      this.loadSaveSpinner=false;
      this.gameDetailsArray = data;
      this.tempgameDetailsArray=data;
      var queryresult=alasql('select DISTINCT platform from ?',[data]);
      this.orderOptionList.push({ label:'Ascending', value: 'Ascending' },{label:'Descending', value: 'Descending'});
      for(let x of queryresult){
        this.platformOptionList.push({label:x.platform,value:x.platform});
      }
    })
  }

  selectSortType(event){
    if(event.value ==='Ascending'){
      var AscentData=alasql('SELECT * from ? order by score ASC',[this.tempgameDetailsArray]);
      this.gameDetailsArray=AscentData;
    }else if(event.value ==='Descending'){
      var decentData=alasql('SELECT * from ? order by score desc',[this.tempgameDetailsArray]);
      this.gameDetailsArray=decentData;
    }
   }
   selectPlatformType(event){
    let platformArray=[];
    platformArray.push({'platform':event.value});
    var queryresult=alasql('SELECT * from ? as a,? as b WHERE a.platform=b.platform',[this.tempgameDetailsArray,platformArray]);
    this.gameDetailsArray=queryresult;
   }
   searchGameNames(event){
     this.gamesArray=this.tempgameDetailsArray.filter(item =>
      item['title'] && item['title'].toString().toLowerCase().indexOf(event.query.toString().toLowerCase()) != -1);
   }
   selectedGameName(event){
    this.gameDetailsArray=[];
    this.gameDetailsArray.push(event);
   }
   getbackData(event){
    this.gameDetailsArray=[];
    this.searchText='';
    this.gamesSearch='';
    this.orderOptionList=[];
    this.platformOptionList=[];
    this.loadSaveSpinner=true;
     this.loadFlimdata();
   }
}
