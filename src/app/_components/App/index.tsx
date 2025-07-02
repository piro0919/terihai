"use client";
import { CloseButton } from "@chakra-ui/close-button";
import clsx from "clsx";
import dayjs from "dayjs";
import { Yuji_Boku } from "next/font/google";
import Image from "next/image";
import noScroll from "no-scroll";
import { Fragment, useEffect, useMemo } from "react";
import usePortal from "react-cool-portal";
import PageBorder from "react-page-border";
import { useReward } from "react-rewards";
import { SocialIcon } from "react-social-icons";
import useShowWindowSize from "use-show-window-size";
import note from "./_static/note.png";
import sankakuGarland from "./_static/sankaku_garland1.png";
import twitcasting from "./_static/twitcasting.png";
import styles from "./style.module.css";

const yujiBoku = Yuji_Boku({
  subsets: ["latin"],
  weight: "400",
});

type Note = {
  creatorName: string;
  link: string;
  pubDate: string;
  title: string;
};

export type AppProps = {
  notes: Note[];
};

export default function App({ notes }: AppProps): React.JSX.Element {
  const { reward: confettiReward1 } = useReward("confettiReward1", "confetti", {
    elementSize: 12,
    lifetime: 400,
    spread: 100,
  });
  const { reward: confettiReward2 } = useReward("confettiReward2", "confetti", {
    elementSize: 12,
    lifetime: 400,
    spread: 100,
  });
  const sortedNotes = useMemo(
    () => notes.sort((a, b) => dayjs(b.pubDate).diff(dayjs(a.pubDate))),
    [notes],
  );
  const latestNotes = useMemo(() => sortedNotes.slice(0, 3), [sortedNotes]);
  const { hide, isShow, Portal, show } = usePortal({
    defaultShow: false,
  });

  useShowWindowSize({
    disable: process.env.NODE_ENV === "production",
  });

  useEffect(() => {
    setTimeout(() => confettiReward1(), 500);
    setTimeout(() => confettiReward2(), 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => (isShow ? noScroll.on() : noScroll.off()), [isShow]);

  return (
    <>
      <PageBorder borderColor="#fff" borderSize={6} roundSize={6} zIndex={1}>
        <span className={styles.confettiReward1} id="confettiReward1" />
        <span className={styles.confettiReward2} id="confettiReward2" />
        <div className={styles.container}>
          <Image
            alt=""
            className={styles.sankakuGarland1}
            src={sankakuGarland}
          />
          <Image
            alt=""
            className={styles.sankakuGarland2}
            src={sankakuGarland}
          />
          <div className={styles.inner}>
            <header className={styles.header}>
              <h2 className={styles.h2}>第1回</h2>
              <h1 className={clsx(styles.h1, yujiBoku.className)}>てり杯</h1>
              <div className={styles.detailContainer}>
                <div className={styles.period}>
                  2025年7月1日（火）0:00 〜 2025年7月14日（月）24:00
                </div>
                <div className={styles.place}>
                  場所：
                  <a
                    href="https://note.com/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    note
                  </a>
                </div>
              </div>
            </header>
            <main className={styles.main}>
              <section className={styles.section}>
                <h3 className={styles.h3}>ご案内</h3>
                <dl className={styles.guidanceList}>
                  <dt>参加条件：</dt>
                  <dd>
                    <a
                      href="https://twitcasting.tv/c:tytou"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      てりのツイキャス
                    </a>
                    のサポーターであること
                  </dd>
                  <dt>勝敗：</dt>
                  <dd>
                    期間内に投稿された記事の合計いいね数が多いチームの勝利
                  </dd>
                  <dt>集計期間：</dt>
                  <dd>7月21日（月）24:00 まで</dd>
                  <dt>優勝賞品：</dt>
                  <dd>
                    <a
                      href="https://twitter.com/miotkc"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      ツクシ ミヲ
                    </a>
                    によるイラストの贈呈
                  </dd>
                </dl>
              </section>
              <section className={styles.section}>
                <h3 className={styles.h3}>最新記事</h3>
                <dl className={styles.latestNotesList}>
                  {latestNotes.map(({ creatorName, link, pubDate, title }) => (
                    <Fragment key={link}>
                      <dt>{`${dayjs(pubDate).format("YYYY.MM.DD")}：`}</dt>
                      <dd>
                        <a
                          href={link}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {title}
                        </a>
                        {`（${creatorName}）`}
                      </dd>
                    </Fragment>
                  ))}
                </dl>
                <div className={styles.allShowButtonContainer}>
                  <button className={styles.allShowButton} onClick={show}>
                    すべて見る 👀
                  </button>
                </div>
              </section>
              <section className={styles.section}>
                <h3 className={styles.h3}>チーム</h3>
                <div className={styles.teamsContainer}>
                  <div className={styles.teamContainer}>
                    <h4 className={styles.h4}>あか組</h4>
                    <dl className={styles.teamList}>
                      <dt>てり：</dt>
                      <dd>
                        <div className={styles.linksContainer}>
                          <a
                            className={styles.iconImageContainer}
                            href="https://note.com/katy_amanda2525"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Image
                              alt="note"
                              className={styles.note}
                              fill={true}
                              quality={100}
                              src={note}
                            />
                          </a>
                          <SocialIcon
                            className={styles.iconImageContainer}
                            rel="noopener noreferrer"
                            target="_blank"
                            url="https://x.com/pypynanon"
                          />
                          <a
                            className={styles.iconImageContainer}
                            href="https://twitcasting.tv/c:tytou"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Image
                              alt="ツイキャス"
                              className={styles.twitcasting}
                              fill={true}
                              quality={100}
                              src={twitcasting}
                            />
                          </a>
                        </div>
                      </dd>
                      <dt>𝓚𝓞-𝓚𝓤𝓝：</dt>
                      <dd>
                        <div className={styles.linksContainer}>
                          <a
                            className={styles.iconImageContainer}
                            href="https://note.com/Ko_kun1212"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Image
                              alt="note"
                              className={styles.note}
                              fill={true}
                              quality={100}
                              src={note}
                            />
                          </a>
                        </div>
                      </dd>
                      <dt>アルティア：</dt>
                      <dd>
                        <div className={styles.linksContainer}>
                          <a
                            className={styles.iconImageContainer}
                            href="https://note.com/dandy_parrot4915"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Image
                              alt="note"
                              className={styles.note}
                              fill={true}
                              quality={100}
                              src={note}
                            />
                          </a>
                          <SocialIcon
                            className={styles.iconImageContainer}
                            rel="noopener noreferrer"
                            target="_blank"
                            url="https://x.com/re_alter_"
                          />
                          <a
                            className={styles.iconImageContainer}
                            href="https://twitcasting.tv/c:kilo017"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Image
                              alt="ツイキャス"
                              className={styles.twitcasting}
                              fill={true}
                              quality={100}
                              src={twitcasting}
                            />
                          </a>
                        </div>
                      </dd>
                    </dl>
                  </div>
                  <div className={styles.teamContainer}>
                    <h4 className={styles.h4}>しろ組</h4>
                    <dl className={styles.teamList}>
                      <dt>ツクシ ミヲ：</dt>
                      <dd>
                        <div className={styles.linksContainer}>
                          <a
                            className={styles.iconImageContainer}
                            href="https://note.com/miotkc_note"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Image
                              alt="note"
                              className={styles.note}
                              fill={true}
                              quality={100}
                              src={note}
                            />
                          </a>
                          <SocialIcon
                            className={styles.iconImageContainer}
                            rel="noopener noreferrer"
                            target="_blank"
                            url="https://x.com/miotkc"
                          />
                          <a
                            className={styles.iconImageContainer}
                            href="https://twitcasting.tv/miotkc"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Image
                              alt="ツイキャス"
                              className={styles.twitcasting}
                              fill={true}
                              quality={100}
                              src={twitcasting}
                            />
                          </a>
                        </div>
                      </dd>
                      <dt>ごめごめ：</dt>
                      <dd>
                        <div className={styles.linksContainer}>
                          <a
                            className={styles.iconImageContainer}
                            href="https://note.com/sound_arts"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Image
                              alt="note"
                              className={styles.note}
                              fill={true}
                              quality={100}
                              src={note}
                            />
                          </a>
                          <SocialIcon
                            className={styles.iconImageContainer}
                            rel="noopener noreferrer"
                            target="_blank"
                            url="https://x.com/Sound_Arts"
                          />
                        </div>
                      </dd>
                      <dt>チョコチップとハナジデール：</dt>
                      <dd>
                        <div className={styles.linksContainer}>
                          <a
                            className={styles.iconImageContainer}
                            href="https://note.com/chokochipp55"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Image
                              alt="note"
                              className={styles.note}
                              fill={true}
                              quality={100}
                              src={note}
                            />
                          </a>
                        </div>
                      </dd>
                      <dt>piro：</dt>
                      <dd>
                        <div className={styles.linksContainer}>
                          <a
                            className={styles.iconImageContainer}
                            href="https://note.com/kkweb"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Image
                              alt="note"
                              className={styles.note}
                              fill={true}
                              quality={100}
                              src={note}
                            />
                          </a>
                          <SocialIcon
                            className={styles.iconImageContainer}
                            rel="noopener noreferrer"
                            target="_blank"
                            url="https://x.com/piro0919"
                          />
                          <a
                            className={styles.iconImageContainer}
                            href="https://twitcasting.tv/piro0919"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Image
                              alt="ツイキャス"
                              className={styles.twitcasting}
                              fill={true}
                              quality={100}
                              src={twitcasting}
                            />
                          </a>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </section>
              <div className={styles.participateContainer}>
                <a
                  className={styles.participate}
                  href="https://forms.gle/1dzii4mtz3Lj5HLQ9"
                  rel="noopener noreferrer"
                >
                  参加する 💪
                </a>
              </div>
            </main>
            <footer className={styles.footer}>
              <small className={styles.copyright}>
                &copy; 2025 てり杯製作委員会
              </small>
            </footer>
          </div>
        </div>
      </PageBorder>
      <Portal>
        <div className={styles.modalContainer} onClick={hide}>
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            <dl className={styles.latestNotesList}>
              {sortedNotes.map(({ creatorName, link, pubDate, title }) => (
                <Fragment key={link}>
                  <dt>{`${dayjs(pubDate).format("YYYY.MM.DD")}：`}</dt>
                  <dd>
                    <a href={link} rel="noopener noreferrer" target="_blank">
                      {title}
                    </a>
                    {`（${creatorName}）`}
                  </dd>
                </Fragment>
              ))}
            </dl>
          </div>
          <CloseButton className={styles.closeButton} onClick={hide} />
        </div>
      </Portal>
    </>
  );
}
