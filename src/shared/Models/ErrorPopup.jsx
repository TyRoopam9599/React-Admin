import React, { useEffect } from "react";
import { closeTicker } from "../../redux/reducer/ErrorTickerReducer";
import { useDispatch, useSelector } from "react-redux";

export default function ErrorPopup() {
  const animationTime = 4;
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state?.ErrorTicker?.isOpen);
  const Title = useSelector((state) => state?.ErrorTicker?.title);
  const Body = useSelector((state) => state?.ErrorTicker?.body);

  var closeTimer;
  useEffect(() => {
    if (isOpen) {
      closeTimer = setTimeout(() => {
        dispatch(closeTicker());
      }, animationTime * 1000);
    }

    return () => clearTimeout(closeTimer);
  }, [isOpen]);

  if (isOpen) {
    return (
      <div className="ticker">
        <h4>{Title}</h4>
        <p>{Body}</p>
        <span className="ticker__timeline">
          <span
            className="ticker__timeline__line"
            style={{ animationDuration: `${animationTime}s` }}
          ></span>
        </span>
      </div>
    );
  } else {
    return null;
  }
}
