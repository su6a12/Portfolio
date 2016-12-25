$(document).ready(function() {

    $.getJSON("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(data) {

        var stats = data.data,
            year = [],
            values = [];

        // parse data to extract currency amount and year for axes
        stats.forEach(function(each, index) {
            // pass date in string format into Date constructor for parsing
            var date = new Date(each[0]);
            year.push(date.getFullYear());
            values.push(each[1]);
        }); // end of forEach


        // set margins and widths to make room for axes
        var margin = { top: 20, right: 20, bottom: 50, left: 60 };

        var outerWidth = 1000;
        var outerHeight = 500;
        var innerWidth = outerWidth - margin.left - margin.right;
        var innerHeight = outerHeight - margin.top - margin.bottom;
        var barWidth = Math.ceil(innerWidth / (stats.length));


        // determine where each rectangle top left corner should be to draw chart
        // range for height is height to 0 because chart's bottom is the opposite of d3 axes bottom
        // so we need to map the first data point to the bottom of our chart
        var x = d3.scale.linear().domain([0, stats.length]).range([0, innerWidth]);
        var y = d3.scale.linear().domain([0, d3.max(stats, function(data) {
            return data[1]; })]).range([innerHeight, 0]);

        // set up data for axes
        var xScale = d3.scale.linear().domain([year[0], year[year.length - 1]]).range([0, innerWidth]);
        var yScale = d3.scale.linear().domain([values[0], values[values.length - 1]]).range([innerHeight, 0]);

        // set up data for x-axis
        // displays tick marks without commas
        // suggest to d3 to create 15 tick marks
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom")
            .ticks(15)
            .tickFormat(d3.format("d"));

        // set up data for y-axis
        // displays tick marks as currency
        var formatComma = d3.format(",.0f");

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .tickFormat(function(d) {
                return "$" + formatComma(d); });


        // set up dimensions for bar chart
        var gdpChart = d3.select(".bar-chart")
            .attr("width", outerWidth)
            .attr("height", outerHeight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // x-axis
        // move axis to "bottom" of chart
        gdpChart.append("g")
            .attr("transform", "translate(0," + innerHeight + ")")
            .attr("class", "x axis")
            .call(xAxis);

        // y-axis
        // move the text 20px over to the right
        gdpChart.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("dy", 20)
            .style("text-anchor", "end")
            .text("Gross Domestic Product for USA");


        // define tooltip with info and append to wrapper div
        var tooltip = d3.select("#wrapper")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        // note source of data
        var source = d3.select("#source")
            .append("text")
            .attr("class", "source text")
            .html(data.description);



        var bars = gdpChart.selectAll("rect.bar")
            .data(stats)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(each, index) {
                return x(index) + barWidth; })
            .attr("y", function(each) {
                return y(each[1]); })
            .attr("height", function(each) {
                return innerHeight - y(each[1]); })
            .attr("width", barWidth)
            .attr("fill", "#11a9c0")
            // set up behavior for when mouse is over a rectangle
            .on("mouseover", function(each) {
                var eachDate = new Date(each[0]);
                var eachMonth = eachDate.toLocaleString("en-us", { month: "long" });
                var eachYear = eachDate.getFullYear();
                var currentRect = d3.select(this);
                // make tooltip visible
                tooltip.transition()
                    .style("opacity", 0.9);
                // display GDP, month in long form and year
                tooltip.html("$" + formatComma(each[1]) + " Billion<br/>" + eachMonth + " - " + eachYear)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) - 100 + "px");
            })
            // set up behavior for when mouse leaves the rectangle
            .on("mouseout", function() {
                // hide the tooltip
                tooltip.transition()
                    .style("opacity", 0);
            });


    }); // end of .getJSON

}); // end of $(document).ready()
