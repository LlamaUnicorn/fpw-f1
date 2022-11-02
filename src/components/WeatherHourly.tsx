import React, { useEffect } from 'react'
import wind from './Wind'

export default function WeatherHourly(props: any) {
  const hourly = props.dataRef.current
  // console.log('hourly called', hourly)

  return (
    <>
      <div className="hourly-wrapper">
        {hourly.map((data: any) => (
          <div className="hourly" key={data.dt}>
            <div className="hourly-content">
              <div className="time">
                {new Date(data.dt * 1000).toLocaleTimeString()}
              </div>
              <div className="temp">{data.temp}°</div>
              <div>
                <img
                  src={props.api.iconurl + data.weather[0].icon + '.png'}
                  alt={data.weather[0].description}
                />
                <h4 className="desc">{data.weather[0].description}</h4>
              </div>
              <div className="desc">
                Wind: {data.wind_speed}m/s, {wind(data.wind_deg)}
              </div>
              <div className="desc">Feels like: {data.feels_like}°</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
