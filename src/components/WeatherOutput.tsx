import React, { useEffect } from 'react'
import useState from 'react-usestateref'
import WeatherGeneral from './WeatherGeneral'
import WeatherMinutely from './WeatherMinutely'
import WeatherHourly from './WeatherHourly'
import WeatherDaily from './WeatherDaily'

export default function WeatherOutput(props: any) {
  const [mode, setMode, modeRef] = useState('')
  const [data, setData, dataRef] = useState()
  const [response, setResponse, responseRef] = useState()

  function oneApiSearch() {
    const req =
      props.api.oneCallUrl +
      'lat=' +
      props.queryRef.current.lat +
      '&lon=' +
      props.queryRef.current.lon +
      props.api.options +
      props.api.key
    // console.log('oneApiSearch is called', req)
    // fetch('../assets/mock.json', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    // })
    fetch(req)
      .then(response => response.json())
      .then(responseData => {
        setResponse(responseData)
        // console.log('responseData', responseData)
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })
  }

  function handleMode(e: any) {
    e.preventDefault()
    const mode = e.target.dataset.mode
    setMode(mode)
    if (responseRef.current)
      setData(responseRef.current[modeRef.current.toString()])
  }

  useEffect(() => {
    oneApiSearch()
  }, [props.queryRef.current.city, modeRef.current])

  return (
    <>
      {props.queryRef.current.temp === '' ? (
        <div>No city selected</div>
      ) : (
        <div>
          <div className="mode-setters">
            <input
              type="button"
              className="set-mode"
              onClick={handleMode}
              data-mode="minutely"
              value="Minutely"
            />

            <input
              type="button"
              className="set-mode"
              onClick={handleMode}
              data-mode="hourly"
              value="Hourly"
            />

            <input
              type="button"
              className="set-mode"
              onClick={handleMode}
              data-mode="daily"
              value="Daily"
            />
          </div>

          <WeatherGeneral queryRef={props.queryRef} api={props.api} />

          {modeRef.current === 'daily' ? (
            <WeatherDaily dataRef={dataRef} api={props.api} />
          ) : modeRef.current === 'hourly' ? (
            <WeatherHourly dataRef={dataRef} api={props.api} />
          ) : modeRef.current === 'minutely' ? (
            <WeatherMinutely dataRef={dataRef} api={props.api} />
          ) : (
            <div />
          )}
        </div>
      )}
    </>
  )
}
