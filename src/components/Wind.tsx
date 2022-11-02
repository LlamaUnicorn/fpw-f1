export default function wind(degree: number) {
  if ((degree > 0 && degree < 30) || degree > 330) {
    return 'W'
  }
  if (degree >= 30 && degree < 60) {
    return 'SW'
  }
  if (degree >= 60 && degree < 120) {
    return 'S'
  }
  if (degree >= 120 && degree < 150) {
    return 'SE'
  }
  if (degree >= 150 && degree < 210) {
    return 'E'
  }
  if (degree >= 210 && degree < 240) {
    return 'NE'
  }
  if (degree >= 240 && degree < 300) {
    return 'N'
  }
  if (degree >= 300 && degree < 330) {
    return 'NW'
  }
}
