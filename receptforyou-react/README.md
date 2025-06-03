ReceptForYou – Hitta recept baserat på dina ingredienser

ReceptForYou är en responsiv webbapplikation där du kan:
- Söka efter recept baserat på ingredienser du har i kylen
- Filtrera på kosttyp och allergier
- Få receptförslag utifrån ditt humör
- Spara favoritrecept

Funktionalitet

- Lägg till ingredienser manuellt
- Filtrera på diet: vegetarisk, vegansk, glutenfri
- Filtrera på allergier: laktos, gluten, nötter
- Välj humör (glad, trött, stressad) och få förslag
- Spara och visa favoritrecept
- Responsivt gränssnitt – fungerar på mobil, surfplatta och desktop

Teknik & API

Ramverk - React
Extern API - Spoonacular Food API (https://spoonacular.com/food-api)
Versionshantering - Git + GitHub
Lagring - localStorage (för favoriter och historik)

Ramverksjämförelse: React vs Vue vs Angular

Vi valde React eftersom det:
- Ger oss flexibilitet att strukturera appen i återanvändbara komponenter
- Har bred support, mycket dokumentation och används av stora aktörer
- Har låg tröskel för samarbete i grupp tack vare enkel projektstruktur

Vue.js
Fördelar - Enkel syntax, inbyggd reaktivitet, bra för mindre team
Nackdelar - Mindre företagsstöd, inte lika etablerad som React globalt

Angular 
Fördelar - TypeScript från start
Nackdelar - Svår inlärningskurva, tyngre för mindre projekt

Källa:  
[1] https://www.geeksforgeeks.org/react-vs-angular-vs-vue/  
[2] https://www.browserstack.com/guide/angular-vs-react-vs-vue

Så kör du projektet lokalt:

Först och främst behöver du Node.js, så om det inte redan är installerat så gör det på: https://nodejs.org/

1. Öppna termnialen i VScode och skriv in: git clone https://github.com/BenjaminAston/ReceptForYou.git
2. Skriv sedan in: cd receptforyou
3. Och sen: cd receptforyou-react
4. Sen: npm install
5. Sist skriver du kommande för att starta programmet: npm start

Värt att nämna för vissa användare kan det dyka upp problem med att installera npm. Då öppnar man powerchell som administratör i Windows och skriver nedan:
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
Efter det skriver man y och trycker enter
Sen ska man kunna installera npm
