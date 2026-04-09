export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3001),
  jwtSecret: process.env.JWT_SECRET ?? 'systemlife-dev-secret',
  databaseUrl:
    process.env.DATABASE_URL ?? 'postgresql://systemlife:systemlife@localhost:5432/systemlife',
  googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID ?? '',
  googleAndroidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID ?? '',
  googleIosClientId: process.env.GOOGLE_IOS_CLIENT_ID ?? '',
};
