var classPromise = d3.json("classData.json")

var getGrade = function(student)
{
    return student.grade;
}
var drawTable = function(penguin)
{
    var rows = d3.select("table tbody")
    .selectAll("tr")
    .data(penguin)
    .enter()
    .append("tr")
    
    rows.append("td")
    .append("img")
    .attr("src", function(penguin){
        return "imgs/"+penguin.picture;
    })
    
    rows.append("td")
    .text(function(penguin){
        return d3.mean(penguin.quizes.map(getGrade)).toFixed(2);
    })
    
    
     rows.append("td")
    .text(function(penguin){
        return d3.mean(penguin.homework.map(getGrade)).toFixed(2);
    })
    
    
    rows.append("td")
    .text(function(penguin){
        return d3.mean(penguin.test.map(getGrade));
    })
    
   
    rows.append("td")
    .text(function(penguin){
        return d3.mean(penguin.final.map(getGrade));
    })    

}

var initHeaders = function(penguin)
{
    d3.select("#final")
    .on("click",function()
    { console.log("clicked");
        penguin.sort(function(a,b)
        {
            if(a.grade > b.grade) {return 1}
            else if(a.grade < b.grade) {return -1}
            else { return 0;}
        });
        clearTable();
        drawTable(penguin);
    });
}


var failureFcn = function(penguin)
{
    console.log("Something went wrong", penguin);
}

classPromise.then(function(penguin){
    console.log("Data Retrieved Successfully", penguin); drawTable(penguin); initHeaders(penguin);
}, failureFcn)




