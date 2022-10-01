"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[352],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>A});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},c=Object.keys(e);for(o=0;o<c.length;o++)n=c[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(o=0;o<c.length;o++)n=c[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var m=o.createContext({}),s=function(e){var t=o.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=s(e.components);return o.createElement(m.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},p=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,c=e.originalType,m=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=s(n),A=a,l=p["".concat(m,".").concat(A)]||p[A]||u[A]||c;return n?o.createElement(l,r(r({ref:t},d),{},{components:n})):o.createElement(l,r({ref:t},d))}));function A(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var c=n.length,r=new Array(c);r[0]=p;var i={};for(var m in t)hasOwnProperty.call(t,m)&&(i[m]=t[m]);i.originalType=e,i.mdxType="string"==typeof e?e:a,r[1]=i;for(var s=2;s<c;s++)r[s]=n[s];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}p.displayName="MDXCreateElement"},4950:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>r,default:()=>u,frontMatter:()=>c,metadata:()=>i,toc:()=>s});var o=n(7462),a=(n(7294),n(3905));const c={sidebar_position:3},r="Custom command",i={unversionedId:"commands/custom-command",id:"commands/custom-command",title:"Custom command",description:"Custom command is the most powerful type of command offered by Arcybot. It allows you to create and execute a custom function with no limitations.",source:"@site/docs/04-commands/03-custom-command.md",sourceDirName:"04-commands",slug:"/commands/custom-command",permalink:"/arcybot/docs/commands/custom-command",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Embed command",permalink:"/arcybot/docs/commands/embed-command"},next:{title:"Advanced topics",permalink:"/arcybot/docs/category/advanced-topics"}},m={},s=[{value:"Custom command object",id:"custom-command-object",level:3},{value:"Example",id:"example",level:3}],d={toc:s};function u(e){let{components:t,...c}=e;return(0,a.kt)("wrapper",(0,o.Z)({},d,c,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"custom-command"},"Custom command"),(0,a.kt)("p",null,"Custom command is the most powerful type of command offered by Arcybot. It allows you to create and execute a custom function with no limitations."),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"The function which you want to execute via a custom commands must have the same name as the keyword for the command - for example, if you want to create a ",(0,a.kt)("inlineCode",{parentName:"p"},"help")," command, its function must also be named ",(0,a.kt)("inlineCode",{parentName:"p"},"help"),".")),(0,a.kt)("h3",{id:"custom-command-object"},"Custom command object"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"type CustomCommand = {\n  /************************\n   * CUSTOM COMMAND PROPS *\n   * **********************/\n\n  type: CommandType.FUNCTION, // indicated that the command is of a FUNCTION type\n\n  /*************************\n   * GENERIC COMMAND PROPS *\n   * ***********************/\n  \n  keyword: string,            // keyword to use the command AND name of the function to be executed\n  description: string,        // description of the command appearing in the slash command menu\n  isDisabled: boolean,        // if set to true, command cannot be used\n  isModOnly: boolean,         // if set to true, only users with ADMIN permissions can use it\n  canUseInDm: boolean,        // if set to true, it can be used in private message\n}\n")),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="index.ts"',title:'"index.ts"'},"import { Arcybot, CommandObject, DiscordInteraction } from 'arcybot';\n\n// `foo` is a custom function to be executed upon using the `foo` command.\n// It must have the same name as the keyword of the command.\nconst foo = async (interaction: DiscordInteraction): Promise<void> => {\n    const date = new Date().toLocaleDateString();\n    interaction.reply(`Current date is: ${date}`);\n};\n\n// `commandsObject` defining the custom `foo` command.\nconst commandsObject: CommandObject[] = [{\n  type: CommandType.FUNCTION,\n  keyword: 'foo',\n  description: 'Demonstrates use of a FUNCTION command.',\n  isDisabled: false,\n  isModOnly: false,\n  canUseInDm: true,\n}]\n\n// `commandsFunctions` argument must be an array of custom functions.\nconst commandsFunctions = [foo];\n\nconst bot = new Arcybot(commandsObject, commandsFunctions, CONFIG);\n\nbot.start('Bot started!');\n")),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(8080).Z,width:"472",height:"181"})),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(2598).Z,width:"257",height:"79"})))}u.isMDXComponent=!0},8080:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/foo-01-dc7ec51cde63ab54e3da3b53669e262b.png"},2598:(e,t,n)=>{n.d(t,{Z:()=>o});const o="data:image/png;base64,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"}}]);