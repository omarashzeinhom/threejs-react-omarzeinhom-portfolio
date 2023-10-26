import {createClient} from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const SANITY_TOKEN = `skrblreFgZDKF48rkXPBs8lJ47QRznMyp4QAKbLZtoGhSYIs7veRL2Dhqih6NcAvsAzZMajkKGbuQUq4GnOdx3798OJfBpIZiqTAvayITasD0hiks5IjZuGjUhXxWf7eihttmy2G20qQaKjpDknfIZ1CVni69SpFAtlfUgCrL2eE1autvq4S`;
const PROJECT_ID = `cq3uxsem`
//Setup Sanity Client

export const client = createClient({
  projectId: `cq3uxsem`,
  dataset: "production",
  apiVersion: "2022-02-01",
  useCdn: true,
  token: `skrblreFgZDKF48rkXPBs8lJ47QRznMyp4QAKbLZtoGhSYIs7veRL2Dhqih6NcAvsAzZMajkKGbuQUq4GnOdx3798OJfBpIZiqTAvayITasD0hiks5IjZuGjUhXxWf7eihttmy2G20qQaKjpDknfIZ1CVni69SpFAtlfUgCrL2eE1autvq4S`,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);

/*imageUrlBuilder 
- is the function responsible 
- to turn the image into a string to be passed into the src
*/
export const urlFor = (source) => builder?.image(source);