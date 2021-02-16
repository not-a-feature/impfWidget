# impfWidget

| freie Termine | keine Termine | Detailansicht  |
| -----------------  | ------------------ | ------------------ |
| <img src="https://user-images.githubusercontent.com/25013642/107362178-b5c50400-6ad8-11eb-998c-7ca27e34c47b.png" alt="Screenshot Freie Termine" width=200> | <img src="https://user-images.githubusercontent.com/25013642/107362185-b78ec780-6ad8-11eb-814d-ba9d099e7daf.jpg" alt="Screenshot keine freie Termine" width=200> | <img src="https://user-images.githubusercontent.com/25013642/107978719-91c45f80-6fbd-11eb-8983-17182a3e1afb.jpg" alt="Screenshot Detailansicht" width=400> |<


## Allgemeines
Diese Widget, geschrieben für die Scriptable.app, zweigt an, ob es im lokalen Impfzentrum frei Termine hat.
Sie ist weder mit der 116/117 noch mit der offiziellen Impfterminvergabe unter impfterminservice.de verwand.

Das ursprüngliche Grundgerüst stammt von marco79cgn und seinem Klopapier Widget.
https://gist.github.com/marco79cgn/23ce08fd8711ee893a3be12d4543f2d2

## Anforderungen und Installation
- iOS 14
- [Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188) version 1.5 (oder neuer)

### Impfzentrum Postleitzahl herausfinden
1) Öffne https://003-iz.impfterminservice.de/assets/static/impfzentren.json
2) Suche nach der gewünschen Stadt / PLZ
3) Kopiere die PLZ (mit den Anführungszeichen) und Merke dir das Bundesland
![screenshot1](https://user-images.githubusercontent.com/25013642/107360811-bceb1280-6ad6-11eb-982d-eca27be29812.png)

### Installation
1) Kopiere den Source code von oben (klick vorher auf "raw" oben rechts)
2) Öffne die Scriptable app
3) Klick auf das "+" Symbol oben rechts und füge das kopierte Skript ein
4) Passe den code in Zeile 56/57 und 60 an.
~~~js
let PLZ = "72072" // Hier nur die PLZ mit Anführungszeichen einfügen
const LANDID = 0    // Hier Bundesland-ID anpassen (ohne Anführungszeichen)
/*
BW              -> 0
Hamburg         -> 1
Hessen          -> 2
NRW             -> 3
Sachsen Anhalt  -> 4
*/
const displayVaccinesAsOne = false // false für die Detailansicht, true für die Kompaktansicht
~~~
5) Klick auf den Titel des Skripts ganz oben und vergebe einen Namen (z.B. Impftermin)
6) Speichere das Skript durch Klick auf "Done" oben links
7) Gehe auf deinen iOS Homescreen und drücke irgendwo lang, um in den "wiggle mode" zu kommen (mit dem man auch die App Symbole anordnen kann)
8) Drücke das "+" Symbol oben links, blättere dann nach unten zu "Scriptable" (Liste ist alphabetisch), wähle nun, wenn du die Kompaktansicht (`displayVaccinesAsOne = true`) ausgewählt hast die erste Widget Größe (small) aus und für die Detailansicht die zweite Widget Größe (2x1) und drück unten auf "Widget hinzufügen".
9) Drücke auf das Widget, um seine Einstellungen zu bearbeiten (optional lang drücken, wenn der Wiggle Modus schon beendet wurde)
10) Wähle unter "Script" das oben erstellte aus (Impftermin)

## Beispiel:
<img width="365" alt="screensho1" src="https://user-images.githubusercontent.com/25013642/107362076-929a5480-6ad8-11eb-92a2-db724331d674.png">

## Danke

Großer Dank an @marco79cgn für die Klopapier-App 

## Disclaimer
Es handelt sich um ein von mir selbst entwickeltes Spaßprojekt, es ist weder ein offizielles Produkt noch steht es im Zusammenhang mit der 116/117 oder impfterminservice.de. 

## Changelog
- v 1.2.1 removing whitespace in name-replace function
- v 1.2 added detail-view and updated licence to GNU GPLv3
- v 1.1.1 fixed typo in BLAND ID explanation
- v 1.1 added AstraZeneca Vaccine (L922)
- v. 1.0 initial Release

