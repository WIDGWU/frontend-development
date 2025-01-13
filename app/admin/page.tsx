import GraphsForFiveYear from "../local-components/HomePage/ThirdSection/GraphsForFiveYear";
import GraphsForTerm from "../local-components/HomePage/SecondSection/GraphsForTerm";
import GraphsForYear from "../local-components/HomePage/FirstSection/GraphsForYear";

// Home Page for Admin
const AdminPage = () => {
  return (
    <main className="m-4">
      {/* Three graphs are shown, graphs for year, individual term and for five year long period */}
      <GraphsForYear />
      <GraphsForTerm />
      <GraphsForFiveYear />
    </main>
  );
};

export default AdminPage;
