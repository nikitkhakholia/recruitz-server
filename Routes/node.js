App ={
    getcomp: function() {
        const api_url ="http://localhost:8000/listJobs";
        // console.log(api_url);
        data =this.getapi(api_url).then(data=>{
            
            for(var i = 0; i <= data.length; i++) {
                var a = "<tr  scope='row'><td>"+data[i].id+"</td><td>"+data[i].type+"</td><td>"+data[i].location+"</td><td>"+data[i].company+"</td><td>"+data[i].role+"</td></tr>";
               
                tbody.innerHTML += a;
            }
        });
    },  

   
    //{"id":12,"type":"Internship","location":"Bangalore","company":"TCS","role":"SDE1"}

    getapi:async function(url) {

        // Storing response
        const response = await fetch(url);
        // Storing data in form of JSON
        var data = await response.json();
        // console.log(data);


        return data;
    },

    getsearchid: function(id) {
        const api_url ="http://localhost:8000/findJob/"+id;
        // console.log(api_url);
        data =this.getapi(api_url).then(data=>{
            
            // for(var i = 0; i <= data.length; i++) {
            //     var a = "<tr  scope='row'><td>"+data[i].id+"</td><td>"+data[i].type+"</td><td>"+data[i].location+"</td><td>"+data[i].company+"</td><td>"+data[i].role+"</td></tr>";
                var a = "<tr scope='row'><td>"+data[0].id+"</td><td>"+data[0].type+"</td><td>"+data[0].location+"</td><td>"+data[0].company+"</td><td>"+data[0].role+"</td></tr>";
                tbody.innerHTML += a;
        });
    },
}

