import MainContent from "@/components/MainContent";

console.log(
  'SANITY:',
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  process.env.NEXT_PUBLIC_SANITY_API_VERSION
)
export default function Home() {
  return <MainContent />;
}
