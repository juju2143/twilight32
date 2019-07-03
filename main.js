require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' }});
require(['vs/editor/editor.main'], main);

var editors = [];

function main() {
    newEditor(0);
    newRun(0);
    $('#loading').css('display', 'none');
}

function run(i) {
    i = parseInt(i, 10);
    var basic_out = $('#run-'+i+' .basic_out')[0];
    window.Basic(editors[i].getValue(), basic_out);
}

function newEditor(i)
{
    i = parseInt(i, 10);
    $('main').append('<section id="editor-'+i+'" checked><div class="editor"></div></section>');
    //$('#tabs ul').append('<li><a href="#editor-'+i+'">Editor '+i+'</a></li>');
    $('#tabs').append('<input name="tabs" type="radio" id="tab-editor-'+i+'" class="tab-input"/>');
    $('#tabs').append('<label for="tab-editor-'+i+'" class="tab-label">Editor</label>');
    editors[i] = monaco.editor.create($('#editor-'+i+' .editor')[0], {
        value: [
            'PRINT "Hello World!"',
            'FOR i = 1 to 10',
            '\tPRINT "Counting "; i',
            'NEXT i',
        ].join('\n'),
        language: 'basic',
        theme: "vs-dark",
        fontFamily: "VT323",
        fontSize: 20
    });
    $('#tab-editor-'+i).on('change', function(e) {
        if(this.checked)
        {
            $('section').css('display', 'none');
            $('#editor-'+i).css('display', 'block');
            editors[i].layout();
        }
    });
}

function newRun(i)
{
    i = parseInt(i, 10);
    $('main').append('<section id="run-'+i+'"><canvas class="basic_out" width="1280" height="960"></canvas></section>');
    //$('#tabs ul').append('<li><a href="#run-'+i+'" onclick="run('+i+')">Run '+i+'</a></li>');
    $('#tabs').append('<input name="tabs" type="radio" id="tab-run-'+i+'" class="tab-input"/>');
    $('#tabs').append('<label for="tab-run-'+i+'" class="tab-label">Run</label>');
    $('#tab-run-'+i).on('change', function(e) {
        if(this.checked)
        {
            $('section').css('display', 'none');
            $('#run-'+i).css('display', 'block');
            run(i);
        }
    });
}

$(window).on('resize', function()
{
    editors.forEach(function(e)
    {
        e.layout();
    });
});

$('.button-close').on('click', function(){
    $(this).closest('.dialog').css('display', 'none');
});

$('#menu-about').on('click', function(){
    $('#about').css('display', 'block');
});