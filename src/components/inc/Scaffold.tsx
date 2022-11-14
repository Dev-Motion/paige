import React from "react"
import { useImage } from "@utils/ImageContext"
import { formatDate } from "@utils/index"

const Scaffold = () => {
  const image = useImage()
  const today = new Date()

  const todayImage = image?.filter(
    (image) => image.for === formatDate(today)
  )[0]
  console.log(image, todayImage)
  return <div>Scaffold</div>
}

export default Scaffold
