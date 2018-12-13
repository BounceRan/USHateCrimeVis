

  //Width and height of map
  var width = 780;
  var height = 520;


  var minimum = 0, middlepart= 200, maximum = 1270;

  var minimumColor = "#a39e9e", maximumColor = "#2a2323";

  var mapColor = d3.scaleLinear()
                .domain([minimum , maximum])
                .range([minimumColor,maximumColor]);
  // D3 Projection
  var projection = d3.geoAlbersUsa()
  				           .translate([width/2, height/2])    // translate to center of screen
  				           .scale([1000]);          // scale things down so see entire US

  // Define path generator
  var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
  		  	 .projection(projection);  // tell path generator to use albersUsa projection



  var legendText = ["Cities Lived", "States Lived", "States Visited", "Nada"];

  //Create SVG element and append map to the SVG
  var svgMap = d3.selectAll("#vizMap")
  			.append("svg")
        .attr("id", "mapOnly")
  			.attr("width", width)
  			.attr("height", height);


        var tooltip = d3.select("#vizMap").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

  // Append Div for tooltip to SVG
  // var div = d3.select("#vizMap")
  // 		        .append("div")
  //     		    .attr("class", "tooltip")
  //     		    .style("opacity", 0);

  // Load in my states data!
  d3.csv("dataset/2017_hateCrimeByStates/2017hateCrimeByStates.csv", function(data) {
  //color.domain([0,1,2,3]); // setting the range of the input data

  // Load GeoJSON data and merge with states data
  d3.json("dataset/us_states.json", function(json) {

  // Loop through each state data value in the .csv file
  for (var i = 0; i < data.length; i++) {

  	// Grab State Name
  	var dataState = data[i].state;

  	// Grab data value
  	var dataValue = data[i].offenses;

  	// Find the corresponding state inside the GeoJSON
  	for (var j = 0; j < json.features.length; j++)  {
  		var jsonState = json.features[j].properties.NAME;

  		if (dataState == jsonState) {

  		// Copy the data value into the JSON
  		json.features[j].properties.offenses = dataValue;
      //console.log(dataValue);
  		// Stop looking through the JSON
  		break;
  		}
  	}
  }

  // Bind the data to the SVG and create one path per GeoJSON feature
  svgMap.selectAll("path")
  	.data(json.features)
  	.enter()
  	.append("path")
  	.attr("d", path)
    .on("mouseover", function(d) {
            d3.select(this)
            .transition()
            .duration(500)
            .style("fill", "#902a2a");
            tooltip.transition()
            .duration(1000)
            .style("opacity", .9);

             if(typeof d.properties.offenses == 'undefined'){
               tooltip.html("<p>"+d.properties.NAME+"</p>"+"No Record")
               .style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
             }else{
               tooltip.html("<p>"+d.properties.NAME+"</p>"+d.properties.offenses)
               .style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");

             }

        })
    .on("mouseout", function(d) {
            d3.select(this)
              .transition()
              .duration(500)
              .style("fill",function(d) {
            // console.log(d);
          //	Get data value
           if(typeof d.properties.offenses == 'undefined'){
               return "#bababa";
            }else{
             return mapColor(d.properties.offenses);
           }
          });
            tooltip.transition()
            .duration(1000)
            .style("opacity", 0);
        })
  	.style("stroke", "#c4c3c3")
  	.style("stroke-width", ".1")
  	.style("fill", function(d) {
    // console.log(d);
  //	Get data value
   if(typeof d.properties.offenses == 'undefined'){
       return "#bababa";
    }else{
     return mapColor(d.properties.offenses);
   }
  });



  //linear gradient key
//cited http://bl.ocks.org/darrenjaworski/5874214
  var w = 160, h = 300;

  var key = d3.select("#vizMap").append("svg").attr("id", "key").attr("width", w).attr("height", h);

  var legend = key.append("defs").append("svg:linearGradient").attr("id", "gradient").attr("x1", "100%").attr("y1", "0%").attr("x2", "100%").attr("y2", "100%").attr("spreadMethod", "pad");

  legend.append("stop").attr("offset", "0%").attr("stop-color", maximumColor).attr("stop-opacity", 1);

  legend.append("stop").attr("offset", "100%").attr("stop-color", minimumColor).attr("stop-opacity", 1);

  key.append("rect").attr("width", w - 120).attr("height", h - 100).style("fill", "url(#gradient)").attr("transform", "translate(0,10)");

  var y = d3.scaleLinear().range([200, 0]).domain([minimum, maximum]);

  var yAxis = d3.axisRight(y);

  key.append("g")
     .attr("class", "y axis")
     .attr("transform", "translate(42,10)")
     .call(yAxis);

  key.append("text")
  .style("z-index", "1")
  .style("font-size",12)
  .attr("x",-200)
  .attr("y", 70).attr("dy", ".71em")
  .attr("transform", "rotate(-90)")
  .style("text-anchor", "left")
  .text("Offenses Number");
  	});

  });
