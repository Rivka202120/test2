$(() => {

    let arrCountries = [];
    let arrRegion = {};

    function getAllCountries() {
        $.get('https://restcountries.com/v3.1/all', countries => {
            console.log(countries);
            for (const c of countries) {
                arrCountries.push(c);
            }
        })
    }

    getAllCountries();


    function showData(countries) {
        $(".summery").html("Total countries result:  "+ countries.length);
        let sum = 0;
        for (const c of countries) {
            sum += c.population;
        }
        $(".population").html(
            "Total Countries Population:  "+
            sum
        )
        $(".byCountries").html("Average Population: "+  (sum / countries.length));
        creatTable(countries);
        creatTableByRegion(countries);
    }

    $('#all').on("click", () => {
        $.get('https://restcountries.com/v3.1/all', countries => {
            showData(countries);
        })
    });

    $('#btnSearch').on("click", () => {
        $.get('https://restcountries.com/v3.1/name/' + $('#inpSearch').val(), countries => {
            showData(countries);
        })
    });


    function creatTable(countries) {
        const table = $("<table></table>");
        table.html(`
    <thead>
        <tr>
        <th>Country Name</th>
        <th>Number of citizens</th>       
         </tr>
    </thead>`)
        for (const c of countries) {
            const tr = $("<tr></tr>")
            tr.html(`
        <td>${c.name.common}</td>
        <td>${c.population}</td>
        `)
            table.append(tr);
        }
        $(".byCountries").append(table);
    }

    
    function creatTableByRegion(countries) {
        const table2 = $("<table></table>");
        table2.html(`
    <thead>
        <tr>
        <th>Region</th>
        <th>Number of countries</th>       
         </tr>
    </thead>`)
        for (const c of countries) {
            if (arrRegion[c.region]) {
                arrRegion[c.region]++;
            }
            else {
                arrRegion[c.region] = 1;
            }
        }
        console.log(arrRegion);
        $.each(arrRegion, function (key, value) {
            // console.log(key, value);
            const tr = $("<tr></tr>")
            tr.html(`
        <td>${key}</td>
        <td>${value}</td>
        `)
            table2.append(tr);
        })
        $(".byCountries").append(table2);
    }



})