import Chart from "../../components/charts/Chart"
import FeaturedInfo from "../../components/featuredinfo/FeaturedInfo"
import "./home.css"

export default function home() {
  return (
    <div className="home">
      <FeaturedInfo/>
      <Chart/>
    
    </div>
  )
}
