import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database connected");
    });

    connection.on("error", (err) => {
      console.log("Error in connection,", err);
      process.exit();
    });
  } catch (error) {
    console.log("SOmething went wrong");
    console.log(error);
  }
}
