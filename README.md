# frontend-development

Website: https://widgwu.github.io/frontend-development/

## CI Pipeline

Current CI scripts live in Github actions under the main.yml file. Update here to change behaviours (e.g., deploy locations on the EC2 instance, etc.).

```java
TODO: Document the code for the next person.
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies using this command in your terminal

```bash
yarn
```

And run the development server using this command in your terminal:

```bash
yarn dev
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file. I would recommend to look deeper into the branch of `app/page.tsx` and change the specific component that you want to change. If you want to create a new page, create one inside app folder. Like `app/admin/page.tsx`. But if you want to create a new component, create one side `app/local-components`. The reason I am using `local-components` instead of just `components` in a standard Nextjs project is because I am using `Shadcn` as well. By default, all the components you download from Shadcn will be imported in `@/components` folder.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Use of YARN rather than npm

At the current moment of building WID frontend, yarn has a better speed and performance than npm because of which I am using yarn.
There is a possibility of getting deprecated warning with npm, so please stick with yarn if you are continuing to build this in future.

## Use of Shadcn components

Shadcn is used for its customizable UI components built on top of TailwindCSS. All the components that is used are saved in `components/ui` folder. Anytime you installed a new component from shadcn it is going to be saved in that location by default. So, feel free to experiment and find new things

## API folder for data integration

All the files for requesting and connecting to backend are placed inside the `app\api` folder. So, please use the same standard.

## Recharts for graphs

All the graphs like Pie chart, Bar chart, line graph, etc are imported from recharts.

## File structure

The Homa page of app directs `/`. Currently, it has no information because I will be preparing a UI login page by default once Firebase is setup.
Every content that we are building is for admin view, that's why every pages are inside admin view which can authenticate any user if they are admin or not.

Admin page has 7 individual tabs named .i.e Home page, Annual report, Course History, Courses, Departments, Graduate Assistants and Upload Courses.
Home page ('/') should show all the graphs and comparison of different terms and year.
Annual report ('/annual-report') should show an aggregation of reports.
Course History ('/course-history') should show all history of the previous courses information.
Courses ('/courses') should show all the courses information.
Departments ('/departments') should show all the departments information.
Graduate Assistants ('/graduate-assistants') show all the information about graduate assistants and their aggregate information.
Upload Courses ('/upload-courses') is basically the functionality to upload and approve any new courses published by WID.

## Local Components

All the components that I am building are in '/local-components' folder. I am structuring it for accessibility and modularity. You can look at each folders to learn more about it.

## Important Note

Most of the components and files in this project are written in `Typescript and Javascript` so make sure to maintain these language for any update.
