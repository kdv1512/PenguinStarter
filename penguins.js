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

var compareFinal = function(penguin1,penguin2)
{
    var final1 = d3.mean(penguin1.final.map(getGrade))
    var final2 = d3.mean(penguin2.final.map(getGrade))
    if (final1 == final2)
        {return 0}
    else if (final1 > final2)
        {return -1}
    else{return 1}
}
var sortOnFinal = function(classData)
{
d3.select("#final")
    .on("click", 
        function()
        {classData.sort(compareFinal)
        console.log("clicked")
    d3.select("table tbody")
    .selectAll("*")
    .remove()
    drawTable(classData) })
}


var failureFcn = function(penguin)
{
    console.log("Something went wrong", penguin);
}

classPromise.then(function(penguin){
    console.log("Data Retrieved Successfully", penguin); drawTable(penguin); sortOnFinal(penguin);
}, failureFcn)




