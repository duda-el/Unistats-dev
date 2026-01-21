import StatsGrid from "@/src/components/MainPage/StatsGrid/StatsGrid";
import CalendarStrip from "@/src/components/MainPage/CalendarStrip/CalendarStrip";
import UniversityList from "@/src/components/MainPage/UniversityList/UniversityList";
import PromoBanner from "@/src/components/MainPage/PromoBanner/PromoBanner";
import UniversityRanking from "@/src/components/MainPage/UniversityRanking/UniversityRanking";
import GeorgiaMap from "@/src/components/MainPage/GeorgiaMap/GeorgiaMap"; // დავამატეთ ახალი იმპორტი

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 items-start">
      <div className="lg:col-span-8 flex flex-col gap-8">
        <StatsGrid />
        <PromoBanner />
        <UniversityRanking />
      </div>

      <div className="lg:col-span-4 flex flex-col gap-8">
        <CalendarStrip />
        <UniversityList />
        <GeorgiaMap />
      </div>
    </div>
  );
}
