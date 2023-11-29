import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";
const HomeComponent = dynamic(() => import("@/components/Home"), {
  loading: () => <Spinner />,
});
const Home = () => {
  return <HomeComponent />;
};

export default Home;
