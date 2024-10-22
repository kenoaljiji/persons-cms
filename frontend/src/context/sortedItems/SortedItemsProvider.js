import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { localhost } from '../../config/config';
import { useAlertContext } from '../alert/AlertState';

const SortedItemsContext = createContext();

export const useSortedItemsContext = () => useContext(SortedItemsContext);

export const SortedItemsProvider = ({ children }) => {
  const initialPlaceholders = Array.from({ length: 4 }, (_, index) => ({
    id: `placeholder-${index}`,
    placeholder: true,
    text: `Select person ${index + 1}`,
    featured: '/assets/no-picture.png',
  }));

  const [sortedItems, setSortedItems] = useState({
    firstRowItems: {
      id: `placeholder-`,
      placeholder: true,
      img: '/assets/no-picture.png',
      featured: '/assets/no-picture.png',
    },
    secondRowItems: initialPlaceholders,
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { setAlert } = useAlertContext();

  const updateSortedItems = async (data, setLoading) => {
    console.log(data);
    try {
      setLoading(true);
      console.log(data);
      const response = await axios.put(`${localhost}/sort/data`, data);

      setSortedItems(response.data);
      getSortedItems();

      setAlert('Sorted items successfully update', 'success');
    } catch (error) {
      console.error(
        'Error saving search results:',
        error.response ? error.response.data : error.message
      );
      setAlert('Error saving sorted items', 'danger');
    }
    setSuccess(false);
    setError(false);
    setLoading(false);
  };

  const getSortedItems = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.get(`${localhost}/sort`, config);

      if (res.data && res.data.secondRowItems) {
        // Map through secondRowItems and replace any with null id with more detailed placeholders
        res.data.secondRowItems = res.data.secondRowItems.map((item, index) => {
          if (item.id === null) {
            return {
              ...item,
              id: `placeholder-${index}`,
              placeholder: true,
              text: `Select person ${index + 1}`,
              featured: '/assets/no-picture.png',
            };
          }
          return item;
        });

        // Ensure there are always 4 items, fill in the rest with placeholders if fewer
        const receivedItemsCount = res.data.secondRowItems.length;
        if (receivedItemsCount < 4) {
          res.data.secondRowItems = [
            ...res.data.secondRowItems,
            ...initialPlaceholders.slice(receivedItemsCount, 4),
          ];
        }
      } else {
        // Set to initial placeholders if data is missing or secondRowItems is not present
        res.data.secondRowItems = initialPlaceholders;
      }
      // Update the state with either modified or received data
      setSortedItems(res.data);
    } catch (err) {
      console.error('Error fetching sorted items:', err);
      setAlert('Failed to fetch sorted items', 'danger');
    }
  };

  useEffect(() => {
    getSortedItems();
    //eslint-disable-next-line
  }, []);

  return (
    <SortedItemsContext.Provider
      value={{
        sortedItems,
        updateSortedItems,
        getSortedItems,
      }}
    >
      {children}
    </SortedItemsContext.Provider>
  );
};
