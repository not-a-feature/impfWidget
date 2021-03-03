# impfWidget

| freie Termine | keine Termine | Detailansicht  |
| -----------------  | ------------------ | ------------------ |
| <img src="https://user-images.githubusercontent.com/25013642/107362178-b5c50400-6ad8-11eb-998c-7ca27e34c47b.png" alt="Screenshot Freie Termine" width=200> | <img src="https://user-images.githubusercontent.com/25013642/107362185-b78ec780-6ad8-11eb-814d-ba9d099e7daf.jpg" alt="Screenshot keine freie Termine" width=200> | <img src="https://user-images.githubusercontent.com/25013642/107978719-91c45f80-6fbd-11eb-8983-17182a3e1afb.jpg" alt="Screenshot Detailansicht" width=400> |

| Benachrichtigung freie Termine | keine Termine |
| ----------------- | ----------------- |
| <img src="https://user-images.githubusercontent.com/25013642/109874176-0e6a6580-7c6f-11eb-9d5a-935ca968c9b1.png" alt="Screenshot Benachrichtigung2" width=400> | <img src="https://user-images.githubusercontent.com/25013642/109873815-9439e100-7c6e-11eb-8051-398781047a70.png" alt="Screenshot Benachrichtigung" width=400> |


## Allgemeines
Diese Widget, geschrieben für die Scriptable.app, zweigt an, ob es im lokalen Impfzentrum frei Termine hat.
Sie ist weder mit der 116/117 noch mit der offiziellen Impfterminvergabe unter impfterminservice.de verwand.

Das ursprüngliche Grundgerüst stammt von marco79cgn und seinem Klopapier Widget.
https://gist.github.com/marco79cgn/23ce08fd8711ee893a3be12d4543f2d2

Die gist Version des Repos findet sich hier: https://gist.github.com/not-a-feature/4e6dbbd9eb3bd927e50cae347b7e0486

## Anforderungen und Installation
- iOS 14
- [Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188) version 1.5 (oder neuer)
- Internetverbindung 

### Installation
1) Kopiere den Source code von oben (klick vorher auf "raw" oben rechts)
2) Öffne die Scriptable app.
3) Klick auf das "+" Symbol oben rechts und füge das kopierte Skript ein.
4) Öffne https://003-iz.impfterminservice.de/assets/static/impfzentren.json
5) Suche nach dem Zentrum in der gewünschen Stadt
6) Kopiere die das ganze Objekt (alles zwischen den geschweiften klammern)
![screenshot1](https://user-images.githubusercontent.com/25013642/109874502-7caf2800-7c6f-11eb-97c6-9198b7b1be4d.png)

7) Gehe zurück in die Scriptable App und den code an. Ersetzte alles zwischen den geschweiften Klammern mit dem kopiertem Text
~~~js
const CENTER = {
    "Zentrumsname": "Paul Horn Arena",
    "PLZ": "72072",
    "Ort": "Tübingen",
    "Bundesland": "Baden-Württemberg",
    "URL": "https://003-iz.impfterminservice.de/",
    "Adresse": "Europastraße  50"
 }
~~~
8) Ein paar Zeilen weiter unten kannst du Auswählen wann du Benachrichtigungen bekommen sollst.
~~~js
0: für keine Benachrichtigung
1: nur wenn Termine verfügbar sind
2: jedes mal
const NOTIFICATION_LEVEL = 1
~~~
9) Wähle die Ansichtsart. `false` um die Verfügbarkeit einzelner Impfstoffe anzuzeigen, `true` um alles zusammenzufassen.
~~~js
// Attention! This requires a medium size-widget (2x1)
const DISPLAY_VACCINES_AS_ONE = false 
~~~
10) Klick auf den Titel des Skripts ganz oben und vergebe einen Namen (z.B. Impftermin)
11) Speichere das Skript durch Klick auf "Done" oben links
12) Gehe auf deinen iOS Homescreen und drücke irgendwo lang, um in den "wiggle mode" zu kommen (mit dem man auch die App Symbole anordnen kann)
13) Drücke das "+" Symbol oben links, blättere dann nach unten zu "Scriptable" (Liste ist alphabetisch), wähle nun, wenn du die Kompaktansicht (`DISPLAY_VACCINES_AS_ONE = true`) ausgewählt hast die erste Widget Größe (small) aus und für die Detailansicht die zweite Widget Größe (2x1) und drück unten auf "Widget hinzufügen".
14) Drücke auf das Widget, um seine Einstellungen zu bearbeiten (optional lang drücken, wenn der Wiggle Modus schon beendet wurde)
15) Wähle unter "Script" das oben erstellte aus (Impftermin)

## Beispiel:
<img width="365" alt="screenshot2" src="https://user-images.githubusercontent.com/25013642/107362076-929a5480-6ad8-11eb-92a2-db724331d674.png">

## Danke

Großer Dank an @marco79cgn für die Klopapier-App 

## Disclaimer
Es handelt sich um ein von mir selbst entwickeltes Spaßprojekt, es ist weder ein offizielles Produkt noch steht es im Zusammenhang mit der 116/117 oder impfterminservice.de. 

## Changelog
- v 1.3.0 introducing Notifications 
- v 1.2.3 changing api to subdomain
- v 1.2.2 changing licence url & comment
- v 1.2.1 removing whitespace in name-replace function
- v 1.2 added detail-view and updated licence to GNU GPLv3
- v 1.1.1 fixed typo in BLAND ID explanation
- v 1.1 added AstraZeneca Vaccine (L922)
- v. 1.0 initial Release

