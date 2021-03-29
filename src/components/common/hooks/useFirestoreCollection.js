// Hook to use firestore collection all throught the app
// It is a helper function to maintain consistency

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dataFromSnapshot } from "../../../App/firestore/firestoreService";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../redux/reducers/asyncReducer";

// parameters: query (firestore query), data (from firestore), deps (any dependencies required)
export default function useFirestoreCollection({ query, data, deps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => dataFromSnapshot(doc));
        data(docs);
        dispatch(asyncActionFinish());
      },
      (error) => dispatch(asyncActionError())
    );
    return () => {
      unsubscribe();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
