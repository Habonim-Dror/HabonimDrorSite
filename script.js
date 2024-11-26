$(document).ready(function () {

    function carousel(n) {
        $("#myCarousel" + n).on("slide.bs.carousel", function (e) {
            var $e = $(e.relatedTarget);
            var idx = $e.index();
            var itemsPerSlide = 3;
            var totalItems = $(".carousel-item." + n).length;

            if (idx >= totalItems - (itemsPerSlide - 1)) {
                var it = itemsPerSlide - (totalItems - idx);
                for (var i = 0; i < it; i++) {
                    // append slides to end
                    if (e.direction == "left") {
                        $(".carousel-item." + n)
                            .eq(i)
                            .appendTo(".carousel-inner." + n);
                    } else {
                        $(".carousel-item." + n)
                            .eq(0)
                            .appendTo($(this).find(".carousel-inner." + n));
                    }
                }
            }
        })
    }
    
    carousel(1)
    carousel(2)
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(function () {
  $('[data-toggle="popover"]').popover()
})

