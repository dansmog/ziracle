import HomePage from "@/components/Homepage";

export default async function ReferralPage({ params }: { params: { code: string } }) {
  const resolvedParams = await params;
  console.log({ params: resolvedParams });


  return <HomePage code={resolvedParams?.code}/>;
}
