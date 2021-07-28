let myLeads = [];
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const savetabBtn = document.getElementById("savetab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

saveBtn.addEventListener("click", function() {  
    myLeads.push(inputEl.value);  
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
})

savetabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads);
    })
    
})

//Escaping from DOM Manipulation cost. Due this reason I didn't use DOM operation inside "for" loop.

function render(leads){
let listItems = "";
for(let i=0; i<leads.length;i++){
listItems += "<li><a target='_blank' href='" + leads[i] + "'>" + leads[i] + "</a></li>";
}
ulEl.innerHTML = listItems;
}