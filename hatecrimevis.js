var table17, table16;
var padding ={top: 20, right: 20, bottom:20,left:20};
var motivationArray=[], targetArray=[],incidentsArray=[];
var motivationArray2=[], targetArray2=[],incidentsArray2=[];
var motivationArray3=[], targetArray3=[],incidentsArray3=[];
var condition = false;
// function preload() {
//     // load the CSV data into our `table` variable and clip out the header row
//     table17 = loadTable("dataset/2017HCbyBiasMotivation.csv", "csv", "header");
//     table16 = loadTable("dataset/2016HCbyBiasMotivation.csv", "csv", "header");
// }
var svg=d3.selectAll("#viz").append("svg")
                  .attr("id", "firstData")
                  .attr("height",2400)
                  .attr("width",300)
                  .style('background', 'lightgrey');

var svg2=d3.selectAll("#viz").append("svg")
                              .attr("id", "secondData")
                              .attr("height",2400)
                              .attr("width",300)
                              .style('background', 'lightgrey');

var svg3=d3.selectAll("#viz").append("svg")
                              .attr("id", "thirdData")
                              .attr("height",2400)
                              .attr("width",400)
                              .style('background', 'lightgrey');

 d3.csv("dataset/2015HCbyBiasMotivation.csv", function(error, data) {
if (error) throw error;
      table17=data;
      console.log(table17);
      for(var i= 0; i<data.length;i++){
          targetArray.push(data[i].target);
          motivationArray.push(data[i].motivation);
          incidentsArray.push(Number(data[i].incidents));

      }

      d3.csv("dataset/2016HCbyBiasMotivation.csv", function(error, data) {
      if (error) throw error;
           table17=data;
           console.log(table17);
           for(var i= 0; i<data.length;i++){
               targetArray2.push(data[i].target);
               motivationArray2.push(data[i].motivation);
               incidentsArray2.push(Number(data[i].incidents));
           }

      });

      d3.csv("dataset/2017HCbyBiasMotivation.csv", function(error, data) {
      if (error) throw error;
           table17=data;
           console.log(table17);
           for(var i= 0; i<data.length;i++){
               targetArray3.push(data[i].target);
               motivationArray3.push(data[i].motivation);
               incidentsArray3.push(Number(data[i].incidents));
           }


            conditionOne(incidentsArray,150,svg);
           conditionOne(incidentsArray3,150,svg3);
           conditionOne(incidentsArray2,150,svg2);

      });




});



svg.on("click", function(){
  if(condition == false){

    conditionThree(incidentsArray,svg);
      conditionThree(incidentsArray2,svg2);
        conditionThree(incidentsArray3,svg3);
    condition =true;

  } else if (condition == true){
conditionOne(incidentsArray,150,svg);
conditionOne(incidentsArray2,150,svg2);
//conditionThree(300);
condition =false;
//console.log(condition);
  }
});


  //console.log(condition);


//condition one Code
function conditionOne(inArray,x1,svgPic){
  let sumOfInci1= d3.sum(inArray);
  // let sumOfInci2= d3.sum(inArray2);
  // let sumOfInci3= d3.sum(inArray3);
  let  y=150 , x2=450 , x3=750;
  this.x1=x1;
  this.svgPic=svgPic;

  //console.log(sumOfInci1);

  var reSumOfInci= d3.scaleLinear()
                          .domain([5600,7500])
                          .range([80,150]);
  console.log(reSumOfInci(sumOfInci1));
svgPic.selectAll("g").remove();
  svgPic.selectAll("circle").remove();
  svgPic.selectAll("text").remove();

var circles = svgPic//.selectAll("circle")
                // .data([0,1,2])
                // .enter()

                // first data set
                circles .append("g").append("circle")

                .attr("cy",y)
                .attr("cx",x1)
                .attr("r",0)
                .transition()
                .ease(d3.easeElastic.period(0.8))
                .duration(2000)
                .attr("r",reSumOfInci(sumOfInci1))
                .style("fill", "white");
                  //text1
                  circles.select("g").append("text")
                  .classed('gtext', true)
                  .attr("dy", ".35em")
                  .attr('font-size',12)
                  .attr('text-anchor', 'middle')
                  .append("tspan")
                  .text(function(d, i){ return "Total"})
                  .attr("y",y)
                  .attr("x",function(d){return x1});
                  svgPic.selectAll("text").append("tspan")
                  .text(function(d, i){ return sumOfInci1 })
                  .attr("y",y+15)
                  .attr("x",function(d){return x1});

}


function conditionThree(inArray,svgPic){
  this.inArray=inArray;
  this.svgPic=svgPic;
  let xP=150;
  svgPic.selectAll("g").remove();
svgPic.selectAll("text").remove();
svgPic.selectAll("circle").remove();

//remap the incidents data
      //var maxOfInci= incidentsArray.sort(d3.descending);
      var maxOfInci= d3.max(inArray);
      console.log(inArray[1]);
        console.log(maxOfInci);
      var circleoffset=20;
      var privousValue=0;
      var reIncidentsArray= d3.scaleLinear()
                              .domain([0,2050])
                              .range([5,120]);
      var circles= svgPic.selectAll("circle")
          .data(inArray)
          .enter()
          .append("g");
          circles.append("circle")
                  //.classed('ctext',true)
                  .attr("cx",xP)
                  .attr("cy",0)
                  .transition()
                  .ease(d3.easeElastic)
                  .duration(2000)
                  .attr("cy",function(d,i){
                    if(i>0){
                     privousValue= inArray[i-1];
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
                  })
                  ;


//text Target--
       circleoffset=20;
        privousValue=0;
        // svg.selectAll("text")
        //     .data(incidentsArray).enter()
            circles.append("text")
            .classed('gtext', true)
            .attr("x",function(d){return xP+ reIncidentsArray(d)})
            .attr("y",0)
            .transition()
            .ease(d3.easeElastic)
            .delay(100)
            .duration(1000)
            .attr("y",function(d,i){
              if(i>0){
               privousValue = inArray[i-1];
             }
              circleoffset+=reIncidentsArray(d)+reIncidentsArray(privousValue)+30 ;return circleoffset;})

            .attr("dy", ".35em")
            .attr('font-size',0)

            //.attr('text-anchor', 'middle')
            .attr('font-size',13)
            .text(function(d, i){ return targetArray[i]});
          //  .append("br")
          //  .text(function(d, i){ return targetArray[i] +incidentsArray[i]}) ;
//text Incidents--------------------------
            circleoffset=20;
             privousValue=0;
            circles.append("text")
            .classed('gtext', true)
            .attr("y",function(d,i){
              if(i>0){
               privousValue = inArray[i-1];
             }
              circleoffset+=reIncidentsArray(d)+reIncidentsArray(privousValue)+30 ;return circleoffset+15;})
            .attr("x",function(d){return xP+ reIncidentsArray(d)})
            .attr("dy", ".35em")
            .attr('font-size',12)
            .text(function(d, i){ return inArray[i]});
}
