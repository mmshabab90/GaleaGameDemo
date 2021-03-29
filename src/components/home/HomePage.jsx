import { Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dataFromSnapshot,
  getStocksFromFirestore,
} from "../../App/firestore/firestoreService";
import { listenToStocks } from "../../redux/actions/stocksActions";
import AppLoader from "../common/uiElements/AppLoader";
import GlobalLineChart from "../common/charts/GlobalLineChart";

export default function HomePage() {
  const dispatch = useDispatch();
  const { stocks } = useSelector((state) => state.stocks);

  useEffect(() => {
    const unsubscribe = getStocksFromFirestore({
      next: (snapshot) =>
        dispatch(
          listenToStocks(
            snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
          )
        ),
      error: (error) => console.log(error),
    });

    return unsubscribe;
  }, [dispatch]);

  function getMinData() {
    return Math.min.apply(
      Math,
      stocks.map(function (o) {
        return o.value;
      })
    );
  }

  function getMaxData() {
    return Math.max.apply(
      Math,
      stocks.map(function (o) {
        return o.value;
      })
    );
  }

  if (stocks && stocks.length < 1) return <AppLoader />;

  return (
    <div>
      <Typography component="h4" variant="h6">
        Home
      </Typography>

      {stocks && stocks.length > 0 ? (
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <GlobalLineChart
              data={stocks}
              xAxis="date"
              dataValue="value"
              color="#8884d8"
              tooltip={true}
              legend={false}
              graphFit={[getMinData(), getMaxData()]}
            />
          </Grid>
        </Grid>
      ) : (
        <AppLoader />
      )}
    </div>
  );
}
