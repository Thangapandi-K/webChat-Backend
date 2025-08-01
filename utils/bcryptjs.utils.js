import bcrypt from "bcryptjs";

const bcryption = {
    // hashing password
    hashPassword: async(password) => {
        return await bcrypt.hash(password, 10);
    },
    // verify password
    verifyPassword: async(password, hashedPassword) => {
        return bcrypt.compare(password, hashedPassword);
    }
};

export default bcryption;