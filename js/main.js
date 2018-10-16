var isDomReady, browserWidth, browserHeight;
var columnLimit = 3;
var imgDataObj = {};
var msnryInstanceArr = [];

/* INIT, RESIZE */
// Mozilla, Opera, Webkit 
if ( document.addEventListener ) {
    document.addEventListener( "DOMContentLoaded", function() {
        document.removeEventListener( "DOMContentLoaded", arguments.callee, false);
        onDomReady();
    }, false );
// If IE event model is used
} 
else if ( document.attachEvent ) {
    // ensure firing before onload
    document.attachEvent("onreadystatechange", function() {
        if ( document.readyState === "complete" ) {
            document.detachEvent( "onreadystatechange", arguments.callee );
            onDomReady();
        }
    });
}

addEvent(window, "resize", onBrowserResize);

function onDomReady() {
    isDomReady = true;
    // get browser sizes
    browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    
    // init stuff
    var currentPageIndex;
    switch(currentPage) {
        case 'home':
            document.getElementById('homeNavBtn').querySelector('.normal').style.display = 'none';
            document.getElementById('homeNavBtn').querySelector('.over').style.display = 'block';
            currentPageIndex = 0;
        break;
        case 'about':
            document.getElementById('aboutNavBtn').querySelector('.normal').style.display = 'none';
            document.getElementById('aboutNavBtn').querySelector('.over').style.display = 'block';
            currentPageIndex = 1;
        break;
        case 'testimonials':
            document.getElementById('testiesNavBtn').querySelector('.normal').style.display = 'none';
            document.getElementById('testiesNavBtn').querySelector('.over').style.display = 'block';
            currentPageIndex = 2;
        break;
        case 'services':
            document.getElementById('servicesNavBtn').querySelector('.normal').style.display = 'none';
            document.getElementById('servicesNavBtn').querySelector('.over').style.display = 'block';
            currentPageIndex = 3;
        break;
        default:
            if(currentPage == 'work-logo' || currentPage == 'work-poster' || currentPage == 'work-video') {
                document.getElementById('homeNavBtn').querySelector('.normal').style.display = 'none';
                document.getElementById('homeNavBtn').querySelector('.over').style.display = 'block';
                currentPageIndex = 0;
            }
        break;
    }
    var cElems = document.querySelectorAll(".mainNavMenuItem");
    for(var i = 0; i<cElems.length; i++) {
        if(i != currentPageIndex) {
            addEvent(cElems[i], 'mouseenter', function(evt) {
                evt.target.querySelector('.normal').style.display = 'none';
                evt.target.querySelector('.over').style.display = 'block';
            });
            addEvent(cElems[i], 'mouseleave', function(evt) {
                evt.target.querySelector('.normal').style.display = 'block';
                evt.target.querySelector('.over').style.display = 'none';
            });
        }
    }
    
    // init
    switch(currentPage) {
        case 'home':
            // work-menu
            var msnryh1 = new Masonry( '#mainWorkMenu', {
                itemSelector: '.grid-item',
                columnWidth: 321,
                gutter: 21
            });
            msnryInstanceArr.push(msnryh1);
            var msnryh2 = new Masonry( '#featuredWorkMenu', {
                itemSelector: '.grid-item',
                columnWidth: 321,
                gutter: 21
            });
            msnryInstanceArr.push(msnryh2);
        break;
        case 'about':
            // about
            var msnrya1 = new Masonry( '#aboutContent', {
                itemSelector: '.grid-item',
                columnWidth: 321,
                gutter: 21
            });
            msnryInstanceArr.push(msnrya1);
        break;
        case 'testimonials':
            // about
            var msnryt1 = new Masonry( '#testimonialsContent', {
                itemSelector: '.grid-item',
                columnWidth: 321,
                gutter: 21
            });
            msnryInstanceArr.push(msnryt1);
        break;
        case 'services':
            // services
            var msnrys1 = new Masonry( '#servicesContent', {
                itemSelector: '.grid-item',
                columnWidth: 321,
                gutter: 21
            });
            msnryInstanceArr.push(msnrys1);
        break;
        case 'work-logo':
            // logos
            var msnrywl = new Masonry( '#logosContent', {
                itemSelector: '.grid-item',
                columnWidth: 321,
                gutter: 21
            });
            msnryInstanceArr.push(msnrywl);
        break;
        case 'work-poster':
            // posters
            var msnrywp = new Masonry( '#postersContent', {
                itemSelector: '.grid-item',
                columnWidth: 321,
                gutter: 21
            });
            msnryInstanceArr.push(msnrywp);
        break;
        case 'work-video':
            // posters
            var msnrywv = new Masonry( '#videosContent', {
                itemSelector: '.grid-item',
                columnWidth: 321,
                gutter: 21
            });
            msnryInstanceArr.push(msnrywv);
        break;
    }

    // mobile menu btn
    addEvent(document.getElementById('mobileMenuBtn'), 'click', onMobileBtnClick);
    addEvent(document.getElementById('mobileMenuCloseBtn'), 'click', onMobileMenuCloseBtnClick);

    imagesLoaded( document.querySelector('.pageContentWrapper'), function( instance ) {
        window.scrollTo(0, 0);
    });
    
    adjustElementsOnResize();
}

window.onload = onEverythingLoaded;

function onEverythingLoaded() {
    document.body.style.display = "block";
    for(var i = 0; i<msnryInstanceArr.length; i++) {
        msnryInstanceArr[i].layout();
    }
}

function onMobileBtnClick() {
    document.getElementById('mobileMenuOverlay').style.display = "block";
}

function onMobileMenuCloseBtnClick() {
    document.getElementById('mobileMenuOverlay').style.display = "none";
}

function onBrowserResize() {
    if(isDomReady) {
        // get browser sizes
        browserWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        browserHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        adjustElementsOnResize();
    }
}

function adjustElementsOnResize() {
    
}

function addEvent(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
}