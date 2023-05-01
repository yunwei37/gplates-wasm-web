import $ from 'jquery';
import * as d3 from 'd3';
import * as topojson from 'topojson';
export const reconstructionFunction = (svgRef) => {

    var default_fc = {
        "type": "FeatureCollection",
        "features":
            [{
                "type": "Feature",
                "geometry":
                {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [
                                128,
                                -17
                            ],
                            [
                                133,
                                -18
                            ],
                            [
                                138,
                                -19
                            ],
                            [
                                140,
                                -23
                            ],
                            [
                                139,
                                -27
                            ],
                            [
                                130,
                                -27
                            ],
                            [
                                128,
                                -24
                            ],
                            [
                                127,
                                -21
                            ],
                            [
                                127,
                                -17
                            ],
                            [
                                128,
                                -17
                            ]
                        ]
                    ]
                },
                "properties": {}
            }]
    };


    var width = 960,
        height = 500;

    var scale0 = (width - 1) / 2 / Math.PI;
    var eScale0 = (width - 1) / 2 / Math.PI, oScale0 = (width - 1) / 4;

    //var projName = "orthographic";
    var projName = "equirectangular";
    var geometryLayer = null, coastlinsLayer = null, graticuleLayer = null;

    $(document).ready(function () {
        var svg = d3.select("body svg");

        var projOrtho = d3.geo.orthographic()
            .scale(oScale0)
            .translate([width / 2, height / 2])
            .clipAngle(90)
            .precision(.1);
        var projRect = d3.geo.equirectangular()
            .scale(scale0)
            .rotate([0.1, 0, 0])
            .translate([width / 2, height / 2])
            .precision(.1);

        var projection = projRect;

        var path = d3.geo.path().projection(projection);

        coastlinsLayer = svg.append('g');
        geometryLayer = svg.append('g');
        graticuleLayer = svg.append('g');

        var graticule = d3.geo.graticule();
        graticuleLayer.append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", path);

        var time = +$('#recon-time').val();
        var viewname = $('body').attr('data-view-name');
        if (viewname == "feature_collection") {
            $("#args-textarea").attr('rows', 14);
            $("#args-textarea").val(JSON.stringify(default_fc, undefined, 4));
            $("#RP").hide();
            $("#RFC").show();
            $("#commit").click();
        } else if (viewname == "coastlines") {
            $("#args-textarea").hide();
            $("#RP").hide();
            $("#RFC").hide();
            $("#commit").click();
        } else if (viewname == "points") {

        }

        reconstruct(time);

        var m0,
            o0;

        var drag = d3.behavior.drag()
            .on("dragstart", function () {
                var proj = projection.rotate();
                m0 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY];
                o0 = [-proj[0], -proj[1]];
            })
            .on("drag", function () {
                if (projName != "orthographic") { return; }

                if (m0) {
                    var m1 = [d3.event.sourceEvent.pageX, d3.event.sourceEvent.pageY],
                        o1 = [o0[0] + (m0[0] - m1[0]) / 4, o0[1] + (m1[1] - m0[1]) / 4];
                    projection.rotate([-o1[0], -o1[1]]);
                    //projection.rotate([-o1[0],0]);
                }

                // Update the map
                path = d3.geo.path().projection(projection);
            });


        svg.call(drag);

        setupZoom();

        function setupZoom() {
            if (projName != "orthographic") {
                scale0 = eScale0;
            } else {
                scale0 = oScale0;
            }
            // zoom and pan
            var zoom = d3.behavior.zoom()
                .scale(scale0)
                .translate([width / 2, height / 2])
                .scaleExtent([scale0, 8 * scale0])
                .on("zoom", function () {
                    projection
                        .scale(zoom.scale());

                    if (projName != "orthographic") {
                        projection.translate(zoom.translate());
                    }

                    svg.selectAll("path").attr("d", path);

                    if (projName != "orthographic") {
                        geometryLayer.selectAll(".pathPoint")
                            .attr("cx", function (d) { return projection(d)[0]; })
                            .attr("cy", function (d) { return projection(d)[1]; })
                    } else {
                        var circle = d3.geo.circle();
                        geometryLayer.selectAll(".pathPoint").remove();
                        reconstructedPoints.forEach(function (d) {
                            drawPoint(d, scale0 / zoom.scale());
                        });
                    }

                });

            svg.call(zoom)
        }

        var reconstructedPoints = [];

        function reconstructPoints(time) {
            var points = $("#args-textarea").val();
            var url = "https://gws.gplates.org/reconstruct/reconstruct_points/?points=" + points + "&time=" + time + "&model=SETON2012";
            $("#request-url").html("<strong>Request URL:</strong> <br> <a href=\"" + url + "\" target=\"_blank\">" + url);
            d3.json(url, function (error, data) {
                $("#raw-data").html('<strong>Returned Raw Data:</strong> <pre>' + JSON.stringify(data, undefined, 4) + '</pre>');
                geometryLayer.selectAll("*").remove();
                var circle = d3.geo.circle();
                d3.selectAll(".pathPoint").remove();
                reconstructedPoints = [];
                data.coordinates.forEach(function (d) {
                    reconstructedPoints.push([d[0], d[1]]);
                    drawPoint(d);
                });
            });
        }


        function drawPoint(d, angle) {
            var _angle = angle || 1;
            if (projName == "orthographic") {
                var circle = d3.geo.circle();
                geometryLayer.append("path")
                    //.datum({type: "Point", coordinates: [d[1], d[0]]})
                    .datum(circle.origin([d[0], d[1]]).angle(_angle)())
                    .attr("d", path.pointRadius(1))
                    .attr("class", "pathPoint")
                    .append("svg:title")
                    .text(function () {
                        return "Longitude: " + d[0] + "\nLatitude: " + d[1];
                    })
                    ;
            } else {
                geometryLayer.append("circle")
                    .datum([d[0], d[1]])
                    .attr("cx", function (d) { return projection(d)[0]; })
                    .attr("cy", function (d) { return projection(d)[1]; })
                    .attr("r", 3)
                    //.attr("d",path)
                    .style("fill", "red")
                    .attr("class", "pathPoint")
                    .append("svg:title")
                    .text(function (d) {
                        return "Longitude: " + d[0] + "\nLatitude: " + d[1]
                    })
                    ;
            }
        }


        function reconstructFeatureCollection(time) {
            var url = "https://gws.gplates.org/reconstruct/reconstruct_feature_collection/?feature_collection=" +
                $("#args-textarea").val() + "&time=" + time + "&model=SETON2012";
            url = url.replace(/\s+/g, "");
            $("#request-url").html("<strong>Request URL:</strong> <br> <a href=\"" +
                url.replace(/"/g, '&quot;') + "\" target=\"_blank\">" + url);
            console.log(url);
            d3.json(url, function (error, data) {
                if (error || !data.features.length) {
                    alert('error. check the geojson request.');
                    return;
                }
                $("#raw-data").html('<strong>Returned Raw Data:</strong> <pre>' + JSON.stringify(data, undefined, 4) + '</pre>');
                geometryLayer.selectAll("*").remove();
                if (data.features[0].geometry.type == 'Point') {
                    data.features.forEach(function (d) {
                        drawPoint(d.geometry.coordinates);
                    });
                } else if (data.features[0].geometry.type == 'MultiPoint') {
                    data.features.forEach(function (d) {
                        d.geometry.coordinates.forEach(function (dd) {
                            drawPoint(dd);
                        });
                    });
                } else {
                    geometryLayer.selectAll("*")
                        .data(data.features)
                        .attr("class", "RG")
                        .attr("d", path)
                        .enter()
                        .append("path")
                        .attr("d", path)
                        .attr("class", "RG")
                        //.attr("fill", "red")
                        .attr("stroke", "yellow");
                }
            });
        }


        function reconstruct(time) {
            d3.json("https://gws.gplates.org/reconstruct/coastlines_low/?time=" + time + '&apikey=mchin-e494599c-c81b-4972-acbb-c167728c9fb2&avoid_map_boundary', function (error, topology) {
                coastlinsLayer.selectAll(".coastline").remove();
                coastlinsLayer.selectAll(".coastline")
                    .data(topology.features)
                    .attr("class", "coastlines")
                    .attr("d", path)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("class", "coastline")
                    .on('mouseover', function (d, i) {
                        d3.select(this).style('fill-opacity', .7);
                        d3.select(this).style('stroke', 'red');
                        d3.select(this).style('stroke-width', '1px');
                    })
                    .on('mouseout', function (d, i) {
                        d3.select(this).style({ 'fill-opacity': .5 });
                        d3.select(this).style('stroke', 'blue');
                        d3.select(this).style('stroke-width', '.25px');
                    });
            });

            if (viewname == "feature_collection") {
                reconstructFeatureCollection(time);
            } else if (viewname == "points") {
                reconstructPoints(time);
            } else {
                var url = "https://gws.gplates.org/reconstruct/coastlines_low/?" + "&time=" + time + "&model=SETON2012&avoid_map_boundary";
                url = url.replace(/\s+/g, "");
                $("#request-url").html("<strong>Request URL:</strong> <br> <a href=" + url.replace(/"/g, '&quot;') + " target=\"_blank\">" + url);
            }
        }


        function draw() {
            if (projName == "orthographic") {
                projection = projOrtho;
            } else {
                projection = projRect;
            }
            path = d3.geo.path().projection(projection);
            svg.selectAll("path").attr("d", path);

            d3.selectAll(".pathPoint").remove();
            reconstructedPoints.forEach(function (d) {
                drawPoint(d);
            });
        }


        d3.select("#select-projection").on("change", function () {
            projName = this.value;
            setupZoom();
            draw();
        });


        d3.select("#select-function").on("change", function () {
            if (+this.value == 0) {
                $("#RP").hide();
                $("#RFC").hide();
            } else if (+this.value == 1) {
                $("#args-textarea").attr('rows', 2);
                $("#args-textarea").val("95,54,142,-33");
                $("#RP").show();
                $("#RFC").hide();

            } else if (+this.value == 2) {
                $("#args-textarea").attr('rows', 14);
                $("#args-textarea").val(JSON.stringify(default_fc, undefined, 4));
                $("#RP").hide();
                $("#RFC").show();
                $("#commit").click();
            }
        });

        //d3.select("#recon-time").on("blur", function(){
        //    reconstruct(+this.value);
        //});

        d3.select('#commit').on('click', function () {
            reconstruct(+$("#recon-time").val());
            $("#time-label").html($("#recon-time").val() + ' Ma');
            //$("#request-url").hide();
        });

        //d3.select('#show-url').on('click', function(){
        //    $("#request-url").show();
        //});

        //d3.select("#show-data").on('click', function(){
        //    $("#raw-data").show();
        //});
    });
};