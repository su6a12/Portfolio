$(document).ready(function() {

    $.getJSON("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(data) {

        var minTime = d3.min(data, function(each) {
            return each.Seconds; });
        var maxTime = d3.max(data, function(each) {
            return each.Seconds; });


        // set margins and widths to make room for axes
        var margin = { top: 20, right: 150, bottom: 50, left: 60 };

        var outerWidth = 1000;
        var outerHeight = 600;
        var innerWidth = outerWidth - margin.left - margin.right;
        var innerHeight = outerHeight - margin.top - margin.bottom;


        // determine where each circle's center should be to draw chart
        var x = d3.scale.linear().domain([0, (maxTime - minTime)]).range([innerWidth, (maxTime - minTime)]);
        var y = d3.scale.linear().domain([1, data.length + 2]).range([0, innerHeight]);


        // set up data for axes
        // give axes some buffer so points don't fall on the line
        var xScale = d3.scale.linear().domain([0, (maxTime - minTime) + 50]).range([innerWidth, 0]);
        var yScale = d3.scale.linear().domain([1, (data.length + 2)]).range([0, innerHeight]);


        // set up data for X-axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(8);


        // set up data for Y-axis
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(8);



        // set up dimensions for scatter plot
        var scatterPlot = d3.select(".scatter-plot")
            .attr("width", outerWidth)
            .attr("height", outerHeight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // X-axis
        // move axis to "bottom" of chart and text 35px to the bottom
        scatterPlot.append("g")
            .attr("transform", "translate(0," + innerHeight + ")")
            .attr("class", "x axis")
            .call(xAxis)
            .append("text")
            .attr("dx", innerWidth)
            .attr("dy", 35)
            .style("text-anchor", "end")
            .text("Seconds behind fastest time");


        //Y-axis
        //move the text 30px over to the top
        scatterPlot.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("dy", -30)
            .style("text-anchor", "end")
            .text("Ranking");


        // location description of plot
        scatterPlot.append("text")
            .attr("class", "smallText")
            .attr("dx", 100)
            .attr("dy", 30)
            .text("35 Fastest times up Alpe d'Huez");

        // distance description of plot
        scatterPlot.append("text")
            .attr("class", "smallText")
            .attr("dx", 100)
            .attr("dy", 50)
            .text("Normalized to 13.8km distance");

        scatterPlot.append("text")
            .attr("class", "text")
            .attr("dy", outerHeight)
            .html("Source: https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json");


        // define tooltip with info and append to wrapper div
        // set location of tooltip to somewhere in the top left corner of chart
        var tooltip = d3.select("#wrapper")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("left", innerWidth / 4 + 20 + "px")
            .style("top", innerHeight / 4 + 30 + "px");


        // define legend for Non Doping
        scatterPlot.append("circle")
            .attr("cx", innerWidth - 100)
            .attr("cy", innerHeight - 200)
            .attr("r", 5)
            .style("fill", "#64DFF2");

        scatterPlot.append("text")
            .attr("x", innerWidth - 90)
            .attr("y", innerHeight - 195)
            .attr("class", "text")
            .text("Clean: No Doping Allegation");

        // define legend for Doping
        scatterPlot.append("circle")
            .attr("cx", innerWidth - 100)
            .attr("cy", innerHeight - 180)
            .attr("r", 5)
            .style("fill", "#000");

        scatterPlot.append("text")
            .attr("x", innerWidth - 90)
            .attr("y", innerHeight - 175)
            .attr("class", "text")
            .text("Dirty: With Doping Allegation");


        // MUST selectAll("tag:class"), can't just selectAll("text") in this case. 
        // Only half of the names weren't showing up
        var nameLabels = scatterPlot.selectAll("text.names")
            .data(data)
            .enter()
            .append("svg:text")
            .attr("class", "names text")
            .attr("x", function(each) {
                return x(each.Seconds - minTime); })
            .attr("y", function(each) {
                return y(each.Place); })
            .attr("transform", "translate(10, 5)")
            .text(function(each) {
                return each.Name; });


        // draw circles
        // check if doping allegation exists for each cyclist, if yes then black if no then teal
        var circles = scatterPlot.selectAll("circle.circle")
            .data(data)
            .enter()
            .append("svg:circle")
            .attr("class", "circle")
            .attr("cx", function(each) {
                return x(each.Seconds - minTime); })
            .attr("cy", function(each) {
                return y(each.Place); })
            .attr("r", 5)
            .attr("fill", function(each) {
                // set circle black if no doping, else set it to teal
                if (each.Doping !== "") {
                    return "#000";
                } else {
                    return "#64DFF2";
                }
            })

        //set up behavior for when mouse is over a rectangle
        .on("mouseover", function(each) {
                // make tooltip visible
                tooltip.transition()
                    .style("opacity", 0.9);
                // display GDP, month in long form and year
                tooltip.html(each.Name + ": " + each.Nationality + "<br/>Year: " + each.Year + ", Time: " + each.Time + "<br/><br/>" + each.Doping);
            })
            // set up behavior for when mouse leaves the rectangle
            .on("mouseout", function() {
                // hide the tooltip
                tooltip.transition()
                    .style("opacity", 0);
            });



    }); // end of .getJSON

}); // end of $(document).ready()
