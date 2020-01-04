# News ticker 
A news ticker roller for angular (2+) apps
Simple to use and modify

## Requirements
Any angular app

## How to use
Just run
```
ng g c news-ticker
```
and than replace the original component dir with this repo

## Params
* Array of news objects as follow: ([newsData])
* *header* - header
* *content* - content
* *ref* - link (If there is any)

* Height & width of roller - px/vh/vw size units ( [rollerHeight] & [rollerWidth] ) 
* Bordered - yes or no for now ( [bordered] )
* Speed in miliseconds ([speed])
* Top-down (default) | Bottom-up ( [topOrbottom] )
