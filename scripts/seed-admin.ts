
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user.model";


dotenv.config({ path: ".env.local" });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_FNAME = process.env.ADMIN_FNAME;
const ADMIN_LNAME = process.env.ADMIN_LNAME;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PHONE = process.env.ADMIN_PHONE;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 12);

async function seedAdmin() {
  try {
    // Validate environment variables.
    if (
      !MONGODB_URI ||
      !ADMIN_FNAME ||
      !ADMIN_LNAME ||
      !ADMIN_EMAIL ||
      !ADMIN_PHONE ||
      !ADMIN_PASSWORD
    ) {
      throw new Error(
        "Missing required environment variables. Check your .env.local file."
      );
    }

    const email = ADMIN_EMAIL.trim().toLowerCase();
    const phone = ADMIN_PHONE.trim();
    const password = ADMIN_PASSWORD;

    // Validate credentials.
    if (password.length < 12 || password.length > 128) {
      throw new Error(
        "Admin password must be between 12 and 128 characters."
      );
    }

    if (!Number.isInteger(BCRYPT_ROUNDS) || BCRYPT_ROUNDS < 10) {
      throw new Error("BCRYPT_ROUNDS must be an integer of at least 10.");
    }

    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI);

    console.log("Connected to MongoDB.");

    // Prevent accidental creation of additional bootstrap admins.
    const existingAdmin = await User.findOne({ role: "admin" }).lean();

    if (existingAdmin) {
      console.log(
        "An administrator already exists. Bootstrap cancelled."
      );
      return;
    }

    // Prevent duplicate email or phone.
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    }).lean();

    if (existingUser) {
      throw new Error(
        "A user with this email address or phone number already exists."
      );
    }

    console.log("Hashing administrator password...");

    const hashedPassword = await bcrypt.hash(
      password,
      BCRYPT_ROUNDS
    );

    const admin = await User.create({
      fname: ADMIN_FNAME.trim(),
      lname: ADMIN_LNAME.trim(),
      email,
      phone,
      password: hashedPassword,
      role: "admin",
      firstLogin: false,
      lastLogin: null,
    });

    console.log("\nAdministrator created successfully!");
    console.log("-----------------------------------");
    console.log(`Name: ${admin.fname} ${admin.lname}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);
    console.log("-----------------------------------");
    console.log("You can now log in using your admin credentials.");
  } catch (error) {
    console.error("\nAdmin seeding failed:");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("MongoDB connection closed.");
    }
  }
}

seedAdmin();
