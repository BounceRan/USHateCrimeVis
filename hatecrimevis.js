var table17, table16;
var padding ={top: 20, right: 20, bottom:20,left:20};
var motivationArray=[], targetArray=[],incidentsArray=[];
// function preload() {
//     // load the CSV data into our `table` variable and clip out the header row
//     table17 = loadTable("dataset/2017HCbyBiasMotivation.csv", "csv", "header");
//     table16 = loadTable("dataset/2016HCbyBiasMotivation.csv", "csv", "header");
// }
var svg=d3.selectAll("#viz").append("svg")
                  .attr("height",2400)
                  .attr("width",800)
                  .style('background', 'lightgrey');

 d3.csv("dataset/2017HCbyBiasMotivation.csv", function(error, data) {


if (error) throw error;
      table17=data;
      console.log(table17);
      for(var i= 0; i<data.length;i++){
          targetArray.push(data[i].target);
          motivationArray.push(data[i].motivation);
          incidentsArray.push(Number(data[i].incidents));
      }

      //var maxOfInci= incidentsArray.sort(d3.descending);
        var maxOfInci= d3.max(incidentsArray);
      console.log(incidentsArray[1]);
        console.log(maxOfInci);
      var circleoffset=20;
      var privousValue=0;
      var reIncidentsArray= d3.scaleLinear()
                              .domain([0,maxOfInci])
                              .range([0,140]);
      var circles= svg.selectAll("circle")
          .data(incidentsArray)
          .enter()
          .append("g");
          circles.append("circle")
                  .classed('ctext',true)
                  .attr("cy",function(d,i){
                    if(i>0){
                     privousValue= incidentsArray[i-1];
                   }
                    circleoffset+=reIncidentsArray(d)+reIncidentsArray(privousValue)+30 ;return circleoffset;})
                  .attr("cx","200")
                  .attr("r",function(d,i){return reIncidentsArray(d)})
                  //.style("fill","rgba(200,0,0,.6)")
                  .style("fill", function(d,i){
                      if (motivationArray[i]=="Ethnicity"){
                        return "rgba(200,0,0,.6)";
                      } else if(motivationArray[i]=="Religion"){
                        return "rgba(255,0,255,.6)";
                      } else if (motivationArray[i]=="Orientation"){
                        return "rgba(255,100,155,.6)";
                      }else if (motivationArray[i]=="Disability"){
                        return "rgba(55,200,55,.6)";
                      }else if (motivationArray[i]=="Gender"){
                        return "rgba(255,0,155,.6)";
                      }else if (motivationArray[i]=="Identity"){
                        return "rgba(0,100,155,.6)";
                      }
                  });



       circleoffset=20;
        privousValue=0;
        // svg.selectAll("text")
        //     .data(incidentsArray).enter()
            circles.append("text")
            .classed('gtext', true)
            .attr("y",function(d,i){
              if(i>0){
               privousValue = incidentsArray[i-1];
             }
              circleoffset+=reIncidentsArray(d)+reIncidentsArray(privousValue)+30 ;return circleoffset;})
            .attr("x",function(d){return 200+ reIncidentsArray(d)})
            .attr("dy", ".35em")
            //.attr('text-anchor', 'middle')
            .attr('font-size',20)

            .html(function(d, i){ return targetArray[i]});



});




dataArray=[5,11,18];
//targetArray=table17.target;

//targetArray = table17.getColumn("target");
