type ProfileProps = {
  name: string;
  bio: string;
  imageUrl?: string;
  date?: string;
};

export default function Profile({ name, bio, imageUrl, date }: ProfileProps) {
  return (
    <section className="flex flex-col items-center gap-8">
      <div className="size-40 overflow-hidden rounded-full border-2 border-neutral-900 bg-neutral-100">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={`${name} 프로필 사진`} className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center text-5xl">🌳</div>
        )}
      </div>
      <div className="relative w-full rounded-sm bg-yellow-300 px-4 py-5 text-center shadow-[4px_4px_0_0_rgba(0,0,0,0.12)]">
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="mt-1 text-base">{bio}</p>
        {date && <span className="absolute bottom-1.5 right-3 text-xs">{date}</span>}
      </div>
    </section>
  );
}
