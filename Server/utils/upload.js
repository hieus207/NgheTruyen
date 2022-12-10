import path from 'path';
const __dirname = path.resolve();
export const MultiUpload = (arr,folderName) =>{
    let uploadPath = []
    for(let i=0; i<arr.length; i++){
        let uploadArrayPath = __dirname + '/'+folderName+'/' + arr[i].name;
        arr[i].mv(uploadArrayPath), 
         
          //   res.send('File uploaded!');
        uploadPath.push("http://localhost:5000/"+folderName+"/"+arr[i].name)
    
          
    }
    return uploadPath
}