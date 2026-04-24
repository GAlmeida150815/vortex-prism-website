export const fetchTrackerStats = async (steamId64) => {
  const API_KEY = 'YOUR_REAL_TRN_API_KEY_HERE'; 
  
  try {
    const response = await fetch(`/api/trn/v2/csgo/standard/profile/steam/${steamId64}`, {
      method: 'GET',
      headers: {
        'TRN-Api-Key': API_KEY,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`TRN API blocked the request or failed: Status ${response.status}`);
      return { data: null, error: true };
    }

    const json = await response.json();
    return { data: json.data, error: false }; 

  } catch (error) {
    console.error("Network error fetching TRN stats:", error);
    return { data: null, error: true };
  }
};