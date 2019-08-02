const RangoApp = require('./snippets/lib/RangoApp');
const InstalledApps = require('./snippets/lib/InstalledApp');

const DPM = require('./snippets/helper/DjangoProjectModification');
const DAM = require('./snippets/helper/DjangoAppModification');
const option = process.argv[2];
const argument = process.argv[3];
let rangoapp = false;
if(argument){
    rangoapp = new RangoApp(argument);
    installedapp = new InstalledApp(argument);
}


switch(option){
    case 'test':
        installedapp.addToDjangoAppList()
            .then((data)=>console.log(data))
            .catch((e)=>console.log(e))
        break;
    case 'setup':
        DPM.localSettings();
        DPM.localWsgi();
        DPM.localManage();
        DPM.templatesDir();
        DPM.staticDir();
        DPM.createBaseHtml();
        break;
    case 'new':
        rangoapp.createRangoApp();
        break;
    case 'djangofy':
        rangoapp.djangofyReactApp();
        break;
    case 'trash':
        rangoapp.deleteRangoApp();
        break;
    default:
        console.error(`${argument} is not a valid Rango command`);
        break;
}