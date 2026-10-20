import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-5 py-24">
      <h1 className="text-4xl">That page is not in the preview.</h1>
      <Link href="/" className="mt-6 inline-block text-primary underline-offset-4 hover:underline">
        Back to the practice
      </Link>
    </main>
  );
}
