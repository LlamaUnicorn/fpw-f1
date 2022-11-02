import React from 'react'
import '../styles/styl/weather-in.styl'

export default function WeatherInput(props: any) {
  return (
    <>
      <form onSubmit={props.getInput} className="form_weather">
        <input
          type="input"
          className="form__input_weather"
          onChange={props.handler}
          placeholder="Enter City Name"
        />
      </form>
    </>
  )
}
