(function(){$(function(){var n,r;return n=function(){var n;return n={horizontalScroll:!0,mouseWheel:!0,contentTouchScroll:!0,scrollInertia:0},$(".landing_scrollable").mCustomScrollbar(n)},r=function(){var n,r,o;return n=$(".container img"),r=n.length,o=0,n.on("load",function(){return o++,o===r?$(".container").css("background","rgba(0,0,0,0.5)"):void 0}),n.each(function(){return this.complete?$(this).trigger("load"):void 0})},n(),r()})}).call(this);