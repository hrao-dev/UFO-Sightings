// from data.js
var tableData = data;
// Console.log the ufo sightings data from data.js
//console.log(data);

window.addEventListener("load", function() {

    // Display all the UFO Sightings in a table format
    displayTable(tableData);

    function displayTable(tdata) {
        var tbody = d3.select("tbody");
        if (!tdata.length) {
            var trow = tbody.append("tr");
            trow.text("No sightings found");
        } else {
            tdata.forEach(function(ufoReport) {
                //console.log(ufoReport);
                var trow = tbody.append("tr");
                trow.append("td").text(ufoReport.datetime)
                trow.append("td").text(ufoReport.city)
                trow.append("td").text(ufoReport.state)
                trow.append("td").text(ufoReport.country)
                trow.append("td").text(ufoReport.shape)
                trow.append("td").text(ufoReport.durationMinutes)
                trow.append("td").text(ufoReport.comments)
            })
        }

    }

    var states = [];
    states = tableData.map(u => u.state);
    var uniqueStates = Array.from(new Set(states))
    uniqueStates = uniqueStates.map(function(x) { return x.toUpperCase() })
    uniqueStates = uniqueStates.sort();
    console.log(uniqueStates);

    var slct = d3.select("select");
    for (var s = 0; s < uniqueStates.length; s++) {
        var seloption = slct.append("option");
        seloption.text(uniqueStates[s])
    }

    // Select the button
    var fltrbutton = d3.select(".filter-btn");
    var clrbutton = d3.select(".clear-btn");
    const srchDate = document.querySelector("#datetime");
    const srchShape = document.querySelector("#shape");
    const srchState = document.querySelector("#stateselector");


    // Create event handlers 
    fltrbutton.on("click", filterTable);
    srchDate.addEventListener("change", filterTable);
    srchShape.addEventListener("change", filterTable);
    srchState.addEventListener("change", filterTable);
    clrbutton.on("click", clearSearch);


    function filterTable() {
        // Prevent the page from refreshing
        //d3.event.preventDefault()

        var filterDate, filterShape, filterState, filterDuo, filterTrio;
        var dateInput = d3.select("#datetime").property("value")
        d3.select("#datetime").property("value", dateInput);
        //console.log(dateInput);

        var shapeInput = d3.select("#shape").property("value");
        var shapeFilter = shapeInput.toUpperCase();
        d3.select("#shape").property("value", shapeInput);
        //console.log(shapeInput);

        var stateInput = d3.select("#stateselector").property("value");
        d3.select("#stateselector").property("value", stateInput);
        var stateFilter = stateInput.toUpperCase();
        //console.log(stateInput);

        //Select the table element to add the data to 
        var tbody = d3.select("tbody");
        // Remove any children from the table
        tbody.html("");

        let inputs = [];
        inputs.push(dateInput);
        inputs.push(shapeFilter);
        inputs.push(stateFilter);

        switch (true) {
            case (inputs[1] === "" && inputs[2] === ""):
                console.log(inputs);
                filterDate = tableData.filter(d => d.datetime === inputs[0]);
                displayTable(filterDate);
                break;
            case (inputs[0] === "" && inputs[2] === ""):
                console.log(inputs);
                filterShape = tableData.filter(sh => sh.shape.toUpperCase() === inputs[1]);
                displayTable(filterShape);
                break;
            case (inputs[0] === "" && inputs[1] === ""):
                console.log(inputs);
                filterState = tableData.filter(st => st.state.toUpperCase() === inputs[2]);
                displayTable(filterState);
                break;
            case (inputs[2] === ""):
                console.log(inputs);
                filterDuo = tableData.filter(e => (e.datetime === inputs[0] && e.shape.toUpperCase() === inputs[1]));
                displayTable(filterDuo);
                break;
            case (inputs[0] == ""):
                console.log(inputs);
                filterDuo = tableData.filter(e => (e.shape.toUpperCase() === inputs[1] && e.state.toUpperCase() === inputs[2]));
                displayTable(filterDuo);
                break;
            case (inputs[1] == ""):
                console.log(inputs);
                filterDuo = tableData.filter(e => (e.datetime === inputs[0] && e.state.toUpperCase() === inputs[2]));
                displayTable(filterDuo);
                break;
            case (inputs[0] !== "" && inputs[1] !== "" && inputs[2] !== ""):
                console.log(inputs);
                filterTrio = tableData.filter(e => (e.datetime === inputs[0] && e.shape.toUpperCase() === inputs[1] && e.state.toUpperCase() === inputs[2]));
                displayTable(filterTrio);
                break;

        }
        if (inputs[0] === "" && inputs[1] === "" && inputs[2] === "") {
            clearSearch()
        }

    }

    function clearSearch() {
        document.getElementById("datetime").value = "";
        document.getElementById("shape").value = "";
        document.getElementById("stateselector").value = "";

        //Select the table element to add the data to 
        var tbody = d3.select("tbody");

        // Remove any children from the table
        tbody.html("");
        // Revert to displaying all the UFO Sightings in a table format
        displayTable(tableData);
    }
})