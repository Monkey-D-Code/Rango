const RangoApp = require('./snippets/lib/RangoApp');
const DPM = require('./snippets/helper/DjangoProjectModification');

const option = process.argv[2];
const argument = process.argv[3];
let rangoapp = false;
if(argument){
    rangoapp = new RangoApp(argument);
}


switch(option){
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