const path = require('path');
const fs = require('fs');

const applist_json_dir = path.join(__dirname,'../','../','AppList.json');

module.exports = AppList = {

    add : (appname)=>{
        fs.readFile(applist_json_dir , (e,data)=>{
            if(e) throw e;
            const applist_obj = JSON.parse(data);
            applist_obj.forEach((app)=>{
                if(app.name === appname) throw `${appname} app already exits !`;
            })
            applist_obj.push({"name":appname});
            fs.writeFile(applist_json_dir , JSON.stringify(applist_obj),(err)=>{
                if(err) throw err;
                console.log(`${appname} has been add to AppList.json`);
            })
        });

    },
    remove : (appname)=>{
        fs.readFile(applist_json_dir , (e,data)=>{
            if(e) throw e;
            const applist_obj = JSON.parse(data);
            const app_index = applist_obj.findIndex(i=>i.name === appname);
            if(app_index > -1){
                const stripped_applist_obj = applist_obj.splice(app_index , 1);
                fs.writeFile(applist_json_dir , JSON.stringify(applist_obj),(err)=>{
                    if(err) throw err;
                    console.log(`${appname} has been removed from applist`);
                })
            }else{
                throw `App named ${appname} is not installed ! focus.`
            }
            
        });

    },
    search : (appname)=>{
        fs.readFile(applist_json_dir , (e,data)=>{
            if(e) throw e;
            const applist_obj = JSON.parse(data);
            const app_index = applist_obj.findIndex(i=>i.name === appname);
            if(app_index > -1){
                return true;
            }else{
                return false; 
            }
        })

    }

}

