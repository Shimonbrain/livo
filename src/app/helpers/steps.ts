declare var $: any;

export function moveSteps(){
    $(".step-item").click(function () {
        $(".step-item").removeClass("active")
        $(this).addClass("active")
        var index = $("li.step-item").index($(this)) + 1
        $('#stepsTab a[href="#step'+index+'"]').tab('show')
    })

    $('#stepsTab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var index = $(e.target).data("item")
        $(".step-item").removeClass("active")
        $(`.step-item:nth-child(${index})`).addClass("active")
    })
}
