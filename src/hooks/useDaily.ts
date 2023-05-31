export const useDaily = () => {



  const fetchMissingDailyMem = async (oldest: string, latest: string) => {
    const remoteURl = 'https://sc-daily-bot.herokuapp.com'
    const localHost = 'http://localhost:3000'

    try {
      const result = await fetch(
        `${remoteURl}/slacks/missing-members?oldest=${oldest}&latest=${latest}`,
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
