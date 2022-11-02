import React from 'react'
import wind from './Wind'

export default function WeatherGeneral(props: {
  queryRef: { current: any }
  api: { iconurl: any }
}) {
  const currently = props.queryRef.current

  return (
    <>
      <div className="general-wrapper  container">
        <div className="weather-desc">
          <div className="weather-city">{currently.city}</div>
          <h2 className="date">
            {new Date(currently.dt * 1000).toDateString()}{' '}
          </h2>
          <img
            className="weather-img"
            src={props.api.iconurl + currently.icon + '.png'}
            alt={currently.description}
          />
          <div className="desc-main">{currently.description}</div>
          <div className="feels-like">{currently.feels_like}°</div>
        </div>
        <div className="weather-temp">
          <div className="temp-main">{currently.temp}°</div>
          <div className="min-max">
            {currently.min}°/{currently.max}°
          </div>

          <div className="wind">
            Wind: {currently.wind}m/s, {wind(currently.wind_deg)}
          </div>
        </div>
      </div>
    </>
  )
}
