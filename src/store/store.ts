import { configureStore } from '@reduxjs/toolkit'
import sliceReduces from './sliceReduces'

export default configureStore({
  reducer: {
    counter: sliceReduces
  },
})