const { connect } = require("mongoose");
require("dotenv").config();

const connectMG = async () => {
  try {
    await connect(`${process.env.CONECCIONDB}`);
  } catch (error) {
    console.error(error);
    throw "can not connect to the bd";
  }
};

connectMG();
