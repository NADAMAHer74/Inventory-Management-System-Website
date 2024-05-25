import "./chart.css"
import { LineChart, Line, XAxis,  Tooltip,CartesianGrid , ResponsiveContainer } from 'recharts';


export default function Charts() {
  const data = [
    {
      name: 'Jan',
      "Active User": 4000,

    },
    {
      name: 'Feb',
      "Active User": 3000,
   
    },
    {
      name: 'March',
      "Active User": 2000,
     
    },
    {
      name: 'April',
      "Active User": 2780,
    
    },
    {
      name: 'May',
      "Active User": 1890,
    },
    {
      name: 'Jun',
      "Active User": 2390,
    },
    {
      name: 'Agu',
      "Active User": 3490,
    },
    {
      name: 'Sep',
      "Active User": 3000,
    },
    {
      name: 'Oct',
      "Active User": 1490,
    },
    {
      name: 'Nov',
      "Active User": 3490,
    },
    {
      name: 'Des',
      "Active User": 2490,
    },
    
  
  ];
  return (
    <div className="chart">
      <h3 className="chartTitle">User Analytics</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1} className="container1">
      <LineChart data={data} >
      <XAxis dataKey="name" stroke="blue" />
      <Line type="monotone"  dataKey="Active User" stroke="blue"/>
      <Tooltip/>
      <CartesianGrid stroke="gray" strokeDasharray="5 5" />
      
      </LineChart>
      

      </ResponsiveContainer>
    </div>
  )
}
