import "dotenv/config";
import { FirebaseAdmin } from "../libs/firebase";

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment variables."
    );
    process.exit(1);
  }

  try {
    const userExists = await FirebaseAdmin.auth().getUserByEmail(email);

    if (!!userExists) {
      console.log(
        `Admin user already exists. \n ${JSON.stringify(userExists)}`
      );
      throw new Error("Admin user already exists.");
    }

    const newAdmin = await FirebaseAdmin.auth().createUser({
      email,
      password,
      emailVerified: true,
      displayName: "COMQ Admin",
    });

    await FirebaseAdmin.auth().setCustomUserClaims(newAdmin.uid, {
      role: "admin",
    });

    console.log(`Admin user created: ${newAdmin}`);
  } catch (error) {
    console.error("Error seeding admin user:", error);
    process.exit(1);
  }
}

seedAdminUser();
