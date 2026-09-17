import styles from "./background-elements.module.css";

// Deliberate PCB routing: paired traces, 45-degree bends, vias, and chip pads.
export function BackgroundElements() {
  return (
    <div className={styles.background} aria-hidden="true">
      <svg className={styles.board} viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" fill="none">
        <g className={styles.traces} strokeWidth="1">
          <path d="M0 120H180L228 168H350M0 132H172L220 180H310L354 224V288" />
          <path d="M90 0V62L138 110H280L324 154H420M106 0V54L150 98H292L336 142H460" />
          <path d="M0 640H108L164 696V812L220 868H368M0 656H100L148 704V820L212 884H320" />
          <path d="M1440 130H1276L1212 194H1088L1032 250V346M1440 146H1284L1220 210H1096L1048 258V330" />
          <path d="M1440 310H1356L1300 366V446L1252 494H1190M1440 326H1364L1316 374V454L1260 510H1206" />
          <path d="M1440 704H1296L1232 640H1120L1056 704V818M1440 720H1288L1224 656H1128L1072 712V850" />
          <path d="M1440 904H1232L1168 840H1152M1440 920H1224L1160 856H1120" />
          <path d="M650 1000V914L714 850H848L912 786V718M666 1000V922L722 866H856L928 794V750" />
          <path d="M756 0V92L812 148H912L952 188V224M772 0V84L820 132H920L968 180V208" />
          <path d="M1340 0V60L1300 100H1192M1356 0V68L1308 116H1224" />
          <path d="M0 352H48L80 384V464M0 368H40L64 392V440" />
          <path d="M480 0V60L536 116H644M496 0V52L548 104H676" />
          <path d="M1440 440H1408L1376 472V506M1440 456H1416L1392 480V518" />
          <path d="M488 1000V796L544 740H668M504 1000V804L552 756H700" />
          <path d="M1440 800H1340L1292 752H1176M1440 816H1332L1284 768H1208" />
        </g>
        <g className={styles.pads} strokeWidth="1.5">
          <circle cx="350" cy="168" r="4" /><circle cx="354" cy="292" r="4" />
          <circle cx="424" cy="154" r="4" /><circle cx="464" cy="142" r="4" />
          <circle cx="372" cy="868" r="4" /><circle cx="324" cy="884" r="4" />
          <circle cx="1032" cy="350" r="4" /><circle cx="1048" cy="334" r="4" />
          <circle cx="1186" cy="494" r="4" /><circle cx="1202" cy="510" r="4" />
          <circle cx="1056" cy="822" r="4" /><circle cx="1072" cy="854" r="4" />
          <circle cx="912" cy="714" r="4" /><circle cx="928" cy="746" r="4" />
          <circle cx="952" cy="228" r="4" /><circle cx="968" cy="212" r="4" />
          <circle cx="1188" cy="100" r="4" /><circle cx="1220" cy="116" r="4" />
          <rect x="1332" y="534" width="48" height="64" rx="3" />
          <path d="M1320 546H1332M1320 558H1332M1320 574H1332M1320 586H1332M1380 546H1392M1380 558H1392M1380 574H1392M1380 586H1392" />
          <circle cx="1342" cy="544" r="2" />
          <circle cx="80" cy="468" r="4" /><circle cx="64" cy="444" r="4" />
          <circle cx="648" cy="116" r="4" /><circle cx="680" cy="104" r="4" />
          <circle cx="1376" cy="510" r="4" /><circle cx="1392" cy="522" r="4" />
          <circle cx="672" cy="740" r="4" /><circle cx="704" cy="756" r="4" />
          <circle cx="1172" cy="752" r="4" /><circle cx="1204" cy="768" r="4" />
        </g>
        <g className={styles.signals} strokeWidth="1.5" strokeLinecap="round">
          <path pathLength="100" d="M0 120H180L228 168H350" />
          <path pathLength="100" d="M756 0V92L812 148H912L952 188V224" />
          <path pathLength="100" d="M1440 310H1356L1300 366V446L1252 494H1190" />
          <path pathLength="100" d="M488 1000V796L544 740H668" />
          <path pathLength="100" d="M1440 704H1296L1232 640H1120L1056 704V818" />
        </g>
      </svg>
    </div>
  );
}
