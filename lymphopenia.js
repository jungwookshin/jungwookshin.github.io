
const width  = 740;
const height = 700;
var margin = {top:60, right:80, bottom: 40, left:120}
const gap = 100

// 100 scale
full_scale = width - margin.left - margin.right

/*
  Sex Points
 0    0
 1   36

 Brain_Dmean Points
  5            0
 10           11
 15           22
 20           33
 25           44
 30           56
 35           67
 40           78
 45           89
 50          100

 Baseline_ALC Points
 0.0          88
 0.5          81
 1.0          75
 1.5          69
 2.0          63
 2.5          56
 3.0          50
 3.5          44
 4.0          38
 4.5          31
 5.0          25
 5.5          19
 6.0          13
 6.5           6
 7.0           0

 Total Points Probability of SLP
           47               0.01
          100               0.05
          150               0.20
          207               0.60
*/

domain = {pts:[0,100], gender:[0,1], brain_dmean:[5,50],
          baseline:[7.0,0.0], tot_pts:[0, 220], slp:[0.01, 0.6]}

points = {pts:[0,100], gender:[0,36], brain_dmean:[0,100],
          baseline:[88,0], tot_pts:[0,220], slp:[47,207]}

scales = { pts : 1.0,
           gender: points.gender[1]/points.pts[1],
           brain_dmean: (points.brain_dmean[1]-points.brain_dmean[0])/ points.pts[1],
           baseline: points.baseline[0]/points.pts[1],
           tot_pts:1.0,
           slp: (points.slp[1]-points.slp[0])/points.tot_pts[1]
         }

starts = {pts: margin.left,
          gender: margin.left,
          brain_dmean: margin.left,
          baseline: margin.left,
          tot_pts: margin.left,
          slp: margin.left + points.slp[0]/points.tot_pts[1]*full_scale} 


  // Create the SVG container.
const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])

  const pts = d3.scaleLinear()
        .domain(domain.pts)
        .range([margin.left, margin.left + full_scale ]);

  // Gender Male/Female
  const gender = d3.scaleLinear()
        .domain(domain.gender)
        .range([starts.gender, starts.gender + full_scale * scales.gender]);


  // Brain Mean dose
  const brain_dmean = d3.scaleLinear()
        .domain(domain.brain_dmean)
        .range([starts.brain_dmean, starts.brain_dmean + full_scale * scales.brain_dmean]);

// Baseline (Pre-CCRT ALC x10)
  const baseline = d3.scaleLinear()
        .domain(domain.baseline)
        .range([starts.baseline, starts.baseline + full_scale * scales.baseline]);

  const tot_pts = d3.scaleLinear()
        .domain(domain.tot_pts)
        .range([starts.tot_pts, starts.tot_pts + full_scale]);

const slp = d3.scaleLinear()
        .domain(domain.slp)
        .range([starts.slp, starts.slp + full_scale * scales.slp]);


  // Add the x-axis.
  svg.append("g")
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisBottom(pts))
    .append("text")
    .attr("class", "axis-title")
    .attr("transform", "rotate(0)")
        .attr("x", margin.left-20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
    .text("Points");


  svg.append("g")
    .attr("transform", `translate(0,${margin.top+gap})`)
    .call(d3.axisBottom(gender).tickValues([0,1]))
    .append("text")
    .attr("class", "axis-title")
    .attr("transform", "rotate(0)")
        .attr("x", margin.left-20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
    .text("Gender");

  svg.append("g")
    .attr("transform", `translate(0,${margin.top+2.0*gap})`)
    .call(d3.axisBottom(brain_dmean))
    .append("text")
    .attr("class", "axis-title")
    .attr("transform", "rotate(0)")
        .attr("x", margin.left-20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
    .text("Brain Dmean (Gy)");

  svg.append("g")
    .attr("transform", `translate(0,${margin.top+3*gap})`)
    .call(d3.axisBottom(baseline))
    .append("text")
    .attr("class", "axis-title")
    .attr("transform", "rotate(0)")
        .attr("x", margin.left-20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
    .text("Baseline ALC (x1000)");

  svg.append("g")
    .attr("transform", `translate(0,${margin.top+4*gap})`)
    .call(d3.axisBottom(tot_pts))
    .append("text")
    .attr("class", "axis-title")
    .attr("transform", "rotate(0)")
        .attr("x", margin.left-20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text("Total Points");

  svg.append("g")
    .attr("transform", `translate(0,${margin.top+5*gap})`)
    .call(d3.axisBottom(slp))
    .append("text")
    .attr("class", "axis-title")
    .attr("transform", "rotate(0)")
        .attr("x", margin.left-20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text("Probability of SLP");



// Return the SVG element.
plot_div.append(svg.node());
//  return svg.node();

