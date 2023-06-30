import {create} from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Hospital } from "../types/hospital";


interface HospitalStoreState {
  hospitals: Hospital[];
  locality : string;
  setLocality : (arg : string) => void //use void because function has no return value
  setHospitals: (arr : Hospital[]) => void;
  addNewHospital : (val : Hospital) => void;
}

const hospitalStore = (
  set: (fn: (state: HospitalStoreState) => HospitalStoreState) => void
): HospitalStoreState => ({
  //this should be an empty object
  hospitals: [],
  locality : '',  
  setLocality : (arg) => {
    set((state) => ({
      ...state,
      locality : arg
    }))
  }, 
  setHospitals: (arr) => {
    set((state) => ({
      ...state,
      hospitals: arr,
    }));
  },
  addNewHospital: (val) => {
    set((state) => ({
      ...state,
      hospitals: state.hospitals.includes(val)
        ? state.hospitals
        : [...state.hospitals, val],
    }));
  },
});

const useHospitalStore = create(
  devtools(
    persist(hospitalStore, {
      name: "hospitalStore",
      getStorage: () => sessionStorage,
    })
  )
);


export default useHospitalStore;
