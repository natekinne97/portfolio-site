// mobile section
// this will handle all the button inputs on 
// the mobile screen

// shows the menu items when burger is clicked
function showMenu(){
    $(document).on('click', '.fa-bars', function(){
        styleMenuAndItems();
    });
}

//change style of menu items for click
function styleMenuAndItems(){
    // change navbar to 100% height for better view
    $('nav').toggleClass('mobile-click');
    // resize the imaege
    $('.top-bar img').toggleClass('img-clicked-style');
    // display links
    $('nav ul').toggleClass('nav-links-mobile');
}


// links clicked
function linksClicked(){
    $(document).on('click', '.nav-links a', function(){
        styleMenuAndItems();
    });
}

// Everything for mobile functioning
function mobileFunctions(){
    showMenu();
    linksClicked();
}

// fancy animation for anchors clicked
function anchorAnimation(menuItems) {
    menuItems.on('click', function(e){
        let href = $(this).attr('href'),
            offsetTop = href === "#" ? 0 : $(href).offset().top - 100;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });
}

// Desktop side. highlight menu items on scroll. 
function checkSectionVisible(){

    // get nav links and find corresponding sections
    let menu = $('.nav-links'),
        // list of all items
        menuItems = menu.find('a'),
        // anchors to menu items
        scrollItems = menuItems.map(function () {
            let item = $($(this).attr('href'));
            if(item.length){return item;}
        });
    //   menu animations Purpose of placing this here is to prevent globals
    anchorAnimation(menuItems);

    $(window).scroll(function(){
        // get conainter position
        let fromTop = $(this).scrollTop() + 200;
        
        // get id of current scroll item
        let cur = scrollItems.map(function(){
            if($(this).offset().top < fromTop)
                return this;
        });

        // get current element
        cur = cur[cur.length-1];
        let id = cur && cur.length ? cur[0].id : "";
       
        // Set/remove active class
        menuItems
            .parent().removeClass("active-link")
            .end().filter("[href='#" + id + "']").parent().addClass("active-link");

    });
}

(function(){
mobileFunctions();
checkSectionVisible();
}());