var SUCCESS = [1, 2, 3, 4, 5, 6, 7, 8, 0];
var emptyPosition = 8;
var randomPosition = [];
var step = 0;
var randomBlock = function() { //图片随机位置
    step = 0;
    $('.step').html(step);
    var arr = $.extend([], SUCCESS);
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    randomPosition = arr;
    for (var i in arr) {
        if (arr[i] == 0) {
            emptyPosition = parseInt(i);
        }
        $('#main>div').eq(arr[i]).attr('data-index', i).css({
            left: 100 * (i % 3),
            top: 100 * (Math.floor(i / 3))
        })
    }
}

var change = function() { //换图
    var random = Math.round(Math.random() * 9 + 1);
    console.log(random);
    $('.block').css('background-image', "url(img/bg_" + random + ".jpg)");
    randomBlock()
};
var updatePosition = function(p1, p2) {
    var tmp1 = [];
    var end = ['8', '0', '1', '2', '3', '4', '5', '6', '7'];
    emptyPosition = p2;
    step++;
    $(".step").html(step);
    $("#main>div").each(function() {
        tmp1.push($(this).attr('data-index'));
    })
    if (tmp1.toString() === end.toString()) {
        $('#success').show()
    }
}

var up = function() {
    if (emptyPosition < 6) {
        var targetIndex = parseInt(emptyPosition) + 3; //需要up的块
        $("#main>div[data-index='" + targetIndex + "']").animate({ //移动up块 改变top值和data-index
            top: '-=100px'
        }, 100, function() {
            $(this).attr('data-index', targetIndex - 3)
        });
        $("#main>div[data-index='" + emptyPosition + "']").animate({ //target的index-data给到empty
            top: '+=100px'
        }, 100, function() {
            $(this).attr('data-index', targetIndex);
            updatePosition(emptyPosition, targetIndex)
        })
    }
};
var down = function() {
    if (emptyPosition > 2) {
        var targetIndex = parseInt(emptyPosition) - 3;
        $("#main>div[data-index='" + targetIndex + "']").animate({
            top: '+=100px'
        }, 100, function() {
            $(this).attr('data-index', targetIndex + 3)
        });
        $("#main>div[data-index='" + emptyPosition + "']").animate({
            top: '-=100px'
        }, 100, function() {
            $(this).attr('data-index', targetIndex);
            updatePosition(emptyPosition, targetIndex)
        })
    }
};
var left = function() {
    if (emptyPosition % 3 < 2) {
        var targetIndex = parseInt(emptyPosition) + 1;
        $("#main>div[data-index='" + targetIndex + "']").animate({ //[data-index='5']
            left: '-=100px'
        }, 100, function() {
            $(this).attr('data-index', targetIndex - 1)
        });
        $("#main>div[data-index='" + emptyPosition + "']").animate({
            left: "+=100px"
        }, 100, function() {
            $(this).attr('data-index', targetIndex);
            updatePosition(emptyPosition, targetIndex)
        })
    }
}
var right = function() {
    if (emptyPosition % 3 > 0) {
        var targetIndex = parseInt(emptyPosition) - 1;
        $("#main>div[data-index='" + targetIndex + "']").animate({
            left: '+=100px'
        }, 100, function() {
            $(this).attr('data-index', targetIndex + 1)
        });
        $("#main>div[data-index='" + emptyPosition + "']").animate({
            left: '-=100px'
        }, 100, function() {
            $(this).attr('data-index', targetIndex);
            updatePosition(emptyPosition, targetIndex)
        })
    }
}
$(document).ready(function() {
    change();
}).on('keypress', function(e) {
    if (!$("#main>div").is(":animated")) {
        switch (e.keyCode) {
            case 119: //w上
                up();
                break
            case 115: //s下
                down();
                break
            case 97: //a左
                left();
                break
            case 100: //d右
                right();
                break
        }
    }
})