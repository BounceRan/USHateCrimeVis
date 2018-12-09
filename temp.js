function conditionOne(inArray1,inArray2,inArray3){
  let sumOfInci1= d3.sum(inArray1);
  let sumOfInci2= d3.sum(inArray2);
  let sumOfInci3= d3.sum(inArray3);
  let x1=150 , y=150 , x2=450 , x3=750;

  console.log(sumOfInci1);

  var reSumOfInci= d3.scaleLinear()
                          .domain([0,7500])
                          .range([0,150]);
  console.log(reSumOfInci(sumOfInci1));
svg.selectAll("g").remove();
  svg.selectAll("circle").remove();
  svg.selectAll("text").remove();

var circles = svg//.selectAll("circle")
                // .data([0,1,2])
                // .enter()

                // first data set
                circles .append("g").append("circle")

                .attr("cy",y)
                .attr("cx",x1)
                .attr("r",0)
                .transition()
                .ease(d3.easeElastic)
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
                  svg.selectAll("text").append("tspan")
                  .text(function(d, i){ return sumOfInci1 })
                  .attr("y",y+15)
                  .attr("x",function(d){return x1});

                // // Second data set
                // circles.append("g").append("circle")
                // .attr("cy",y)
                // .attr("cx",x2)
                // .attr("r",0)
                // .transition()
                // .ease(d3.easeElastic)
                // .duration(2000)
                // .attr("r",reSumOfInci(sumOfInci2))
                // .style("fill", "white");
                //text2
                // circles.select("g").append("text")
                // .classed('gtext', true)
                // .attr("dy", ".35em")
                // .attr('font-size',12)
                // .attr('text-anchor', 'middle')
                // .append("tspan")
                // .text(function(d, i){ return "Total"})
                // .attr("y",y)
                // .attr("x",function(d){return x2});
                // svg.selectAll("text").append("tspan")
                // .text(function(d, i){ return sumOfInci2 })
                // .attr("y",y+15)
                // .attr("x",function(d){return x2});

                // Third data set
                // circles.append("g") .append("circle")
                // .attr("cy",y)
                // .attr("cx",750)
                // .attr("r",0)
                // .transition()
                // .ease(d3.easeElastic)
                // .duration(2000)
                // .attr("r",reSumOfInci(sumOfInci3))
                // .style("fill", "white");
                //text3
                // circles.select("g").append("text")
                // .classed('gtext', true)
                // .attr("dy", ".35em")
                // .attr('font-size',12)
                // .attr('text-anchor', 'middle')
                // .append("tspan")
                // .text(function(d, i){ return "Total"})
                // .attr("y",y)
                // .attr("x",function(d){return x3});
                // svg.selectAll("text").append("tspan")
                // .text(function(d, i){ return sumOfInci3 })
                // .attr("y",y+15)
                // .attr("x",function(d){return x3});
}
