import {Browser, launch, Page} from 'puppeteer';
import {CustomWorld} from '../CustomWorld';
import { urlJoin } from 'url-join-ts';

export class BrowserDelegate {
    browser: Browser;
    page: Page;

    baseURL = 'https://www.verivox.de/';

    constructor(private world: CustomWorld) {
    }

    async init(): Promise<void> {
        this.browser = await launch({
            headless: false,
            defaultViewport: null,
            args:['--start-maximized' ]
        });
        this.page = (await this.browser.pages())[0];
    }

    async destroy(): Promise<void> {
        await this.browser.close();
    }

    async navigate(): Promise<void> {
        await this.page.goto(this.baseURL);
    }

    async openURL(url: string): Promise<void> {
        const u = urlJoin(this.baseURL, url);
        // console.log(u);
        await this.page.goto(u);
    }
}
