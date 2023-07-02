const puppeteer = require('puppeteer');
const { writeFile } = require('fs');

exports.genereatePdf = async (req, res)  => {
  const {TRANS_ID} = req.query;
  // const browser = await puppeteer.launch({args: [ '--no-sandbox', '--disable-setuid-sandbox',], headless: false});
  const browser = await puppeteer.launch({headless: true});
  // const browser = await puppeteer.launch({headless: true, defaultViewport: null, args: ['--start-maximized']});
  const page = await browser.newPage();
  // await page.setViewport({width:0, height:0});

  // const page1 = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  // await page1.setDefaultNavigationTimeout(0);

  var url = 'http://localhost:9999/?TRANS_ID=' + TRANS_ID
  console.log("generatePdf - ", url)
  await page.goto(url, {waitUntil: 'networkidle2'});

  
  // const form = await page.$("#caseform")
  // const dom = await page.$eval('#ueditor_0', (element) => {
  //   return element.innerHTML
  // }) // Get DOM HTML
  // await page.setContent(dom)

  const pages = await browser.pages();
  //prints 2 although there are 3 tabs
  console.log(pages.length); 

  const page2 = pages[pages.length - 1]; 

  // var url1 = 'http://localhost:9999/ueditor/'
  // await page1.goto(url1, {waitUntil: 'networkidle2'});
  //  await page.setViewport({width: 1080, height: 1024});

  // await page.goto('http://localhost:9999/ueditor/');

  // const pdf = await page.pdf({
  //     printBackground: true,
  //     format: 'A4'
  // })

  const pdf = await page2.pdf();

  // await browser.close()
  // writeFile("./report.pdf", pdf, {}, (err) => {
  //     if(err){
  //         return console.error('error')
  //     }

  //     console.log('success!')
  // })

  // var arrByte= new Uint8Array.from(Buffer.from(pdf))
  // var binaryData= new Blob([arrByte])
  console.log('AAAAAAAAAAAAAAAAAAAA------------------')

  // await page.goto('http://localhost:10000/');
  // const pdf = await page.pdf();

  // res.contentType("application/pdf");
  // res.send(pdf);
  res.contentType("application/json");
  res.send({
    code: 200,
    result: pdf
  });
};


exports.getDoctorNames = (req, res)  => {
    // res.send({
    //   code: 200,
    //   data: ['黃一', '李二', '陳文']
    // });

    res.send([{VALUE:'1',TEXT:'一',SELECTED:false}, {VALUE:'2',TEXT:'二',SELECTED:false}, {VALUE:'3',TEXT:'san',SELECTED:true}])
};

exports.getBasicInfos = (req, res)  => {
  console.log("CHART_NO", req.query.CHART_NO)
  res.send({
    code: 200,
    data: {"CHART_NO": "1050888","NAME": "李曉明" ,"SEX": 1 ,"BIRTH_DATE": '1990-01-01' ,"DEPT_NAME": "直腸外科","CRIS-CHECK": "大腸鏡檢查"}
  });
};
