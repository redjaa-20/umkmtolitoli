import Image from "next/image";

// ------------------------------------------------------------

type DetailUmkmCoverProps = {
  src: string;
  alt: string;
};

// ------------------------------------------------------------

export function DetailUmkmCover({ src, alt }: DetailUmkmCoverProps) {
  return (
    <div className="w-full h-60 md:h-125 relative overflow-hidden">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
