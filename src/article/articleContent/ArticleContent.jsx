import DOMPurify from 'dompurify';
import {Helmet} from 'react-helmet';
import React, {useEffect, useState} from 'react';
import Rock from './Rock.svg';
import Comment from './Comment.svg';
import {useParams} from 'react-router-dom';
import {SERVER_URL} from '../../config';
import './ArticleContent.css';
import ReadingListIcon from './reading-list-svgrepo-com.svg';
import tick from './tick-circle-svgrepo-com.svg';

let cont =
  '<article>\n<header>\n<address>\n<div>\n<img alt="Jese Leos" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"/>\n<div>\n<a href="#" rel="author"> Jese Leos &lt; /a &gt;\n<p> Graphic Designer, educator &amp; CEO Flowbite &lt; /p &gt;\n</p> <time datetime="2022-02-08" pubdate="" title="February 8th, 2022"> Feb. 8, 2022 &lt; /time &gt; </time>\n</a></div>\n</div>\n</address>\n<h1> Best practices for successful prototypes &lt; /h1 &gt;\n          </h1></header>\n<p> Flowbite is an open-source library of UI components built with the utility-first\n              classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals,\n              datepickers. &lt; /p &gt;\n          <p> Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way,\n              you can think things through before committing to an actual design project. &lt; /p &gt;\n          <p> But then I found a &lt; a href = "https://flowbite.com" &gt; component library based on Tailwind CSS called\n                  Flowbite &lt; /a &gt; . It comes with the most commonly used UI components, such as buttons, navigation\n              bars, cards, form elements, and more which are conveniently built with the utility classes from\n              Tailwind CSS.</p>\n<figure><img alt="" src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-1.png"/>\n<figcaption>Digital art by Anonymous</figcaption>\n</figure>\n<h2>Getting started with Flowbite</h2>\n<p>First of all you need to understand how Flowbite works. This library is not another framework.\n              Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the\n              documentation.</p>\n<p>It also includes a JavaScript file that enables interactive components, such as modals, dropdowns,\n              and datepickers which you can optionally include into your project via CDN or NPM.</p>\n<p>You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart\n                  guide</a> to explore the elements by including the CDN files into your project. But if you want\n              to build a project with Flowbite I recommend you to follow the build tools steps so that you can\n              purge and minify the generated CSS.</p>\n<p>Youll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help\n              you get started with your projects even faster. You can check out this <a href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand\n              the differences between the open-source and pro version of Flowbite.</p>\n<h2>When does design come in handy?</h2>\n<p>While it might seem like extra work at a first glance, here are some key moments in which prototyping\n              will come in handy:</p>\n<ol>\n<li><strong>Usability testing</strong>. Does your user know how to exit out of screens? Can they\n                  follow your intended user journey and buy something from the site youve designed? By running a\n                  usability test, youll be able to see how users will interact with your design once its live;\n              </li>\n<li><strong>Involving stakeholders</strong>. Need to check if your GDPR consent boxes are displaying\n                  properly? Pass your prototype to your data protection team and they can test it for real;</li>\n<li><strong>Impressing a client</strong>. Prototypes can help explain or even sell your idea by\n                  providing your client with a hands-on experience;</li>\n<li><strong>Communicating your vision</strong>. By using an interactive medium to preview and test\n                  design elements, designers and developers can understand each other — and the project — better.\n              </li>\n</ol>\n<h3>Laying the groundwork for best design</h3>\n<p>Before going digital, you might benefit from scribbling down some ideas in a sketchbook. This way,\n              you can think things through before committing to an actual design project.</p>\n<p>Lets start by including the CSS file inside the <code>head</code> tag of your HTML.</p>\n<h3>Understanding typography</h3>\n<h4>Type properties</h4>\n<p>A typeface is a collection of letters. While each letter is unique, certain shapes are shared across\n              letters. A typeface represents shared patterns across a collection of letters.</p>\n<h4>Baseline</h4>\n<p>A typeface is a collection of letters. While each letter is unique, certain shapes are shared across\n              letters. A typeface represents shared patterns across a collection of letters.</p>\n<h4>Measurement from the baseline</h4>\n<p>A typeface is a collection of letters. While each letter is unique, certain shapes are shared across\n              letters. A typeface represents shared patterns across a collection of letters.</p>\n<h3>Type classification</h3>\n<h4>Serif</h4>\n<p>A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter.\n              Typefaces with serifs are called serif typefaces. Serif fonts are classified as one of the\n              following:</p>\n<h4>Old-Style serifs</h4>\n<ul>\n<li>Low contrast between thick and thin strokes</li>\n<li>Diagonal stress in the strokes</li>\n<li>Slanted serifs on lower-case ascenders</li>\n</ul><img alt="" src="https://flowbite.s3.amazonaws.com/typography-plugin/typography-image-2.png"/>\n<ol>\n<li>Low contrast between thick and thin strokes</li>\n<li>Diagonal stress in the strokes</li>\n<li>Slanted serifs on lower-case ascenders</li>\n</ol>\n<h3>Laying the best for successful prototyping</h3>\n<p>A serif is a small shape or projection that appears at the beginning:</p>\n<blockquote>\n<p>Flowbite is just awesome. It contains tons of predesigned components and pages starting from\n                  login screen to complex dashboard. Perfect choice for your next SaaS application.</p>\n</blockquote>\n<h4>Code example</h4>\n<p>A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter.\n              Typefaces with serifs are called serif typefaces. Serif fonts are classified as one of the\n              following:</p>\n<pre><code>&lt;dl class="grid grid-cols-2 gap-8 max-w-screen-md text-gray-900 sm:grid-cols-3 dark:text-white"&gt;\n&lt;div class="flex flex-col justify-center items-center"&gt;\n  &lt;dt class="mb-2 text-3xl font-extrabold"&gt;73M+&lt;/dt&gt;\n  &lt;dd class="text-lg font-normal text-gray-500 dark:text-gray-400"&gt;developers&lt;/dd&gt;\n&lt;/div&gt;\n&lt;div class="flex flex-col justify-center items-center"&gt;\n  &lt;dt class="mb-2 text-3xl font-extrabold"&gt;1B+&lt;/dt&gt;\n  &lt;dd class="text-lg font-normal text-gray-500 dark:text-gray-400"&gt;contributors&lt;/dd&gt;\n&lt;/div&gt;\n&lt;div class="flex flex-col justify-center items-center"&gt;\n  &lt;dt class="mb-2 text-3xl font-extrabold"&gt;4M+&lt;/dt&gt;\n  &lt;dd class="text-lg font-normal text-gray-500 dark:text-gray-400"&gt;organizations&lt;/dd&gt;\n&lt;/div&gt;\n&lt;/dl&gt;\n</code></pre>\n<h4>Table example</h4>\n<p>A serif is a small shape or projection that appears at the beginning or end of a stroke on a letter.\n          </p>\n<table>\n<thead>\n<tr>\n<th>Country</th>\n<th>Date &amp; Time</th>\n<th>Amount</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>United States</td>\n<td>April 21, 2021</td>\n<td><strong>$2,300</strong></td>\n</tr>\n<tr>\n<td>Canada</td>\n<td>May 31, 2021</td>\n<td><strong>$300</strong></td>\n</tr>\n<tr>\n<td>United Kingdom</td>\n<td>June 3, 2021</td>\n<td><strong>$2,500</strong></td>\n</tr>\n<tr>\n<td>Australia</td>\n<td>June 23, 2021</td>\n<td><strong>$3,543</strong></td>\n</tr>\n<tr>\n<td>Germany</td>\n<td>July 6, 2021</td>\n<td><strong>$99</strong></td>\n</tr>\n<tr>\n<td>France</td>\n<td>August 23, 2021</td>\n<td><strong>$2,540</strong></td>\n</tr>\n</tbody>\n</table>\n<h3>Best practices for setting up your prototype</h3>\n<p><strong>Low fidelity or high fidelity?</strong> Fidelity refers to how close a prototype will be to\n              the real deal. If youre simply preparing a quick visual aid for a presentation, a low-fidelity\n              prototype — like a wireframe with placeholder images and some basic text — would be more than\n              enough. But if youre going for more intricate usability testing, a high-fidelity prototype — with\n              on-brand colors, fonts and imagery — could help get more pointed results.</p>\n<p><strong>Consider your user</strong>. To create an intuitive user flow, try to think as your user\n              would when interacting with your product. While you can fine-tune this during beta testing,\n              considering your users needs and habits early on will save you time by setting you on the right\n              path.</p>\n<p><strong>Start from the inside out</strong>. A nice way to both organize your tasks and create more\n              user-friendly prototypes is by building your prototypes inside out. Start by focusing on what will\n              be important to your user, like a Buy now button or an image gallery, and list each element by order\n              of priority. This way, youll be able to create a prototype that puts your users needs at the heart\n              of your design.</p>\n<p>And there you have it! Everything you need to design and share prototypes — right in Flowbite Figma.\n          </p></p></p></article>';

const ArticleContent = ({content, thumbnail, heading, likes, liked, fetchBlog, toread, setRead}) => {
  const blog_id = useParams().id;
  const addLike = async e => {
    const token = localStorage.getItem('jwt');
    const response = await fetch(`${SERVER_URL}/api/blog/${blog_id}/addlike`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        fetchBlog();
      }
    }
  };
  const removeLike = async e => {
    const token = localStorage.getItem('jwt');
    const response = await fetch(`${SERVER_URL}/api/blog/${blog_id}/removelike`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        fetchBlog();
      }
    }
  };
  const addToReadingList = async () => {
    console.log('blog added');
    const token = localStorage.getItem('jwt');
    const response = await fetch(`${SERVER_URL}/api/user/${blog_id}/addblogtolist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        fetchBlog();
      }
    }
  };
  const deleteBlog = async () => {
    console.log('blog delted');
    const token = localStorage.getItem('jwt');
    const response = await fetch(`${SERVER_URL}/api/user/${blog_id}/deleteblogfromlist`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data2 = await response.json();
      if (data2.success) {
        fetchBlog();
        console.log();
      }
    }
  };

  const allSpacesRemoved = heading.replaceAll(' ', '-');
  return (
    <div className="mx-0 flex justify-center gap-7 lg:mx-56">
      <div
        className="prose prose-2xl prose-invert  m-10 rounded-xl p-10 pt-24 shadow-[0_0_60px_20px_rgb(0,0,0,0.22)] lg:prose-xl prose-h1:font-sans prose-a:text-indigo-600 hover:prose-a:text-indigo-400 prose-li:!text-gray-300 prose-img:mx-auto prose-img:rounded-xl dark:bg-[#101010] sm:mx-0"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(`<h1>${heading}</h1>` + `<img src="${thumbnail}" />` + content),
        }}></div>
      <div className="fixed bottom-10 flex divide-x divide-slate-400 rounded-full bg-[#101010] p-5 py-3 shadow-[0_0_60px_20px_rgb(0,0,0,0.42)]">
        <button onClick={liked ? removeLike : addLike}>
          <p
            className={`mr-2 text-lg font-extrabold text-gray-300  ${
              liked ? 'opacity-100 hover:opacity-80' : 'opacity-80 hover:opacity-100'
            } `}>
            {likes}
          </p>

          <img
            className={`${liked ? 'opacity-100 hover:opacity-80' : 'opacity-80 hover:opacity-100'} mr-6`}
            src={Rock}
            alt="Appreciate"
          />
        </button>
        <button>
          <img
            className="ml-1 opacity-80 hover:opacity-100"
            src={Comment}
            alt="Comment"
            onClick={e => {
              e.preventDefault();
              document.getElementById('comment-section-blog-comment-form').scrollIntoView();
            }}
          />
        </button>
        {toread ? (
          <button
            onClick={async() => {
              await deleteBlog(blog_id);
              setRead(!toread);
            }}>
            <img className="ml-6 h-10 w-10 opacity-80 hover:opacity-100" src={tick} alt={'Added to Reading List'} />
          </button>
        ) : (
          <button
            onClick={async() => {
              await addToReadingList();
              setRead(!toread);
            }}>
            <img
              className="ml-6 h-10 w-10 opacity-80 hover:opacity-100"
              src={ReadingListIcon}
              alt={'Add to Reading List'}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ArticleContent;

// install tailwind plugin: npm install @tailwindcss/typography.
// Then add the plugin to your tailwind.config.js file: require('@tailwindcss/typography')
