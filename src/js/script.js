
//the concept is pretty simple. Get all section with the class "sec" to the height of the window and scroll to them whether
// the user scrolls on his wheel. since the usual overflow is hidden, the scroll can be adjusted the way we want it.
// The Idea is to create a fast scroll effect to every section and add scroll in animations to it

//well that was the first idear.... second idear was to create a on drag scroll effect to make it look smoother..
//_______________________________________________________________________________________________________________________________

//cursor from https://www.cssscript.com/interacitve-cursor-dot/#google_vignette because i don't want to do this myself
window.scrollTo(0, 0);
const $ = s => document.querySelector(s); //someone said i should do that. I dont really use it

const cursor = window.curDot({
    easing: 10

})

const cursor2 = window.curDot({
    easing: 2,
    diameter:20,
    borderColor:"transparent",
    background:"lightgrey"
})



cursor.over($(".hover1"), {
    background: "#fff",
    scale:1.5
});
cursor2.over($(".hover1"), {
    background: "rgba(255,255,255,0)",

});




//constants
const drag_tick = 40// how long we need to drag
let current_Page = 0 //dont change
const scroll_speed = 1000

function scrollToSection(section) { //this function is just scrolling to the object
    console.log("current Page: "+ current_Page)
    const topOffset = section[0].offsetTop;
    window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
    });
    insert_sidebar()//update the sidebar


}

//define all sections into a 2d array with their index and Element. (i don't know if the index is really needed, but I would like to have it if there are any later issues
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
function insert_sidebar() {
    const sidebar_element = document.getElementsByClassName("container-sidebar");
    sidebar_element[0].innerHTML = "";

    for (let i = 0; i < sections.length; i++) {
        if (i === current_Page) {
            sidebar_element[0].innerHTML += `<div class="box active"><div class="boxtransparent" id=${i}></div></div>`;
        } else {
            sidebar_element[0].innerHTML += `<div class="box"><div onclick="current_Page = ${i}; scrollToSection(sections[${i}]); ;" class="boxtransparent" id=${i}></div></div>`;
        }
    }
}
insert_sidebar()

function next_section() {
    const nextPage = current_Page + 1;
    if (nextPage < sections.length) {
        current_Page = nextPage;
        scrollToSection(sections[current_Page]);
    }
}

function last_section() {
    const prevPage = current_Page - 1;
    if (prevPage >= 0) {
        current_Page = prevPage;
        scrollToSection(sections[current_Page]);
    }
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


let isDragging = false;
let startY;
let dist = 0;

window.addEventListener('touchstart', function(e) {
    isDragging = true;
    startY = e.touches[0].clientY;
});

window.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    dist = startY - currentY;
});

window.addEventListener('touchend', function() {
    if (isDragging) {
        handleScrollDirection();
        isDragging = false;
    }
});

window.addEventListener('mousedown', function(e) {
    isDragging = true;
    startY = e.clientY;
});

window.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    const currentY = e.clientY;
    dist = startY - currentY;
    window.scrollBy(0, dist/30); //creates a smooth scroll effect.
});

window.addEventListener('mouseup', function() {
    if (isDragging) {
        handleScrollDirection();
        isDragging = false;
    }
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



var image = document.getElementsByClassName('full-screen-div');


