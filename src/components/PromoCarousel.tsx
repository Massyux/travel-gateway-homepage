import { getPromos } from "@/lib/getPromos";
import PromoCarouselClient from "./PromoCarouselClient";

export default async function PromoCarousel() {
  const promos = await getPromos();
  return <PromoCarouselClient promos={promos} />;
}
