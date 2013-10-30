/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var main = function (){
    var ctx = document.getElementById('display').getContext('2d');
    // Stroked triangle
    ctx.beginPath();
    ctx.moveTo(125,125);
    ctx.lineTo(125,250);
    ctx.lineTo(250,250);
    ctx.lineTo(250,125);
    ctx.closePath();
    ctx.stroke();
}
