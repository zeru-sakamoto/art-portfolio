import HomeExperience from "@/components/HomeExperience";
import { artworks, featuredArtworks } from "@/lib/artworks";

export default function Home() {
  return <HomeExperience featured={featuredArtworks} catalog={artworks} />;
}
