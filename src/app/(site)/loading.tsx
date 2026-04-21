import Image from 'next/image'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-lync">
      <Image
        src="/brand/ICON_WHITE.png"
        alt=""
        width={56}
        height={56}
        className="h-14 w-14 object-contain animate-pulse-soft"
        priority
      />
    </div>
  )
}
