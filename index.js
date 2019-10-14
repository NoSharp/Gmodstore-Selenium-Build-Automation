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
const ADDON_NAME = "ADDON";

async function login(){
    
    var steamLogin = "gmodstore-navbar-login";

    await driver.get("https://www.gmodstore.com/sessions/login");
    await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[@id=\"steamAccountName\"]")));

    //STEAM
    await driver.findElement( webdriver.By.xpath("//*[@id=\"steamAccountName\"]")).sendKeys(STEAM_USER);
    await driver.findElement( webdriver.By.xpath("//*[@id=\"steamPassword\"]")).sendKeys(STEAM_PASS);
    await driver.findElement( webdriver.By.xpath("//*[@id=\"imageLogin\"]")).click()

    await driver.wait( webdriver.until.titleContains("gmodstore"));
    await driver.get("https://www.gmodstore.com/dashboard/addons/6689/versions/create");
    await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("/html/body/div[4]/div/button")));
    await driver.findElement(webdriver.By.xpath("/html/body/div[4]/div/button")).click();
    await driver.findElement(webdriver.By.xpath("//*[@id=\"release_type\"]/option[4]")).click();
    
    await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//*[@id=\"form\"]/div/div[2]/div[1]/input")));
    await driver.findElement( webdriver.By.xpath("//*[@id=\"form\"]/div/div[2]/div[1]/input")).sendKeys(VERSION);
    await driver.findElement( webdriver.By.xpath("/html/body/div[3]/div/div[2]/form/div/div[2]/div[3]/div/div[2]/div[1]")).sendKeys("PIMP ANTICHEAT AUTO BUILD FOR YOUR SECURITY.");
    await driver.findElement( webdriver.By.xpath("//*[@id=\"file\"]")).sendKeys(FILEPATH);
    await driver.findElement( webdriver.By.xpath("//*[@id=\"form\"]/div/div[3]/button")).click();

    await driver.wait(webdriver.until.titleContains(ADDON_NAME +  "Versions"));
    var element = "/html/body/div[3]/div/div[2]/div[2]/div[2]/table/tbody/tr[1]/td[4]/a";
    await driver.wait(webdriver.until.elementLocated(webdriver.By.xpath(element)));
    await driver.findElement( webdriver.By.xpath(element)).click();

    await driver.wait(webdriver.until.titleContains("Edit Version"));
    await driver.findElement( webdriver.By.xpath("/html/body/div[3]/div/div[2]/form/div/div[2]/div[2]/select/option[1]")).click();
    await driver.findElement( webdriver.By.xpath("/html/body/div[3]/div/div[2]/form/div/div[3]/button")).click();
    //},5000);
    console.log("Gothere!");
    
}

login();
