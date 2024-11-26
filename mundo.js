$(document).ready(() => {

    var imgs = ["img/arg_flag.svg", "img/flag_sa.png", "img/aus_flag.png", "img/usa_can_flag.png", "img/bel_flag.png", "img/fra_flag.png", "img/hol_flag.jpg", "img/mex_flag.png", "img/nz_flag.svg", "img/uk_flag.svg", "img/uru_flag.png", "img/zim_flag.png", "img/ger_flag.png"]

    for (i = 1; i < 14; i++) {
        var img = $('#img' + i)
        img.attr('src', 'img/Blank.gif')

        $('#collapse' + i).on('show.bs.collapse', function () {
            $('#img' + this.id.replace('collapse', '')).attr('src', imgs[this.id.replace('collapse', '') - 1])
        })

        $('#collapse' + i).on('hidden.bs.collapse', function () {
            $('#img' + this.id.replace('collapse', '')).attr('src', 'img/Blank.gif')
        })
    }
})