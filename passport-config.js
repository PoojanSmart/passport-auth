const localStrategy = require("passport-local").Strategy

function initialize(passport , getUser)
{
    passport.use(new localStrategy({usernameField : 'uname',passwordField : 'pass'},(username,password,done)=>{
        
        user = getUser(username);
        if(user == null)
            return done(null,false,{message:'No user Exist'})
        
        else
        {
            if(user.password == password)
                return done(null,user);
            else
                return done(null,false,{message:'Password Incorrect'})
        }

    }));
    passport.serializeUser((user,done)=>{
        return done(null,user.uname);
    });
    passport.deserializeUser((name,done)=>{
        return done(null,user)
    });
}

module.exports = initialize;