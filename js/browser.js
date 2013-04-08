d3.json('index.json', function(err, index) {

    var titles = d3.select('#titles')
        .selectAll('li.title')
        .data(index.titles)
        .enter()
        .append('li')
        .attr('class', 'title')
        .text(function(d) {
            return d[0] + ': ' + d[1];
        })
        .on('click', clickTitle);

    function clickTitle(d) {
        var t = this;
        titles
            .classed('active', function(d) {
                return this == t;
            });

        sectionsFor(d);
    }

    function sectionsFor(title) {
        var sections = d3.select('#sections')
            .selectAll('li.section')
            .data(index.sections.filter(function(s) {
                return s[0].match(/§ (\d+)\-/)[1] == title[0];
            }), function(d) {
                return d[0];
            });

        sections
            .exit()
            .remove();

        sections
            .enter()
            .append('li')
            .attr('class', 'section')
            .text(function(d) {
                return d[0] + ' ' + d[1];
            });
    }
});