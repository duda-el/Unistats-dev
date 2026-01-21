import StatsGrid from "@/src/components/MainPage/StatsGrid/StatsGrid";
import CalendarStrip from "@/src/components/MainPage/CalendarStrip/CalendarStrip";
import UserRanking from "@/src/components/MainPage/UserRanking/UserRanking";
import PromoBanner from "@/src/components/MainPage/PromoBanner/PromoBanner";
import UniversityRanking from "@/src/components/MainPage/UniversityRanking/UniversityRanking";
import GeorgiaMap from "@/src/components/MainPage/GeorgiaMap/GeorgiaMap"; // დავამატეთ ახალი იმპორტი

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* მარცხენა მხარე (2/3 სიგანე) */}
        <div className="lg:col-span-2 space-y-8">
          <StatsGrid />
          <PromoBanner />
          <UniversityRanking />
        </div>

        {/* მარჯვენა მხარე (1/3 სიგანე) */}
        <div className="flex flex-col gap-8">
          <CalendarStrip />
          <UserRanking />
          <GeorgiaMap /> {/* აქ ჩავსვით რუკის კომპონენტი */}
        </div>
        
      </div>
    </div>
  );
}