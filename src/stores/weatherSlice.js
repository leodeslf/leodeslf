import { createSlice } from '@reduxjs/toolkit';

/**
 * Weather shape: {
 *   cityName,
 *   code, // Request status code.
 *   countryCode,
 *   countryFlagUrl,
 *   description,
 *   temp,
 *   tempMax,
 *   tempMin
 * }
 */

const weather = createSlice({
  name: 'weather',
  initialState: { code: undefined },
  reducers: {
    weatherSet: (_, { payload }) => {
      return payload;
    }
  }
});

export const { weatherSet } = weather.actions;
export default weather.reducer;
