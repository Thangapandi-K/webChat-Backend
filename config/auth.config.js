import jwtToken from "../utils/jsonwebtoken.utils.js";

const isAuth = {
    // check authentication
    loggedIn: async(request, response, next) => {
        try {
            // get token from headers
            const accessToken = request.headers.authorization;
            if (!accessToken) {
                return response.status(401).json({ success: false, message: "Access Denied"});
            };
            try {
                // check the token
                const isTokenValid = await jwtToken.verifyAccessToken(accessToken);
                if (!isTokenValid) {
                    return response.status(403).json({ success: false, message: "User Not Authorized !"});
                };
                // set user id in request
                request.userId = isTokenValid.id;
                // proceed to next
                next();

            } catch (error) {
                return response.status(401).json({ success: false, message: "Access Denied !"});
            };            
        } catch (error) {
            return response.status(500).json({ success: false, message: error.message });
        };
    }
};

export default isAuth;