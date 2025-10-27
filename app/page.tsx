import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      {/* Fullscreen background image */}
      <Image
        src="/logo.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 space-y-6">
        <h1 className="text-white text-8xl font-bold tracking-wide">ECOVEST</h1>

        <Link href="/auth/login">
          <button className="bg-base text-white py-4 px-7 font-semibold hover:bg-green-800 transition cursor-pointer text-xl">
            Start investing
          </button>
        </Link>
      </div>
    </div>
  );
}
