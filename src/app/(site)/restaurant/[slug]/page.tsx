import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RestaurantDetail from "./RestaurantDetail";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("restaurants")
    .select("name, location")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Restaurant Not Found" };

  return {
    title: data.name,
    description: data.location
      ? `${data.name} — halal restaurant in ${data.location}`
      : undefined,
  };
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) notFound();

  return <RestaurantDetail restaurant={data} />;
}
