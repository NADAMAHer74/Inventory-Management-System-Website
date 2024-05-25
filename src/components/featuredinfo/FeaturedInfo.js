import "./featuredinfo.css"
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
export default function FeaturedInfo() {
  return (
    <div className="featured">
        <div className="featuredItem">
      <span className="featuredTitle">Revanue</span>
      <div className="featuredMoneyContainer">
        <span className="featuredMoney">$42,002</span>
        <span className="featuredMoneyRate">-11  < BsArrowDown className="featuredIcon"/>
        </span>
      </div>
      <span className="featuredSub"> Compared to last week</span>
    </div>
    <div  id="sales"  className="featuredItem">
      <span className="featuredTitle">Sales</span>
      <div className="featuredMoneyContainer">
        <span className="featuredMoney">$4,415</span>
        <span className="featuredMoneyRate">-1.2  < BsArrowUp className="featuredIcon"/>
        </span>
      </div>
      <span className="featuredSub"> Compared to last week</span>
    </div>

    <div className="featuredItem">
      <span className="featuredTitle">Cost</span>
      <div className="featuredMoneyContainer">
        <span className="featuredMoney">$2,202</span>
        <span className="featuredMoneyRate">+2.3  < BsArrowDown className="featuredIcon"/>
        </span>
      </div>
      <span className="featuredSub"> Compared to last week</span>
    </div>




    </div>
  )
}
