import mainTemplate from './src/templates/main.html!text'
import mustache from 'mustache'
import rp from 'request-promise'
import rawconfig from './config.json!text'

var config = JSON.parse(rawconfig);

export async function render() {
    var rawdata = await rp(config.docDataJson);
    var data = JSON.parse(rawdata);
    var seats = data.sheets.Sheet1;
    seats.map(function(s){s.class = s.oppoparty.replace(" ","")})
    var html = mustache.render(mainTemplate,seats);
   return html;
}
