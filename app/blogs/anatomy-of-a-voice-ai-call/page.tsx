import { permanentRedirect } from "next/navigation";
import { erlanglabsPost } from "@/lib/blogs/erlanglabs";

export default function PreviousErlanglabsArticle() {
  permanentRedirect("/blogs/" + erlanglabsPost.slug);
}
