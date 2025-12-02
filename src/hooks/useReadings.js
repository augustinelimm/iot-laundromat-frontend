import { useState, useEffect } from 'react';

// Mock data for machines 5-11
const getMockData = () => {
  const mockMachines = [
    { id: 'WM-05', state: 'RUNNING', ml_phase: 'WASHING' },
    { id: 'WM-06', state: 'IDLE', ml_phase: null },
    { id: 'WM-07', state: 'OCCUPIED', ml_phase: null },
    { id: 'WM-08', state: 'RUNNING', ml_phase: 'RINSE' },
    { id: 'WM-09', state: 'IDLE', ml_phase: null },
    { id: 'WM-10', state: 'OCCUPIED', ml_phase: null },
    { id: 'WM-11', state: 'RUNNING', ml_phase: 'SPINNING' },
  ];

  return mockMachines.map((machine, index) => ({
    id: `mock-${index + 5}`,
    data: {
      state: machine.state,
      current: machine.state === 'RUNNING' ? 2.1 + Math.random() * 0.5 : 0,
      MachineID: machine.id,
      ml_phase: machine.ml_phase,
      timestamp: new Date().toISOString(),
      cycle_number: Math.floor(Math.random() * 20) + 1
    },
    created_at: new Date().toISOString()
  }));
};

/**
 * Custom hook to fetch IoT readings data from the API
 * @param {number} interval - Optional polling interval in milliseconds (default: no polling)
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useReadings = (interval = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReadings = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_READINGS_API || '/api/readings';
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const jsonData = await response.json();
      console.log('Fetched readings:', jsonData);
      
      // Merge real data with mock data for machines 5-11
      const mockData = getMockData();
      const mergedData = {
        ...jsonData,
        data: [...(jsonData.data || []), ...mockData],
        count: (jsonData.count || 0) + mockData.length
      };
      
      setData(mergedData);
      setError(null);
    } catch (err) {
      console.error('Error fetching readings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReadings();

    // Set up polling if interval is provided
    if (interval) {
      const intervalId = setInterval(fetchReadings, interval);
      return () => clearInterval(intervalId);
    }
  }, [interval]);

  return { data, loading, error, refetch: fetchReadings };
};
