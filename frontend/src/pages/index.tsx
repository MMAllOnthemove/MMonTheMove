import dynamic from "next/dynamic";
const HomeComponent = dynamic(() => import("@/components/Home"));
const Home = () => {
  return <HomeComponent />;
};

export default Home;
