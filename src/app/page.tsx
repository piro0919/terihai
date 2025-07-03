import dayjs from "dayjs";
import { XMLParser } from "fast-xml-parser";
import App from "./_components/App";

async function getNotes(id: string): Promise<
  {
    creatorName: string;
    link: string;
    pubDate: string;
    title: string;
  }[]
> {
  const response = await fetch(`https://note.com/${id}/rss`, {
    next: { revalidate: 21600 },
  });
  const text = await response.text();
  const parser = new XMLParser();
  const {
    rss: {
      channel: { item },
    },
  } = parser.parse(text);

  console.log(item);

  const notes = (
    Array.isArray(item)
      ? (item as {
          link: string;
          ["note:createrName"]: string;
          pubDate: string;
          title: string;
        }[])
      : [item].filter((item) => item)
  )
    .filter(
      ({ pubDate }) =>
        dayjs(pubDate).isAfter("2025-07-01") &&
        dayjs(pubDate).isBefore("2025-07-15"),
    )
    .map(({ link, pubDate, title, ...item }) => ({
      creatorName: item["note:creatorName"],
      link,
      pubDate,
      title,
    }));

  return notes;
}

export default async function Page(): Promise<React.JSX.Element> {
  const idList = [
    "katy_amanda2525",
    "Ko_kun1212",
    "dandy_parrot4915",
    "alcohol_racing",
    "miotkc_note",
    "sound_arts",
    "chokochipp55",
    "kkweb",
  ];
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const allNotes = await Promise.all(idList.map((id) => getNotes(id)));

  return <App notes={allNotes.flat()} />;
}
