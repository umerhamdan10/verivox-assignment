

# Puppeteer - Cucumber using Typescript


> A small project which tests the "DSL calculator", "Tariff result" and "Offer details" pages using puppeteer with cucumber-js, written in TypeScript



## Getting started
- To install Puppeteer : npm install puppeteer --save-dev
- To install Cucumber : npm install cucumber --save-dev
- To install Junit Reporter : npm install cucumberjs-junitxml --save-dev
- To install Chai : npm install chai --save-dev
- To install cucumber-html-reporter : npm install cucumber-html-reporter --save-dev


## Excution


To run all scenarios

```
npm run test
```

To run focus scenarios

```
npm run only
```

To generate report 

```
npm run generate:report
```

## Output
- This produces an automated test results in HTML page. 
- The page will show number of passed and failed tests.