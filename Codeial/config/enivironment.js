//console.log('database in prod', process.env.CODEIAL_db);
const development={
    name:'development',
    asset_path:'./assests',
    session_cookie_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        //service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'learnniru@gmail.com',
            pass: 'yimkydpvlbgkuypa' 
        }
    },
    google_client_id:"231182464812-f9etpgbqn52adh5bqtcbiojdd4sskhjk.apps.googleusercontent.com",
    google_client_Secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',

}

const production={

    name:'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_session_cookie_key,
    db:process.env.CODEIAL_db,
    smtp: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: { user: process.env.CODEIAL_smtp_email,
                pass: process.env.CODEIAL_smtp_pass 
          }
    },
    google_client_id: process.env.CODEIAL_google_client_id,
    google_client_Secret: process.env.CODEIAL_google_client_Secret,
    google_call_back_url: process.env.CODEIAL_google_call_back_url,
    jwt_secret: process.env.CODEIAL_jwt_secret,

} 

module.exports=eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);