import * as contentfulManagement from 'contentful-management';
import * as contentful from 'contentful';

export const managementClient = contentfulManagement
  .createClient({ accessToken: process.env.CTF_CM_ACCESS_TOKEN });

export const deliveryClient = contentful
  .createClient({
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CD_ACCESS_TOKEN,
    host: 'mrkt.netlify.com',
    basePath: 'api/contentful',
  });
