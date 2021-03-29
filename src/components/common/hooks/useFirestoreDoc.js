// Hook to use firestore document all throught the app
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
export default function useFirestoreDoc({ query, data, deps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionError({
              code: "not-found",
              message: "Could not find document",
            })
          );
        }
        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish());
      },
      (error) => dispatch(asyncActionError())
    );
    return () => {
      unsubscribe();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
