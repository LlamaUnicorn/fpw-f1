import React from 'react'
import wind from './Wind'

export default function WeatherDaily(props: {
  dataRef: { current: any }
  api: { iconurl: string }
}) {
  const daily = props.dataRef.current
  // console.log('daily', daily)

  return (
    <>
      <div className="container">
        {daily.map((data: any) => (
          <div className="daily-wrapper" key={data.dt}>
            <h2 className="date">{new Date(data.dt * 1000).toDateString()} </h2>
            <div key={data.weather[0].id}>
              <div className="desc" key={data.weather[0].id}>
                {data.weather[0].main}: {data.weather[0].description}
              </div>
              <img
                src={props.api.iconurl + data.weather[0].icon + '.png'}
                alt={data.weather[0].description}
              />
            </div>
            <div className="daily morn" key={data.sunrise}>
              <div className="temp">{data.temp.morn}°</div>
              <div className="wind">
                Wind: {data.wind_speed}m/s, {wind(data.wind_deg)}
              </div>
              <div className="feels-like">
                Feels like: {data.feels_like.morn}°
              </div>
            </div>
            <div className="daily day" key={data.dt}>
              <div className="temp">{data.temp.day}°</div>
              <div className="wind">
                Wind: {data.wind_speed}m/s, {wind(data.wind_deg)}
              </div>
              <div className="feels-like">
                Feels like: {data.feels_like.day}°
              </div>
            </div>
            <div className="daily eve" key={data.sunset}>
              <div className="temp">{data.temp.eve}°</div>
              <div className="wind">
                Wind: {data.wind_speed}m/s, {wind(data.wind_deg)}
              </div>
              <div className="feels-like">
                Feels like: {data.feels_like.eve}°
              </div>
            </div>

            <div className="daily night" key={data.moonrise}>
              <div className="temp">{data.temp.night}°</div>
              <div className="wind">
                Wind: {data.wind_speed}m/s, {wind(data.wind_deg)}
              </div>
              <div className="feels-like">
                Feels like: {data.feels_like.night}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
