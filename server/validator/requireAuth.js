import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization.split(" ")[1];
    let decodedData;

    // Working with our own token
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?.id;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default requireAuth;
