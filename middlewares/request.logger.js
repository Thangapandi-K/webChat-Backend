const requestLogger = (request, response, next) => {
    console.log("Method", request.method);    
    console.log("Path", request.path);    
    console.log("Query", request.query);
    console.log("Params", request.params.id);
    console.log("Headers", request.headers.authorization);
    console.log("Body", request.body);
    console.log("File", request.file);
    console.log("Cookies", "RefeshToken: ", request.cookies.refreshToken);
    console.log("----------------------------");
    next();
};

export default requestLogger;