import uploadAndGetURL from './uploadFileAndGetURL'
const { map } = require("p-iteration");


export default async function bulkUpload(files, path){
    const filesResolved = await map(files, file => uploadAndGetURL(file, path));
    return filesResolved;
}
