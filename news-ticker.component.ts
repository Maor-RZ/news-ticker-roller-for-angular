import { Component, OnInit, Input } from '@angular/core';
import { strictEqual as assert } from 'assert';
import { ViewportScroller } from '@angular/common';

function trimString(str: string, charsLimit: number = 40, linesLimit: number = 2){  
  
  let ellipsis = str.length > charsLimit ? "..." : ""; 
  
  let FirstLines = "";  
  let NewLineBreak = str.indexOf("\n"); 
  FirstLines =  str.slice(0,NewLineBreak+1);  
  let restOfText = str.slice(NewLineBreak+1, str.length);
  
  for(let i=1; i< linesLimit-1 && restOfText.length >0 ; i++){    
    NewLineBreak = restOfText.indexOf("\n");
    FirstLines +=  restOfText.slice(0,NewLineBreak +1);
    restOfText = restOfText.slice(NewLineBreak+1 , str.length); 
  }

  if(restOfText){
    restOfText.replace('/\n/', " ");
  }

  return (FirstLines + restOfText).substring(0,charsLimit) + ellipsis
  
}

function calculatedSizeInPx(size: string = "") {

  if (!size) {
    throw "no height and width!"
  }

  assert(/^([0-9]+)(px|vh|vw)$/g.test(size), true, "Size isn't valid");

  let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  
  if (size.indexOf("px") > 0) {
    return parseInt(size.replace("px", ""));
  } else if (size.indexOf("vh") > 0) {
    let precents = parseInt(size.replace("vh", "")) / 100;
    return (h * precents);
  } else if (size.indexOf("vw") > 0) {
    let precents = parseInt(size.replace("vw", "")) / 100;
    return (w * precents);
  }
}

function newsElementFactory(header: string , content: string, ref: string, yPos: number) {
  
  return {
    header: header,
    content: content,
    contentToDisplay: trimString(content),
    ref: ref,
    yPos: yPos
  }
} 

@Component({
  selector: 'news-ticker',
  templateUrl: './news-ticker.component.html',
  styleUrls: ['./news-ticker.component.css']
})

export class NewsTickerComponent implements OnInit {

  @Input() newsData: any[]; 
  @Input() linesLimit:number;
  @Input() bordered: boolean;
  @Input() speed: number = 30;
  @Input() rollerHeight: string;
  @Input() rollerWidth: string;
  @Input() topOrbottom: boolean = true;
  calculatedH: number;
  calculatedW: number;

  news: any[];

  roll: boolean = true;

  constructor() { }

  ngOnInit() {
    this.prepareFeed();    
    this.rollFeed();
    this.calculatedH = calculatedSizeInPx(this.rollerHeight);
    this.calculatedW = calculatedSizeInPx(this.rollerWidth);
  }
  
  prepareFeed(){
    let i = 0;
    this.news = this.newsData.map((newsElement) => {
      let newElmnt = newsElementFactory(newsElement.header, newsElement.content, newsElement.ref, i);
      i += 100;
      return newElmnt;
    })
  }
 
  ngOnChanges(){

  }
  ngAfterViewInit() {
    let height = document.getElementById("roller").offsetHeight;
    console.log(height);
}

style(){
  return {height: this.calculatedH +'px',
    width: this.calculatedW + 'px'}
}


  on(){
    this.roll = true;
    this.rollFeed();

  }
  off(){
    this.roll = false;

  }  

  rollFeed(){  
    setTimeout(()=>{
      console.log("called");
      this.news.forEach(element => {
        if (this.topOrbottom) {
          element['yPos'] > this.calculatedH + 50 ? element['yPos'] = -50 : element['yPos'] += 1 ;
        }
        else {
          element['yPos'] < -50 ? element['yPos'] = this.calculatedH + 50 : element['yPos'] -= 1;
        }
      });
      if(this.roll){this.rollFeed()};
    },this.speed)
  }

}
