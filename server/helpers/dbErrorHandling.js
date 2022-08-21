// Custom error handling to get useful
// error messages from MongoDB

const uniqueMessage = (error) => {
  let output;
  try {
    const fieldName = error.message.split(".$")[1];
    field = field.split(" dub key")[0];
    field = field.substring(0, field.lastIndexOf("_"));
    req.flasj("errors", [
      {
        message: `An account with this ${field} already exists`,
      },
    ]);

    return (
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + " already exists"
    );
  } catch (error) {
    return "already exists";
  }
};

export const errorHandler = (error) => {
  if (error.code) {
    switch (error.code) {
      case 11000:
      case 110001:
        return uniqueMessage(error);
      default:
        return "Something went wrong";
    }
  } else {
    for (let errorName in error.errors) {
      if (error.errors[errorName].message) {
        return error.errors[errorName.message];
      }
    }
  }
};
