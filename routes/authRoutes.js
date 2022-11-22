const passport = require('passport');

module.exports =(app) =>{

    app.get('/auth/google',
        passport.authenticate('google',{scope:['profile','email']})
    );

    app.get('/home',(req,res)=>{
        res.send({user:req.user});
    });

    app.get('/api/current_user',(req,res)=>{
        //console.log('User',req);
        res.send(req.user);
    });

    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/home');
    });

    app.get('/api/logout',(req,res)=>{
        req.logout();
        res.send({user:'User logged out'});
    })
};