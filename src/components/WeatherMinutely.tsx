import React from 'react'

export default function WeatherMinutely(props: any) {
  const minutely = props.dataRef.current
  // console.log('WeatherMinutely', props)

  return (
    <>
      <div className="minutely-container"></div>
      <div className="minutely-wrapper">
        <div className="minutely">
          <div className="minutely-content">
            <span className="time minutely-header">Time:</span>
            <span className="precipitation  minutely-header">
              Precipitation, mm:
            </span>
          </div>
        </div>
        {minutely.map((data: any) => (
          <div className="minutely" key={data.dt}>
            <div className="minutely-content">
              <span className="time">
                {new Date(data.dt * 1000).toLocaleTimeString()}{' '}
              </span>
              <span className="precipitation">{data.precipitation}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
