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

var sumOfInci= d3.sum(incidentsArray);
console.log(sumOfInci);

var reSumOfInci= d3.scaleLinear()
                        .domain([0,7500])
                        .range([0,100]);
console.log(reSumOfInci(sumOfInci));









});



var condition = false;

svg.on("click", function(){
  if(condition== false){
   conditionOne();
    condition =true;
    console.log(condition);
  } else if (condition == true){
conditionThree(200);
//conditionThree(300);
condition =false;
console.log(condition);
  }


});



function conditionOne(){

  svg.selectAll("circle").remove();
  svg.selectAll("text").remove();

var sumCondition = svg.selectAll("circle")
                .data(incidentsArray)
                .enter()
                .append("g")
    sumCondition.append("circle")
                .classed('ctext',true)
                .attr("cy",100)
                .attr("cx",500)
                //.attr("r",0)
                //.transition()
                //.ease(d3.easeElastic)
                //.duration(2000)
                .attr("r","100")
                .style("fill", "white");

              }




function conditionThree(xPosition){

svg.selectAll("circle").remove();
//remap the incidents data
      //var maxOfInci= incidentsArray.sort(d3.descending);
      var maxOfInci= d3.max(incidentsArray);
      console.log(incidentsArray[1]);
        console.log(maxOfInci);
      var circleoffset=20;
      var privousValue=0;
      var reIncidentsArray= d3.scaleLinear()
                              .domain([0,2050])
                              .range([0,140]);
      var circles= svg.selectAll("circle")
          .data(incidentsArray)
          .enter()
          .append("g");
          circles.append("circle")
                  .classed('ctext',true)
                  .attr("cx",xPosition)
                  .attr("cy",0)
                  .transition()
                  .ease(d3.easeElastic)
                  .duration(2000)
                  .attr("cy",function(d,i){
                    if(i>0){
                     privousValue= incidentsArray[i-1];
                   }
                    circleoffset+=reIncidentsArray(d)+reIncidentsArray(privousValue)+30
                    for (var a= 0; a<circleoffset; a++){

                    }return a;})

                  .attr("r",0)
                  // .transition()
                  // .ease(d3.easeElastic)
                  // .duration(2000)

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


//text Target--
       circleoffset=20;
        privousValue=0;
        // svg.selectAll("text")
        //     .data(incidentsArray).enter()
            circles.append("text")
            .classed('gtext', true)
            .attr("x",function(d){return 200+ reIncidentsArray(d)})
            .attr("y",0)
            .transition()
            .ease(d3.easeElastic)
            .delay(100)
            .duration(1000)
            .attr("y",function(d,i){
              if(i>0){
               privousValue = incidentsArray[i-1];
             }
              circleoffset+=reIncidentsArray(d)+reIncidentsArray(privousValue)+30 ;return circleoffset;})

            .attr("dy", ".35em")
            .attr('font-size',0)

            //.attr('text-anchor', 'middle')
            .attr('font-size',16)
            .text(function(d, i){ return targetArray[i]});
//text Incidents--
            circleoffset=20;
             privousValue=0;
            circles.append("text")
            .classed('gtext', true)
            .attr("y",function(d,i){
              if(i>0){
               privousValue = incidentsArray[i-1];
             }
              circleoffset+=reIncidentsArray(d)+reIncidentsArray(privousValue)+30 ;return circleoffset+15;})
            .attr("x",function(d){return 200+ reIncidentsArray(d)})
            .attr("dy", ".35em")
            .attr('font-size',12)
            .text(function(d, i){ return incidentsArray[i]});
}
