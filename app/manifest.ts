import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return {name:"Suleman Sadat Portfolio",short_name:"Suleman Sadat",description:"Software engineer and tech entrepreneur portfolio",start_url:"/",display:"standalone",background_color:"#000000",theme_color:"#000000",icons:[{src:"/app-icon.svg",sizes:"any",type:"image/svg+xml"}]} }
