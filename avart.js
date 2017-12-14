
//////// Scroll animation starting point
let options = {
    threshold: 0.7
}
///////Grabing elements for scroll animation
let imagesHaveAnimated = false;
let preloaderHaveRunTheFirstTime = false;
let img1 = document.querySelector("#about1");
let img2 = document.querySelector("#about2");
let img3 = document.querySelector("#about3");
let border = document.querySelector("#right");
let text = document.querySelector("#righttext");
let about = document.querySelector("#abouttitle");
let services = document.querySelector("#services");
let portfolio = document.querySelector("#port");
let servicesicon1 = document.querySelector(".one");
let servicesicon2 = document.querySelector(".two");
let servicesicon3 = document.querySelector(".three");
let servicesicon4 = document.querySelector(".four");


//////////Scroll animations, codes taken from     https://greensock.com/tweenlite
let io = new IntersectionObserver(entries => {
    entries.forEach(function(entry){
        if(entry.isIntersecting && imagesHaveAnimated==false && preloaderHaveRunTheFirstTime==true){
        TweenLite.from(img1, 2.5, {opacity: 0.3, x: -500});
        TweenLite.from(img2, 1.5, {opacity: 0.3, x: -500});
        TweenLite.from(img3, 2, {opacity: 0.3, x: -500});
        TweenLite.from(border, 2, {opacity: 0.3, x: 500});
        TweenLite.from(text, 4, {opacity: 0, delay:2}); 
        TweenLite.from(about, 2, {opacity:0, scale:0, rotationX:180 });
        TweenLite.from(services, 4, {opacity: 0, delay:2});
        TweenLite.from(portfolio, 4, {opacity: 0, delay:2});
        TweenLite.from(servicesicon1, 2, {opacity: 0.3, x: 1500,delay:2});
        TweenLite.from(servicesicon2, 2, {opacity: 0.3, x: -1500,delay:2});
        TweenLite.from(servicesicon3, 2, {opacity: 0.3, x: 1500,delay:2});
        TweenLite.from(servicesicon4, 2, {opacity: 0.3, x: -1500,delay:2});
        imagesHaveAnimated = true;
     }
        })
   
}, 
 options   
);
// observing an elements
io.observe(document.querySelector ("#about1"));
io.observe(document.querySelector("#about2"));
io.observe(document.querySelector("#about3"));
io.observe(document.querySelector("#right"));
io.observe(document.querySelector("#righttext"));        
io.observe(document.querySelector("#abouttitle"));
io.observe(document.querySelector("#services"));
io.observe(document.querySelector("#port"));          
io.observe(document.querySelector(".one"));
io.observe(document.querySelector(".two"));
io.observe(document.querySelector(".three"));
io.observe(document.querySelector(".four"));

//////////////preloader animation///////////////
let preloader = document.querySelector("#preloader");//preloader
let loader = document.querySelector("#loader-wrapper"); // preloader background overlay


    
////////////////////////////////////////////////////////////////////////

//////////////// Code for Show More button, loading more content after cklicking
let currentPage=1;
let button = document.querySelector("#loadmore")
button.addEventListener("click", function(){
    currentPage++
    getAllArtworks();
})
//////////// getting all artworks data from wordpress
function getAllArtworks() {
    fetch("http://www.editagud.com/AVGallery/wp-json/wp/v2/artwork?_embed&per_page=10&page="+currentPage)
        .then(res => res.json())
        .then(showArtworks);
}
///////////////getting all artworks data by category from wordpress
function getArtworkByCategory(categoryId) {
    fetch("http://editagud.com/AVGallery/wp-json/wp/v2/artwork?_embed&per_page=100&categories=" + categoryId)
        .then(res => res.json())
        .then(showArtworks);
}

///////////////getting Menu (categories)
function getMenu() {
    fetch("http://www.editagud.com/AVGallery/wp-json/wp/v2/categories")
        .then(res => res.json())
        .then(showMenu);
}

////////////////// showing Menu (categories)
function showMenu(categories) {
    preloaderHaveRunTheFirstTime=true;
    let list = document.querySelector("#linkTemplate").content;
    categories.forEach(function (category) {
        let clone = list.cloneNode(true);
        let parent = document.querySelector('.category-menu');
        clone.querySelector('a').textContent = category.name;
        clone.querySelector('a').setAttribute('href', 'index.html?categoryid=' + category.id);
        clone.querySelector('a').addEventListener("click", function(e){
            preloader.classList.remove("hidden"); //preloader
            e.preventDefault();
            document.querySelector("#list").innerHTML="";
            getArtworkByCategory(category.id);
        })
        parent.appendChild(clone);
        });
}
//////////////// Showing all Artwork
function showArtworks(data) {
    let list = document.querySelector("#list"); // adding content
    let template = document.querySelector("#artworkTemplate").content; // grabing the artworkTemplate
    preloader.classList.add("hidden");
    loader.classList.add("hidden");
    
    // Cloning each artwork content items
    data.forEach(function (theArtwork) {
        let clone = template.cloneNode(true);///cloning template
        let title = clone.querySelector("h2"); // cloning title 
        let excerpt = clone.querySelector(".excerpt");//cloning excerpt
        let img = clone.querySelector("img"); // cloning image 
        let link = clone.querySelector("a.read-more");//cloning link

        //adding title, genre, date, material,ect. yo article
        title.textContent = theArtwork.title.rendered; //showing title from data
        excerpt.innerHTML = theArtwork.excerpt.rendered.slice(theArtwork.excerpt.rendered.indexOf('<'), theArtwork.excerpt.rendered.lastIndexOf('<a'));
        theArtwork.excerpt.rendered; //showing excerpt from data
        img.setAttribute("src", theArtwork._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);//showing image from data
        link.setAttribute("href", "artwork.html?id=" + theArtwork.id); // linking read more with unique artwork.html
        
        
        list.appendChild(clone);
        
    });

}

let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let categoryid = searchParams.get("categoryid");

getMenu();
if(categoryid){
    getArtworkByCategory(categoryid);
}
    else {
getAllArtworks();
}



