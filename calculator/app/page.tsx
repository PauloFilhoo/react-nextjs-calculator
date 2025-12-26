import Calculator from "./components/Calculator.component";

export default function Home() {
  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      <link rel="icon" href="/favicon.icon" sizes="any" />
      <Calculator />
    </div>
  );
}
