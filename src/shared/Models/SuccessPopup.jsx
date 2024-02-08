import React, { useEffect } from "react";
import { closeSuccessTicker } from "../../redux/reducer/SuccessTickerReducer";
import { useDispatch, useSelector } from "react-redux";

export default function SuccessPopup() {
  const animationTime = 4;
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state?.SuccessTicker?.isOpen);
  const Title = useSelector((state) => state?.SuccessTicker?.title);
  const Body = useSelector((state) => state?.SuccessTicker?.body);

  var closeTimer;
  useEffect(() => {
    if (isOpen) {
      closeTimer = setTimeout(() => {
        dispatch(closeSuccessTicker());
      }, animationTime * 1000);
    }

    return () => clearTimeout(closeTimer);
  }, [isOpen]);

  if (isOpen) {
    return (
      <div className="success_ticker">
        <h4>{Title}</h4>
        <p>{Body}</p>
        <span className="success_ticker__timeline">
          <span
            className="success_ticker__timeline__line"
            style={{ animationDuration: `${animationTime}s` }}
          ></span>
        </span>
      </div>
    );
  } else {
    return null;
  }
}
