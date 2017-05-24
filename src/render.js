import mainTemplate from './src/templates/main.html!text'
import mustache from 'mustache'
import rp from 'request-promise'
import rawconfig from './config.json!text'

var config = JSON.parse(rawconfig);

export async function render() {
    var rawdata = await rp(config.docDataJson);
    var data = JSON.parse(rawdata);
    var tabledata = data.sheets.tableDataSheet;
    var html = mustache.render(mainTemplate,tabledata)
    console.log(html);
    return html;
}
