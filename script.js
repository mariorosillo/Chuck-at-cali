"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("chuck");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patdZY7JU3h8IfHbL.70315336fdb36437142a92aa60e8f64feaca6e63ab8cb5462a9669fd11cf59ba`,
    },
  };

  await fetch(`https://api.airtable.com/v0/app8bAB3ENr8yfD7p/chuck`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let address = data.records[i].fields["Address"]; // here we are getting column values
        let name = data.records[i].fields["Name"]; //here we are using the Field ID to fecth the name property
        let photo = data.records[i].fields["Photo"];
        let number = data.records[i].fields["Number"];


        newHtml += `
        
         <div class="col-xl-4 cardImageText">
          <div class="card list move mb-5" >
          <a href="index.html?id=${data.records[i].id}">${photo
            ? `<img class="card-img-top rounded" alt="${name}" src="${photo[0].url}">`
            : ``
          }
          </a>
          <p class="card-key">${name}</p>
          <p class="card-key">${address}</p>
          <p class="card-key">${number}</p>
          </div>
          </div>
        </div>
    
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

function formattedString(value) {
  return value.split(",").join("<li>");
}

// function for our detail view
async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("chuck2");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patdZY7JU3h8IfHbL.70315336fdb36437142a92aa60e8f64feaca6e63ab8cb5462a9669fd11cf59ba`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/app8bAB3ENr8yfD7p/chuck/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let photo = data.fields["Photo"];
      let name = data.fields["Name"];
      let location = data.fields["Location"];
      let address = data.fields["Address"];
      let description = data.fields["Description"];
      let menu = data.fields["Menu"];
      let hours = data.fields["Hours"];
      let number = data.fields["Number"]

      let newHtml = `
       
 
    <div class="col d-flex justify-content-center align-items-center">
     ${menu
          ? `<img class="img-fluid back ms-4" alt="${name}" src="${photo[0].url}">`
          : ``
        }
   
    </div>
    
    <div class="col d-flex justify-content-center align-items-center desc">
      <div class="card-body">
        <h5 class="card-title bar">${name}</h5>
        <p class="card-text">${description}</p>
        <p class="card-text"><small>${address} <br> SF, CA ${location}</small></p>
      </div>
 


    </div>
    <div class="row g-3">
   
<div class="col d-flex justify-content-center align-items-center">
  
     <div class="moves">
<table class="table misc">
    <tbody>
    <tr>
      <th scope="row misc">Neighborhood</th>
      <td class="card-text">${location}</td>
    </tr>
    <tr>
      <th scope="row misc">Number</th>
      <td>${number}</td>
    </tr>

    <tr>
      <th scope="row misc">Links</th>
      <td colspan="2"><a href="${menu}" target="_blank"><button type="button" class="btn btn-primary btn-sm go">Website</button></a> </td>
    </tr>
  </tbody>
</table>
</div>
    </div>
    
    <div class="col d-flex justify-content-center align-items-center desc">
 
  <div class="hours-list hours shift">
    <div class="card-body">
      <h4 class="card-title">🕔 Hours</h4>
      <p class="card-text">${formattedString(hours)}</p>
      

     
    </div>
  </div>


    </div>



   
   </div> 



 
    



      `;

      jobsResultElement.innerHTML = newHtml;
    });
}











// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  getAllRecords(); // no id given, fetch summaries
}
