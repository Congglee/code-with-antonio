import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href="/">
      <div className="hidden lg:flex items-center">
        <Image src="/logo.svg" alt="Logo" width={28} height={28} />
        <p className="font-semibold text-white text-2xl ml-2.5">
          Finance Platform
        </p>
      </div>
    </Link>
  );
}
