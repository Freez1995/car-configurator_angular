export const environment = {
  firebase: {
    projectId: process.env['NG_APP_PROJECT_ID'],
    appId: process.env['NG_APP_APP_ID'],
    databaseURL: process.env['NG_APP_DATABASE_URL'],
    storageBucket: process.env['NG_APP_STORAGE_BUCKET'],
    locationId: process.env['NG_APP_LOCATION_ID'],
    apiKey: process.env['NG_APP_API_KEY'],
    authDomain: process.env['NG_APP_AUTH_DOMAIN'],
    messagingSenderId: process.env['NG_APP_MESSAGING_SENDER_ID'],
  },
  production: true,
};
