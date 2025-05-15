

// function getuser() {
//     return new Promise( (res,rej)=> {
//         res({id:1,name:"Harsh"})
//     });
// }

// function getposts(userid) {
//     return new Promise( (res,rej) => {
//         res(["titel 1","title 2"])
//     });
// }

// function getcomments(postid) {
//     return new Promise( (res,rej) => {
//         res(["great post","amazing cnotent","you rocked"]);
//     })
// }


// getuser().then(function(data){
//     console.log(data);
//     return getposts(data.id);
// })
// .then(function(titles){
//     console.log(titles);
//     return getcomments("ancidiwn")
// })
// .then(function(cmmt){
//     console.log(cmmt);
    
// })
// .finally(function(){
//     console.log("All data are received");
// })

// function fakeapicall(endpoint) {
//     const data = {
//         users : ["harsh","shivam","Dhruv"],
//         posts : ["hey champs","great going everwhere","let build see"]
//     }

//     let delay = Math.random()*2000+1000;
//     return new Promise((res,rej) => {
//         setTimeout(function(){
//             res(data[endpoint]);
//         },delay)
//     })
// };

// fakeapicall("users").then(function(data){
//     console.log(data);
// })

// fakeapicall("posts").then(function(data) {
//     console.log(data);
// })


let searchbtn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp");
let card = document.querySelector(".card");

function getofiledata(username){
    return fetch(`https://api.github.com/users/${username}`).then( (raw) => {
        if(!raw) throw new Error("User NOt found");
        return raw.json();
    })
}


function getrepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then( (raw) => {
        if(!raw) throw new Error("Failed to fetch response..");
        return raw.json();
    })

}

function decoratedata(details){
    console.log(details);
    
    let data = `<div class="p-6 bg-blue-950 rounded-xl shadow-md border border-blue-800 flex flex-col md:flex-row gap-6 items-center md:items-start text-left">
            <img src="${details.avatar_url}" alt="${details.login}" class="h-24 w-24 rounded-full border border-blue-700 object-cover" />
            <div>
              <h2 class="text-2xl font-bold text-white">${details.name || 'No Name Provided'}</h2>
              <p class="text-blue-400 mb-2">@${details.login}</p>
              <p class="text-gray-300 mb-3">${details.bio ? details.bio : ""}</p>

              <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-blue-300 mb-4">
                <div><span class="font-semibold text-white">Followers:</span> ${details.followers}</div>
                <div><span class="font-semibold text-white">Following:</span> ${details.following}</div>
                <div><span class="font-semibold text-white">Public Repos:</span> ${details.public_repos}</div>
                <div><span class="font-semibold text-white">Location:</span> ${details.location || 'N/A'}</div>
                <div><span class="font-semibold text-white">Company:</span> ${details.company || 'N/A'}</div>
                <div><span class="font-semibold text-white">Blog:</span> ${details.blog ? `<a href="${details.blog}" class="underline" target="_blank">${user.blog}</a>` : 'N/A'}</div>
              </div>

              <a href="${details.html_url}" target="_blank" class="inline-block mt-2 text-blue-400 hover:underline">
                🔗 View GitHub Profile
              </a>
            </div>
          </div>`

          card.innerHTML=data;
    
}

getrepos("dheeraj1174").then(function(data){
    console.log(data);
})



searchbtn.addEventListener("click",function() {
    let username = usernameinp.value.trim();

    if(username.length > 0){
        getofiledata(username).then((data)=>{
            decoratedata(data);
            // console.log(data);
        });
    }
    else {
        alert();
    }
})