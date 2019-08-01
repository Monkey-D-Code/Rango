const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const rmdir = require('rmdir');

// importing snippets
const reactAppTemplate = require(path.join(__dirname,'snippets' , 'reactAppTemplate.js'));

// importing helper classes
const AppList = require('./snippets/helper/AppList');
const DAM = require('./snippets/helper/DjangoAppModification');
const DPM = require('./snippets/helper/DjangoProjectModification');

const option = process.argv[2];
const argument = process.argv[3];

switch (option){
    case 'setup':
        DPM.localSettings();
        DPM.localWsgi();
        DPM.localManage();
        break;
    case 'fill-static':
        if(typeof(argument) === 'undefined'){
            const applist = AppList.obj();
            console.log(applist)
        }else{
            
            // make a production build of the react app
            process.chdir(path.join(__dirname , `${argument.toLowerCase()}-ui`));
            exec(`node ${argument}.build`,(e,stdout,stderr)=>{
                if(e) throw e;
                console.log(stdout);
                console.log(`${argument.toLowerCase()}-ui has been build for normal deployment`);
                exec(`node djangofication`,(er,stdout,stderr)=>{
                    if(er) throw er;
                    console.log(stdout);
                    console.log(`${argument.toLowerCase()}-ui's static files been copied to proper folders`);
                })
            })
        
            
        }

        break;
    case 'new-app':
        if(typeof(argument) === 'undefined'){
            console.log('Enter a name for the new rango app')
        }else{
            const check = /^[A-Z][a-z 0-9 A-Z]+$/;
            if(check.test(argument)){

            
                exec(`django-admin startapp ${argument}`,(err,stdout,stderr)=>{
                    if(err) throw err;
                    console.log(`Creating django app ${argument}`);
                    console.log(stdout);
                    fs.mkdir(path.join(__dirname, 'templates'),(err)=>{
                        if(err){
                            if(err.code === 'EEXIST'){
                                fs.mkdir(path.join(__dirname , 'templates' , `${argument.toLowerCase()}-ui`),(err)=>{
                                    if(err){
                                        if(err.code === 'EEXIST'){
                                            console.log('Already here');
                                        }else{
                                            console.log(err)
                                        }

                                    }else{
                                        console.log(`${argument.toLowerCase()}-ui folder is created in templates`);
                                        const server_app_template_name = path.join(__dirname , 'templates' , `${argument.toLowerCase()}-ui` , `${argument.toLowerCase()}-ui.html`);
                                        fs.writeFile(server_app_template_name , reactAppTemplate(argument) , (err)=>{
                                            if(err) throw err;
                                            console.log(`${argument.toLowerCase()}-ui.html , django template of ${argument} app has been created`);
                                        })
                                    }
                                })
                                
                            }
                            else{console.log(err)}
                        }else{
                            console.log('templates created successfully');
                        }
                    })
                    fs.mkdir(path.join(__dirname, 'static'),(err)=>{
                        if(err){
                            if(err.code === 'EEXIST'){
                                fs.mkdir(path.join(__dirname , 'static' , `${argument.toLowerCase()}-ui`),(err)=>{
                                    if(err){
                                        if(err.code === 'EEXIST'){
                                            console.log('Already here');
                                        }else{
                                            console.log(err)
                                        }

                                    }else{
                                        console.log(`${argument.toLowerCase()}-ui folder is created in static`);
                                        
                                        
                                    }
                                })
                            }
                            else{console.log(err)}
                        }else{
                            console.log('static created successfully');
                            
                        }
                    })
                    DAM.createAppUrls(argument);
                    DAM.updateViews(argument);
                    
                })
                exec(`npx create-react-app ${argument.toLowerCase()}-ui`,(err,stdout,stderr)=>{
                    if(err) throw err;
                    console.log(`Created react app ${argument.toLowerCase()}-ui`);
                    console.log(stdout);
                    // copy the djangofication file to react app root
                    fs.copyFile(path.join(__dirname , 'djangofication.js'), path.join(__dirname , `${argument.toLowerCase()}-ui` , 'djangofication.js'),(e)=>{
                        if(e) throw e;
                        console.log(`djangofication.js has been copied to ${argument.toLowerCase()}-ui root`);
                    });
                    // build script for building local app
                    const buildScript = ()=>{
                        return(`process.chdir(__dirname);const exec = require('child_process').exec;exec('npm run build' , (err,stdout,stderr)=>{if(err) throw err;console.log(stdout);});`);
                    }
                    // creating a new script for building react app
                    fs.writeFile(path.join(__dirname , `${argument.toLowerCase()}-ui` , `${argument}.build.js`) , buildScript() , (err)=>{
                        if(err) throw err;
                        console.log(`${argument}.build.js created and build code copied for ${argument.toLowerCase()}-ui`);
                    })
                    // adding the app to app list
                    AppList.add(argument);
                })
            }else{
                console.log('Appname must begin with uppercase letters , any number or letter afterwards')
            }
        }
        break;

    // delete app command

    case 'delete-app':
        if(typeof(argument) == 'undefined'){
            console.log('Must enter an app name to delete');
        }else{
            const django_app_dir = path.join(__dirname , argument);
            const react_app_dir = path.join(__dirname, `${argument.toLowerCase()}-ui`);

            const templates_app_dir = path.join(__dirname , 'templates' , `${argument.toLowerCase()}-ui`);
            const static_app_dir = path.join(__dirname , 'static' , `${argument.toLowerCase()}-ui`);


            rmdir( django_app_dir, function (err, dirs, files) {
                if(err) throw err;
                console.log(dirs);
                console.log(files);
                console.log(`${argument} django app removed successfully`);
                
              });
            rmdir(react_app_dir, function (err, dirs, files) {
                if(err) throw err;
                console.log(dirs);
                console.log(files);
                console.log(`${argument.toLowerCase()}-ui react app removed successfully`);
            });
            rmdir(templates_app_dir , (e,d,f)=>{
                if(e) throw e;
                console.log(d)
                console.log(f);
                console.log(`${argument.toLowerCase()}-ui folder in templates removed successfully`);
            })
            rmdir(static_app_dir , (e,d,f)=>{
                if(e) throw e;
                console.log(d)
                console.log(f);
                console.log(`${argument.toLowerCase()}-ui folder in static removed successfully`);
            })
            // deleting from applist
            AppList.remove(argument);

        }
        break;

    default :
        console.log('Please Choose An option to comply')
        break;
}
