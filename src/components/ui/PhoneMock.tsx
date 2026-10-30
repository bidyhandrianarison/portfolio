import { cn } from "@/lib/utils/cn";
import Image from "next/image";

export type ScreenVariant = "liste" | "grille" | "rond" | "menu" | "documents";

function ScreenChip({ on = false }: { on?: boolean }) {
  return (
    <div
      className={cn(
        "h-[26px] flex-1 rounded-[13px]",
        on ? "bg-accent" : "bg-panel-2",
      )}
    />
  );
}

function ScreenChips({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: count }, (_, index) => (
        <ScreenChip key={index} on={index === active} />
      ))}
    </div>
  );
}

function ScreenItem() {
  return (
    <div className="bg-panel-2 flex items-center gap-2.5 rounded-[14px] p-2">
      <div className="border-accent/30 bg-accent-soft h-[42px] w-[42px] flex-none rounded-xl border" />
      <div className="grid flex-1 gap-1.5">
        <span className="bg-content/18 block h-[7px] rounded-[4px]" />
        <span className="bg-content/18 block h-[7px] w-3/5 rounded-[4px]" />
      </div>
    </div>
  );
}

function ScreenItems({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ScreenItem key={index} />
      ))}
    </>
  );
}

function ScreenBar({ dots }: { dots: number }) {
  return (
    <div className="bg-panel-2 mt-auto flex h-[50px] items-center justify-around rounded-[18px]">
      {Array.from({ length: dots }, (_, index) => (
        <b
          key={index}
          className={cn(
            "h-5 w-5 rounded-[7px]",
            index === 0 ? "bg-accent" : "bg-content/20",
          )}
        />
      ))}
    </div>
  );
}

function ScreenHero({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "border-accent/35 bg-accent-soft rounded-[20px] border",
        className,
      )}
    />
  );
}

/* Port des 5 variantes d'écran ECRANS de la maquette projets-donnees.js */
function ListScreen() {
  return (
    <>
      <ScreenHero className="h-32" />
      <ScreenChips count={3} active={0} />
      <ScreenItems count={2} />
      <ScreenBar dots={4} />
    </>
  );
}

function GridLayout() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-panel-2 border-b-accent h-24 rounded-[12px] border-b-[3px]" />
        <div className="bg-panel-2 border-b-accent h-24 rounded-[12px] border-b-[3px]" />
        <div className="bg-panel-2 border-b-accent h-24 rounded-[12px] border-b-[3px]" />
        <div className="bg-panel-2 border-b-accent h-24 rounded-[12px] border-b-[3px]" />
      </div>
      <ScreenItem />
      <div className="bg-accent h-10 rounded-[14px]" />
      <ScreenBar dots={3} />
    </>
  );
}

function RoundScreen() {
  return (
    <>
      <ScreenHero className="mx-auto mt-1.5 h-[150px] w-[150px] rounded-full" />
      <ScreenChips count={2} active={0} />
      <ScreenItem />
      <div className="bg-accent mt-auto h-10 rounded-[13px]" />
    </>
  );
}

function MenuScreen() {
  return (
    <>
      <ScreenHero className="h-[110px]" />
      <ScreenItems count={3} />
      <ScreenBar dots={4} />
    </>
  );
}

function DocumentsScreen() {
  return (
    <>
      <ScreenChips count={3} active={0} />
      <ScreenItems count={4} />
      <ScreenBar dots={3} />
    </>
  );
}

const SCREENS: Record<ScreenVariant, () => React.JSX.Element> = {
  liste: ListScreen,
  grille: GridLayout,
  rond: RoundScreen,
  menu: MenuScreen,
  documents: DocumentsScreen,
};

export function PhoneMock({
  title,
  sub,
  screen = "liste",
  screenshot,
  screenshotBackground,
}: {
  title: string;
  sub: string;
  screen?: ScreenVariant;
  screenshot?: string;
  screenshotBackground?: string;
}) {
  const Screen = SCREENS[screen];

  return (
    <div
      data-testid="phone-mock"
      className="bg-phone shadow-deep h-[532px] w-[260px] rounded-[44px] p-2.5"
    >
      <div
        aria-hidden="true"
        className={cn(
          "bg-panel text-content relative flex h-full flex-col gap-2.5 overflow-hidden rounded-[35px]",
          !screenshot && "p-4 pt-11",
        )}
      >
        {screenshot ? (
          <Image
            src={screenshot}
            alt=""
            fill
            sizes="240px"
            className="bg-white object-contain"
            style={{ backgroundColor: screenshotBackground }}
          />
        ) : (
          <>
            <span
              aria-hidden="true"
              className="bg-phone absolute top-2.5 left-1/2 h-6 w-[84px] -translate-x-1/2 rounded-[20px]"
            />
            <div>
              <div className="text-2xl font-bold tracking-[-0.04em]">
                {title}
              </div>
              <div className="text-muted font-mono text-[0.6875rem] font-medium">
                {sub}
              </div>
            </div>
            <Screen />
          </>
        )}
      </div>
    </div>
  );
}
