var table17, table16;
var padding ={top: 20, right: 20, bottom:20,left:20};
var motivationArray=[], targetArray=[],incidentsArray=[];
// function preload() {
//     // load the CSV data into our `table` variable and clip out the header row
//     table17 = loadTable("dataset/2017HCbyBiasMotivation.csv", "csv", "header");
//     table16 = loadTable("dataset/2016HCbyBiasMotivation.csv", "csv", "header");
// }
var svg=d3.selectAll("#viz").append("svg")
                  .attr("height",500)
                  .attr("width",1800)
                  .style('background', 'grey');

 d3.csv("dataset/2017HCbyBiasMotivation.csv", function(error, data) {


if (error) throw error;
      table17=data;
      console.log(table17);
      for(var i= 0; i<data.length;i++){
          targetArray.push(data[i].target);
          motivationArray.push(data[i].motivation);
          incidentsArray.push(data[i].incidents);

      }
      console.log(incidentsArray[1]);

      var circleoffset=20;
      var privousValue=0;
      svg.selectAll("circle")
          .data(incidentsArray)
          .enter().append("circle")
                  .attr("cx",function(d,i){
                    if(i>0){
                     privousValue= incidentsArray[i-1];
                   }
                    circleoffset+=d*0.05+privousValue*0.05 ;return circleoffset;})
                  .attr("cy","150")
                  .attr("r",function(d,i){return d*.05 })
                  .style("fill","rgba(200,0,0,.6)");



});




dataArray=[5,11,18];
//targetArray=table17.target;

//targetArray = table17.getColumn("target");
