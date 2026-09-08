function pexeso()
{
    let pocet = Number(document.getElementById("pocet").value); // pomocí Number převedeme string na int
    let hrac1 = document.getElementById("hracJedna").value;
    let hrac2 = document.getElementById("hracDva").value;
    let motivChecked = document.querySelector(`input[name="vyber"]:checked`); // kontrola vybraného prvku
    if(!motivChecked){ // jeslti není vybrán vypíše se alert
        window.alert("Vyber motiv!!!!");
        return;     
    }
    else{localStorage.setItem("pocet", pocet); // jinak pocet nám uloží do pocet do localStorage a můžeme ho používat na jiné stránce
        let motiv = motivChecked.value;
        localStorage.setItem("motiv", motiv);
        localStorage.setItem("hrac1",hrac1);
        localStorage.setItem("hrac2",hrac2);
        window.location.href = "pexeso.html";} // přesměrování na na stránku pexeso.html
}


document.addEventListener("DOMContentLoaded", () => { // po načtení celé stránky proveď
    if(document.getElementById("hra")){ // jestli se nachází na stránce prvek s ID = hra proveď
        hra(); // spusť funkci hra
    }
})

function pocitadloFunkce(cisloGen) { // vytvoří pole pro počítadlo
    if(cisloGen===6){return [0,0,0,0,0,0];}
    if(cisloGen===9){return [0,0,0,0,0,0,0,0,0];}
    if(cisloGen===12){return [0,0,0,0,0,0,0,0,0,0,0,0];}
    if(cisloGen===15){return [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];}

}
let poleObrazky;
function pole(cisloGen){
    if(cisloGen === 6){poleObrazky = [1,2,3,4,5,6];} // vytvoří pole pro obrázky
    if(cisloGen === 9){poleObrazky = [1,2,3,4,5,6,7,8,9];}
    if(cisloGen === 12){poleObrazky = [1,2,3,4,5,6,7,8,9,10,11,12];}
    if(cisloGen === 15){poleObrazky = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];}
    

}



function genCislo(pocitadlo, cisloGen){
                     let nahoda = Math.floor(Math.random() * cisloGen);// náhodně vygenerované číslo od 1 do 6

                         console.log("prvek" + nahoda + ": " + pocitadlo[nahoda]);

                         if(pocitadlo[nahoda]>=2){return genCislo(pocitadlo, cisloGen);}
                         else{pocitadlo[nahoda]++; nahoda = poleObrazky[nahoda]; return nahoda;}
                    } 

function hra(){
            let pocet = localStorage.getItem("pocet"); // nacčtení prvku z localStorage
            let motiv = localStorage.getItem("motiv");
            let hrac1 = localStorage.getItem("hrac1");
            let hrac2 = localStorage.getItem("hrac2");
            if(hrac1===""){hrac1 = "Hráč1";}
            if(hrac2===""){hrac2 = "Hráč2";}
            document.getElementById("hrac1").textContent = hrac1;
            document.getElementById("hrac2").textContent = hrac2;

            let cisloGen = pocet / 2;
            let pocitadlo = pocitadloFunkce(cisloGen);
            pole(cisloGen);

            console.log("Počet karet: " + pocet); // vypsání na konzoli pro kontrolu
            console.log(motiv);

            const karta = document.getElementById("plocha") // deklarace karta a přiřazení ID plocha
                for (let index = 0; index < pocet; index++) { 
                    const kartaPlocha = document.createElement("div"); // div 
                    kartaPlocha.className = "karta-plocha"; // class karta-plocha
                    kartaPlocha.id = index;

                    const kartaInner = document.createElement("div"); //div
                    kartaInner.className = "karta-inner" // class karta-inner

                    const karta1 = document.createElement("div"); //div
                    karta1.className = "karta"; // class karta
                    karta1.style.backgroundImage = `url(${motiv})`; // pozadí přední karty

                    const karta2 = document.createElement("div"); //div
                    karta2.className = "karta-back"; // class karta-back

                    let nahoda = genCislo(pocitadlo, cisloGen);; // deklarace pro náhodné generované číslo

                    if(motiv === "zvirata.png"){karta2.style.backgroundImage = `url(zvirata/${cisloGen}/${nahoda}.png)`;} // přiřadí obrázek
                    if(motiv === "auta.png"){karta2.style.backgroundImage = `url(auta/${cisloGen}/${nahoda}.png)`;} // přiřadí obrázek         

                    kartaInner.appendChild(karta1); // přířadí rodiči kartaInner
                    kartaInner.appendChild(karta2); // přířadí rodiči kartaInner
                    kartaPlocha.appendChild(kartaInner); // přířadí rodiči kartaPlocha
                    karta.appendChild(kartaPlocha);    // přířadí rodiči karta
                    
                     kartaInner.addEventListener("click", () => { // při kliknutí přidej do classListu otocena
                     klikNaKartu(kartaInner, nahoda, kartaPlocha.id);
                    });    
                    }
 }
 
let prvniKarta = null;
let druhaKarta = null;
let kartaPlochaId1 = null;
let kartaPlochaId2 = null;
let hrac = "hráč1";
let bod1 = 0;
let bod2 = 0;

function klikNaKartu(kartaInner, nahoda, kartaPlocha) {
    kartaInner.classList.toggle("otocena");
    if(kartaInner.classList.contains("otocena")){
         if (!prvniKarta) {
        prvniKarta = { element: kartaInner, obrazek: nahoda };
        kartaPlochaId1 = kartaPlocha;
        console.log(kartaPlochaId1);
    } else {
        druhaKarta = { element: kartaInner, obrazek: nahoda };
        kartaPlochaId2 = kartaPlocha;
        console.log(kartaPlochaId2);
        porovnejKarty();
    }
    }
   
}

function porovnejKarty() {
    if (prvniKarta.obrazek === druhaKarta.obrazek) {
        if(hrac=== "hráč1"){
            bod1++;
            document.getElementById("skore1").textContent = bod1;
        }
        else{
            bod2++;
            document.getElementById("skore2").textContent = bod2;
            hrac = "hráč2";
        }

        prvniKarta.element.style.transition = "transform 2s";
        druhaKarta.element.style.transition = "transform 2s";
        prvniKarta.element.classList.add("vyhra");
        druhaKarta.element.classList.add("vyhra");
        console.log("Jsou stejné!");
        console.log(kartaPlochaId1);

        setTimeout(() => {
        console.log("id1: " + kartaPlochaId1);
        console.log("id2: " + kartaPlochaId2);
        document.getElementById(kartaPlochaId1).style.visibility ="hidden";
        document.getElementById(kartaPlochaId2).style.visibility ="hidden";

        prvniKarta.element.style.transition = "transform 0.6s";
        druhaKarta.element.style.transition = "transform 0.6s";

        prvniKarta = null;
        druhaKarta = null;
        kartaPlochaId1 = null;
        kartaPlochaId2 = null;
        },2000)
        
    } else {
        setTimeout(() => {
            prvniKarta.element.classList.toggle("otocena");
            druhaKarta.element.classList.toggle("otocena");
            console.log("Nejsou stejné!");
            if(hrac === "hráč1"){hrac = "hráč2";}
            else{hrac = "hráč1";}
            prvniKarta = null;
            druhaKarta = null;
            kartaPlochaId1 = null;
            kartaPlochaId2 = null;
        },1500)
    }
        

}
