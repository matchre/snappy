requirejs.config({
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(["./sweet", "./syntax"], function(sweet, syn) {
    var storage_code = 'editor_code';
    var storage_mode = 'editor_mode';

    var starting_code = $("#editor").text();
    var compileWithSourcemap = $("body").attr("data-sourcemap") === "true";

    var testEditor = CodeMirror.fromTextArea($('#editor')[0], {
        lineNumbers: true,
        smartIndent: false,
        indentWithTabs: true,
        tabSize: 4,
        autofocus: true,
        theme: 'solarized dark'
    });

    var currentStep = 1;

    if (window.location.hash) {
        testEditor.setValue(decodeURI(window.location.hash.slice(1)));
    } else {
        testEditor.setValue(localStorage[storage_code] ? localStorage[storage_code] : starting_code);
    }
    if(localStorage[storage_mode]) {
        testEditor.setOption("keyMap", localStorage[storage_mode]);
    }

    var output = CodeMirror.fromTextArea($('#output')[0], {
        lineNumbers: true,
        theme: 'solarized dark',
        readOnly: true
    });

    $('#btn-vim').click(function() {
        testEditor.setOption('keyMap', 'vim');
        testEditor.focus();
        localStorage[storage_mode] = "vim";
    });
    $('#btn-emacs').click(function() {
        testEditor.setOption('keyMap', 'emacs');
        testEditor.focus();
        localStorage[storage_mode] = "emacs";
    });

    $('#btn-step').click(function() {
        var unparsedString = syn.prettyPrint(
            sweet.expand(editor.getValue(), 
                         undefined, 
                         currentStep++),
            $("#ck-hygiene").prop("checked"));
        $("#lab-step").text(currentStep);
        output.setValue(unparsedString); 
    });

    var updateTimeout;
    testEditor.on("change", function(e) {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(updateExpand, 200);
    });

    function updateExpand() {
        var code = testEditor.getValue();
        var expanded, compiled, res;
        window.location = "editor.html#" + encodeURI(code);
        localStorage[storage_code] = code;
        try {
            if (compileWithSourcemap) {
                res = sweet.compile(code, {
                    sourceMap: true,
                    filename: "test.js",
                    readableNames: true
                });
            } else {
                res = sweet.compile(code, {
                    sourceMap: false,
                    readableNames: true
                });
            }
            compiled = res.code;
            output.setValue(compiled);
//            alert('Mobinet Compilation');
            $('#errors').text('');
            $('#errors').hide();
        } catch (e) {
            $('#errors').text(e);
            $('#errors').show();
        }
    }
    updateExpand();
});
