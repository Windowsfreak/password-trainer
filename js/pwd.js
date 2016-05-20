/**
 * Created by lazer on 19.05.2016.
 */

getEditDistance = function(a, b){
    if(a.length == 0) return b.length;
    if(b.length == 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
        for(j = 1; j <= a.length; j++){
            if(b.charAt(i-1) == a.charAt(j-1)){
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                    Math.min(matrix[i][j-1] + 1, // insertion
                        matrix[i-1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
};

$(function() {
    var pwd = $('#pwd');
    var lg = $('.list-group');
    var rv = $('.reveal');
    $('.btn').click(function() {
        var tmp = pwd.val().trim();
        if (tmp.length == 0) {
            rv.show('slow');
            lg.show('slow');
            return;
        }
        var slv = $('.text-success').text();
        $('.text-danger').text(tmp);
        pwd.val('');
        var score = getEditDistance(tmp, slv);
        $('.score').text(score);
        $('.l').hide();
        if (score > slv.length / 2) {
            $('.l4').show();
        } else if (score == 0) {
            $('.l1').show();
        } else if (score > slv.length / 4) {
            $('.l3').show();
        } else {
            $('.l2').show();
        }
        if (score == 1) {
            $('.sg').show();
            $('.pl').hide();
        } else {
            $('.sg').hide();
            $('.pl').show();
        }
        rv.hide();
        lg.hide().show('slow');
    });

    pwd.keypress(function (e) {
        if (e.which == 13) {
            $('.btn-primary').click();
            return false;
        }
    }).focus();

    $('.btn-reveal').click(function() {
        $('.reveal').show('slow');
    });

    $('.btn-success').click(function() {
        localStorage.setItem('pwd', $('.text-danger').text().trim());
        $('.text-success').text(localStorage.getItem('pwd').trim());
    });

    lg.hide();
    $('.l').hide();

    if (localStorage.getItem('pwd') != null) {
        $('.text-success').text(localStorage.getItem('pwd').trim());
    }
});
