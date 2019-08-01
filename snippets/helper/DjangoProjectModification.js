const path = require('path');
const fs = require('fs');

const bin_dir = path.join(__dirname ,'../','bin');

module.exports = DjangoProjectModification = {
    localSettings : ()=>{
        // read local settings file
        fs.readFile(path.join(bin_dir , 'local_settings_py.txt'),'utf8',(err,data)=>{
            if(err) throw err;
            const target_dir = path.join(__dirname , '../' , '../' ,'Rango');
            fs.writeFile(path.join(target_dir , 'local_settings.py') , data , (e)=>{
                if(e) throw e;
                console.log('Created local_settings.py file in root django app "Rango" with all the code ya need!')
            })
           
        })

    },
    localWsgi : () =>{
        // read local wsgi file
        fs.readFile(path.join(bin_dir , 'local_wsgi_py.txt'),'utf8',(err,data)=>{
            if(err) throw err;
            const target_dir = path.join(__dirname , '../' , '../' ,'Rango');
            fs.writeFile(path.join(target_dir , 'local_wsgi.py') , data , (e)=>{
                if(e) throw e;
                console.log('Created local_wsgi.py file in root django app "Rango" with all the code ya need!')
            })
        })

    },
    localManage : () => {
        // read local manage file
        fs.readFile(path.join(bin_dir , 'local_manage_py.txt'),'utf8',(err,data)=>{
            if(err) throw err;
            const target_dir = path.join(__dirname , '../' , '../');
            fs.writeFile(path.join(target_dir , 'local_manage.py') , data , (e)=>{
                if(e) throw e;
                console.log('Created local_manage.py file in root django project with all the code ya need!')
            })
        })


    }
}