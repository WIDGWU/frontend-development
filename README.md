# frontend-development

## CI Pipeline
Current CI scripts live in Github actions under the main.yml file. Update here to change behaviours (e.g., deploy locations on the EC2 instance, etc.).
```java
TODO: Document the code for the next person. 
```
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

The link to see the project live will be provided soon.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file. I would recommend to look deeper into the branch of `app/page.tsx` and change the specific component that you want to change. If you want to create a new page, create one inside app folder. Like `app/admin/page.tsx`. But if you want to create a new component, create one side `app/local-components`. The reason I am using `local-components` instead of just `components` in a standard Nextjs project is because I am using `Shadcn` as well. By default, all the components you download from Shadcn will be imported in `@/components` folder. 

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Use of YARN rather than npm

At the current moment of building WID frontend, yarn has a better speed and performance than npm because of which I am using yarn.
There is a possibility of getting deprecated warning with npm, so please stick with yarn if you are continuing to build this in future.

## Use of Shadcn components

Shadcn is used for its customizable UI components built on top of TailwindCSS. So, feel free to experiment and find new things.

## API folder for data integration

All the files for requesting and connecting to backend are placed inside the `app\api` folder. So, please use the same standard.  

## Recharts for graphs
