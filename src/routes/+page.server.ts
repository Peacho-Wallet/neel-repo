//import { JSDOM } from 'jsdom';
import {DOMParser} from "linkedom"
import { Readability } from '@mozilla/readability';
//import * as fs from 'fs';

/** @type {import('./$types').Actions} */
export const actions = {
  verify: async ({request, platform }) => {
      const formdata = await request.formData();
      const url = formdata.get('url')?.toString()
      console.log(url);
      //fix this part
      
        const encodedJson = new TextEncoder().encode(url);


        console.log("create sha256 hash");
        const myDigest = await crypto.subtle.digest({ name: 'SHA-256' }, encodedJson);
        const hashArray = Array.from(new Uint8Array(myDigest));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        console.log(hashHex);
        
        const response = await fetch(url);
        const html = await response.text();
        //const htmlNoStyle = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
        
        const domParser = new DOMParser();
        const document = domParser.parseFromString(html, 'text/html');

        //const readabilitydocument = document as Document;
        
        const reader = new Readability(document);
        const article = reader.parse();
        console.log(article?.title);
        console.log(article?.content);
        
        
        
        // console.log(htmlNoStyle);
        // const htmlWithoutStyles = stripStyles(html);
      
        // const dom = new JSDOM(htmlWithoutStyles, { url });
        // const reader = new Readability(dom.window.document);
        // const article: ReadabilityResult = reader.parse();
      
        // //const filePath = `${hash}.html`;
      
        // const formattedHtml = createFormattedHtml(article);

        // console.log('Reader view stored successfully.');
      
      

      return {
        success: true,
        html: JSON.stringify(article),
        hash: hashHex,
        title: article?.title,
        content: article?.content
      }
  }
};

interface ReadabilityResult {
  title: string;
  content: string;
}


// function createFormattedHtml(article: ReadabilityResult): string {
//   const dom = new JSDOM('');
//   const document = dom.window.document;

//   const contentElement = document.createElement('div');
//   contentElement.innerHTML = article.content;

//   const imgElements = contentElement.querySelectorAll('img');

//   imgElements.forEach((imgElement) => {
//     const parent = imgElement.parentNode;
//     if (parent && parent.nodeName.toLowerCase() === 'p') {
//       parent.parentNode.insertBefore(imgElement, parent);
//     }
//   });

//   return `
//     <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <title>${article.title}</title>
//         <link href='https://fonts.googleapis.com/css?family=Lexend Deca' rel='stylesheet'>
//       </head>
//       <body>
//         <h1>${article.title}</h1>
//         ${contentElement.innerHTML}
//       </body>
//       <style>
//         body {
//           padding: 0 28%;
//           text-align: center;
//           font-family: 'Lexend Deca', sans-serif;
//           line-height: 1.6;
//         }
//       </style>
//     </html>
//   `;
// }

  