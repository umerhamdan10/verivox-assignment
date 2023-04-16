import {Given, Then, When} from '@cucumber/cucumber';
import {GeneralPage} from '../pages/GeneralPage';
import {parseInt} from 'lodash';
import {GlobalVariable} from '../GlobalVariable';

let mypage: GeneralPage;

//**************** Browser *************

Given(/^I open the url '(.*)'$/,
    async function (url: string){
        await this.browser.openURL(url);
    });

Given(/^I navigate to the base url$/,
    async function (){
        await this.browser.navigate();
        mypage = new GeneralPage(this.browser);
    });

When(/^I set the cookie '(.*)' with value '(.*)'$/,
    async function (cookieName: string, cookieValue: string) {
        await mypage.setCookie(cookieName, cookieValue);
    });

When(/^I wait for '(\d+)' Milliseconds$/,
    async function (waitTime) {
        await mypage.waitForMilliseconds(waitTime);
    });

When(/^I wait for the page navigation to finish$/,
    async function () {
        await mypage.waitForNavigation();
    });

When(/^I navigate back in browser$/,
    async function () {
        await mypage.navigateBack();
    });

When (/^I reload the page $/,
    async function () {
        await mypage.reload();
    });

When(/^I wait until '(.*)' element is visible$/,
    async function (elementSelector: string) {
        await mypage.waitForElement(elementSelector);
    });


//***************************** Interaction *********************************

Given(/^I click on the '(.*)' element( by index (\d+))?$/,
    async function (elementSelector: string, position: string | null) {
        const parsedPosition = position ? parseInt(position, 10) : undefined;
        await mypage.clickSelector(elementSelector, parsedPosition);
    });

Given(/^I double click on the '(.*)' element( by index (\d+))?$/,
    async function (elementSelector: string, position: string | null) {
        const parsedPosition = position ? parseInt(position, 10) : undefined;
        await mypage.clickSelector(elementSelector, parsedPosition,2);
    });

When(/^I hover on the '(.*)' element$/,
    async function (elementSelector: string) {
        await mypage.hover(elementSelector);
    });

When(/^I scroll to x: '(\d+)' and y: '(\d+)'$/,
    async function (x: string, y: string){
        await mypage.scrollTo(parseInt(x,10), parseInt(y,10));
    });

When(/^I scroll to the '(.*)' element$/,
    async function (elementSelector: string) {
        await mypage.scrollToElement(elementSelector);
    });

When(/^I enter '(.*)' in input field '(.*)' element( by index '(\d+)')? (and press enter)?$/,
    async function (text: string, elementSelector: string, position, enterButton) {
        const parsedPosition = position ? parseInt(position, 10) : undefined;
        await mypage.enterText(elementSelector, text, {
            withEnterPressed: enterButton !== null,
            withPosition: parsedPosition ?? 1,
        });
    });

When(/^I enter '(.*)' in input field '(.*)' element$/,
    async function (text: string, elementSelector: string) {
        await mypage.enterText(elementSelector, text);
    });

//*************************** Validation ***********************************

When(/^The text value of element '(.*)' includes '(.*)'$/,
    async function (elementSelector: string, text: string) {
        await mypage.containsText(elementSelector, text);
    });

When(/^The cookie value of '(.*)' is '(.*)'$/,
    async function (name: string, expected: string) {
        await mypage.checkCookieValue(name, expected);
    },
);

When(/^The '(.*)' element is (not )?visible in viewport( but exists)?$/,
    async function (name: string, not: string, exists: string) {

        await mypage.checkIfInViewport(name, {
            visible: not === null,
            butExist: exists !== null,
        });
    });

Then(/^The '(.*)' element is visible (more than )?'(.*)'( to )?('.*')? times$/,
    async function (selector: string, moreThan: string, count1: string, to: string, count2: string) {

        if(count1 == 'countTariffs'){
            count1 = GlobalVariable.totalTariffs.toString();
        }

        await mypage.checkOccuranceInViewport(selector, {
            moreThan: moreThan !== null,
            count1: parseInt(count1, 10),
            to: to !== null,
            count2: parseInt(count2 && count2.replace('\'', ''), 10),
        });
    });

Then(/^The element '(.*)' has '(.*)' value $/,
    async function (elementSelector: string, text: string) {

        await mypage.hasText(elementSelector, text);
    });

//*************************** Tariff *******************

When(/^I get the totall tariffs '(.*)'$/,
    async function (elementSelector: string) {
        GlobalVariable.totalTariffs = await mypage.getInnerText(elementSelector);
        console.log(GlobalVariable.totalTariffs);
    }
);

When(/^I can continue to load tariffs '(.*)'$/,
    async function (elementSelector: string) {
        let flag = true;
        do {
            flag =  await mypage.loadTariff(elementSelector);
            if (flag == true){
                await mypage.scrollToElement(elementSelector);
                await mypage.clickSelector(elementSelector);
                await mypage.waitForMilliseconds(1000);
            }
        } while (flag);
    });
