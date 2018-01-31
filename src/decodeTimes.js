// It`s from http://www.minsktrans.by/city/common/js/StopsInfo213.js  //31.01.2018

function decode(encoded_data) {
    
    var timetable = []; // atkoduoti laikai
    var weekdays = []; // atkoduotos savaites dienos
    var valid_from = []; // isigaliojimo datos
    var valid_to   = []; // pasibaigimo datos
        
    var w; // laiku lenteles plotis, gausim atkoduodami reisu pradzias
    var h; // laiku lenteles aukstis;
    
    var times = encoded_data.split(",");
    var i, prev_t;
    var i_max = times.length;
    
    var zero_ground=[], plus = "+", minus = "-";
    
    for (i = -1, w = 0, h=0, prev_t = 0; ++i < i_max;) { // atkoduojam reisu pradzios laikus
        var t = times[i];
        
        if (t == "") { //pasibaige reisu pradzios
            break;
        }
        
        var tag = t.charAt(0);
        if (tag == plus || (tag == minus && t.charAt(1)=="0")) {
            zero_ground[i] = "1";
        }
        
        prev_t += +(t);
        timetable[w++] = prev_t;
    }   
        
    for (var j = zero_ground.length; --j >= 0;) {
        if (!zero_ground[j]) {
            zero_ground[j] = "0";
        }    
    }
    
    // atkoduojame isigaliojimo datas
    for (var j = 0; ++i < i_max;) {
        var day = +(times[i]); // skaitom isigaliojimo data
        var k = times[++i]; // kiek kartu pakartoti
        
        if (k == "") { // pabaiga
            k = w - j; // irasysim reiksme i likusius elementus
            i_max = 0; // kad iseitu is atkodavimo ciklo
        }
        else {
            k = +(k);
        }
        
        while (k-- > 0) {
            valid_from[j++] = day;
        }
    }
    
    // atkoduojame pasibaigimo datas
    --i;
    
    for (var j = 0, i_max = times.length; ++i < i_max;) {
        var day = +(times[i]); // pasibaigimo data
        var k = times[++i]; // kiek kartu pakartoti
        
        if (k == "") { // pabaiga
            k = w - j; // irasysim reiksme i likusius elementus
            i_max = 0; // kad iseitu is atkodavimo ciklo
        }
        else {
            k = +(k);
        }
        
        while (k-- > 0) {
            valid_to[j++] = day;
        }
    }
        
    // atkoduojame savaites dienas
    --i;
    
    for (var j = 0, i_max = times.length; ++i < i_max;) {
        var weekday = times[i]; // skaitom savaites dienas
        var k = times[++i]; // kiek kartu pakartoti
        
        if (k == "") { // pabaiga
            k = w - j; // irasysim savaites dienas i likusius elementus
            i_max = 0; // kad iseitu is savaites dienu atkodavimo cikla
        }
        else {
            k = +(k);
        }
        
        while (k-- > 0) {
            weekdays[j++] = weekday;
        }
    } 

    // atkoduojame vaziavimo laikus iki sekancios stoteles kiekviename reise
    --i;
    h = 1;
    
    for (var j = w, w_left = w, dt = 5, i_max = times.length; ++i < i_max;) {
        dt += +(times[i]) -5; // vaziavimo laikas nuo ankstesnes stoteles
        var k = times[++i]; // kiek reisu tinka tas pats vaziavimo laikas
        
        if (k != "") { // ne visiems likusiems reisams
            k = +(k);
            w_left -= k; // kiek liko neuzpildytu lenteles elementu eiluteje
        }
        else {
            k = w_left; // vaziavimo laikas tinka visiems likusiems reisams
            w_left = 0;
        }
        
        while (k-- > 0) {
            timetable[j] = dt + timetable[j-w]; // jei lentele vienmatis masyvas
            ++j;  
        }
    
        if (w_left <= 0) {
            w_left = w; // vel nustatome, kad neuzpildytas visas lenteles plotis sekancioje eiluteje
            dt = 5; // pradinis laiko postumis +5 sekanciai eilutei
            ++h;
        }
    }
    
    const final_data = {workdays:weekdays, times:timetable, tag: zero_ground.join(""), valid_from: valid_from, valid_to: valid_to};
    
    return final_data;
}
// End.


export default decode;