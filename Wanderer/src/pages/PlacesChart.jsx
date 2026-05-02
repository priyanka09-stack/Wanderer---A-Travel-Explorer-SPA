import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { useTheme } from "../context/ThemeContext"
import { usePlaces } from "../context/PlacesContext"

function PlacesChart() {
  const { dark } = useTheme()
  const { places } = usePlaces()

  const museumCount = places.filter(p =>
    p.properties?.kinds?.includes("museum")
  ).length;

  const parkCount = places.filter(p =>
    p.properties?.kinds?.includes("park")
  ).length;

  const data = [
    { name: "Museums", value: museumCount },
    { name: "Parks", value: parkCount },
    { name: "Others", value: places.length - (museumCount + parkCount) }
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className={`w-full h-[300px] p-4 rounded-xl ${dark ? "bg-gray-900" : "bg-blue-100"}`}>
      <h2 className="text-center font-bold mb-2">Places Breakdown 📊</h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PlacesChart