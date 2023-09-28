const { crawlPage} = require('./crawl');
const { printReport } = require('./report.js')

const main = async () => {
    if(process.argv.length < 3) {
        console.log('No website provided');
    }
    if(process.argv.length > 3) {
        console.log('Too many arguments');
    }
    const baseURL = process.argv[2];
    const pages = await crawlPage(baseURL, baseURL, {});

    printReport(pages)
    console.log(pages);
    
}
main();