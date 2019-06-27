module.exports= { 
  auth: (req, res, next) => {
    if (req.headers.auth) {
      console.log(jwt.verify(req.headers.auth, process.env.SECRET))
      req.user = jwt.verify(req.headers.auth, process.env.SECRET);
      next();
    } else {
      res.status(401).send({ message: "You are not authorized" });
    }
  }
}