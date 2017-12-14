

// getting single artwork for artwork.html
function getSingleArtworkById(artworkId){
    fetch("http://www.editagud.com/AVGallery/wp-json/wp/v2/artwork/" + artworkId + "/?_embed")
        .then(res => res.json())
        .then(showSingleArtwork);
}
//showing single artwork for artwork.html
function showSingleArtwork(data) {
    document.querySelector('#single h2').textContent = data.title.rendered; //grabing title 
    document.querySelector('#single img').setAttribute('src', data._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url); // grabing image 
    document.querySelector('#single .price span').textContent = data.acf.price;// grabing price
    document.querySelector('#single .genre span').textContent = data.acf.genre;// grabing genre
    document.querySelector('#single .date span').textContent =data.acf.date.slice(6,8) + '/' + data.acf.date.slice(4,6) + '/' + data.acf.date.slice(0,4); // grabing date
    document.querySelector('#single .material span').textContent = data.acf.material;// grabing material
    document.querySelector('#single .canvas span').textContent = data.acf.canvas;//grabing canvas
    document.querySelector('#single .content').innerHTML = data.content.rendered;// grabing content
}
function showArtworks(data) {
    // Cloning each artwork content items
    data.forEach(function (theArtwork) {
        let clone = template.cloneNode(true);//cloning for each article
        let title = clone.querySelector("h2"); // cloning title 
        let excerpt = clone.querySelector(".excerpt");// cloning excerpt
        let img = clone.querySelector("img"); // cloning image 
        let price = clone.querySelector(".price span");// cloning price
        let genre = clone.querySelector(".genre span");// cloning genre
        let date = clone.querySelector(".date span");// cloning date
        let material = clone.querySelector(".material span");// cloning material
        let canvas = clone.querySelector(".canvas span");// cloning canvas 
    
        //adding title, genre, date, material,ect. to article
        title.textContent = theArtwork.title.rendered; //showing title from data
        excerpt.innerHTML = theArtwork.excerpt.rendered.slice(theArtwork.excerpt.rendered.indexOf('<'), theArtwork.excerpt.rendered.lastIndexOf('<a'));//showing excerpt from data
        theArtwork.excerpt.rendered; //showing excerpt from data
        img.setAttribute("src", theArtwork._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);//showing image from data
         genre.textContent = theArtwork.acf.genre;//showing genre from data
         date.textContent = theArtwork.acf.date; //showing date from data
        material.textContent = theArtwork.acf.material; //showing material from data
        canvas.textContent = theArtwork.acf.canvas;//showing canvas cfrom data
         price.textContent = theArtwork.acf.price; //showing price from data
        
        list.appendChild(clone);
        
    });

}
let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");


if(id){
 getSingleArtworkById(id);   
 }
 else{

 }  
