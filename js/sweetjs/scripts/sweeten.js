requirejs.config({
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(["jquery"], function($) {
    require(["sweet"], function(sweet) {
        $(function(){
            window.sweeten = (function(){
                // the textareas to turn into CodeMirror testEditors
                var $textAreas = $(".editor");

                var testEditors = {};
                $textAreas.each(function(nb, textarea){
                    // replace with a CM testEditor
                    var testEditor = CodeMirror.fromTextArea(this, {
                        lineNumbers:true,
                        mode: "javascript"
                    });
                    testEditor.setOption("theme", "sweetprism");
                    testEditors[nb] = testEditor;

                    // add sweeten button and output div
                    var $editorDiv = $(textarea).next();
                    $editorDiv.after('<button onclick="sweeten('+ nb +');">' + 
                                  'Try it!</button><pre id="output-'+ nb +
                                  '" class="cm-s-sweetprism console"></pre>')
                });
                
                return function (nb) {
                    var $console = $("#output-" + nb);
                    $console.css("display", "block");
                    try {
                        var testEditor = testEditors[nb];
                        var result = sweet.compile(editor.getValue());
                        CodeMirror.runMode(result, "javascript", $console[0]);
                    } catch(e) {
                        $console.text(e);
                    }
                }
            })();
        });
    });
});