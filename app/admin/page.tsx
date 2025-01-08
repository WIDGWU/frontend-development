import GraphsForFiveYear from "../local-components/HomePage/ThirdSection/GraphsForFiveYear";
import GraphsForTerm from "../local-components/HomePage/SecondSection/GraphsForTerm";
import GraphsForYear from "../local-components/HomePage/FirstSection/GraphsForYear";

const AdminPage = () => {
  return (
    <main className="m-4">
      <GraphsForYear />
      <GraphsForTerm />
      <GraphsForFiveYear />
    </main>
  );
};

export default AdminPage;
