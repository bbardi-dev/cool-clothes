const admin = require("firebase-admin");
const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG || " ");

export const verifyIdToken = (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
      databseURL: "",
    });
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((e: any) => {
      console.log(e);
      throw e;
    });
};
