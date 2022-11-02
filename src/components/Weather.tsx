import React, { useEffect } from 'react'
import useState from 'react-usestateref'
import WeatherInput from './WeatherInput'
import WeatherOutput from './WeatherOutput'

export default function Weather() {
  const initialState = {
    city: '',
    dt: '',
    temp: '',
    feels_like: '',
    min: '',
    max: '',
    description: '',
    icon: '',
    wind: '',
    wind_deg: '',
    lat: '',
    lon: '',
  }

  const [query, setQuery, queryRef] = useState(initialState)
  const api = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    baseurl: 'https://api.openweathermap.org/data/2.5/weather?q=',
    oneCallUrl: 'https://api.openweathermap.org/data/2.5/onecall?',
    options: '&units=metric&lang=en&APPID=',
    iconurl: 'http://openweathermap.org/img/w/',
  }

  const updateQuery = (responseData: {
    main: {
      temp: string
      feels_like: string
      temp_min: string
      temp_max: string
    }
    dt: string
    weather: { icon: string; description: string }[]
    wind: { speed: string; deg: string }
    coord: { lat: string; lon: string }
  }) => {
    setQuery({
      ...queryRef.current,
      temp: responseData.main.temp,
      dt: responseData.dt,
      feels_like: responseData.main.feels_like,
      min: responseData.main.temp_min,
      max: responseData.main.temp_max,
      description: responseData.weather[0].description,
      icon: responseData.weather[0].icon,
      wind: responseData.wind.speed,
      wind_deg: responseData.wind.deg,
      lat: responseData.coord.lat,
      lon: responseData.coord.lon,
    })
  }

  const basicSearch = () => {
    // fetch('../assets/example.json', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    // })
    fetch(api.baseurl + queryRef.current.city + api.options + api.key)
      .then(response => response.json())
      .then(responseData => {
        // console.log('basicSearch called', responseData)
        updateQuery(responseData)
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })
  }

  function getCookie() {
    const cookie = document.cookie

    const city = cookie
      ?.split('; ')
      ?.find(row => row.startsWith('city='))
      ?.split('=')[1]

    return city
  }

  function setCookie(city: string) {
    document.cookie = `city=${city}; SameSite=Lax; Secure`
  }

  function setCity() {
    const city = getCookie()
    // console.log('setCity called', city)
    if (city !== undefined) {
      setQuery({ ...queryRef.current, city: city })
      basicSearch()
    }
  }

  useEffect(() => {
    setCity()
    return basicSearch()
  }, [queryRef.current.city])

  const handleInput = (e: any) => {
    const input = e.target.value
    const regex = /[^a-zA-Zа-яА-Я- ]+/g
    const city = input.replace(regex, '')
    setCookie(city)
  }

  const getInput = (e: any) => {
    e.preventDefault()
    // console.log('getInput called', getCookie())
    setCity()
  }

  return (
    <>
      <div className="weather-app">
        <h1>Weather React App</h1>
        <WeatherInput
          handler={handleInput}
          queryRef={queryRef}
          getInput={getInput}
        />
        {queryRef.current.dt !== '' ? (
          <WeatherOutput queryRef={queryRef} api={api} />
        ) : null}
      </div>
    </>
  )
}
