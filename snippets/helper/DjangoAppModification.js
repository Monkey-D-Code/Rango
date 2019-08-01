const path = require('path');
const fs = require('fs');

module.exports = DjangoAppModification = {
    updateMasterUrl:(appname)=>{


    },
    createAppUrls : (appname)=>{
        fs.readFile(path.join(__dirname,'../','bin','urls_py.txt'), 'utf8',(err,data)=>{
            if(err) throw err;
            const django_app_dir = path.join(__dirname,'../','../',appname);
            const file_code_py = data.replace('${appname}',appname);
            fs.writeFile(path.join(django_app_dir , 'urls.py'),file_code_py.replace('${appname.toLowerCase()}',`${appname.toLowerCase()}`),(err)=>{
                if(err) throw err;
                console.log(`urls.py created for ${appname} with some goto code !`);
            })
        })
       

    },
    updateViews : (appname)=>{
        fs.readFile(path.join(__dirname , '../' , 'bin' , 'views_py.txt'),'utf8',(err,data)=>{
            if(err) throw err;
            const django_app_dir = path.join(__dirname , '../','../',appname);
            const file_code_py = data.replace('${appname}',`${appname}Ui`);
            fs.writeFile(path.join(django_app_dir , 'views.py'),file_code_py.replace('${appname_s}',appname.toLowerCase()) , (err)=>{
                if(err) throw err;
                console.log(`Views.py is created with go to template view`);
            })
        })

    }
}