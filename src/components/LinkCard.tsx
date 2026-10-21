"use client";

type LinkCardProps = {
  id: string;
  title: string;
  url: string;
  clicks: number;
};

export default function LinkCard({ id, title, url, clicks }: LinkCardProps) {
  const recordClick = () => {
    fetch(`/api/links/${id}/click`, { method: "POST", keepalive: true }).catch(
      () => {},
    );
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordClick}
      className="block rounded-2xl border-2 border-neutral-900 px-5 py-5 text-center text-lg font-medium transition hover:-translate-y-0.5 hover:bg-yellow-100 active:translate-y-0"
    >
      {title}
      <span className="mt-1 block text-sm font-normal text-neutral-500">
        클릭 {clicks.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
