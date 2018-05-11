/***********************
************************
************************
************************
        TROJMIAN
************************
************************
************************
***********************/


// deklaracja zmiennych, aby byly globalne, a nastepnie nadpisanie ich w funkcjach
var delta_a, delta_b, delta_c, wartoscDelty, wartosc_x0, wartosc_x1, wartosc_x2, sqrtDelta, licznik, mianownik, wielkosc_ulamka, hr_width_delta_zerowa, i, licznik_1, licznik_2, hr_width_delta_dodatnia_1, hr_width_delta_dodatnia_2, wielkosc_ulamka_x1, wielkosc_ulamka_x2, licznik_1_ulamek, licznik_2_ulamek, x, y, margin_x1, margin_x2, m, m2;

// zmienna typu boolean wyznaczajaca sposob wyporu wyswietlenia wynikow
var calkowite = true;

// umieszczone w zmiennej aby usprawnic skrypt
var wynikDelty = document.getElementById("wynik_delty");
var wynik_x0 = document.getElementById("wynik_x0");
var wynik_x1 = document.getElementById("wynik_x1");
var wynik_x2 = document.getElementById("wynik_x2"); 


// SPRAWDZANIE czy wartosci sa liczbami
function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
} 

// funkcja sprawdzajaca poprawnosc wpisanych danych przez uzytkownika
function sprawdzDaneDelty(){
    
    // resetowanie wartosci jesli ktos ponownie uzyje skryptu bez przeładowania strony
    x = 1;
    y = 1;
    i = 1;
    hr_width_delta_dodatnia_1 = 8;
    hr_width_delta_dodatnia_2 = 8;
    
    
    // ukrywanie wyswietlonych informacji, jesli ktos ponownie
    // uzyje skryptu bez odswiezenia strony
    wynikDelty.style.display = "none";
    wynik_x0.style.display = "none";
    wynik_x1.style.display = "none";
    wynik_x2.style.display = "none";  
    
    // Przypisywanie pobranych wartosci pod zmienne
    delta_a = document.getElementById("delta_a").value;
    delta_b = document.getElementById("delta_b").value;
    delta_c = document.getElementById("delta_c").value;
    
    // Obliczanie delty
    wartoscDelty = delta_b * delta_b - 4 * delta_a * delta_c;
  
    // Sprawdzanie poprawnosci wprowadzonych danych, jesli dobrze przechodzi do obliczenia delty
    if(isNumber(delta_a) && isNumber(delta_b) && isNumber(delta_c)){
        obliczDelte();
        //javascript domyslnie czyta te zmienne jako string, wiec konwertuje je na liczby
        delta_a = parseInt(delta_a);
        delta_b = parseInt(delta_b);
        delta_c = parseInt(delta_c);
    }
    // jesli nie, wyswietla wiadomosc o wprowadzeniu nieprawidlowych wartosci
    else{
        wynikDelty.style.display = "block";
        wynikDelty.textContent = "Wprowadziłeś nieprawidłowe wartości.";
    }   
}

// funkcja zmieniajaca wyswietlanie liczb na calkowite
function liczbyCalkowite(){
    calkowite = true;
}

// funkcja zmieniajaca wyswietlanie liczb na ulamki
function liczbyUlamki(){
    calkowite = false;
}


// funkcja sprawdzajaca dlugosc liczby, oraz zwracajaca ta dlugosc
function sprawdzDlugosc(liczba) {
    return liczba.toString().length;
}

// funkcja obliczajaca delte, samoopisujaca
function obliczDelte(){
    
    
    // resetowanie wartosci jesli ktos ponownie uzyje skryptu bez przeładowania strony
    x = 1;
    y = 1;
    i = 1;
    m = 1;
    m2 = 1;
    
    // na potrzeby wzoru potrzeba przeciwnosci liczby b
        delta_b = delta_b * -1; 
    

        // jezeli delta jest wieksza od 0, posiada 2 rozwiazania
        if(wartoscDelty > 0){

            // wyswietlenie spana, oraz umieszczenie informacji o wartosci delty
            wynikDelty.style.display = "block";
            wynikDelty.textContent = "∆= " + wartoscDelty + " istnieją 2 rozwiązania.";

            // pierwiastek z delty
            sqrtDelta = Math.sqrt(wartoscDelty);

            // obliczanie x1 oraz x2, a nastepnie wyswietlenie spana,
            // oraz umieszczenie obliczen
            wartosc_x1 = (delta_b - sqrtDelta) / (2 * delta_a);
            wartosc_x2 = (delta_b + sqrtDelta) / (2 * delta_a);


                // jeżeli użytkownik wybrał podanie wyniku w postaci liczb całkowitych
                if(calkowite === true){
                    wynik_x1.style.display = "block";
                    wynik_x1.innerHTML = "x<sub>1</sub>= " + wartosc_x1;

                    wynik_x2.style.display = "block";
                    wynik_x2.innerHTML = "x<sub>2</sub>= " + wartosc_x2;   
                }
                // jezeli uzytkownik wybral podanie wyniku w postaci ulamkow
                else{
                    
                    // roznorakie potrzebne mi obliczenia, aby pokazac odpowiednie wartosci w ulamkach
                    licznik_1 = delta_b - sqrtDelta;
                    licznik_2 = delta_b + sqrtDelta;
                    mianownik = 2 * delta_a;
                    wielkosc_ulamka_x1 = (licznik_1 / mianownik) - ((licznik_1 % mianownik) / mianownik);
                    wielkosc_ulamka_x2 = (licznik_2 / mianownik) - ((licznik_2 % mianownik) / mianownik);
                    licznik_1_ulamek = Math.abs(licznik_1 - (wielkosc_ulamka_x1 * mianownik));
                    licznik_2_ulamek = Math.abs(licznik_2 - (wielkosc_ulamka_x2 * mianownik));
                    licznik_1_ulamek = licznik_1_ulamek.toFixed(2);
                    licznik_2_ulamek = licznik_2_ulamek.toFixed(2);
                    hr_width_delta_dodatnia_1 = 8;
                    hr_width_delta_dodatnia_2 = 8;
                    
                    // sprawdzanie jakiej dlugosci jest liczba, aby odpowiednio wydluzyc
                    // kreske ulamka oraz odstepu kreski od liczby, aby na siebie nie najezdzalo
                    licznik_1 = licznik_1.toFixed(2);
                    licznik_2 = licznik_2.toFixed(2);
                    mianownik = mianownik.toFixed(2);
                    margin_x1 = 6;
                    margin_x2 = 6;
                    
                    if (sprawdzDlugosc(licznik_1) > 1 || sprawdzDlugosc(licznik_2) || sprawdzDlugosc(mianownik) > 1){
                        // pętla odpowiednio zwiekszajaca kreske ulamka x1, na 1 liczbe +8px
                        while(sprawdzDlugosc(licznik_1_ulamek) > x || sprawdzDlugosc(mianownik) > x){
                            hr_width_delta_dodatnia_1 += 8;
                            x++;
                        }
                        // pętla odpowiednio zwiekszajaca kreske ulamka x2, na 1 liczbe +8px
                        while(sprawdzDlugosc(licznik_2_ulamek) > y || sprawdzDlugosc(mianownik) > y){
                            hr_width_delta_dodatnia_2 += 8;
                            y++;
                        }
                    }
                                     
                    
                    // jezeli reszta z dzielenia jest rowna 0, wyswietla jedynie liczbe calkowita
                    // poniewaz wyswietlanie ulamka 0/0 jest bez sensu
                    if(licznik_1 % mianownik == 0){
                        wynik_x1.style.display = "block";
                        
                        wynik_x1.innerHTML = '<span id="x1">x<sub>1</sub>= </span><span id="wielkosc_ulamka_x1">' + wielkosc_ulamka_x1 + '</span>';
                    }
                    
                    // jezeli jest reszta z dzielenia wyswietla odpowiedni ulamek
                    else{
                        // petla zwiekszajaca odlegosc liczby od kreski, aby na siebie nie najezdzaly
                         while(sprawdzDlugosc(wielkosc_ulamka_x1) > m){
                            margin_x1 += 6;
                            m++;
                        } 

                        // wyswietlanie odpowiednio wartosci
                        wynik_x1.style.display = "block";
                        wynik_x1.innerHTML = '<span id="x1">x<sub>1</sub>= </span><span id="wielkosc_ulamka_x1">' + wielkosc_ulamka_x1 + '</span><span align="center" id="ulamek_x1">' + licznik_1_ulamek + '<hr align="left" width="' + hr_width_delta_dodatnia_1 + 'px" />' + mianownik + '</span>';
                        document.getElementById('wielkosc_ulamka_x1').style.marginRight = margin_x1 + 'px';
                  
                    } 
                    
                    // jezeli reszta z dzielenia jest rowna 0, wyswietla jedynie liczbe calkowita
                    // poniewaz wyswietlanie ulamka 0/0 jest bez sensu
                    if(licznik_2 % mianownik == 0){
                        
                        // wyswietlanie odpowiednio wartosci
                        wynik_x2.style.display = "block";      
                        wynik_x2.innerHTML = '<span id="x2">x<sub>2</sub>= </span><span id="wielkosc_ulamka_x2">' + wielkosc_ulamka_x2 + '</span>';
                    }
                    
                    // jezeli jest reszta z dzielenia wyswietla odpowiedni ulamek
                    else{
                        // petla zwiekszajaca odlegosc liczby od kreski, aby na siebie nie najezdzaly
                        while(sprawdzDlugosc(wielkosc_ulamka_x2) > m2){
                            margin_x2 += 6;
                            m2++;
                        } 
                        
                        // wyswietlanie odpowiednio wartosci
                        wynik_x2.style.display = "block";
                        wynik_x2.innerHTML = '<span id="x2">x<sub>2</sub>= </span><span id="wielkosc_ulamka_x2">' + wielkosc_ulamka_x2 + '</span><span align="center" id="ulamek_x2">' + licznik_2_ulamek + '<hr align="left" width="' + hr_width_delta_dodatnia_2 + 'px" />' + mianownik + '</span>';
                        document.getElementById('wielkosc_ulamka_x2').style.marginRight = margin_x2 + 'px';
                  
                    }  
                    
                    
                }
        }
        // jezeli delta rowna 0, poniewaz wczesniejsza funkcja wykluczylismy
        else if(wartoscDelty == 0){
            wynikDelty.style.display = "block";
            wynikDelty.textContent = "∆= " + wartoscDelty + " istnieje 1 rozwiązanie.";

            // obliczanie x0, a nastepnie wyswietlenie spana, oraz umieszczenie obliczen
            wartosc_x0 = delta_b / (2 * delta_a)
                // jeżeli użytkownik wybrał podanie wyniku w postaci liczb całkowitych
                if(calkowite === true){        
                    wynik_x0.style.display = "block";
                    wynik_x0.innerHTML = "x<sub>0</sub>= "  + wartosc_x0;             
                }
            
                // jezeli uzytkownik wybral podanie wyniku w postaci ulamkow
                else{
                    
                    // liczby potrzebne do wyswietlenia w postaci ulamkow
                    licznik = delta_b;
                    mianownik = 2 * delta_a;                 
                    wielkosc_ulamka = (licznik / mianownik) - (licznik % mianownik);
                    hr_width_delta_zerowa = 8;
                    margin_x1 = 8;
                    margin_x2 = 8;
                    
                    // sprawdzanie jakiej dlugosci jest liczba, aby odpowiednio wydluzyc
                    // kreske ulamka
                    if (sprawdzDlugosc(licznik) > 1 || sprawdzDlugosc(mianownik) > 1){
                        // pętla odpowiednio zwiekszajaca kreske ulamka, na 1 liczbe 8px
                        while(sprawdzDlugosc(licznik) > i || sprawdzDlugosc(mianownik) > i){
                            hr_width_delta_zerowa += 8;
                            i++;
                        }
                    }
                    
                    
                    // jezeli reszta z dzielenia jest rowna 0, wyswietla jedynie liczbe calkowita
                    // poniewaz wyswietlanie ulamka 0/0 jest bez sensu
                    if(licznik % mianownik == 0){
                        wynik_x0.style.display = "block";
                        wynik_x0.innerHTML = '<span id="x0">x<sub>0</sub>= </span><span id="wielkosc_ulamka_x0">' + wielkosc_ulamka.toFixed(2) + '</span>';
                    }
                    
                    // jezeli jest reszta z dzielenia wyswietla odpowiedni ulamek
                    else{
                        wynik_x0.style.display = "block";
                        wynik_x0.innerHTML = '<span id="x0">x<sub>0</sub>= </span><span id="wielkosc_ulamka_x0">' + wielkosc_ulamka.toFixed(2) + '</span><span align="center" id="ulamek_x0">' + licznik.toFixed(2) + '<hr align="left" width="' + hr_width_delta_zerowa + 'px" />' + mianownik + '</span>';
                    }                
                }
        }
        // w innym przypadku, czyli zostaje jedynie delta ujemna, wyswietlanie spana, oraz umieszczenie informacji że delta jest ujemna
        else{
            wynikDelty.style.display = "block";
            wynikDelty.textContent = "∆ ujemna, brak rozwiązań";
        }
    

}

/***********************
************************
************************
************************
        WZOR HERONA
************************
************************
************************
***********************/

// deklaracja zmiennych, aby byly globalne, a nastepnie nadpisanie ich w funkcjach
var heron_a, heron_b, heron_c, heron_p, dlugosci_bokow, wartosc_pierwiastka, wartoscHerona;

// umieszczone w zmiennej aby usprawnic skrypt
var pole_trojkata = document.getElementById("pole_trojkata");

// SPRAWDZANIE czy wartosci sa liczbami
function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
} 

// funkcja sprawdzająca poprawnosc wpisanych danych
function sprawdzDaneHerona(){
    
    // ukrywanie wyswietlonych informacji, jesli ktoś ponownie
    // uzyje skryptu bez odświeżenia strony
    pole_trojkata.style.display = "none";

    // Przypisywanie pobranych wartosci pod zmienne
    heron_a = document.getElementById("heron_a").value;
    heron_b = document.getElementById("heron_b").value;
    heron_c = document.getElementById("heron_c").value;
    
    
    // Sprawdzanie poprawności wprowadzonych danych, jesli dobrze to
    // zamienia typ wartości na number ponieważ funkcja isNumber
    // jedynie sprawdza czy wartość jest liczba i nie zmienia jej typu,
    // a nastepnie przypisuje dane wartosci do tablicy, nastepnie je sortuje
    if(isNumber(heron_a) && isNumber(heron_b) && isNumber(heron_c)){
        
        // zmienianie typu zmiennych na number, poniewaz domyslnie byl string
        heron_a = parseInt(heron_a);
        heron_b = parseInt(heron_b);
        heron_c = parseInt(heron_c);
        
        // stworzenie tablicy, oraz wprowadzenie do niej długosci boków
        dlugosci_bokow = [
        heron_a,
        heron_b,
        heron_c
        ];
        
        // poniewaz funkcja .sort dziala dobrze tylko na stringach, a na liczbach
        // pokazuje ze 21 > 1 poniewaz 2 > 1 stąd zastosowana dana funkcja sortowania  
        dlugosci_bokow.sort(function(a, b){return a-b});
        obliczHerona();
    }
    // jesli nie, wyswietla komunikat o wprowadzeniu nieprawidlowych wartosci
    else{
        pole_trojkata.style.display = "block";
        pole_trojkata.textContent = "Wprowadziłeś nieprawidłowe wartości.";
    } 
}

// Funkcja obliczajaca pole trojkata za pomocą wzoru Herona
function obliczHerona(){
    
    // Sprawdzenie czy podany trojkąt istnieje wg zalozenia,
    // że dwa mniejsze boki trójkąta musza być wieksze od najwiekszego boku
    // wiem ktory jest ktory poniewaz korzystam z posortowanej tablicy.
    if(dlugosci_bokow[0] + dlugosci_bokow[1] > dlugosci_bokow[2]){
        
        // obliczanie polowy obwodu
        heron_p = (heron_a + heron_b + heron_c) * 0.5;
        
        // obliczanie wartosci pod pierwiastkiem
        wartosc_pierwiastka = heron_p * (heron_p - heron_a) * (heron_p - heron_b) * (heron_p - heron_c);
        
        // pierwiastkowanie poprzednich obliczen, wg. wzoru
        wartoscHerona = Math.sqrt(wartosc_pierwiastka);
        
        // wyświetlanie spana, oraz wprowadzanie wartosci obliczonego pola trojkata
        pole_trojkata.style.display = "block";
        pole_trojkata.innerHTML = "Pole trójkąta = " + wartoscHerona + " [ j<sup>2</sup>]";
    }
    else{
        // wyswietlanie spana, oraz wprowadzanie wartosci że podany trojkat nie ma prawa istniec
        pole_trojkata.style.display = "block";
        pole_trojkata.textContent = "Taki trójkąt nie istnieje.";
    } 
}