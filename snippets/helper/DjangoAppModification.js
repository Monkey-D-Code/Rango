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

    },
    addToInstalledApps : (appname)=>{
        const djangoProjectDir = path.join(__dirname , '../','../' , 'Rango');
        fs.readFile(path.join(__dirname,'../','bin' , 'local_settings_py.txt'),'utf8',(err , data)=>{
            if(err) throw err;
            var opsys = process.platform;
            if (opsys == "darwin") {
                console.log(data.split("\n"));
            } else if (opsys == "win32" || opsys == "win64") {
                const settings_array = data.split("\r\n");
                const regex_1 = /^INSTALLED_APPS*/
                let string_index = false;
                settings_array.forEach((line , index)=>{
                    if(regex_1.test(line)){
                        console.log(line);
                        string_index = index;
                    }
                })
                // check for end of installed_apps
                const end_regex = /^]$/
                let counter = string_index+1;
                while(!end_regex.test(settings_array[counter])){counter++;}
                console.log(counter);
            } else if (opsys == "linux") {
                console.log(data.split("\n"));
            }
            
        })
    
    }
}