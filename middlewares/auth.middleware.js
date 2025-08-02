import jwtToken from "../utils/jsonwebtoken.utils.js";

const isAuth = {
    // check authentication
    loggedIn: async(request, response, next) => {
        try {
            // get token from headers
            const accessToken = request.headers.authorization;
            if (!accessToken) {
                return response.status(401).json({ success: false, message: "Access Denied ! Login Again !"});
            };
            try {
                // check the token
                const decodedToken = await jwtToken.verifyAccessToken(accessToken);
                // set user id in request
                request.userId = decodedToken.id;
                // proceed to next
                next();

            } catch (error) {
                return response.status(403).json({ success: false, message: "Access Denied !"});
            };            
        } catch (error) {
            return response.status(500).json({ success: false, message: error.message });
        };
    }
};

export default isAuth;