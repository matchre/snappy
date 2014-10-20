/* 
 * This is the raw (uncompiled) version of sweetWebmobinet:
 * the macros below will be used to execute webmobinet language in js envirenment
 * To compile this with node and sweetjs: sjs -o sweetmobinet_compiled.js sweetmobinet.js
 */



macro si {
  rule { $cond:expr... alors $action:expr(;)... finsi } => {
    if($cond...) { $action(;)... }
  }
  rule { $cond alors $action sinon $alternative finsi } => {
    if($cond...) { $action(;)... } else { $alternative(;)... }
  }
}

macro ajouter {
	rule{ à $var $value } => {
		$var += $value;
	}
}
macro attendre{
	rule{ $time sec. } => { wait($time); }
}
macro répéter {
	rule { indéfiniment $action:expr(;)... fin } => { repeatForever($action(,)...)  }
}

macro : {
  rule infix { $name:ident | $value:expr } => {
    $name = $value;
  }
}

macro dire {
	rule { $word:lit pendant $time:lit sec.} => { sayFor($word,$time); }
	rule { $word:lit } => { say ($word); }
}

macro avancer {
	rule { de $value:lit pas } => { move($value); }
}

macro aller {
	rule { à x:$x:lit y:$y:lit } => { moveAt($x,$y,true); }
}

aller à x:10 y:0
avancer de 10 pas
dire "salut"!
dire "salut" pendant 2 sec.
foo : 100
ajouter à foo 100
attendre 0.1 sec.
répéter indéfiniment alert('ok'); alert('repeat'); fin
si foo==100 alors alert('ok'); console.log('ok'); finsi
