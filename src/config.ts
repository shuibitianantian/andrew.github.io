import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://github.com/shuibitianantian/andrew.github.io.git", 
  author: "",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "Andrew",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/shuibitianantian",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yu-xia-bge0100/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
];
