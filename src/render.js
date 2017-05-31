import mainTemplate from './src/templates/main.html!text'
import mustache from 'mustache'
import rp from 'request-promise'
import rawconfig from './config.json!text'

var config = JSON.parse(rawconfig);



function regionalise(seats) {
    var regions = [
        {name: "East", "seats" : []},
        {name: "East Midlands", "seats" : []},
 {name: "London", "seats" : []},
        {name: "North-east", "seats" : []},
        {name: "North-west", "seats" : []},
      {name: "Scotland", "seats" : []},
        {name: "South-east", "seats" : []},
        {name: "South-west", "seats" : []},
   {name: "Wales", "seats" : []},
        {name: "West Midlands", "seats" : []},
        {name: "Yorkshire and the Humber", "seats" : []}
    ];
    seats.forEach(function (s) {
        regions.forEach(function (r) {
            if (r.name == s.location) {
                    r.seats.push(s);
            }            
        })
    })
    return regions;

}


export async function render() {
    var rawdata = await rp(config.docDataJson);
    var data = JSON.parse(rawdata);
    var seats = data.sheets.Sheet1;
    seats.map(function(s){s.class = s.oppoparty.replace(" ","")})
    var regions = regionalise(seats);
    console.log(regions);
    var html = mustache.render(mainTemplate,regions);
   return html;
}
