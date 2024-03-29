import StoreProvider from "./storeProvider";
// import { Press_Start_2P } from "next/font/google";
import { Pixelify_Sans } from "next/font/google";
// import { Inter } from "next/font/google";
import "../ui/globals.css";

// const press = Press_Start_2P({weight: '400', subsets: ["latin"] });
const pixelify = Pixelify_Sans({ subsets: ["latin"] });
// export const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={press.className}> */}
      <body className={pixelify.className}>
      {/* <body className={inter.className}> */}
        <StoreProvider children={children}/>
      </body>
    </html>
  );
}
