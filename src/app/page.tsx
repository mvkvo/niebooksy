import { Announcements } from "@/components/features/annoucement";
import hero_img from "@/assets/hero_img.png";
import Image from "next/image";

import "./main.scss";

export default async function Home() {
  return (
    <>
      <Image src={hero_img} alt="hero img" />
      <Announcements />
    </>
  );
}
