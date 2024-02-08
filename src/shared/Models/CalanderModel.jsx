import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function CalanderModel({
  closeModel,
  time,
  setTime,
  date,
  setDate,
}) {
  const handleInputChnage = (event) => {
    const { name, value } = event?.target;

    setTime((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="calander_model model">
      <div className="calander_model__content">
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          className="calander_model__content__calander"
        >
          <DateCalendar
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>

        <div className="calander_model__content__select_time">
          <span>Select Time:</span>
          <input
            type="text"
            className="calander_model__content__select_time__hour"
            maxLength="2"
            value={time?.hour}
            name="hour"
            onChange={handleInputChnage}
          />
          :
          <input
            type="text"
            className="calander_model__content__select_time__minute"
            maxLength="2"
            value={time?.minute}
            name="minute"
            onChange={handleInputChnage}
          />
          <input
            type="text"
            className="calander_model__content__select_time__minute"
            maxLength="2"
            value={time?.meridian}
            name="meridian"
            onChange={handleInputChnage}
          />
        </div>

        <button className="button-red" onClick={closeModel}>
          Schedule
        </button>
      </div>
    </div>
  );
}
