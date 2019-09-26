import mainTemplate from './src/templates/main.html!text'
import mustache from 'mustache'
import rp from 'request-promise'
import rawconfig from './config.json!text'

var config = JSON.parse(rawconfig);



function regionalise(seats) {
    var regions = [
        {name: "East", govname: "East","seats" : []},
        {name: "East Midlands",govname:"East Midlands", "seats" : []},
 {name: "London", "seats" : []},
        {name: "North-east",govname: "North East", "seats" : []},
        {name: "North-west",govname: "North West", "seats" : []},
      {name: "Scotland", govname:"Scotland", "seats" : []},
        {name: "South-east",govname:"South East", "seats" : []},
        {name: "South-west",govname:"South West", "seats" : []},
   {name: "Wales", "seats" : []},
        {name: "West Midlands",govname: "West Midlands", "seats" : []},
        {name: "Yorkshire and the Humber",govname:"Yorkshire and The Humber", "seats" : []}
    ];
    seats.forEach(function (s) {
        regions.forEach(function (r) {
            if (r.govname == s.region_name) {
                    r.seats.push(s);
            }            
        })
    })
    return regions;

}


export async function render() {
    var rawdata = await rp(config.docDataJson);
    var data = JSON.parse(rawdata);
    var seats = data.sheets.result2017;
    seats.map(function(s){
        s.class = s.biggest_oppo_party.replace(" ","")
    })
    var tacticalseats = seats.filter(s => s.tactical_opportunity == "yes");
    var regions = regionalise(tacticalseats);
    var html = mustache.render(mainTemplate,regions);
   return html;
}
