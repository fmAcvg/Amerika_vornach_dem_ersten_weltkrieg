
//the concept is pretty simple. Get all section with the class "sec" to the height of the window and scroll to them whether
// the user scrolls on his wheel. since the usual overflow is hidden, the scroll can be adjusted the way we want it.
// The Idea is to create a fast scroll effect to every section and add scroll in animations to it

//well that was the first idear.... second idear was to create a on drag scroll effect to make it look smoother..
//_______________________________________________________________________________________________________________________________


//cursor from https://www.cssscript.com/interacitve-cursor-dot/#google_vignette because i don't want to do this myself



const cursor = window.curDot({

})
//constants
const drag_tick = 10 // how long we need to drag
let current_Page = 0 //dont change
const scroll_speed = 1000
//define all sections into a 2d array with their index and Element. (i don't know if the index is really needed, but I would like to have it if there are any later issues
function scrollToSection(section) { //this function is just scrolling to the object
    const topOffset = section[0].offsetTop;
    add_animation_class()
    window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
    });
    current_Page += 1
}

function add_animation_class(){

}

//preventing default scroll because its just cooler yk
function define_all_sections() {
    const returningArray = []
    const all_sections = document.querySelectorAll(".sec");
    all_sections.forEach(function(section, index) {
        returningArray.push([section, index]);
    });
    console.log(returningArray)
    return returningArray;

}

sections = define_all_sections();

let scroll_counter = 0;

function next_section(){
    scroll_counter +=1
    scrollToSection(sections[scroll_counter])
}
function last_section(){
    scroll_counter -=1
    scrollToSection(sections[scroll_counter])
}

//test
document.addEventListener('keydown', (event) => {

    var name = event.key;
    var code = event.code;
    if (event.key == "e"){
        next_section();
    }
    if (event.key == "q"){
        last_section();
    }
}, false);


let startY;
let dist = 0;

window.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
});

window.addEventListener('touchmove', function(e) {
    const currentY = e.touches[0].clientY;
    dist = startY - currentY;
    sections[scroll_counter][0].style.marginTop += dist
});

window.addEventListener('touchend', function() {
    handleScrollDirection();
});

window.addEventListener('mousedown', function(e) {
    startY = e.clientY;

});

window.addEventListener('mousemove', function(e) {
    const currentY = e.clientY;
    dist = startY - currentY;
});

window.addEventListener('mouseup', function() {
    handleScrollDirection();
});

function handleScrollDirection() {
    if (dist > drag_tick) {
        next_section();
    } else if (dist < -drag_tick) {
        last_section();
    }
    // Reset distance for the next movement
    dist = 0;
}





//cursor

