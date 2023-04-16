import {ElementHandle, Page} from 'puppeteer';
import {BrowserDelegate} from '../delegates/BrowserDelegate';
import {expect} from 'chai';

export class GeneralPage {
    private defaultTimeout = 5000;
    private page: Page;
    constructor(private delegate: BrowserDelegate) {
    }

    async clickSelector(selector: string, position= 1, clickCount= 1): Promise<void> {
        await this.delegate.page.waitForSelector(selector, { timeout: this.defaultTimeout });
        const elements = await this.delegate.page.$$(selector);

        await elements[position - 1].click({ clickCount });
    }

    async hover(selector: string): Promise<void> {
        await this.delegate.page.hover(selector);
    }

    async clickMySelector(selector: string): Promise<void> {

        await this.delegate.page.waitForSelector(selector, { timeout: this.defaultTimeout });
        const elements = await this.delegate.page.$$(selector);
        await elements[0].click();
    }

    async scrollTo(x: number, y: number){
        await this.delegate.page.evaluate(`window.scroll(${x},${y})`);
    }

    async scrollToElement(selector: string): Promise<void> {
        await this.delegate.page.evaluate((selector) => {
            const element = document.querySelector(selector);
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, selector);
    }

    async waitForMilliseconds(timeMiliSecond: number){
        await this.delegate.page.waitForTimeout(timeMiliSecond);
    }

    async waitForNavigation(){
        await this.delegate.page.waitForNavigation();
    }

    async navigateBack(){
        await this.delegate.page.goBack({timeout: this.defaultTimeout});
    }

    async reload() {
        await this.delegate.page.reload({timeout: this.defaultTimeout});
    }

    async waitForElement(selector: string) {
        await this.delegate.page.waitForSelector(selector,{visible: true, timeout: 30000});
    }

    async setCookie(name: string, value: string) {
        await this.delegate.page.setCookie({name, value});
        await this.delegate.page.reload();
    }

    async checkCookieValue(name: string, value: string) {
        const cookies = await this.delegate.page.cookies();
        const cookie = cookies.find((c) => c.name === name);
        expect(cookie, `Cookie with name ${name} not found`).not.to.be.undefined;
        expect(cookie?.value).to.equal(value);
    }

    async containsText(selector: string, text: string) {
        await this.delegate.page.waitForSelector(selector, {timeout: this.defaultTimeout});
        const element = await this.delegate.page.$(selector);
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const innerText = await element?.evaluate((node) => (<HTMLElement>node).innerText);

        expect(element, `Element with selector ${selector} not found`).not.to.be.undefined;
        expect(innerText).to.includes(text);
    }

    async enterText(
        selector: string,
        text: string,
        options = {withEnterPressed: false, withPosition: 1},
    ) {
        await this.delegate.page.waitForSelector(selector, {timeout: this.defaultTimeout});
        const elements = await this.delegate.page.$$(selector);

        const input = elements[options.withPosition - 1];

        if (input) {
            await input.focus();
            await input.click({clickCount: 3});
            await input.press('Backspace');
            await input.type(text, {delay: 100});
        }

        if (options.withEnterPressed) {
            await this.page.keyboard.press('Enter');
        }
    }


    async checkIfInViewport(selector: string, options = {visible: true, butExist: true}) {
        let element: ElementHandle<Element> | null;

        try {
            await this.delegate.page.waitForSelector(selector, {
                timeout: this.defaultTimeout,
                visible: options.visible,
                hidden: options.visible ? false : options.butExist,
            });

            element = await this.delegate.page.$(selector);
        } catch (e) {
            element = null;
        }

        if (!options.visible && !options.butExist) {
            if (element) {
                expect(await element?.isIntersectingViewport()).to.be.false;
            } else {
                expect(
                    element,
                    `Expected element with selector  ${selector} to not be in viewport or exits`,
                ).to.be.null;
            }
        }

        if (!options.visible && options.butExist) {
            expect(element, `Expected element with selector ${selector} to exist.`).to.not.be.null;
        }

        if (options.visible) {
            expect(element, `Expected element with selector  ${selector} to be visible`).to.not.be.null;
            expect(await element?.isIntersectingViewport()).to.be.true;
        }
    }

    async checkOccuranceInViewport(selector: string, options = {moreThan: false, count1: 1, to: false, count2: 1}) {
        let elements: ElementHandle<Element>[] | null;
        let elementCount = 0;
        try {
            await this.delegate.page.waitForSelector(selector, {
                timeout: this.defaultTimeout,
                visible: true,
            });

            elements = await this.delegate.page.$$(selector);
            elementCount = elements.length;
        } catch (error) {
            elements = null;
        }
        // const myelementCount = await this.delegate.page.$$eval('.product-list product', element=>element.length);
        if (options.moreThan && options.to && options.count2) {
            expect(elementCount).to.be.least(options.count1, `The count of elements is ${elementCount}`);
            expect(elementCount).to.be.most(options.count2, `The count of elements is ${elementCount}`);
        } else if (options.moreThan) {
            expect(elementCount).to.be.greaterThan(options.count1, `The count of elements is ${elementCount}`);
        } else {
            expect(elementCount).to.be.equal(options.count1, `The count of elements is ${elementCount}`);
        }
    }

    async hasText(selector: string, text: string) {
        await this.delegate.page.waitForSelector(selector, {timeout: this.defaultTimeout});
        const element = await this.delegate.page.$(selector);
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const innerText = await element?.evaluate((node) => (<HTMLElement>node).innerText);

        expect(element, `Element with selector ${selector} not found`).not.to.be.undefined;
        expect(innerText).to.be.equal(text);
    }

    async loadTariff(selector: string) {
        let visible = true;
        try {
            await this.delegate.page.waitForSelector(selector, {timeout: 1000});
        } catch (e) {
            visible = false;
        }
        return visible;
    }

    async getInnerText(selector: string){
        await this.delegate.page.waitForSelector(selector, {timeout: this.defaultTimeout});
        const element = await this.delegate.page.$(selector);
        const innerText = await element?.evaluate((node) => (<HTMLElement>node).innerText);
        return innerText.split(' ')[0];
    }
}