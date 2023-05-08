export const useDaily = () => {
  const fetchMissingDailyMem = async (oldest: string, latest: string) => {
    try {
      const result = await fetch(
        `http://localhost:3000/slacks/missing-members?oldest=${oldest}&latest=${latest}`,
        {
          method: 'GET'
        }
      );
      const data = await result.json();
      return data;
    } catch (error) {
      console.log("FETCH ERROR: ", error);
    }
  };


  return {
    fetchMissingDailyMem,
  };
};
