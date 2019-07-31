const path = require('path');
const fs = require('fs');

module.exports = DjangoAppModification = {
    updateMasterUrl:(appname)=>{


    },
    createAppUrls : (appname)=>{
        fs.readFile(path.join(__dirname,'../','bin','urls_py.txt'), 'utf8',(err,data)=>{
            if(err) throw err;
            const django_app_dir = path.join(__dirname,'../','../',appname);
            const file_code_py = data.replace('${appname}',appname).replace('${appname.toLowerCase()}',`${appname.toLowerCase()}`);
            fs.writeFile(path.join(django_app_dir , 'urls.py'),file_code_py,(err)=>{
                if(err) throw err;
                console.log(`urls.py created for ${appname} with some goto code !`);
            })
        })
       

    },
    updateViews : (appname)=>{
        fs.readFile(path.join(__dirname , '../' , 'bin' , 'views_py.txt'),'utf8',(err,data)=>{
            if(err) throw err;
        })

    }
}