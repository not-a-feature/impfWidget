/* 
Impftermin Widget
v1.2.2

This Scriptable Widget will show you if there are any vaccination appointments available in your local vaccination centre.
The data is pulled from the impfterminservice.de api, which is neither publicly available nor documented.
Therefore everything may break.

The newest version of this widget can be found here: https://github.com/not-a-feature/impfWidget
A gist version is also available: https://gist.github.com/not-a-feature/4e6dbbd9eb3bd927e50cae347b7e0486/

The framework/skeleton of this script was created by marco79cgn for the toiletpaper-widget
(https://gist.github.com/marco79cgn/23ce08fd8711ee893a3be12d4543f2d2)

To uses this widget go to https://003-iz.impfterminservice.de/assets/static/impfzentren.json and search for
your local center. Copy the "PLZ" and modify in the script below.

Then change your LANDID. 
BW              -> 0
Hamburg         -> 1
Hessen          -> 2
NRW             -> 3
Sachsen Anhalt  -> 4

If you want to know if there are appointments specifically for a vaccine,
set displayVaccinesAsOne to false. This requires a medium size-widget (2x1)

If you want to exclude specific vaccines, set them to iside the VACCINES variable to false. 

Thats it. You can now run this script.
Copy the source, open the scriptabel app, add the source there. 
go the home screen, add scriptable widget

-------------------------------------------------------------------------------
LICENSE:
Copyright (C) 2021 by Jules Kreuer - @not_a_feature
This piece of software is published unter the GNU General Public License v3.0

TLDR:
| Permissions      | Conditions                   | Limitations |
| ---------------- | ---------------------------- | ----------- |
| ✓ Commercial use | Disclose source              | ✕ Liability |
| ✓ Distribution   | License and copyright notice | ✕ Warranty  |
| ✓ Modification   | Same license                 |             |
| ✓ Patent use     | State changes                |             |
| ✓ Private use    |                              |             |

Go to https://github.com/not-a-feature/impfWidget/blob/main/LICENSE to see the full version.
-------------------------------------------------------------------------------


*/
const bLeander = ["Baden-Württemberg", "Hamburg", "Hessen", "Nordrhein-Westfalen", "Sachsen-Anhalt"]


//-----------------------------------------------------------------------------
// Settings

let PLZ = "72072"   // PLZ of vaccination center
const LANDID = 0    // 0 for BW, 1 Hamburg, 2 Hessen ...
// Set to true, if a detailed view is wanted.
// Attention! This requires a medium size-widget (2x1)
const displayVaccinesAsOne = false 

// Advanced Setting
// Fetch status of following vaccines, set to false to ignore this vaccine
const VACCINES = [{"name": "BioNTech",    "ID": "L920", "allowed": true},
                  {"name": "Moderna",     "ID": "L921", "allowed": true},
                  {"name": "AstraZeneca", "ID": "L922", "allowed": true}]

// END Setting
//-----------------------------------------------------------------------------
const vaccineTextFontSize = 13
const appointmentsTextFontSize = 22
const detailTextFontSize = 17
const textColorRed   = new Color("#E50000")
const textColorGreen = new Color("#00CD66")

let param = args.widgetParameter
if (param != null && param.length > 0) {
    PLZ = param
}

const widget = new ListWidget()
const openAppointments  = await fetchOpenAppointments()
const centerInformation = await fetchCenterInformation()
await createWidget()

if (!config.runsInWidget) {
    await widget.presentSmall()
}
Script.setWidget(widget)
Script.complete()

/* create Widget

case: smallWidget (displayVaccinesAsOne == true)
topRow:     | leftColumn |  rightColumn  |
            |            |   IMPFUNGEN   | 
            | icon       | Keine/Termine |

bottomRow:  | Location                   |

case: mediumWidget (displayVaccinesAsOne == false)
topRow:     | leftColumn |  rightColumn  | detailColumn |
            |            |   IMPFUNGEN   | BioNTech     |
            | icon       | Keine/Termine | Moderna...   |

bottomRow:  | Location                                  |
*/
async function createWidget() {

    widget.setPadding(10, 10, 10, 10)
    const icon = await getImage('vaccine')
    let topRow = widget.addStack()
    topRow.layoutHorizontally()

    let leftColumn = topRow.addStack()
    leftColumn.layoutVertically()
    leftColumn.addSpacer(vaccineTextFontSize)
    const iconImg = leftColumn.addImage(icon)
    iconImg.imageSize = new Size(40, 40)

    topRow.addSpacer(vaccineTextFontSize)

    let rightColumn = topRow.addStack()
    rightColumn.layoutVertically()
    const vaccineText = rightColumn.addText("IMPFUNGEN")
    vaccineText.font = Font.mediumRoundedSystemFont(vaccineTextFontSize)

    let openAppointmentsText
    let textColor = textColorRed
    if (openAppointments.hasOwnProperty("error")) {
        openAppointmentsText = openAppointments["error"]
    }
    else if (Object.values(openAppointments).includes(true)) {
        openAppointmentsText = "Freie\nTermine"
        textColor = textColorGreen
    }
    else {
        openAppointmentsText = "Keine\nTermine"
    }
    let openAppointmentsTextObj = rightColumn.addText(openAppointmentsText)

    openAppointmentsTextObj.font = Font.mediumRoundedSystemFont(appointmentsTextFontSize)
    openAppointmentsTextObj.textColor = textColor
    

    if(!displayVaccinesAsOne) {
        topRow.addSpacer(8)

        let detailColumn = topRow.addStack()
        detailColumn.layoutVertically()
        openAppointmentsDetail = {}
        Object.keys(openAppointments).forEach((key, index) => {
            //openAppointmentsDetail[key] = detailColumn.addStack()
            //openAppointmentsDetail[key].layoutVertically()
            openAppointmentsDetail[key] = detailColumn.addText(key)
            //openAppointmentsDetail[key].addSpacer(1)
            openAppointmentsDetail[key].font = Font.mediumRoundedSystemFont(detailTextFontSize)
            if (openAppointments[key]) {
                openAppointmentsDetail[key].textColor = textColorGreen 
            }
            else {
                openAppointmentsDetail[key].textColor = textColorRed 
            }
        })
    }

    widget.addSpacer(4)

    const bottomRow = widget.addStack()
    bottomRow.layoutVertically()
    let shortName = centerInformation["Zentrumsname"]
    shortName = shortName.replace("Zentrales Impfzentrum", "ZIZ")
    shortName = shortName.replace("Zentrales Impfzentrum (ZIZ)", "ZIZ")
    shortName = shortName.replace("Landkreis", "LK")
    shortName = shortName.replace("Kreisimpfzentrum", "KIZ")
    shortName = shortName.replace("Impfzentrum Kreis", "KIZ")
    shortName = shortName.replace("Impfzentrum Landkreis", "KIZ")

    
    const street = bottomRow.addText(centerInformation["Zentrumsname"])
    street.font = Font.regularSystemFont(11)

    const zipCity = bottomRow.addText(centerInformation["Adresse"] + ", " + centerInformation["Ort"])
    zipCity.font = Font.regularSystemFont(11)
}


// fetches the amount of toilet paper packages
async function fetchOpenAppointments() {
    let url = "https://003-iz.impfterminservice.de/rest/suche/termincheck?plz=" + PLZ + "&leistungsmerkmale=" 
    let result = {}
    console.log(VACCINES)
    if (displayVaccinesAsOne) {
        let urlAppendix = []
        for (var i = 0; i < VACCINES.length; i++) {
            if (VACCINES[i]["allowed"]) {
                urlAppendix.push(VACCINES[i]["ID"])
            }
        }
        if (urlAppendix == []) {
            return {"error": "No vaccines selected."}
        }
        url = url + urlAppendix.join(",")
        let req = new Request(url)
        let body = await req.loadString()

        for (var i = 0; i < VACCINES.length; i++) {
            if (body == '{"termineVorhanden":false}') {
                result[VACCINES[i]["name"]] = false
            }
            else if (body == '{"termineVorhanden":true}') {
                result[VACCINES[i]["name"]] = true
            }
            else if (body == '{"error":"Postleitzahl ungueltig"}') {
                return {"error": "Wrong PLZ"}
            }
            else {
                return {"error": "Error"}
            }
        }
    }
    else {
        for (var i = 0; i < VACCINES.length; i++) {
            if (VACCINES[i]["allowed"]) {
                console.log("Checking Vaccine: " + VACCINES[i]["name"])
                let req = new Request(url + VACCINES[i]["ID"])
                let body = await req.loadString()
                if (body == '{"termineVorhanden":false}') {
                    result[VACCINES[i]["name"]] = false
                }
                else if (body == '{"termineVorhanden":true}') {
                    result[VACCINES[i]["name"]] = true
                }
                else if (body == '{"error":"Postleitzahl ungueltig"}') {
                    return {"error": "Wrong PLZ"}
                }
                else {
                    return {"error": "Error"}
                }
            }
        }
    }
    console.log(result)
    return result
}


// fetches information of all centers. 
async function fetchCenterInformation() {
    let url = 'https://003-iz.impfterminservice.de/assets/static/impfzentren.json'

    let req = new Request(url)
    let apiResult = await req.loadJSON()
    apiResult = apiResult[bLeander[LANDID]]
    for (var i in apiResult) {
        if (apiResult[i]["PLZ"] == PLZ) {
            //Set correct url.
            //Will work without, but we don't want to break their load-balancing system
            widget.url = apiResult[i]["URL"]
          return apiResult[i]
        }
      }
    //If no center with the plz was found, return this dummy/error object
    widget.url = "https://www.impfterminservice.de/" 
    return {"Zentrumsname": "Name",
            "Ort": "City not found",
            "Adresse": "Street"}
}

// get images from local filestore or download them once
async function getImage(image) {
    let fm = FileManager.local()
    let dir = fm.documentsDirectory()
    let path = fm.joinPath(dir, image)
    if (fm.fileExists(path)) {
        return fm.readImage(path)
    } else {
        // download once, save in local storage
        let imageUrl
        switch (image) {
            case 'vaccine':
                imageUrl = "https://juleskreuer.eu/api/syringe-solid.png"
                break
            default:
                console.log(`Sorry, couldn't find ${image}.`);
        }
        let iconImage = await loadImage(imageUrl)
        fm.writeImage(path, iconImage)
        return iconImage
    }
}

// helper function to download an image from a given url
async function loadImage(imgUrl) {
    const req = new Request(imgUrl)
    return await req.loadImage()
}
