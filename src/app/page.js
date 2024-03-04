import PokeList from "@/Components/PokeList/PokeList";
import Slider from "@/Components/Slider/Slider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  ">
      <div className="w-full flex justify-center items-center">
        <Slider />
      </div>
      <PokeList />
    </main>
  );
}
