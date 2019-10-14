const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
let driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

const VERSION = "1.0.0"
const FILEPATH = "TARGET ZIP FILE.";
const STEAM_USER = "STEAM ACCOUNT NAME";
const STEAM_PASS = "STEAM ACCOUNT PASSWORD";
const ADDON_ID = "1234"
const ADDON_BUILD_MESSAGE = "Auto build lol."
async function login(){
    
    var steamLogin = "gmodstore-navbar-login";

    await driver.get("https://www.gmodstore.com/sessions/login");
    await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[@id=\"steamAccountName\"]")));

    //STEAM
    await driver.findElement( webdriver.By.xpath("//*[@id=\"steamAccountName\"]")).sendKeys(STEAM_USER);
    await driver.findElement( webdriver.By.xpath("//*[@id=\"steamPassword\"]")).sendKeys(STEAM_PASS);
    
    
    await driver.findElement( webdriver.By.xpath("//*[@id=\"imageLogin\"]")).click()

    // have we been redirected yet?
    await driver.wait( webdriver.until.titleContains("gmodstore"));
    //Upload version.
    await driver.get(`https://www.gmodstore.com/dashboard/addons/${ADDON_ID}/versions/create`);
    await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("/html/body/div[4]/div/button")));
    await driver.findElement(webdriver.By.xpath("/html/body/div[4]/div/button")).click();
    await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[@id=\"form\"]/div/div[2]/div[1]/input")));
    await driver.findElement( webdriver.By.xpath("//*[@id=\"form\"]/div/div[2]/div[1]/input")).sendKeys(VERSION);
    //await driver.executeScript(`document.getElementsByName('changelog')[0].value='${ADDON_BUILD_MESSAGE}';`); //Let us allow us to make shit work.
    await driver.findElement( webdriver.By.xpath("/html/body/div[3]/div/div[2]/form/div/div[2]/div[3]/div/div[2]/div[1]")).sendKeys(`${ADDON_BUILD_MESSAGE}`);
    
    await driver.findElement( webdriver.By.xpath("//*[@id=\"file\"]")).sendKeys(FILEPATH);
    await driver.findElement( webdriver.By.xpath("//*[@id=\"form\"]/div/div[3]/button")).click();
    
}

login();
