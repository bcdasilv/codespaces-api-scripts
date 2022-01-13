const authModule = require('@octokit/auth-token');
const {Octokit} = require('octokit');
const dotenv = require('dotenv');
dotenv.config();

const tokenString = process.env.ACCESS_TOKEN;
const octokit = new Octokit({auth:tokenString});

async function getAllCodeSpaces(){
    //console.log(tokenString);
    //const auth = await authModule.createTokenAuth(tokenString);
    //console.log(auth);
    // const { token } = await auth();
    // console.log(token);
    // const token =
    // {
    //     type: 'token',
    //     token: tokenString,
    //     tokenType: 'oauth'
    // };

    const codespaces = await octokit.request('GET /user/codespaces');
    return codespaces
}

function extractCodeSpaceNames(codeSpacesRawResponse){
    const names = [];
    return codeSpacesRawResponse.data.codespaces.map(codespace => codespace.name);
}

function deleteAllCodeSpaces(codeSpacesRawResponse){
// await octokit.request('DELETE /user/codespaces/{codespace_name}', {
//     codespace_name: 'codespace_name'
//   })
    getAllCodeSpaces().then( 
        codespaces =>  {
            const names = extractCodeSpaceNames(codespaces);
            console.log(names);
            names.forEach(async (name) => {
                const response = await octokit.request('DELETE /user/codespaces/'+name, {
                    codespace_name: name
                });
                console.log(response);
            });     
        }
        ).catch(error => {
            console.log(error);
        });
}

getAllCodeSpaces().then(response => deleteAllCodeSpaces(response));

// getAllCodeSpaces().then( 
//     codespaces => console.log('Deleting following Codespaces: '+ extractCodeSpaceNames(codespaces))
//     ).catch(error => {
//         console.log(error);
//     });
    
