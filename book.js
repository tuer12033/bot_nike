const puppeteer = require('puppeteer');
const pptrFirefox = require('puppeteer-firefox');

function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        //executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        //executablePath: '/Applications/Safari.app/Contents/MacOS/Safari',
        vargs: ['--disable-infobars','--no-sandbox', '--disable-setuid-sandbox']
        
    });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    var found = false;
    var finish = false;
    //ชื่อ รองเท้า
    //var name = 'Nike Free RN Flyknit 3.0xx';
    //Size รองเท้า
    //var size = 'US 8.5';
    
    await page.goto('https://store.nike.com/th/th_th/pd/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-react-elet-55/pid-12544919/pgid-12685529');
    await page.waitForSelector('a.nsg-form--drop-down--label.nsg-grad--light-grey.nsg-form--drop-down.exp-pdp-size-dropdown.exp-pdp-dropdown.two-column-dropdown.selectBox-dropdown',{timeout: 0});
    while(!finish){
        //await page.waitFor(3000);
        const shoes = await page.$x(`//span[contains(text(), 'ไซส์')]`);
        if(shoes.length > 0 && !found){
            await shoes[1].click();
            await page.waitForSelector('li.nsg-form--drop-down--option.last-in-row',{timeout: 0});
            const size = await page.$x(`//li[contains(text(), 'US 8.5')]`);
            await size[0].click();
            await page.waitForSelector('#buyingtools-add-to-cart-button');
            await page.evaluate(() => {
                document.querySelector('#buyingtools-add-to-cart-button').click();
            });
            found = true;
            console.log('click');
            
            
        }

        if(!finish && found){
            await page.waitForSelector('#NotificationBox',{timeout: 0});
            await page.waitForSelector('button.notification-button.nsg-button.nsg-grad--nike-orange',{timeout: 0});
            await page.evaluate(() => {
                document.querySelector('button.notification-button.nsg-button.nsg-grad--nike-orange').click();
            });
            found = false;
            console.log('error');
        }
    }
    
})();
//node Nike.js
