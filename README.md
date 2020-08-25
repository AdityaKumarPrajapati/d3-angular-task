# Building Reactive Charts in Angular 10 using D3

This project consists of multi line chart using D3.js using Angular 10 application using the D3 JavaScript framework.

Key things: 

- Use data binding concepts
- Pass data from one component to another components
- Dynamic chart like if pass 2 line data it would be draw 2 lines, if you pass 10 lines data it would draw 10 lines

## Commands used 

- npm run start : On running npm start `ng serve` command is executed for a dev server. Then, navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

- npm run build : Compiles an Angular app into an output directory named dist/ at the given output path.

- npm run test : Runs unit tests written in the app.

- npm run lint : Runs linting tools on Angular app code in a given project folder.

## Main Dependencies

- Angular 10.0.6

- D3 5.12.0

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.


## Screenshot of running application 

![Screenshot of running application](/chart.png)

## Random Data Generation 

Currently, data is generated randomly. Here is a demo gif the data is changed on every page refresh 

![Demo Gif](/charts.gif)

if you are interested in changing the value then it can be changed here : `src/app/utils/dummyData.js`

## Additional Improvement Scope

- Writing unit test cases for code coverage 

- Adding data information on hover
